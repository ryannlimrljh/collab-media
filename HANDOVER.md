# Collab:Media, a complete handover

Everything needed to run, understand, change and ship this product.
Written 12 Oct 2026 against commit `800c7fe` on branch `collab-ai-live`.

A build-free prototype of Collabrium's media planning product. Static
HTML, CSS and JavaScript, no framework and no build step, plus one
serverless function for the AI. Open a page and it runs.

- **Live:** <https://collab-media.vercel.app>
- **Repo:** `github.com/ryannlimrljh/collab-media`, 296 commits
- **Design system:** Collabrium DLS, vendored at `collabrium-dls/`

**Read §1 and §3 before you touch anything.** One says the branch that
deploys is missing half the product; the other says which numbers on
screen are real.

---

## 1. Read this first

### The deploying branch is behind

`main` and `collab-ai-live` have diverged. As of today:

- 52 commits on `collab-ai-live` that `main` does not have
- 18 commits on `main` that `collab-ai-live` does not have
- **`main` has no `shared/tv-ratecard.js` and no `api/`.** The Video
  rate card picker and the entire Collab AI endpoint are missing from it

The 18 on `main` are the nav and pods rebuild, which also exists on
`collab-ai-live` as separate commits with identical content. The 52 are
the picker, the AI endpoint, the tests and the docs.

This already caused one incident: a deploy from `main` shipped the nav
and silently blanked the picker on production. It was restored by
deploying `collab-ai-live`. **It will happen again every time someone
deploys `main`.** Merging the two is the first job for whoever picks
this up.

### What is actually real

The product looks finished. Parts of it are not, and the parts that are
not are not obvious. §3 is the full table; the short version:

- **Every rate, channel and audience figure on screen is real data**,
  transcribed from production or from KULT, except the Video per-line
  CPM and the `daypart` field, both of which this prototype invents
- **The planner's AI assistant is not connected.** The endpoint is
  built, tested and deployed, but the planner still answers from a
  local keyword engine. Only the Home page talks to the real model
- There is no backend. Everything persists to `localStorage`

---

## 2. Running it

```bash
npm install                 # only for the api/ function
npm run dev:local           # http://localhost:8797
```

`scripts/dev-server.mjs` serves the pages **and** `/api/plan` on one
port, so the prototype behaves locally exactly as it does deployed. It
needs `ANTHROPIC_API_KEY` in `.env.local`; it prints on boot whether it
found one, and without it the pages fall back to their offline engines.

A plain static server works too if you do not need the AI:

```bash
python3 -m http.server 8794   # pages only, /api/plan will 404
```

Why not `vercel dev`: it ran the function in an environment that did not
pick up `.env.local` here, so the endpoint answered `{configured:false}`
and every page quietly fell back. The alternative was uploading the key
to Vercel just to develop locally, which is a worse trade.

```bash
npm test                    # 85 tests, no network, no cost
npm run eval                # 34 live cases against the real model, costs money
```

`npm test` must be run as `node --test test/*.test.mjs`. Bare
`node --test` walks into `node_modules` and reports 643 tests with 626
failures; `node --test test/` misreads the directory. The package script
already has the right form.

### Deploying

The Vercel project is `collab-media` under `ryannlimrljhs-projects`.
No build command, no output directory, served as static files with
`api/` as a serverless function.

```bash
npx vercel --prod --yes     # deploys the working tree, not a branch
```

The CLI deploys **whatever is in your working tree**, which is how the
right thing got shipped after `main` overwrote it. The git integration
deploys `main`, which per §1 is missing half the product. Until the
branches are merged, deploy with the CLI from `collab-ai-live` and know
that any push to `main` undoes it.

`ANTHROPIC_API_KEY` is **not** set on Vercel. The endpoint therefore
reports itself unconfigured in production and the Home assistant falls
back to its canned line. Add it with `npx vercel env add
ANTHROPIC_API_KEY` when the AI should be live.

The endpoint deploys with **no authentication and no rate limit**, by an
explicit decision of 17 Sep 2026. The console's monthly cap is the only
backstop.

