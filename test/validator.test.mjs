import { test } from 'node:test';
import assert from 'node:assert/strict';
global.window = {};
await import('../shared/collab-ai.js');
const { validate, draft, chat, live } = global.window.CollabAI;

const cat = {
  channels: ['Video', 'Audio', 'OTT', 'Web', 'Social'],
  formats: [{ id: 'isv' }, { id: 'sva' }, { id: 'ldb' }],
  personas: [{ id: 'cl' }, { id: 'al' }, { id: 'kd' }],
  sites: [{ id: 'awani' }, { id: 'sooka' }],
};

test('passes actions that name real ids', () => {
  const { actions, rejected } = validate([{ op: 'add_formats', ids: ['isv', 'sva'] }], cat);
  assert.equal(actions.length, 1);
  assert.equal(rejected.length, 0);
});

test('drops ids that are not in the catalogue', () => {
  const { actions, rejected } = validate([{ op: 'add_formats', ids: ['isv', 'not-real'] }], cat);
  assert.deepEqual(actions[0].ids, ['isv']);
  assert.equal(rejected.length, 1);
});

test('drops an action whose ids all vanish', () => {
  const { actions, rejected } = validate([{ op: 'set_personas', ids: ['ghost'] }], cat);
  assert.equal(actions.length, 0);
  assert.equal(rejected.length, 1);
});

test('refuses to switch off every channel', () => {
  const { actions } = validate([{ op: 'channels_off', channels: cat.channels }], cat);
  assert.equal(actions.length, 0);
});

test('caps personas at five even if more are sent', () => {
  const many = ['cl', 'al', 'kd', 'cl', 'al', 'kd'];
  const { actions } = validate([{ op: 'set_personas', ids: many }], cat);
  assert.ok(actions[0].ids.length <= 5);
});

test('drops an unknown op entirely', () => {
  const { actions, rejected } = validate([{ op: 'rm -rf', path: '/' }], cat);
  assert.equal(actions.length, 0);
  assert.equal(rejected.length, 1);
});

test('keeps confirm_booking, which the page gates separately', () => {
  const { actions } = validate([{ op: 'confirm_booking' }], cat);
  assert.equal(actions.length, 1);
});

test('rejects a negative split amount', () => {
  const { actions } = validate([{ op: 'set_split', split: [{ id: 'isv', amount: -500 }] }], cat);
  assert.equal(actions.length, 0);
});

test('drops split entries whose format is not in the catalogue', () => {
  const { actions } = validate([{ op: 'set_split',
    split: [{ id: 'isv', amount: 1000 }, { id: 'ghost', amount: 500 }] }], cat);
  assert.deepEqual(actions[0].split, [{ id: 'isv', amount: 1000 }]);
});

test('returns nothing when handed something that is not an array', () => {
  const { actions } = validate(null, cat);
  assert.deepEqual(actions, []);
});

// ---------------------------------------------------------------------
// Adversarial pass. The ten tests above are the ones the spec named.
// Everything below is this file's own attack on the validator: for each
// hole, a test either documents that it is already safe, or pins down a
// fix that closed it. See the final report for the narrative version.
// ---------------------------------------------------------------------

test('does not treat __proto__, constructor or toString as known ids', () => {
  // A plain {} used as a lookup table inherits these names from
  // Object.prototype, so F['__proto__'] would read back a truthy,
  // inherited function/object even though nothing was ever stored under
  // that key. idSet() is built with Object.create(null) specifically so
  // there is no prototype chain left to leak through.
  const { actions, rejected } = validate(
    [{ op: 'add_formats', ids: ['__proto__', 'constructor', 'toString', 'hasOwnProperty'] }], cat);
  assert.equal(actions.length, 0);
  assert.equal(rejected.length, 1);
});

test('a string in place of an ids array is treated as no ids, not thrown', () => {
  assert.doesNotThrow(() => validate([{ op: 'add_formats', ids: 'isv' }], cat));
  const { actions, rejected } = validate([{ op: 'add_formats', ids: 'isv' }], cat);
  assert.equal(actions.length, 0);
  assert.equal(rejected.length, 1);
});

test('an object in place of a channels array is treated as no channels, not thrown', () => {
  assert.doesNotThrow(() => validate([{ op: 'channels_on', channels: { Video: true } }], cat));
  const { actions } = validate([{ op: 'channels_on', channels: { Video: true } }], cat);
  assert.equal(actions.length, 0);
});

