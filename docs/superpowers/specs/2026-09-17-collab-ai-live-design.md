# Collab AI, live — design

**Date:** 2026-09-17 · **Surface:** Collab:Media · **Route:** `pages/planner.html` + new `api/plan.mjs`

## What it is

The planner's AI is a puppet. A regex parser reads briefs, a keyword matcher
answers questions, and the persona and format picks are three hardcoded ids.
Every "why?" card reasons from figures the page already holds, which reads
convincingly because the figures are real, but nothing is decided by a model.

This replaces the puppet with Claude, through one serverless function that
holds the key. Three things become genuine:

1. **The draft.** A brief in any shape becomes a whole plan: fields,
   personas, channels, formats, split, with a written reason per pick.
2. **The conversation.** The Collab AI thread answers anything about the
   media engine and, when asked to change something, performs the change.
3. **The reasoning.** The "why?" cards and the review ledger carry the
   model's actual reasons rather than assembled sentences.

Reference points: `mothership/api/ask.mjs` (the serverless pattern, the caps,
the facts-versus-thinking rule and the scope fence, all written for the sales
board and adapted here) and the Claude API skill (model, effort, structured
outputs, refusal fallbacks).

## Decisions taken

1. **The endpoint lives in this repo, not the mothership.** Ryan's call. The
   planner becomes self-contained: its own `api/`, its own key, its own
   deployment. The cost is that the real thing needs `vercel dev` rather than
   `python3 -m http.server`.
2. **The page stays the executor.** The model never touches plan state. It
   returns a list of actions; the page validates each one against its own
   catalogue and applies it through the same functions the buttons call, so
   every existing animation, provenance badge and save path still runs.
3. **One structured envelope, not tool calling.** Both modes return the same
   JSON shape, constrained by the API. Tool calling earns its complexity when
   the model needs results back to continue; here every turn already carries
   the full plan and the full catalogue, so one round of actions always
   suffices. One parse path, one validator, one thing to read when an action
   misfires.
4. **The catalogue rides in the system prompt.** All 36 formats with their
   rates, 14 personas with their real consumption figures, 13 sites with
   their inventory, the channels and the overlap model. It is stable, so it
   caches; and it is the only source the model may quote a number from.
5. **Booking is reachable, but only through a confirmation.** Ryan's call,
   taken on 2026-09-17. The model may draft and revise any part of a plan
   and may ask to book one, so "book it" works in conversation.
   `confirm_booking` does not book: it opens the page's existing booking
   dialog, which still needs a human click. Deleting a plan and navigating
   off the page stay absent from the vocabulary entirely.
6. **The fake stays as the fallback.** No key, a failed call, or a plain
   static server all fall back to today's parser and keyword engine. The
   prototype keeps working offline; it just goes back to being a puppet.

## Architecture

```
pages/planner.html ──┐
                     ├─> shared/collab-ai.js ──fetch──> /api/plan ──> Claude
  (state + render)   │      (client, validator,
                     │       action applier)
                     └──> local fallback engine
                            (parseBriefText, intent matcher)
```

### `api/plan.mjs` — the only thing that holds the key

One Vercel function, `POST /api/plan`, two modes on one route.

| Field | Meaning |
|---|---|
| `mode` | `"draft"` or `"chat"` |
| `brief` | draft only: the composer's text, capped at 8,000 characters |
| `messages` | chat only: `[{role, content}]`, user and assistant only, last 16 turns, 4,000 characters each, last must be user |
| `plan` | both modes, optional: a JSON snapshot of the plan as it stands, capped at 12,000 characters. A draft sent from a part-filled plan carries it so the model amends rather than overwrites; a draft from an empty plan omits it |

Responses:

- `200 {configured: false}` when `ANTHROPIC_API_KEY` is unset. Same polite
  degrade the mothership's three functions use.
- `200 {say, actions}` on success.
- `400` on a malformed body, `502` when the upstream call fails.

Request settings, from the Claude API skill:

| Setting | Value | Why |
|---|---|---|
| Model | `claude-opus-5` | The skill's default, and what the mothership already uses |
| Thinking | adaptive (on by default on Opus 5) | Judgement calls about a plan want it |
| Effort | `low` | Every fact is already in the prompt. The mothership measured 7.5s to first token at default effort, and chat dies at that latency |
| `max_tokens` | 2,048 | One runaway answer cannot cost more than a few sen |
| Fallbacks | `fallbacks: "default"` with beta `server-side-fallback-2026-07-01` | The skill says to enable these by default on Opus 5 |
| Caching | `cache_control` on the system block | The catalogue never changes between requests |

