// test/endpoint.test.mjs: exercises api/plan.mjs's own request handling
// without spending API credit and without needing the Vercel CLI.
//
// Two things make that possible:
//
// 1. The handler reads process.env.ANTHROPIC_API_KEY once, at module load
//    (`const KEY = ...` at the top of api/plan.mjs). To see both the
//    key-absent and key-present branches in one file we re-import the
//    module with a cache-busting query string after changing the env var.
//    Node's ESM loader keys its module cache on the full specifier
//    (path + query), so `plan.mjs?a` and `plan.mjs?b` are loaded and
//    evaluated as two separate module instances, each capturing whatever
//    ANTHROPIC_API_KEY was set at that import's moment.
//
// 2. For the tests that need to see what the handler would have sent to
//    Claude (dropped messages, truncated caps) without calling the real
//    API, we patch `globalThis.fetch` before invoking the handler. The
//    Anthropic SDK resolves `fetch` lazily inside `new Anthropic(...)`
//    (see node_modules/@anthropic-ai/sdk/client.js, which does
//    `this.fetch = options.fetch ?? Shims.getDefaultFetch()`), and the
//    handler constructs a fresh client on every request, so a global
//    patch installed just before calling the handler is picked up. We
//    never touch module internals or restructure plan.mjs for this.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';

let seq = 0;
async function loadHandler(key) {
  const prev = process.env.ANTHROPIC_API_KEY;
  if (key === undefined) delete process.env.ANTHROPIC_API_KEY;
  else process.env.ANTHROPIC_API_KEY = key;
  const mod = await import(`../api/plan.mjs?instance=${++seq}`);
  // Restoring with a plain assignment is wrong when prev is undefined:
  // `process.env.X = undefined` sets the literal string "undefined"
  // rather than deleting it, which would leave a later loadHandler(...)
  // call reading a truthy key by accident.
  if (prev === undefined) delete process.env.ANTHROPIC_API_KEY;
  else process.env.ANTHROPIC_API_KEY = prev;
  return mod.default;
}

/* node:test schedules a bare top-level `await` in this module against its
   own internal test queue, and a dynamic import() yields the event loop -
   so building the two handlers with plain top-level awaits raced against
   already-registered test bodies mutating the same process.env global
   (confirmed: it produced flipped results, a "no key" test that made a
   real network call and a GET test that saw {configured:false}). A
   before() hook is a first-class part of node:test's scheduling and is
   fully awaited before any test body in this file runs, which removes
   the race. */
let noKeyHandler;
let handler;
before(async () => {
  noKeyHandler = await loadHandler(undefined);
  handler = await loadHandler('sk-ant-test-fake-key');
});

function fakeRes() {
  const r = { code: 0, body: null, headers: {} };
  r.setHeader = (k, v) => { r.headers[k] = v; };
  r.status = (c) => { r.code = c; return r; };
  r.json = (b) => { r.body = b; return r; };
  return r;
}

/* Installs a fake global fetch that records every call and answers with
   a minimal, schema-valid envelope so the handler completes as if the
   API had replied. Restores the previous fetch on `.restore()`. */
function installMockFetch(replyBody) {
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    const body = replyBody ?? {
      id: 'msg_test',
      type: 'message',
      role: 'assistant',
      model: 'claude-opus-5',
      content: [{ type: 'text', text: JSON.stringify({ say: 'ok', actions: [] }) }],
      stop_reason: 'end_turn',
      stop_sequence: null,
      usage: { input_tokens: 1, output_tokens: 1 },
    };
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  };
  return {
    calls,
    restore: () => { globalThis.fetch = original; },
    lastMessages: () => JSON.parse(calls[calls.length - 1].init.body).messages,
  };
}

// --- 1. No key set --------------------------------------------------------

test('no key configured: 200 {configured:false}, no upstream call attempted', async () => {
  const req = { method: 'POST', body: { mode: 'chat', messages: [{ role: 'user', content: 'hi' }] } };
  const res = fakeRes();
  await noKeyHandler(req, res);
  assert.equal(res.code, 200);
  assert.deepEqual(res.body, { configured: false });
});