test('a single object in place of a split array is treated as no split, not thrown', () => {
  assert.doesNotThrow(() => validate([{ op: 'set_split', split: { id: 'isv', amount: 100 } }], cat));
  const { actions } = validate([{ op: 'set_split', split: { id: 'isv', amount: 100 } }], cat);
  assert.equal(actions.length, 0);
});

test('duplicate entries in the catalogue channel list do not shrink the all-off guard', () => {
  // The guard compares how many channels are being switched off against
  // how many the catalogue has. If that denominator were the raw array
  // length, a catalogue with a duplicated entry would undercount the
  // real channel set and let channels_off silently wipe everything.
  // The guard counts unique catalogue channels instead.
  const dupCat = Object.assign({}, cat, { channels: ['Video', 'Video', 'Audio', 'OTT', 'Web', 'Social'] });
  const { actions } = validate(
    [{ op: 'channels_off', channels: ['Video', 'Audio', 'OTT', 'Web', 'Social'] }], dupCat);
  assert.equal(actions.length, 0);
});

test('does not mutate the actions array, the action objects, or the catalogue it is given', () => {
  const action = { op: 'add_formats', ids: ['isv', 'sva'] };
  const actionsIn = [action];
  const catSnapshot = JSON.parse(JSON.stringify(cat));
  validate(actionsIn, cat);
  assert.deepEqual(actionsIn, [{ op: 'add_formats', ids: ['isv', 'sva'] }]);
  assert.deepEqual(cat, catSnapshot);
});

test('set_fields caps a very long string instead of passing it through whole', () => {
  // The page will write fields.name into a form input; an unbounded
  // string here is a paste-bomb the page has to render.
  const long = 'x'.repeat(100000);
  const { actions } = validate([{ op: 'set_fields', fields: { name: long } }], cat);
  assert.equal(actions.length, 1);
  assert.ok(actions[0].fields.name.length <= 120);
});

test('set_fields drops a deeply nested object where a string was expected', () => {
  const { actions, rejected } = validate(
    [{ op: 'set_fields', fields: { name: { a: { b: { c: 'x' } } } } }], cat);
  assert.equal(actions.length, 0);
  assert.equal(rejected.length, 1);
});

test('set_fields drops a numeric field carrying a string instead of coercing it', () => {
  const { actions } = validate(
    [{ op: 'set_fields', fields: { budget: '500000', name: 'Raya' } }], cat);
  assert.equal(actions.length, 1);
  assert.equal('budget' in actions[0].fields, false);
  assert.equal(actions[0].fields.name, 'Raya');
});

test('set_fields drops keys outside its known field list, including __proto__', () => {
  const { actions } = validate(
    [{ op: 'set_fields', fields: { name: 'Raya', __proto__: { polluted: true }, evil: 'x' } }], cat);
  assert.equal(actions.length, 1);
  assert.equal('evil' in actions[0].fields, false);
  assert.equal(({}).polluted, undefined);
});

test('set_fields with no usable keys at all is dropped whole', () => {
  const { actions, rejected } = validate([{ op: 'set_fields', fields: { evil: 'x' } }], cat);
  assert.equal(actions.length, 0);
  assert.equal(rejected.length, 1);
});

test('set_fields rejects a non-object fields payload instead of throwing', () => {
  assert.doesNotThrow(() => validate([{ op: 'set_fields', fields: 'not an object' }], cat));
  const { actions } = validate([{ op: 'set_fields', fields: ['also not an object'] }], cat);
  assert.equal(actions.length, 0);
});

test('set_mode rejects a mode outside the two-value enum', () => {
  const { actions } = validate([{ op: 'set_mode', mode: 'javascript:alert(1)' }], cat);
  assert.equal(actions.length, 0);
});

test('set_refiners drops unknown keys and caps oversized values', () => {
  const { actions } = validate(
    [{ op: 'set_refiners', refiners: { race: 'x'.repeat(50), evil: 'y' } }], cat);
  assert.equal(actions.length, 1);
  assert.ok(actions[0].refiners.race.length <= 10);
  assert.equal('evil' in actions[0].refiners, false);
});

test('set_notes caps intent and exclude length', () => {
  const { actions } = validate(
    [{ op: 'set_notes', intent: 'x'.repeat(1000), exclude: 'y'.repeat(1000) }], cat);
  assert.ok(actions[0].intent.length <= 400);
  assert.ok(actions[0].exclude.length <= 400);
});

