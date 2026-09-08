# Collab:Media — handover

A build-free prototype of Collabrium's media-planning product. Static HTML,
CSS and JavaScript: no framework, no build step, no server code. Open a page
in a browser and it runs.

- **Live:** <https://collab-media.vercel.app>
- **Repo:** `github.com/ryannlimrljh/collab-media` (114 commits)
- **Design system:** Collabrium DLS, vendored at `collabrium-dls/`

---

## Run it

```bash
python3 -m http.server 8794
```

Then open <http://localhost:8794/pages/campaigns.html>. Any static file server
works; the pages use relative paths only.

There is nothing to install and nothing to compile. The only build-ish step in
the whole project is the `?v=` query string on the shared CSS and JS links —
see [Gotchas](#gotchas).

---

## What is in here

### Pages (`pages/`)

| File | Route | What it is |
|---|---|---|
| `campaigns.html` | Home | Landing: rolling advisory header, "Where you left off" resume card, four At-a-glance stat tiles, recent plans, and the AI assistant dock |
| `campaign-list.html` | My media plans | Full listing: search, facet filters, sortable columns, A-Z rail, row actions |
| `planner.html` | Media planner | The four-step wizard — Brief, Audience, Media mix, Summary — with a persistent right rail and a per-plan Collab AI thread |
| `formats.html` | Ad formats (General) | The ad-format catalogue: 49 KULT units with a live sample on every card, objective/family/size/device filters, gallery and table views, a spec drawer, and a compare tray of up to four. Design note: `docs/superpowers/specs/2026-09-07-formats-catalogue-design.md` |
| `audiences.html` | Audiences (General) | The audience catalogue in two tabs. Universe: 51 KULT segments as flat discs filling a pan-and-zoom canvas, by group or by size, colour deepening with audience size, drifting a little and easing away from the pointer, three lenses over eight groups. Segments: portrait cards with a consumption arc, a table, a drawer, and a reach tray of up to five with Karen's overlap rule and refine filters. Design note: `docs/superpowers/specs/2026-09-08-audiences-catalogue-design.md` |

`vercel.json` redirects `/` to `pages/campaigns.html`.

### Shared modules (`shared/`)

| File | Responsibility |
|---|---|
| `shell.js` | App shell behaviour: sidebar collapse (with the landing's auto-minimise), account menu, department switcher, brand-logo resolution |
| `shell.css` | Page-local shell rules the DLS does not ship (pinned footer, account row, narrow-screen nav, Beta pill) |
| `plan-store.js` | Saved plans. `localStorage`, capped at 50, newest first. Merges saved plans over the seeded sample |
| `threads.js` | One conversation store behind every assistant surface. Same schema as the mothership landing's, plus a `source` naming the plan a thread came from |
| `campaigns-data.js` | The seeded sample plans, plus `campaignBadge()` and `rmFmt()` |
| `formats-data.js` | The format catalogue: specs transcribed from kult.my/gallery (2026-09-07) merged with the rate card's `bestFor` / `cpm` / `inventory`. The nine standard display units are catalogue defaults, flagged `source: "catalogue"` |
| `format-previews.css` / `format-previews.js` | The live samples. `FormatPreviews.mount(el, format)` draws the miniature, `FormatPreviews.live(el, on)` plays it. Independent of the page so the planner can reuse it |
| `audiences-data.js` | The audience catalogue: 51 segments read from kult.my/audience (2026-09-08) with size, portrait, properties, consumption and topics; Karen's addressable counts and fit notes on the ten that map by name; her refine dimensions and overlap rule |
| `audience-marks.css` / `audience-marks.js` | The drawings: `AudienceMarks.arc(el, segment)` renders the consumption rings, `AudienceMarks.layoutSpace(segments, lens, stage, style)` fills the canvas with the discs by group or by size, close and never overlapping. Pure functions, no DOM in the layout, so the planner's audience step can reuse them |

### Assets (`assets/audiences/`)

The 51 segment portraits from kult.my, resized to 720px on the long edge
(6.8 MB). They are Astro group photography used inside an Astro group
product; confirm rights before the page leaves the group.

### Design system (`collabrium-dls/`)

A vendored copy of the Collabrium DLS — `tokens.css`, `components.css`,
`DESIGN-SYSTEM.md`, `SVG/`, `logo-lockups/`, `fonts/`, `preview.html`.
**Treat it as read-only here.** It is a copy, not the source of truth; changes
belong upstream and should be synced down, or the next sync overwrites them.

Open `collabrium-dls/preview.html` for the live component gallery.

---

## State: everything is in the browser

There is no backend. All persistence is `localStorage`, so it is per-browser
and per-machine — clearing site data resets the product to its seeded sample.

| Key | Holds |
|---|---|
| `collab-plans` | Saved plans (the mini database) |
| `collab-hidden-seeds` | Seeded sample rows the user deleted |
| `collab.chats` | Assistant threads, shared across Home and the planner |
| `collab-nav-collapsed` | Sidebar collapsed state, carried between pages |
| `collab-logo-cache` | Resolved brand-logo URLs |
| `collab-formats-compare` (session) | Ad formats in the compare tray |
| `collab-audiences-tray` (session) | Segments in the reach tray |
| `collab-audiences-style` (session) | Which universe arrangement was last picked |

---

## Deployment

GitHub → Vercel, connected. **Pushing to `main` deploys.** No build command,
no output directory; it is served as static files.

For a manual release without a commit:

```bash
vercel deploy --prod
```

The Vercel project is `collab-media` under `ryannlimrljhs-projects`.

### Links to the mothership

The two products point at each other, both through the department switcher:

- Mothership landing → Collab:Media, via a `data-href` on its Media option
- Collab:Media → mothership landing, via a `data-href` on its Collabrium option

If either URL changes, both ends need updating. The mothership half lives in
`mothership/pages/landing-v3.html`.

---

## Gotchas

**Cache-busting is manual.** Shared CSS and JS are linked with `?v=0.9.52`.
Edit `shared/shell.js` or `shell.css` without bumping that number and browsers
keep serving the old copy — the change simply will not appear, with no error.
Bump it in all five pages together:

```bash
sed -i '' 's/shell\.css?v=[0-9.]*/shell.css?v=0.9.53/g; s/shell\.js?v=[0-9.]*/shell.js?v=0.9.53/g' pages/*.html
```

**`ChartsGraphs/` is unreferenced.** 21 MB of vendored Chart.js source that no
page loads. It is in the repo but excluded from the handover zip. Safe to
delete once someone confirms nothing external depends on it.

**Brand-logo 404s in the console are expected.** Unknown brands fall through
to a lookup that is *designed* to 404 so an `onerror` can hide the mark. They
are not a fault.

---

## Known stubs

These look real and are not. Anything below needs a backend before it ships.

- **The AI assistant.** Replies are canned strings. The thread store, rail,
  grouping and persistence are all real; only the answers are fake.
- **Draft persistence** is `localStorage`, not a server.
- **Excel export** is not implemented. **PDF export** is `window.print()` with
  a print stylesheet.
- **Booking** locks the plan in the UI only; nothing is sent anywhere.
- **Sample data** is a cleaned snapshot of the live KULT engine's plans, not a
  feed.
- **Audience sizes** are KULT's published, audience-scale figures. Five of
  them summed pass Malaysia's population; the reach sheet says so when it
  happens. The planner's addressable counts are the number for a buy.
- **Planner hand-offs** `?format=`, `?formats=` and `?audiences=` are links
  the planner does not read yet.

---

## Where the design decisions are written down

`docs/superpowers/specs/2026-08-27-collabsales-planner-design.md` — the design
spec, including the audit of the live KULT Planning Engine that this
restructure answers (why four steps, why one persistent rail, why the
validation moved).

Commit messages carry the reasoning for individual decisions; `git log` is
worth reading before changing behaviour that looks arbitrary.

---

## Not included in the zip

Excluded deliberately, not forgotten:

- `.git/` (29 MB) — history is on GitHub
- `.env.local` — contains a live `VERCEL_OIDC_TOKEN`. Never commit or share it
- `.vercel/` — local project link (project and org IDs)
- `ChartsGraphs/` (21 MB) — unreferenced, see Gotchas
- `.DS_Store`