---

## 3. What is real, what is not

The single most important table in this document.

| On screen | Status |
|---|---|
| TV channel census: names, numbers, monthly reach, segments, line counts | **Production's own**, read from the production database 5 Oct 2026 |
| TV rate card: entitlement, timebelt, days, pricing category, 30s price | **Production's own**, same source, 176 lines across 81 buyable channels |
| TV channel logos | **Astro's own**, referenced from the public channel guide's CDN |
| Ad format specs, CPMs, inventory | **Real**, transcribed from kult.my/gallery 7 Sep 2026 plus the rate card |
| Audience segments, sizes, consumption | **Real**, from kult.my/audience 8 Sep 2026, 51 segments |
| Sample plans | A cleaned snapshot of the live KULT engine's plans, not a feed |
| Video per-line CPM | **Invented.** Directional only, see below |
| Video `daypart` | **Derived here.** Nothing upstream carries it |
| Overlap and reach model | A model, not a measurement. 60% within a category, 25% across, frequency 3.1 |
| Planner AI assistant | **A local keyword engine.** Not the model, see §6 |
| Home AI assistant | The real model, when a key is present |
| Excel export | Not implemented |
| PDF export | `window.print()` with a print stylesheet |
| Booking | Locks the plan in the UI. Nothing is sent anywhere |
| Draft persistence | `localStorage`, not a server |

**The two invented numbers, in detail.** The TV card prices a 30 second
spot, not a thousand impressions, so to keep the existing split,
forecast and booking machinery working without a special case each line
gets a CPM scaled from the old single Video CPM of 3.26 against the
card's median rate. Nothing in the picker depends on it. **Nobody should
quote it.** And `daypart` is classified from the midpoint of the
timebelt, which is coarse but survives every shape in the card: a point
in time, a belt running past midnight, a full day, and the programme
buys that name a competition instead of a clock.

**Audience sizes are not headcounts.** They are KULT's published,
audience-scale figures. Five of them summed pass Malaysia's population,
and the reach sheet says so when it happens. Only 10 of the 51 segments
carry a real addressable count; the planner uses those for a buy.

---

## 4. The map

### Pages (`pages/`)

| File | Route | What it is |
|---|---|---|
| `campaigns.html` | Home | Rolling advisory header, "Where you left off" resume card, four At-a-glance tiles, recent plans, and the AI dock. **The only page wired to the live model** |
| `campaign-list.html` | My media plans | Search, facet filters, sortable columns, A-Z rail, row actions |
| `planner.html` | Media planner | The four-step wizard and the rate card picker. 366 KB, the largest file in the repo by far |
| `formats.html` | Ad formats | The page drawn as a picture, eight ad slots on a desktop and a phone each demonstrating itself on hover, over a catalogue of 49 KULT units with live samples, filters, a spec drawer and a compare tray. Deep links `?slot=`, `?f=` |
| `audiences.html` | Audiences | Two tabs. Universe: 51 segments as discs in a jar, stirred by the pointer. Segments: cards with a drawn illustration that animates on hover, a table, a drawer, and a reach tray of up to five |
| `planner-v1.html` | Archive | The planner before the v2 composer rebuild. Linked from the pods menu |
| `formats-original.html` | Archive | Ad formats as of `5639207`, before the placement picture. Loads frozen copies of three shared files from `shared/archive/2026-09-08/` |

`vercel.json` redirects `/` to `pages/campaigns.html`.

### Shared modules (`shared/`)