test('confirm_booking strips any extra fields riding along with it', () => {
  const { actions } = validate([{ op: 'confirm_booking', skipReview: true, op2: 'x' }], cat);
  assert.deepEqual(actions[0], { op: 'confirm_booking' });
});

test('go_to_step rejects a non-numeric step instead of coercing it', () => {
  const { actions } = validate([{ op: 'go_to_step', step: '2; drop table' }], cat);
  assert.equal(actions.length, 0);
});

test('a malformed catalogue (non-array formats/channels) is treated as empty rather than thrown', () => {
  const brokenCat = { channels: 'Video', formats: null, personas: undefined, sites: {} };
  assert.doesNotThrow(() => validate([{ op: 'add_formats', ids: ['isv'] }], brokenCat));
  const { actions } = validate([{ op: 'add_formats', ids: ['isv'] }], brokenCat);
  assert.equal(actions.length, 0);
});

/* ═══ Transport (shared/collab-ai.js: post/draft/chat/live) ═══
   liveState lives inside the collab-ai.js module closure with no reset
   hook, and node:test runs top-level tests in this file sequentially, so
   liveState carries over from whichever test ran before. Rather than
   depend on that order, every test below that cares about a starting
   value drives liveState there itself with a real call first. */

function stubFetch(impl) {
  const original = global.fetch;
  global.fetch = impl;
  return () => { global.fetch = original; };
}

function jsonResponse(status, body) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status: status,
    json: () => Promise.resolve(body),
  });
}

test('a good response resolves to say/actions/why and marks the endpoint live', async () => {
  const restore = stubFetch(() =>
    jsonResponse(200, { say: 'hi', actions: [{ op: 'confirm_booking' }], why: 'because' }));
  try {
    const result = await draft('brief', cat, '');
    assert.deepEqual(result, { say: 'hi', actions: [{ op: 'confirm_booking' }], why: 'because' });
    assert.equal(live(), true);
  } finally { restore(); }
});

test('configured:false rejects and marks the endpoint not live', async () => {
  const restore = stubFetch(() => jsonResponse(200, { configured: false }));
  try {
    await assert.rejects(() => draft('brief', cat, ''));
    assert.equal(live(), false);
  } finally { restore(); }
});

test('a non-ok HTTP status rejects', async () => {
  const restore = stubFetch(() => jsonResponse(502, { say: 'nope' }));
  try {
    await assert.rejects(() => draft('brief', cat, ''));
  } finally { restore(); }
});

test('a body with no say string rejects as a bad envelope', async () => {
  const restore = stubFetch(() => jsonResponse(200, { actions: [] }));
  try {
    await assert.rejects(() => draft('brief', cat, ''));
  } finally { restore(); }
});

test('actions missing from the response comes back as an empty array, not undefined', async () => {
  const restore = stubFetch(() => jsonResponse(200, { say: 'ok' }));
  try {
    const result = await draft('brief', cat, '');
    assert.deepEqual(result.actions, []);
  } finally { restore(); }
});

test('a 502 does not mark a live endpoint as fallen back', async () => {
  /* Drive liveState to true first: an earlier test in this file already
     left it false, and asserting live() stayed false after a 502 would
     prove nothing. */
  const restoreGood = stubFetch(() => jsonResponse(200, { say: 'hi' }));
  try { await draft('brief', cat, ''); } finally { restoreGood(); }
  assert.equal(live(), true);

  const restoreBad = stubFetch(() => jsonResponse(502, { say: 'nope' }));
  try {
    await assert.rejects(() => draft('brief', cat, ''));
    assert.equal(live(), true, 'one bad answer must not be read as a dead endpoint');
  } finally { restoreBad(); }
});

test('the request body carries the mode, the catalogue and the plan', async () => {
  let seenBody = null;
  const restore = stubFetch((url, opts) => {
    seenBody = JSON.parse(opts.body);
    return jsonResponse(200, { say: 'ok' });
  });
  try {
    await draft('the brief', cat, 'plan text');
    assert.equal(seenBody.mode, 'draft');
    assert.equal(seenBody.brief, 'the brief');
    assert.deepEqual(seenBody.catalogue, cat);
    assert.equal(seenBody.plan, 'plan text');

    await chat([{ role: 'user', content: 'hi' }], cat, 'plan text 2');
    assert.equal(seenBody.mode, 'chat');
    assert.deepEqual(seenBody.messages, [{ role: 'user', content: 'hi' }]);
    assert.deepEqual(seenBody.catalogue, cat);
    assert.equal(seenBody.plan, 'plan text 2');
  } finally { restore(); }
});
