/* Collab AI.
   One Vercel function behind /api/plan. The page sends the catalogue it
   draws from, a snapshot of the plan as it stands, and either a brief to
   draft from or a conversation to continue. This holds the key, asks
   Claude, and answers in one JSON envelope the page can act on.

   The key lives in ANTHROPIC_API_KEY on the server and nowhere else.
   With no key set this answers 200 {configured:false} and the page falls
   back to its own parser, the same degrade the mothership uses.

   NO AUTHENTICATION and no rate limit, by the product owner's decision of
   2026-09-17. Anyone with the URL can spend this key's credit; the
   console's monthly cap is the only backstop. Fine for a prototype, not
   for customers. */
import Anthropic from '@anthropic-ai/sdk';
import { Envelope, ENVELOPE_JSON_SCHEMA } from './_schema.mjs';
import { buildSystem } from './_prompt.mjs';

const KEY = process.env.ANTHROPIC_API_KEY || '';

const MAX_OUT = 2048;
const MAX_TURNS = 16;
const MAX_MSG = 4000;
const MAX_BRIEF = 8000;
const MAX_PLAN = 12000;
const MAX_CATALOGUE = 24000;

const clean = (v, n) => String(v == null ? '' : v).slice(0, n);

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!KEY) return res.status(200).json({ configured: false });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }

  const b = req.body || {};
  const mode = b.mode === 'draft' ? 'draft' : 'chat';

  let catalogue;
  try {
    catalogue = JSON.parse(clean(JSON.stringify(b.catalogue || {}), MAX_CATALOGUE));
  } catch {
    return res.status(400).json({ error: 'catalogue did not parse' });
  }

  /* An absent plan must stay absent. JSON.stringify of nothing yields the
     two-character string '""', and of an empty object '{}', both of which
     are truthy; sending either would hand the model a preamble announcing
     a plan it cannot see, on the very first draft when there is none. */
  const planRaw = typeof b.plan === 'string' ? b.plan : (b.plan ? JSON.stringify(b.plan) : '');
  const planText = clean(planRaw, MAX_PLAN).trim();
  const plan = (planText === '""' || planText === '{}') ? '' : planText;

  /* Only the shape the page sends survives; this body is writable by
     anyone, so nothing else is forwarded. */
  const turns = (Array.isArray(b.messages) ? b.messages : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: clean(m.content, MAX_MSG) }))
    .filter((m) => m.content)
    .slice(-MAX_TURNS);

  const messages = [];
  if (plan) {
    messages.push({ role: 'user', content: 'PLAN AS IT STANDS:\n' + plan });
    messages.push({ role: 'assistant', content: 'Got it. I have the plan in front of me.' });
  }
  if (mode === 'draft') {
    const brief = clean(b.brief, MAX_BRIEF);
    if (!brief) return res.status(400).json({ error: 'draft needs a brief' });
    messages.push({
      role: 'user',
      content:
        'Draft a complete media plan from the brief below. Return actions that set every field you can read ' +
        'from it, pick personas, choose channels and formats from the catalogue, and split the budget across ' +
        'them so all of it is placed. Fill anything the brief does not say with a sensible starting point and ' +
        'say in `say` which ones you assumed. Put your reasoning in `why`.\n\nBRIEF:\n' + brief,
    });
  } else {
    if (!turns.length || turns[turns.length - 1].role !== 'user') {
      return res.status(400).json({ error: 'last message must be from the user' });
    }
    messages.push(...turns);
  }

  const client = new Anthropic({ apiKey: KEY });

  /* The API intermittently answers a perfectly good request with
     400 "Invalid request data". Observed twice in about a dozen calls,
     then not once in eighteen consecutive retries of the same body, so it
     is not our shape. The SDK retries 408, 409, 429 and 5xx but never a
     400, reasonably, since a 400 usually means the request really is
     wrong. This retries that one signature once and nothing else, so a
     genuinely malformed request still fails fast and loudly. Without it a
     blip silently drops the user to the offline engine mid conversation. */
  const TRANSIENT = /Invalid request data/i;
  const pause = (ms) => new Promise((r) => setTimeout(r, ms));

  async function ask(req) {
    /* Two retries, not one: the eval saw this slip through a single
       retry. Matched on the message rather than on a status field,
       because the shape of the SDK's error object is not something to
       bet reliability on. Every other failure still throws at once, so a
       genuinely malformed request is never quietly retried into a bill. */
    for (let attempt = 0; ; attempt++) {
      try {
        return await client.beta.messages.create(req);
      } catch (e) {
        const transient = TRANSIENT.test(String((e && e.message) || ''));
        if (!transient || attempt >= 2) throw e;
        await pause(250 * (attempt + 1));
      }
    }
  }

  try {
    const response = await ask({
      model: 'claude-opus-5',
      max_tokens: MAX_OUT,
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      /* The hand-written schema, not zodOutputFormat(Envelope): zod 4
         demotes the op enum to a description and the API then enforces
         nothing. The spec records why the schema exists twice. */
      output_config: { effort: 'low', format: { type: 'json_schema', schema: ENVELOPE_JSON_SCHEMA } },
      system: [{ type: 'text', text: buildSystem(catalogue), cache_control: { type: 'ephemeral' } }],
      messages,
    });

    /* A policy decline survives the fallback chain. Say so plainly and
       change nothing; the page treats an empty action list as a no-op. */
    if (response.stop_reason === 'refusal') {
      return res.status(200).json({ say: "I can't help with that one.", actions: [] });
    }

    /* The beta namespace does not fill parsed_output, and adaptive
       thinking can put a thinking block ahead of the answer, so take the
       text block by type rather than by position. */
    const block = (response.content || []).filter((c) => c.type === 'text').pop();
    if (!block) return res.status(502).json({ error: 'no text block in the response' });

    let parsed;
    try {
      parsed = JSON.parse(block.text);
    } catch {
      return res.status(502).json({ error: 'the model did not return JSON' });
    }

    /* The schema constrained it, but this endpoint is open and the
       browser trusts what comes out of here, so check it anyway. */
    const check = Envelope.safeParse(parsed);
    if (!check.success) return res.status(502).json({ error: 'envelope failed its own schema' });
    return res.status(200).json(check.data);
  } catch (e) {
    return res.status(502).json({ error: 'upstream failed', detail: String(e.message).slice(0, 200) });
  }
}