| File | Responsibility |
|---|---|
| `pods.js` | The pods map, the tray of marks under the logo plus this pod's own two-shelf menu. **Three identical copies exist, one per repository, and they must stay identical.** The whole point is that no app can disagree about what the others contain |
| `shell.js` / `shell.css` | App shell: sidebar collapse, account menu, department switcher, brand-logo resolution |
| `plan-store.js` | Saved plans. `localStorage`, capped at 50, newest first, merged over the seeded sample |
| `threads.js` | One conversation store behind every assistant surface, plus a `source` naming the plan a thread came from |
| `campaigns-data.js` | Seeded sample plans, `campaignBadge()`, `rmFmt()` |
| `formats-data.js` | 49 ad formats, plus `FORMAT_PLACEMENTS` and the derived `placements` / `home` slots |
| `format-previews.css` / `.js` | The live samples. `FormatPreviews.mount(el, f)`, `.live(el, on)`. Independent of the page so the planner reuses them |
| `audiences-data.js` | 51 segments with size, portrait, consumption, topics, Karen's addressable counts and overlap rule |
| `audience-marks.css` / `.js` | The jar physics. Pure functions, no DOM in the layout, so the planner's audience step reuses them |
| `tv-ratecard.js` | The Video rate card. 86 channels, 176 lines. See §5 |
| `collab-ai.js` | The browser half of the AI: action validator and transport. **Loaded by two pages, called by neither.** See §6 |

### The endpoint (`api/`) and its tests

| File | Responsibility |
|---|---|
| `_schema.mjs` | The contract, written twice on purpose: a zod `Envelope` for runtime, and a hand-written `ENVELOPE_JSON_SCHEMA` for the API |
| `_prompt.mjs` | `buildSystem(cat, surface)`. Reads its field names out of the schema so they cannot drift |
| `plan.mjs` | The only thing holding the key. Two modes, caps, transient retry |
| `test/*.test.mjs` | 85 tests, no network |
| `test/behaviour-eval.mjs` | 34 live cases. Deliberately not `*.test.mjs` so `npm test` never spends money |

### Assets and the design system

`assets/stills-web/` holds the 700px segment illustrations the page
loads and `assets/clips-web/` the 600px silent hover clips. The 2400px
and 1112px masters (149 MB and 87 MB) are gitignored. Regenerate with
the `sips` and `ffmpeg` commands in §9.

`collabrium-dls/` is a **vendored copy, read-only here.** Changes belong
upstream or the next sync overwrites them. Open
`collabrium-dls/preview.html` for the live component gallery.

**The styling rule for this repo: DLS components and tokens only.** If
something needs a colour, a radius or a spacing, it comes from
`tokens.css`. The one deliberate exception in the whole codebase is the
4px radius on the channel logo tile, because the DLS radius scale starts
at 12px and that is almost a pill on a 28px tile. It is commented where
it happens.

---

## 5. The Video rate card picker

The largest piece of recent work. Two documents go deeper:
[`docs/VIDEO-RATE-CARD-PICKER.md`](docs/VIDEO-RATE-CARD-PICKER.md) for
how it works and what to swap, and
[`docs/HANDOVER-2026-10-05-video-mix.md`](docs/HANDOVER-2026-10-05-video-mix.md)
for why each decision was made. The source data is kept verbatim at
[`docs/RUNS_ON_CHIPS.md`](docs/RUNS_ON_CHIPS.md).

**The problem it solves.** Video is not a format, it is a rate card.
Every row is four fields, `channel · entitlement · timebelt · rate per
30s`, and there are 176. They were rendered as chips, which is right for
a short label like "Leaderboard" and wrong for a four-field record:
nothing aligns, so the rate sits somewhere different on every row; the
text that repeats is the loudest thing on screen; and there is no way to
search it. Production still renders it this way, and the result is a 70
second scroll.

**The shape of the fix.** Four fields get four columns, in a DLS
`c-table`. The channel is printed once per group, with its logo, reach
and line count, instead of once per line. The rate is right aligned with
tabular numerals. A search box matches every field and requires every
term to land, so `ria prime` narrows to 10 of 176. Two facets, daypart
and segment. Browsing moved into a panel that folds out of its button.

**Three things not to undo.**

1. **The picker turns on from the shape of the data, not a row count.**
   `isCardChannel()` asks whether a channel's formats carry a `line`
   object. Nothing is hardcoded to "Video"
2. **Checkboxes carry `force-visible`.** The DLS table reveals them on
   hover because selection is usually secondary. Here it is the point