**Call shape, verified 2026-09-17 against the live API.** B. A single
`client.beta.messages.create()` call carries both features: `output_config:
{ effort: 'low', format: zodOutputFormat(Schema) }` alongside `betas:
['server-side-fallback-2026-07-01']` and `fallbacks: 'default'`. The one
wrinkle is that `beta.messages.create()` does not populate
`response.parsed_output` the way the non-beta `messages.parse()` does; the
schema-constrained JSON still comes back as ordinary text in
`response.content[0].text`, so the endpoint parses it itself with
`JSON.parse()`.

Exact SDK call shapes come from the skill's TypeScript reference, read at
implementation time rather than recalled.

### The envelope

Both modes answer in one shape:

```json
{
  "say": "Added OTT and moved RM 40,000 into it from the leaderboard.",
  "actions": [
    {"op": "channels_on", "channels": ["OTT"]},
    {"op": "add_formats", "ids": ["ott"]},
    {"op": "set_split", "split": {"ott": 40000, "ldb": 20000}}
  ],
  "why": {
    "brief": "Budget read from \"RM 200k working budget\" …",
    "personas": "Comedy lover anchors the reach at 204,600 …",
    "mix": "Awareness with personas who watch video at 60% …"
  }
}
```

`say` is prose for the reply bubble. `actions` may be empty, which is how a
pure question is answered. `why` carries one entry per reasoning card, keyed
`brief`, `personas` and `mix` to match the three the page already renders. It
is present on a draft and absent on chat turns, where the reasoning belongs
in `say` instead.

A draft is expressed entirely in actions. There is no second schema for it:
"draft me a plan" and "add OTT" differ only in how many actions come back.

### The action vocabulary

Thirteen operations, each validated by the page before it runs.

| Op | Payload | Applies to |
|---|---|---|
| `set_fields` | any of name, brand, prod, start, end, budget, objective, kpi, target, unit, langs | Step 1 |
| `set_mode` | `personas` or `mass` | Step 2 |
| `set_personas` | ids, at most 5 | Step 2 |
| `set_refiners` | race, gen, inc, geo; empty string clears one | Step 2 |
| `set_notes` | intent, exclude | Step 2 |
| `channels_on` | channel names | Step 3 |
| `channels_off` | channel names, never the last one | Step 3 |
| `add_formats` | format ids | Step 3 |
| `remove_formats` | format ids | Step 3 |
| `set_split` | id to amount, or `{"mode": "recommended"}` to reset | Step 3 |
| `pin_sites` | ids plus pinned true or false | Step 3 |
| `go_to_step` | 1 to 4 | Navigation |
| `confirm_booking` | none | Opens the booking dialog. Never books by itself |

**Validation is the page's job, not the API's.** Every id is checked against
`FORMATS`, `PERSONAS`, `SITES` and `CHANNELS`. A split that does not sum
within the budget is clamped and the discrepancy surfaces as unallocated,
exactly as a dragged dial would. An unknown op is dropped and logged. An
action that would empty the channel list is refused, the same guard the
buttons already carry.

**Every applied action is visible.** The affected section flashes with the
existing `aiFlash`, provenance badges flip to AI draft, and the reply names
what changed. Nothing moves silently.

### The system prompt

Four parts, in this order, so the stable ones cache:

1. **Who and where.** A media planner's assistant inside the Collab:Media
   planner, talking to a seller who has this plan on screen.
2. **The catalogue.** Formats with channel, rate and whether they carry
   video. Personas with size, category and consumption. Sites with channel,
   rate and inventory. Channels. The overlap model (60% within a category,
   25% across) and the frequency assumption, marked as a model rather than a
   measurement.
3. **The two rules.**
   - *Facts are caged.* Every rate, size, inventory figure or forecast must
     come from the catalogue or the plan snapshot. Never invent or estimate
     one. Where the catalogue marks a rate a placeholder, carry the caveat.
   - *Thinking is free.* Rank, recommend, warn and plan using those facts
     plus real media judgement. When asked what to do, commit to a
     recommendation rather than listing options.
