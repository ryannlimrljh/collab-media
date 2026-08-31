# Collab:Sales Planner

A build-free prototype that revamps the KULT Planning Engine's build-plan
flow into a Collabrium surface: the App Shell (sidebar nav ported from the
mothership's landing-v3/feedback-v1 pages, department switcher set to
Sales) plus a restructured 4-step campaign wizard with a persistent live
rail. The design spec, including the audit of the live app it answers,
is at `docs/superpowers/specs/2026-08-27-collabsales-planner-design.md`.

## Run it

```bash
python3 -m http.server 8794
```

Then open <http://localhost:8794/pages/campaigns.html> — the campaign
list is the landing; "New campaign" or any row opens the wizard at
`pages/planner.html`.

No build step, no framework. Each page links the design system's two
stylesheets plus this repo's `shared/shell.css`/`shell.js`.

## Layout

- `collabrium-dls/` — the full Collabrium DLS v0.9.40 (Ryan's copy:
  `tokens.css`, `components.css`, `logo.html`, `SVG/`, `logo-lockups/`,
  `DESIGN-SYSTEM.md`, `preview.html`, `fonts/`). Verified byte-identical
  to `../mothership/collabrium-dls/` for every asset the pages link.
  This is the single source of truth here — don't edit it in place.
- `shared/` — the shell's page-local CSS and behaviour (collapse,
  account menu, department switcher, hover labels), ported from
  feedback-v1, plus the landing's auto-minimise: the rail folds itself
  1.4s after load; a manual toggle before then cancels the timer.
  `shared/threads.js` is the one conversation store behind every
  assistant surface — the landing's localStorage model
  (`[{id, title, at, msgs}]`, newest first, capped at 50) plus a
  `source` naming the plan a thread came from. The planner mirrors its
  per-plan Collab AI thread into it, so Home's assistant rail lists
  plan conversations beside the ones started there.
- `pages/campaigns.html` — the Media planner landing: a "Where you left
  off" resume band, four hero stat boxes in the mothership landing's
  card recipe, a right-aligned "Create new media plan" CTA, a "Build a
  new plan" card whose fields (name, brand, budget, flight dates,
  objective) carry straight into the planner via query params, and "My
  media plans" with "All media plans →" into the full list. Nav is
  trimmed to Media planner / Planner / Feedback.
- `pages/campaign-list.html` — the full listing, one level down: back
  control, search, the DS Compact filter (funnel trigger, checkbox
  panel applied on Done, count badge, applied-pill tray, Clear all),
  DataTable, empty state, pagination.
- `pages/planner.html` — the wizard: Brief → Audience → Media mix →
  Summary. A functional stripe holds the stepper plus PDF/Excel/Save
  icon actions; the persistent right rail is tabbed — Summary (live
  plan-so-far + a checklist whose rows scroll to their field) and
  Preview (the plan as the client sees it, with the same actions).
  Budget split arrives allocated to 100%; booking modal locks the plan.
  Sample data comes from the live engine (KULT persona playbook, Astro
  site list, real format CPM behaviour).

## Known stubs

Draft persistence, Excel export, and the AI draft are simulated —
"Re-draft from brief" applies a canned recommendation. PDF export is
`window.print()` with a print stylesheet.