3. **Ticking a box repaints that row, not the table.** Rebuilding all
   257 rows drops the checkbox the keyboard is sitting on

**The data contract.** One row per buyable line:
`{ id, ch, ent, belt, days, cat, rate, daypart }`, where `ch` is the
**channel number**. Join on the number, never the name: Zee Cinema (251)
and Z Cinema (117), Astro Tutor TV (601) and Tutor TV (603) are each two
numbers for one brand and collide if keyed by name.

Source oddities are preserved on purpose, because tidying them would
hide a data problem: Astro Ceria's timebelt of `d`, Astro Prima's
`12pm - 12pm`, channel 550 whose name is a whole sentence.

**It is a transcription with a date on it, not a feed.** It goes stale
the moment Sales re-syncs. Point it at the real endpoint rather than
re-transcribing.

---

## 6. Collab AI: built, tested, and half connected

**Be precise about this, because the UI is not.** The endpoint is real,
deployed and covered by 85 tests. Only one page calls it.

| Surface | What answers it |
|---|---|
| Home (`campaigns.html`) | `fetch('/api/plan')` with `surface: 'library'`, the real model, falling back to a canned line when the call fails or no key is configured |
| Planner (`planner.html`) | `handleBrief()` and `handleAsk()`, a **local keyword engine**. The model is never called |

The planner loads `shared/collab-ai.js` and defines `aiCatalogue()` and
`aiSnapshot()`, and **none of the three is ever called.** They are
finished parts waiting to be wired. `shared/collab-ai-apply.js`, which
would turn returned actions into plan changes, was never written. The
remaining work is tasks 8 to 12 of
[`docs/superpowers/plans/2026-09-17-collab-ai-live.md`](docs/superpowers/plans/2026-09-17-collab-ai-live.md).

### How it is meant to work

The model returns an envelope of `say`, `why` and `actions`, where an
action is one of thirteen operations: `set_fields`, `set_mode`,
`set_personas`, `set_refiners`, `set_notes`, `channels_on`,
`channels_off`, `add_formats`, `remove_formats`, `set_split`,
`pin_sites`, `go_to_step`, `confirm_booking`.

**Three layers of defence, each assuming the one above failed.** The API
enforces the operation vocabulary through a JSON schema; zod enforces
the payload of each operation at the edge; the browser checks every id
against the catalogue before applying anything. `validate()` has an
explicit branch per operation so the default fails closed, and its
lookup tables are built with `Object.create(null)` so `__proto__` and
`constructor` cannot be smuggled in as ids.

### Five API constraints, none of them documented

Found by testing. Breaking any of them fails at request time, not in
review.

1. `additionalProperties` must be the literal `false`
2. At most **24 optional properties** per schema. This is why all eleven
   campaign fields are required-and-nullable, which in turn is why the
   zod side must be `.nullable().optional()` and not just `.optional()`
3. `enum` **is** enforced. Asked for `delete_everything`, the model
   returned a legal value instead
4. No `minimum` or `maximum` on an integer. `go_to_step` keeps its 1..4
   bound in zod only
5. `enum` cannot sit beside a nullable type array. Use `anyOf`

**And one from the tooling:** `zodOutputFormat` demotes constraints to
description text, so a schema generated from zod reaches the API with no
native `const` or `enum` at all and `op` arrives as a bare string. That
is why `ENVELOPE_JSON_SCHEMA` is hand-written, with a drift test holding
the two halves together.

### The prompt

`buildSystem()` reads its field names out of the schema, because an
earlier version taught the model `product`, `languages`, `geography`
while the schema declared `prod`, `langs`, `geo` with
`additionalProperties:false`, so every action it wrote was rejected.

Its rules: facts are caged and thinking is free; **a question beginning
"what if" is still a question**, stated twice because a wrongly applied
hypothetical costs the planner their afternoon and there is no undo;
speak names but act in ids; return absolute ringgit, never percentages;
refuse honestly, so "save this" says it cannot rather than pretending.
Out-of-scope asks get one dry line and a pointer back.