// The remaining tests all need KEY truthy to get past the configured-check,
// so they share one module instance loaded (in before()) with a fake,
// never-dialed key.

// --- 2. GET request ---------------------------------------------------------

test('GET request: 405 with an Allow: POST header', async () => {
  const req = { method: 'GET', body: {} };
  const res = fakeRes();
  await handler(req, res);
  assert.equal(res.code, 405);
  assert.equal(res.headers.Allow, 'POST');
  assert.deepEqual(res.body, { error: 'method not allowed' });
});

// --- 3. Draft mode, no brief -------------------------------------------------

test('draft mode with no brief: 400', async () => {
  const req = { method: 'POST', body: { mode: 'draft' } };
  const res = fakeRes();
  await handler(req, res);
  assert.equal(res.code, 400);
  assert.deepEqual(res.body, { error: 'draft needs a brief' });
});

// --- 4. Chat mode, no messages ------------------------------------------------

test('chat mode with no messages: 400', async () => {
  const req = { method: 'POST', body: { mode: 'chat' } };
  const res = fakeRes();
  await handler(req, res);
  assert.equal(res.code, 400);
  assert.deepEqual(res.body, { error: 'last message must be from the user' });
});

// --- 5. Chat mode, last message from the assistant -----------------------------

test('chat mode where the last message is from the assistant: 400', async () => {
  const req = {
    method: 'POST',
    body: {
      mode: 'chat',
      messages: [
        { role: 'user', content: 'hello' },
        { role: 'assistant', content: 'hi there' },
      ],
    },
  };
  const res = fakeRes();
  await handler(req, res);
  assert.equal(res.code, 400);
  assert.deepEqual(res.body, { error: 'last message must be from the user' });
});

// --- 6. Bogus roles are dropped; content is coerced through String(), not type-checked ---

test('a message with a bogus role is dropped rather than forwarded', async () => {
  const mock = installMockFetch();
  try {
    const req = {
      method: 'POST',
      // plan: '' sidesteps a quirk unrelated to this test: with no `plan`
      // key at all, `JSON.stringify(b.plan || '')` yields the two-char
      // string '""', which is truthy, so the handler always prepends its
      // "PLAN AS IT STANDS" preamble pair even when nobody sent a plan.
      // An explicit empty string is the one value `clean()` turns falsy.
      body: {
        mode: 'chat',
        plan: '',
        messages: [
          { role: 'system', content: 'operator instruction, not a real turn' },
          { role: 'developer', content: 'also bogus' },
          { role: 'user', content: 'the only real turn' },
        ],
      },
    };
    const res = fakeRes();
    await handler(req, res);
    assert.equal(res.code, 200);
    const sent = mock.lastMessages();
    assert.equal(sent.length, 1);
    assert.equal(sent[0].role, 'user');
    assert.equal(sent[0].content, 'the only real turn');
  } finally {
    mock.restore();
  }
});

test('a message with nullish content is dropped; non-string non-nullish content is stringified, not dropped', async () => {
  // The handler's own logic (clean(), then `.filter((m) => m.content)`)
  // only drops a message once String(content) comes out falsy - that
  // catches null/undefined/empty string, but a number or object survives
  // as its String() form and IS forwarded. This test asserts what the
  // code actually does, since api/plan.mjs is fixed and not to be changed.
  const mock = installMockFetch();
  try {
    const req = {
      method: 'POST',
      body: {
        mode: 'chat',
        plan: '', // see the note in the bogus-role test above
        messages: [
          { role: 'user', content: null },
          { role: 'user', content: 42 },
          { role: 'user', content: 'real one' },
        ],
      },
    };
    const res = fakeRes();
    await handler(req, res);
    assert.equal(res.code, 200);
    const sent = mock.lastMessages();
    // null content dropped; 42 survives as the string "42"; last is real
    assert.deepEqual(sent.map((m) => m.content), ['42', 'real one']);
  } finally {
    mock.restore();
  }
});

