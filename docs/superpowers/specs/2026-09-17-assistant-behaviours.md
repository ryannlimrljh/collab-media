# What a media planner actually asks

**Date:** 2026-09-17 · **Surface:** Collab AI, in `pages/planner.html`

Written by working through a seller's day rather than by designing outward
from the API. The question this answers is not "what can the model do" but
"what does the person in front of it keep needing", and then: does our
thirteen-action vocabulary and our plan snapshot actually serve that.

## Who is asking

A media seller at Astro's digital arm. A brief lands from a client or an
agency, often as a forwarded mail. They have to turn it into a plan they can
defend, revise it two or three times while the client pushes back, and then
book it. They know media. They do not want a tutorial. What they want is a
fast colleague who knows the rate card by heart.

Their day has four moments, and the assistant is useful in all four:
getting started, checking their own work, defending it to someone else, and
changing it when the answer is no.

---

## The ten things they ask

### 1. Draft it for me

> "Here's the brief, build me something."
> "Start me a plan for Shopee, RM 200k, awareness, three weeks."

**Behaviour:** fill everything readable, choose personas, channels, formats
and a split that spends the budget, then say in one or two sentences what
was assumed. Assumptions stated, not hidden. This already works.

### 2. What have we got?

> "What formats do we have for OTT?"
> "What's the cheapest video format?"
> "What is a Catfish Ad?"
> "Anything under RM 10 CPM?"
> "What's our biggest site?"

**Behaviour:** answer from the catalogue, exactly, no actions. This is the
most common kind of question and the easiest to get wrong by inventing a
plausible rate. The catalogue is in the prompt precisely so it cannot.

### 3. Who should I be targeting?

> "Who watches the most video?"
> "Which personas suit a footfall campaign?"
> "How big is K-drama watchers?"
> "Who overlaps with Comedy lover?"

**Behaviour:** answer from the persona list with its real consumption
figures. Recommend, do not list. No actions unless asked to apply it.

### 4. Do the sums for me

> "What's my blended CPM?"
> "Am I hitting the reach target?"
> "How much is unallocated?"
> "What's this costing me per person reached?"
> "If I add RM 50k, what does that buy?"

**Behaviour:** read the plan snapshot, compute, answer with the number. The
snapshot must therefore carry the forecast, not just the inputs. The last
one is a hypothetical and must not change anything.

### 5. Change this

> "Add OTT."
> "Drop the leaderboard."
> "Move 20% from Web to Social."
> "Make it six weeks."
> "Swap K-drama for football fans."
> "Push the budget to 300k."
> "Pin Awani."
> "Make it video heavy."

**Behaviour:** perform it, then say what changed in one line. This is the
action vocabulary earning its keep. Two rules matter here:

- **Speak names, act in ids.** Nobody says "ldb". They say "the
  leaderboard". The catalogue carries both, so the mapping is the
  assistant's job, never the user's.
- **Return absolute amounts, never percentages.** "Move 20% from Web to
  Social" means computing real ringgit and returning a split that still
  adds up. A percentage handed to the page is a bug waiting to happen.

### 6. Is this any good?

> "Is this plan any good?"
> "What would you change?"
> "What am I missing?"
> "What's the risk here?"

**Behaviour:** the most valuable thing it can do, and the thing a lookup
table cannot. Give a verdict, name the one number that proves it, and
commit to a recommendation rather than listing options. No actions: an
opinion is not permission to act.

### 7. What if

> "What if we went social only?"
> "Show me a cheaper version."
> "What would a TV-led plan look like?"

**Behaviour:** **answer, do not act.** This is the sharpest rule in the
document and the easiest to get wrong. A planner exploring an option has
not asked for their work to be rewritten. Describe the alternative with
real numbers, then offer to apply it. There is no undo in this product,
so a wrongly applied "what if" costs the user their afternoon.

### 8. Help me defend it

> "Write me a paragraph for the client."
> "Why did we pick these formats?"
> "The client says it's too expensive, what do I cut?"

**Behaviour:** draft freely. Client-facing prose, talking points, the
argument for a line item. This is a drafting tool as much as a planning
one. The "too expensive" question is advice plus an offer to act, not a
silent cut.

### 9. Take me there

> "Take me to the mix."
> "Book it."
> "Save this."

**Behaviour:** navigate, or open the booking dialog. Booking opens the
dialog and stops; a person clicks. **Saving has no action today and the
assistant must say so rather than claim it saved.**

### 10. Something else entirely

> "How much is a flight to Penang?"
> "What are KFC's prices?"
> "Write me a Python script."

**Behaviour:** decline in one line with a light touch, then point at the
nearest thing it can do. Dry, never jolly, never twice the same way.

---

## What this exposes

Working through the ten revealed four gaps, three of which are cheap.

| Gap | Severity | Decision |
|---|---|---|
| "What if" could mutate the plan | High | Fix in the prompt. An explicit rule, stated twice |
| The prompt never lists the actions | High | Fix in the prompt. The model cannot use a vocabulary it was never given |
| No save action | Low | The assistant says it cannot, rather than pretending. Adding `save_plan` is a later call |
| Questions across all plans, "how many Shopee plans do I have" | Medium | Out of scope here. The snapshot is one plan. Needs the plan library, which is its own piece of work |

## What the snapshot must carry

Behaviours 4, 6 and 8 all read the plan rather than the catalogue, so the
snapshot is doing more work than first designed. It must include, at
minimum: every campaign field, the audience with its computed unique reach
and overlap, the mix with per-format amounts, the must-buy sites, and the
whole forecast, being impressions, blended CPM, net reach, frequency,
allocated and unallocated. Without the forecast, half the questions above
get an invented number or a refusal.

## How we will know it behaves

A behaviour eval, not a unit test. Around thirty real asks drawn from the
ten groups above, each run against the live endpoint, each checked for the
thing that actually matters:

- **Did it act when it should have, and stay still when it should have?**
  The "what if" cases are the ones to watch.
- **Are all ids real?** Every format, persona, site and channel it names
  must exist in the catalogue it was given.
- **Are the numbers the catalogue's?** A quoted rate must match exactly.
- **Did the out-of-scope ones decline, in one line, without a lecture?**

Deterministic where possible: action presence, id validity and quoted
figures are all checkable in code. Tone is read by a person, once, rather
than graded by another model, because thirty samples is few enough to read
and a grader would only add its own opinion.

Cost is roughly thirty calls, a few ringgit, run on demand rather than in a
loop.
