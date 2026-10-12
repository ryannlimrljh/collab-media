# Collab:Media, the whole thing

Everything built for Collab:Media, as of 12 Oct 2026, commit `1a9004f`.
This file is the index. Read it first; it is short.

---

## In 60 seconds

```bash
npm install
npm run dev:local        # http://localhost:8797
```

No build step. The pages are hand-written HTML, CSS and JavaScript with
no framework. `npm run dev:local` serves them **and** the one serverless
function on a single port, so it behaves exactly as it does deployed.
Without an `ANTHROPIC_API_KEY` in `.env.local` it still runs; the AI
surfaces fall back to their offline engines and say so on boot.

A plain static server works if you do not need the AI:
`python3 -m http.server 8794`, then `/pages/campaigns.html`.

Live: <https://collab-media.vercel.app>

---

## Two things to know before you read anything else

**1. The branch that deploys is missing half the product.** `main` has no
`shared/tv-ratecard.js` and no `api/`. Deploying it blanks the Video
rate card picker and the AI endpoint, and has already done so once.
Merging `main` and `collab-ai-live` is job one. Full detail in
`HANDOVER.md` §1.

**2. Not everything that looks real is.** Most numbers on screen are
production's own, but the Video per-line CPM and the `daypart` field are
invented by this prototype, and the planner's AI assistant is a local
keyword engine rather than the model. The table in `HANDOVER.md` §3 is
the authority. **Read it before quoting any figure to anyone.**

---

## Reading order

| # | Read | For |
|---|---|---|
| 1 | `HANDOVER.md` | The whole product: architecture, every file, what is real, deployment, gotchas, what is left. **Start here.** |
| 2 | `docs/ANIMATION-SPEC.md` | Design, interaction and motion. Every micro-animation with the exact shipped values. The design half of the handover |
| 3 | `docs/VIDEO-RATE-CARD-PICKER.md` | The rate card picker: how it works and the data contract to match |
| 4 | `docs/HANDOVER-2026-10-05-video-mix.md` | Why the picker is built the way it is, decision by decision |
| 5 | `docs/handover-audiences-and-ad-formats.md` | Audiences and Ad formats: UX, interaction, design execution |
| 6 | `collabrium-dls/preview.html` | The design system, as a live gallery. Open it in a browser |

Then, when you need the reasoning behind a particular decision:

| Read | For |
|---|---|
| `docs/superpowers/specs/2026-08-27-collabsales-planner-design.md` | Why the planner is four steps, with the audit of the live KULT engine it answers |
| `docs/superpowers/specs/2026-09-07-formats-catalogue-design.md` | The Ad formats page |
| `docs/superpowers/specs/2026-09-08-audiences-catalogue-design.md` | The Audiences page |
| `docs/superpowers/specs/2026-09-17-collab-ai-live-design.md` | The AI: envelope, thirteen actions, three-layer defence |
| `docs/superpowers/specs/2026-09-17-assistant-behaviours.md` | The ten things a media planner actually asks, role-played |
| `docs/superpowers/plans/2026-09-17-collab-ai-live.md` | The twelve-task AI plan. Tasks 8 to 12 are outstanding |
| `docs/RUNS_ON_CHIPS.md` | The production rate card data this prototype transcribes, verbatim |

**And read the commit messages.** `git log` carries the reasoning for
individual decisions. Most of what looks like a quirk is a bug someone
already found.

---

## What is in the box

| Folder | What |
|---|---|
| `pages/` | 7 pages, hand-written. `planner.html` is 7,051 lines and is the product |
| `shared/` | 17 modules: the shell, the pods map, the data catalogues, the live format samples, the jar physics, the rate card, the AI client |
| `api/` | The serverless function: schema, prompt, handler. The only thing that holds the key |
| `test/` | 85 tests (`npm test`, free) and a 34-case live behaviour eval (`npm run eval`, costs money) |
| `collabrium-dls/` | The design system, vendored. **Read-only here**; changes belong upstream |
| `assets/` | The audience illustrations and hover clips the pages load |
| `docs/` | Everything above |

**Three datasets are transcriptions and cannot be re-derived:** the TV
rate card (86 channels, 176 priced lines), the audience catalogue (51
segments), and the ad format catalogue (49 units).

---

## Deliberately not included

- **`.env.local`** holds a live API key. Never commit or share it. Create
  your own with `ANTHROPIC_API_KEY=...`
- **`ChartsGraphs/`** is a full vendored copy of the Chart.js source,
  1,758 files and about 21 MB. **Nothing references it** and no page
  calls `new Chart()`; every chart here is hand-rolled SVG and CSS. Left
  out to keep this legible. Ask if you want it
- **`.git/`**, `node_modules/`, and the 2400px illustration and 1112px
  clip masters (236 MB), which are gitignored. The web-sized copies the
  pages actually load are included