4. **Scope.** In scope is anything the media engine touches: this plan, the
   rate card and what each format does, the audience catalogue, sites,
   reach and frequency, budget allocation, and media planning craft. Out of
   scope is everything else, declined in one friendly sentence with the
   nearest in-scope help offered, without lecturing.

Plus the house voice already used across this product: answer first, no em
dashes, no filler, short answers to short questions.

### `shared/collab-ai.js` — the client

One module, three exports, no knowledge of the page's internals beyond a
handful of callbacks passed in.

| Export | Does |
|---|---|
| `available()` | Probes the endpoint once, caches the answer. False means fall back |
| `draft(briefText, catalogue)` | Returns `{say, actions, why}` or throws |
| `chat(messages, planSnapshot, catalogue)` | Same envelope, no `why` |

The validator and the action applier live here too, so the page keeps one
seam to the model and the fallback path stays untouched.

### Page integration

| Today | After |
|---|---|
| `sendBrief()` runs `parseBriefText` then `applyBriefLine` | Calls `draft()`. On success, applies the field actions through the existing fill choreography, then the rest. On failure, calls `parseBriefText` |
| Thread send runs the keyword intent engine | Calls `chat()`. On failure, runs the keyword engine |
| `whyBrief/whyPersonas/whyMix` assemble sentences | Prefer the model's `why` when the current draft came from the model; otherwise assemble as now |
| Persona and format picks are hardcoded ids | Come from the draft's actions |

The fill choreography, the beacons, the flashes, the badges and the checker
are untouched. Only the source of the values changes.

## Guards

**Cost.** Caps on output, turns, message and brief length as tabled above. A
draft is roughly 10 to 20 sen once the catalogue is caching; a chat turn
less. No client-side request cap: Ryan's call on 2026-09-17, on the grounds
that the console's monthly spend limit is the right place for it.

**Abuse.** The endpoint ships with no authentication and no rate limit,
matching every other function in this stack. Ryan's call on 2026-09-17,
taken with the consequence stated: anyone holding the deployed URL can spend
this key's credit until the console's monthly limit stops them. That limit
is therefore the only backstop, and it only exists if it has been set.
Acceptable for a prototype; it must not ship to customers as it stands.

**Safety.** The action vocabulary is a closed list. Deleting a plan and
navigating off the page are absent by construction, not by instruction, so a
prompt injection in a pasted brief cannot reach them. Booking is reachable
but cannot complete: `confirm_booking` only opens the dialog, and the dialog
is the page's own, so the confirming click is always a human's. Pasted brief
text is data: it rides as a user turn, never as system instructions.

**Failure.** Any non-200, any timeout, any envelope that fails validation
falls back to the local engine with a single quiet line in the reply saying
the assistant is offline. The plan is never left half-changed: actions are
validated as a set before any of them is applied.

## Verification

1. **The endpoint alone.** curl both modes with the key set and unset.
2. **The eight sample briefs.** Each one drafts a plan whose fields match
   what the regex parser gets today, or beats it. This is the regression
   floor: the model must not be worse than the parser it replaces.
3. **Actions.** A scripted set of asks, each checked for the right ops and
   the right page state after: add a channel, drop a format, shift budget,
   swap a persona, widen the dates, reset the split.
4. **Scope.** In-scope questions answer; out-of-scope ones decline in one
   line without lecturing.
5. **Booking.** "Book it" opens the dialog and stops there. The plan is
   never booked without a human click, including when the model is asked
   repeatedly or the instruction arrives inside a pasted brief.
6. **Facts.** Asked for a rate or an audience size, the answer matches the
   catalogue exactly. Asked for one that is not there, it says so rather
   than inventing.
7. **Fallback.** With the key unset and again with the endpoint 500ing, the
   page still drafts through the parser and still answers through keywords.

## Out of scope

- Authentication on the endpoint.
- Streaming. The reply bubble already types text out locally, so a
  non-streaming call loses nothing visible and keeps the client simple.
- Multi-step agent loops. One round of actions per turn.
- Teaching the model anything not in the catalogue: the live build's 42
  sites and fuller rate card stay out until the prototype's data catches up.
- Any change to the checker, the beacons, or the fill choreography.