// --- 7. Caps: brief truncated, conversation cut to the last 16 turns -----------

test('a brief far over 8000 characters is truncated to the 8000-char cap', async () => {
  const mock = installMockFetch();
  try {
    const brief = 'x'.repeat(10000);
    const req = { method: 'POST', body: { mode: 'draft', brief } };
    const res = fakeRes();
    await handler(req, res);
    assert.equal(res.code, 200);
    const sent = mock.lastMessages();
    const draftTurn = sent[sent.length - 1].content;
    const marker = 'BRIEF:\n';
    const briefSent = draftTurn.slice(draftTurn.indexOf(marker) + marker.length);
    assert.equal(briefSent.length, 8000);
    assert.equal(briefSent, 'x'.repeat(8000));
  } finally {
    mock.restore();
  }
});

test('a conversation of 40 turns is cut to the last 16', async () => {
  const mock = installMockFetch();
  try {
    const messages = [];
    for (let i = 0; i < 40; i++) {
      // alternate so consecutive turns differ, and land on 'user' at i=39
      // (index 39 is odd) so the last-message-must-be-user check passes.
      messages.push({ role: i % 2 === 1 ? 'user' : 'assistant', content: `m${i}` });
    }
    const req = { method: 'POST', body: { mode: 'chat', plan: '', messages } }; // see note above
    const res = fakeRes();
    await handler(req, res);
    assert.equal(res.code, 200);
    const sent = mock.lastMessages();
    assert.equal(sent.length, 16);
    assert.equal(sent[0].content, 'm24');
    assert.equal(sent[sent.length - 1].content, 'm39');
  } finally {
    mock.restore();
  }
});

/* The first draft of a new plan sends no plan at all. If the handler
   treats "nothing" as "a plan", it tells the model it can see something
   it cannot, which is the kind of quiet lie that produces confident
   nonsense. JSON.stringify of nothing is the truthy string '""'. */
test('an absent, empty or blank plan adds no PLAN AS IT STANDS preamble', async () => {
  for (const sent of [undefined, '', {}, '   ']) {
    const mock = installMockFetch();
    try {
      const req = { method: 'POST', body: {
        mode: 'chat', plan: sent, catalogue: {},
        messages: [{ role: 'user', content: 'hello' }] } };
      await handler(req, fakeRes());
      const preambles = mock.lastMessages().filter(
        (m) => typeof m.content === 'string' && m.content.startsWith('PLAN AS IT STANDS'));
      assert.equal(preambles.length, 0,
        'a plan of ' + JSON.stringify(sent) + ' produced a preamble');
    } finally { mock.restore(); }
  }
});

test('a real plan does add the preamble', async () => {
  const mock = installMockFetch();
  try {
    const req = { method: 'POST', body: {
      mode: 'chat', plan: JSON.stringify({ campaign: { budget: 200000 } }), catalogue: {},
      messages: [{ role: 'user', content: 'hello' }] } };
    await handler(req, fakeRes());
    const preambles = mock.lastMessages().filter(
      (m) => typeof m.content === 'string' && m.content.startsWith('PLAN AS IT STANDS'));
    assert.equal(preambles.length, 1);
  } finally { mock.restore(); }
});

// --- 8. The library: an optional `plans` field, same absent-means-absent care ---

test('an absent, empty or unparseable plans list adds no library preamble', async () => {
  for (const sent of [undefined, [], '[]', 'not an array', {}, null]) {
    const mock = installMockFetch();
    try {
      const req = { method: 'POST', body: {
        mode: 'chat', surface: 'library', plans: sent, catalogue: {},
        messages: [{ role: 'user', content: 'hello' }] } };
      await handler(req, fakeRes());
      const preambles = mock.lastMessages().filter(
        (m) => typeof m.content === 'string' && m.content.startsWith("THE USER'S SAVED PLANS"));
      assert.equal(preambles.length, 0,
        'plans of ' + JSON.stringify(sent) + ' produced a preamble');
    } finally { mock.restore(); }
  }
});

