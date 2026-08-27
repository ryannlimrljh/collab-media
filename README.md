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

- `dls/` — a copy of the mothership DLS v0.9.40 (`tokens.css`,
  `components.css`, `logo.html`, `SVG/`, `logo-lockups/`), taken
  2026-08-27 from `../mothership/collabrium-dls/`. Re-sync from there if
  the system moves; don't edit here.
- `shared/` — the shell's page-local CSS and behaviour (collapse,
  account menu, department switcher, hover labels), ported from
  feedback-v1. One deliberate departure: no auto-minimise timer.
- `pages/campaigns.html` — campaign list: status chips with live counts,
  search, DataTable, empty state, pagination.
- `pages/planner.html` — the wizard: Brief → Audience → Media mix →
  Summary. Live rail (reach/budget/forecast + a checklist whose rows
  scroll to their field), evidence drawers, budget split that arrives
  allocated to 100%, booking modal with a locked booked state. Sample
  data comes from the live engine (KULT persona playbook, Astro site
  list, real format CPM behaviour).

## Known stubs

Draft persistence, Excel export, and the AI draft are simulated —
"Re-draft from brief" applies a canned recommendation. PDF export is
`window.print()` with a print stylesheet.