Video travels as its own grouped card rather than as 176 formats,
because flat it was 24 KB, four fifths of the whole catalogue and over
the cap, which would have returned `400 catalogue did not parse` on
every call. Grouped it is 16.4 KB and the cap is 40 KB.

**If you add a field to a rate card line, print the rendered prompt and
read it.** Inserting `days` once shifted the column indices and the
model was being told `RM Mon - Sun /30s`.

### Operational notes

Model `claude-opus-5`, `client.beta.messages.create` with server-side
fallback, adaptive thinking, `cache_control: ephemeral` on the system
block. Caps: 2048 out, 16 turns, 4000 per message, 8000 brief, 12000
plan, 40000 catalogue. An intermittent, undocumented
`400 "Invalid request data"` affects roughly 3% of calls and is retried
twice on that exact signature only, never on anything else.

The behaviour eval scores 33 to 34 of 34. Run it with `npm run eval`; it
costs a few ringgit.

---

## 7. The planner, step by step

`pages/planner.html` is a four-step wizard with a persistent right rail
that recalculates on every change.

**1. Brief.** A composer that takes a messy pasted brief and fills the
form, or the fields filled by hand. Campaign name, brand, product,
dates, working media budget, objective, KPI, target, languages, and an
optional context block. The checker gates progress and says what is
missing.

**2. Audience.** Personas or mass. Up to five segments, chosen as chips
that pull against the audience universe bar, with hover peeks, refine
filters, and a computed unique reach that applies the overlap rule.

**3. Media mix.** Channel-first: five channel tiles switch a channel in
or out, each opening a block holding what is in the mix, a way to add
more, and the sites it runs on. Every format in the mix carries a live
budget slider; what you leave unspent shows as unallocated and blocks
Next until it closes. Video uses the rate card picker of §5. Audio and
Video have no site pool, so they have no "Runs on" row.

**4. Summary.** The whole plan, a budget-by-format bar, the reasoning
ledger explaining what was read and which rule applied, and booking.

Supporting behaviour worth knowing: numbers are grouped with commas
everywhere including inside input fields; the right rail animates value
changes rather than snapping; every motion path has a reduced-motion and
a `document.hidden` instant equivalent, in 46 places, specified in
[`docs/ANIMATION-SPEC.md`](docs/ANIMATION-SPEC.md).

---

## 8. State: everything is in the browser

No backend. All persistence is `localStorage`, per-browser and
per-machine; clearing site data resets to the seeded sample.

| Key | Holds |
|---|---|
| `collab-plans` | Saved plans, the mini database |
| `collab-hidden-seeds` | Seeded rows the user deleted |
| `collab.chats` | Assistant threads, shared across Home and the planner |
| `collab-nav-collapsed` | Sidebar state, carried between pages |
| `collab-logo-cache` | Resolved brand-logo URLs |
| `collab-formats-compare` (session) | Ad formats in the compare tray |
| `collab-audiences-tray` (session) | Segments in the reach tray |

---

## 9. Gotchas

**Cache-busting is manual.** Shared CSS and JS are linked with `?v=`.
Edit a shared file without bumping it and browsers keep serving the old
copy, with no error and no symptom except that your change is not there.

```bash
sed -i '' 's/shell\.css?v=[0-9.]*/shell.css?v=0.9.53/g; s/shell\.js?v=[0-9.]*/shell.js?v=0.9.53/g' pages/*.html
```

**`pods.js` has three copies, one per repository**, and they must stay
identical. Change it here and the other two disagree about what this pod
contains.

**Brand-logo 404s in the console are expected.** Unknown brands fall
through to a lookup *designed* to 404 so an `onerror` can hide the mark.

**Channel logos are referenced, not vendored.** They load from Astro's
CDN. If Astro moves it they break, and the picker swaps each failed
image for its monogram so the list degrades rather than going blank.