test('a real plans list does add the library preamble, as a context turn ahead of the conversation', async () => {
  const mock = installMockFetch();
  try {
    const plans = [
      { id: 'p1', name: 'Shopee 9.9', brand: 'Shopee', status: 'booked', budget: 150000, duration: '4 weeks', updated: '1 Sep 2026' },
      { id: 'p2', name: 'Shopee 11.11', brand: 'Shopee', status: 'draft', budget: 200000, duration: '3 weeks', updated: '10 Sep 2026' },
    ];
    const req = { method: 'POST', body: {
      mode: 'chat', surface: 'library', plans, catalogue: {},
      messages: [{ role: 'user', content: 'how many shopee plans do i have' }] } };
    await handler(req, fakeRes());
    const sent = mock.lastMessages();
    const idx = sent.findIndex((m) => typeof m.content === 'string' && m.content.startsWith("THE USER'S SAVED PLANS"));
    assert.ok(idx > -1, 'the library preamble is missing');
    assert.equal(sent[idx].role, 'user');
    assert.equal(sent[idx + 1].role, 'assistant');
    assert.ok(sent[idx].content.includes('Shopee 9.9'));
    // ahead of the conversation: the last turn is still the user's own question
    assert.equal(sent[sent.length - 1].content, 'how many shopee plans do i have');
  } finally { mock.restore(); }
});

test('a plans list over 200 entries is capped at 200', async () => {
  const mock = installMockFetch();
  try {
    // Short records, well under the 12,000-char cap, so entry count is
    // the only cap this test can be exercising.
    const plans = [];
    for (let i = 0; i < 250; i++) plans.push({ id: 'p' + i });
    const req = { method: 'POST', body: {
      mode: 'chat', surface: 'library', plans, catalogue: {},
      messages: [{ role: 'user', content: 'hello' }] } };
    await handler(req, fakeRes());
    const sent = mock.lastMessages();
    const turn = sent.find((m) => typeof m.content === 'string' && m.content.startsWith("THE USER'S SAVED PLANS"));
    const ids = turn.content.match(/"id":"p\d+"/g) || [];
    assert.equal(ids.length, 200);
  } finally { mock.restore(); }
});

test('surface defaults to planner when absent, and library is only entered explicitly', async () => {
  const mock = installMockFetch();
  try {
    const req = { method: 'POST', body: {
      mode: 'chat', catalogue: {}, messages: [{ role: 'user', content: 'hi' }] } };
    const res = fakeRes();
    await handler(req, res);
    assert.equal(res.code, 200);
    const body = JSON.parse(mock.calls[mock.calls.length - 1].init.body);
    const system = body.system[0].text;
    assert.ok(system.includes('WHAT YOU CAN CHANGE'), 'plain chat with no surface must build the planner prompt');
  } finally { mock.restore(); }
});

test('surface:"library" builds the library prompt, which names no action and returns none', async () => {
  const mock = installMockFetch({
    id: 'msg_test', type: 'message', role: 'assistant', model: 'claude-opus-5',
    content: [{ type: 'text', text: JSON.stringify({ say: 'You have 2 plans for Shopee.', actions: [] }) }],
    stop_reason: 'end_turn', stop_sequence: null, usage: { input_tokens: 1, output_tokens: 1 },
  });
  try {
    const req = { method: 'POST', body: {
      mode: 'chat', surface: 'library', catalogue: {},
      messages: [{ role: 'user', content: 'how many shopee plans do i have' }] } };
    const res = fakeRes();
    await handler(req, res);
    assert.equal(res.code, 200);
    const body = JSON.parse(mock.calls[mock.calls.length - 1].init.body);
    const system = body.system[0].text;
    assert.ok(system.includes('Return no actions, ever'), 'library prompt lost its no-actions rule');
    assert.equal(system.includes('WHAT YOU CAN CHANGE'), false, 'library prompt still teaches the planner actions');
    assert.deepEqual(res.body.actions, []);
  } finally { mock.restore(); }
});
