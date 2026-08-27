# Collab:Sales Planner — design spec

2026-08-27. Approved by Ryan in session before build. Restructure approach,
4-step wizard.

## What this is

A static HTML prototype that revamps the KULT Planning Engine's
`/build-plan` flow (live at kult-planning-engine-production-945a.up.railway.app)
into a Collabrium-system surface branded **Collab:Sales**. Scope: the app
shell plus the build-plan wizard, with a Campaigns list as the shell's
landing page. It is a design deliverable for the dev team, not a rebuild of
the production codebase.

## Audit findings this design answers

1. The live wizard claims 3 steps but step 2 stacks seven jobs (platforms,
   demographic filters, personas, a brands table, budget allocation, site
   accordions, buying preferences, content performance, formats) into one
   scroll. → One decision type per screen, 4 steps.
2. Three floating overlays collide (validation toast bottom-left, Save
   Draft pill bottom-right, plan-progress bottom bar). → One persistent
   right rail; no floating chrome.
3. Validation is detached from fields and Next silently bounces to top.
   → "Before you continue" checklist rows in the rail that scroll to their
   field; Next never silently rejects.
4. No live picture of the plan. → The rail's top card shows reach, budget
   and forecast, updating on every input.
5. Polish bugs ("+100% Loading", green "RM 0", raw enums like
   `Automotive_ice`, 42 sites dumped as rows). → Formatted values
   (`RM 100,000`), humanised labels, sites as grouped chips.
6. 5 workspace + 14 admin nav items always visible. → Planner nav of six
   items; admin behind one entry.

## Foundation

- `dls/` is a copy of the mothership DLS v0.9.40 (`tokens.css`,
  `components.css`, `logo.html`, `SVG/`, `logo-lockups/`), taken 2026-08-27.
  Component markup uses that file's real classes; page-local CSS is
  prefixed (`p-` planner, `cl-` campaigns) and composes tokens only.
- The shell is the App Shell spec as implemented by the mothership's
  landing-v3/feedback-v1: warm canvas on `.c-shell`, sidebar-only chrome,
  16px-inset 240px `.c-sidebar` collapsing to 72px, page header as the top
  of every screen. `shared/shell.css` + `shared/shell.js` port that
  implementation; one deliberate departure — no auto-minimise timer (a
  planner keeps its rail open; a form that folds its own nav reads as a
  glitch).
- Department switcher defaults to **Sales** (`collabSales.svg` lockup;
  gold.svg collapsed icon, matching the mothership's own Sales mapping).
- Account row: Sarah Tan · Sales Planner (the live app's demo planner).

## Pages

### pages/campaigns.html — the landing

Page header "Campaigns" + single Primary "New campaign". Filter chips
(All / Drafts / Booked / Completed / AI drafted) with live counts, a
search input, and a DataTable: campaign + brand, status Badge, industry
(humanised), budget, duration, updated, one action per row (Continue /
View → planner.html). Data is a cleaned sample of the live app's real
campaign list.

### pages/planner.html — the wizard

Horizontal `.c-stepper` under the page header: Brief → Audience →
Media mix → Summary. Completed steps are clickable. A "Saved · just now"
caption sits by the stepper (draft autosave is simulated).

Every step is `.c-shell-grid`: span-3 content, span-1 sticky rail. The
rail always holds two cards — **the plan so far** (unique reach, budget
allocated, forecast impressions/blended CPM, live) and **before you
continue** (validation checklist; each row scrolls to its field; Next is
enabled but re-runs the checklist and focuses the first failing row
rather than silently bouncing). Footer row: Back (Secondary) / Next
(Primary).

- **Step 1 Brief** — "The ask": name, advertiser brand, product, dates,
  budget (RM), objective, primary KPI + target + unit, languages
  (checkbox row). Collapsed drawer "Context for the AI": product
  benefits, challenges, task, key message, measure of success, remarks,
  account executive. Prefilled with the Astro 30 demo campaign.
- **Step 2 Audience** — targeting basis (Personas vs Mass 16.15M) as
  choice tiles; searchable persona picker (chips + panel, max 5, KULT
  playbook names, same-category 60% / cross 25% overlap discount);
  refine selects (race, generation, income, geography — live app's
  multipliers); intent/exclusions free text. Evidence drawer "Why these
  personas?": top Astro properties ranked by 90-day impressions and the
  real content-performance table, both from the live app's data.
- **Step 3 Media mix** — channels (checkbox row filtering downstream) →
  formats (rows carrying real CPMs; each toggles) → sites drawer
  (grouped OTT/Web/Social from the real Astro list; pin = must-buy) →
  budget split sliders arriving allocated to 100% of the brief's budget,
  with a Reset-to-recommendation ghost button and unallocated as a
  validation state. "Draft from brief" fills all of it from the AI
  recommendation (replaces the live app's parallel AI panel).
- **Step 4 Summary** — decisions table (value + source: you / AI draft /
  brief), budget-by-format table with per-format impressions, pinned
  sites as grouped chips, final forecast in the rail, readiness checks.
  Actions: Save draft, Export PDF, Export Excel (Secondary) and Book
  (Primary) → confirm modal → Booked banner + locked state.

## Non-goals

Admin screens, the AI chat wizard, Home dashboard, real persistence or
API calls, the production React codebase. Copy follows the Collabrium
voice rules; all values are tokens.