**`ChartsGraphs/` is dead weight.** 1,758 of the repo's 2,009 tracked
files, about 21 MB, a full vendored copy of the Chart.js source
including its test fixtures. **Nothing references it** and no page calls
`new Chart()`; the charts in this product are hand-rolled SVG and CSS.
Deleting it would cut the repo by seven eighths of its file count. Left
in place pending your decision.

**Regenerating the audience media:**

```bash
for f in assets/stills/*.png; do sips -Z 700 -s format jpeg -s formatOptions 88 "$f" --out "assets/stills-web/$(basename "$f" .png).jpg"; done
for f in assets/clips/*.mp4; do ffmpeg -y -i "$f" -an -vf scale=600:450:flags=lanczos -c:v libx264 -crf 30 -preset veryslow -tune animation -pix_fmt yuv420p -movflags +faststart "assets/clips-web/$(basename "$f" .mp4).mp4"; done
```

`-tune animation` is the setting that matters, worth 29% over the same
CRF without it, because these are flat colour with hard edges.
Re-encoding in place does not change filenames, so bump the `?v=` on the
clip `src` or returning visitors keep the heavier copies.

**Never commit `.env.local`.** It holds a live key and a
`VERCEL_OIDC_TOKEN`. It is gitignored by `.env*`.

---

## 10. What is left

In the order someone picking this up should do it.

1. **Merge `main` and `collab-ai-live`.** Until this is done the picker
   and the AI vanish from production every time anyone pushes `main`
2. **Decide on `ChartsGraphs/`.** One command, seven eighths of the repo
3. **Finish wiring the planner's AI**, tasks 8 to 12 of the plan:
   write `shared/collab-ai-apply.js`, route the composer, route the
   thread, put the model's reasoning into the why cards, verify
4. **Set `ANTHROPIC_API_KEY` on Vercel** when the AI should be live
5. **Point the rate card at a real feed** rather than the transcription,
   and replace the invented CPM and derived daypart
6. **Drop production's own 86 "Runs on" chips** on the same grounds the
   prototype's were dropped: they are labels, they repeat what the group
   headers now carry, and they are the second half of the long scroll

Smaller, known, and deliberately not done: the budget-by-format bar
draws one segment per format and would turn to slivers at fifty-odd
lines; sorting the picker by rate drops the channel grouping by design;
`?format=`, `?formats=` and `?audiences=` are hand-off links the planner
does not read yet.

---

## 11. Where the reasoning is written down

| Document | Covers |
|---|---|
| [`docs/VIDEO-RATE-CARD-PICKER.md`](docs/VIDEO-RATE-CARD-PICKER.md) | The picker: how it works, the data contract, what to swap |
| [`docs/HANDOVER-2026-10-05-video-mix.md`](docs/HANDOVER-2026-10-05-video-mix.md) | The picker round: every decision and why |
| [`docs/RUNS_ON_CHIPS.md`](docs/RUNS_ON_CHIPS.md) | The production rate card data, verbatim |
| [`docs/handover-audiences-and-ad-formats.md`](docs/handover-audiences-and-ad-formats.md) | Audiences and Ad formats: UX, interaction, design execution |
| [`docs/ANIMATION-SPEC.md`](docs/ANIMATION-SPEC.md) | Every motion in the product, and its reduced-motion equivalent |
| `docs/superpowers/specs/2026-08-27-collabsales-planner-design.md` | Why the planner is four steps, with the audit of the live KULT engine it answers |
| `docs/superpowers/specs/2026-09-17-collab-ai-live-design.md` | The AI design: envelope, actions, three-layer defence |
| `docs/superpowers/specs/2026-09-17-assistant-behaviours.md` | The ten things a media planner actually asks, role-played |
| `docs/superpowers/plans/2026-09-17-collab-ai-live.md` | The twelve-task plan. Tasks 8 to 12 are outstanding |

**Read the commit messages.** They carry the reasoning for individual
decisions, and `git log` is worth an hour before changing behaviour that
looks arbitrary. Most of what looks like a quirk in this codebase is a
bug someone already found.
