# Audiences catalogue Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `pages/audiences.html`, the General › Audiences catalogue, per `docs/superpowers/specs/2026-09-08-audiences-catalogue-design.md`.

**Architecture:** Static HTML/CSS/JS, no build, same shell and patterns as `pages/formats.html`. Data lives in `shared/audiences-data.js` (a `window.AUDIENCES` array plus vocab). Drawing primitives (consumption arc, bubble packing) live in `shared/audience-marks.js` + `.css` so the planner can reuse them. The page composes: universe hero → fans-to-buyers strip → controls → cards/table → drawer → reach tray.

**Tech Stack:** Vanilla ES5-style JS (matches the repo), inline SVG, Collabrium DLS tokens/components, Phosphor icons. No libraries. Verification is visual: `python3 -m http.server 8794` and the in-app browser, plus the console must be clean.

**Source data:** `scratchpad/kult-audience.json` (51 segments scraped from kult.my/audience on 2026-09-08). Karen's personas/filters: `/Users/kwlkokho/Desktop/CollabMedia/From Karen/planner-wizard-collabrium_270826.html` lines 1140–1196 (PERSONAS) and 1358–1369 (FILTERS).

---

### Task 1: Data module and portraits

**Files:**
- Create: `shared/audiences-data.js`
- Create: `assets/audiences/<slug>.jpg` × 51
- Create (scratch): `scratchpad/build-audiences.py`

- [ ] **Step 1: Write the build script.** Parse `kult-audience.json`; for each article derive `id` (slugified name), `name`, `group` (from the heading order in `d.heads`), `lens` (Who: Ethnicity, Income group, Life stage, Business & professionals · Love: Sports, Entertainment, Trendsetter · Buying: Shopping intent), `size` (int), `desc`, `properties[{key,label,note}]` (regex `^(Prop)\s*[-–]\s*(.+)$`; keys: awani, gempak, xuan, syok, stadium, rasa, hiburan, sooka, ulagam), `consumption{video,audio,tv,podcast,social,games,communities}` (only channels present), `topics[]` (six, strip stray `<li>`), `portrait` (`../assets/audiences/<id>.jpg`), `image` (source URL). Overlay a hand-typed `KAREN` dict for the ten mapped segments (`addressable`, `fit`) and a `PAIRS` list for the five twins (`pair: {id, role:'fan'|'buyer'}`). Emit the file with a header comment naming sources and dates, then `window.AUDIENCE_LENSES`, `window.AUDIENCE_GROUPS`, `window.AUDIENCE_PROPERTIES`, `window.AUDIENCE_REFINE` (Karen's four dimensions verbatim), `window.AUDIENCE_OVERLAP = {same:0.60, cross:0.25, malaysia:16150000}`, `window.AUDIENCES`.
- [ ] **Step 2: Run it**: `python3 scratchpad/build-audiences.py` → prints `51 segments, 10 mapped, 5 pairs`.
- [ ] **Step 3: Download portraits**: `curl -sL` each `image` into `assets/audiences/<id>.jpg`, then `sips -Z 720` to cap the long edge. Verify `ls assets/audiences | wc -l` → 51 and no zero-byte files.
- [ ] **Step 4: Load check**: `node -e "global.window={};require('./shared/audiences-data.js');console.log(window.AUDIENCES.length)"` → 51.
- [ ] **Step 5: Commit** `feat(audiences): data module and portraits`.

### Task 2: Nav item on every page

**Files:** Modify `pages/campaigns.html`, `campaign-list.html`, `planner.html`, `formats.html` (the `General` sidebar section).

- [ ] **Step 1:** After the Ad formats anchor add
  `<a class="c-sidebar-item" href="audiences.html"><i class="ph-fill ph-users-three"></i><span class="label">Audiences</span><span class="c-sidebar-hover-text">Audiences</span></a>`.
- [ ] **Step 2:** `grep -c 'audiences.html' pages/*.html` → 1 each (audiences.html itself will carry `active` + `aria-current`).
- [ ] **Step 3: Commit** `Audiences joins the General section`.

### Task 3: Marks module (arc + packing)

**Files:** Create `shared/audience-marks.js`, `shared/audience-marks.css`.

- [ ] **Step 1:** `AudienceMarks.arc(el, seg, opts)` renders an SVG of up to five concentric arcs (channel order video, audio, tv, podcast, social; radius steps inward; stroke-dasharray = pct of circumference; `class="am-arc"` with `--am-i` index for stepped opacity). `opts.size` px, `opts.draw` true → arcs animate from 0 via CSS `stroke-dashoffset` when `.is-live` is set. Missing channels are skipped (not drawn as zero).
- [ ] **Step 2:** `AudienceMarks.pack(items, box)` — deterministic circle packing. `items = [{id, r}]` sorted by r desc; place first at centre, each next on a spiral until no overlap (sqrt-spaced spiral, 4° step); return `[{id, x, y, r}]` normalised so the cluster's bounding box is centred at `box.cx, box.cy` and scaled to fit `box.w × box.h`. Pure, no DOM.
- [ ] **Step 3:** `AudienceMarks.layoutUniverse(segments, lens, stage)` — groups segments by `group` (or by `lens` when lens = 'all' → group inside lens bands), computes r = k·√size where k fits the largest group into its band, packs each group, positions groups left-to-right within its lens band. Returns `{circles:[{id,x,y,r,lens,group}], labels:[{text,x,y,lens}]}`. Bands: 'all' = 3 rows (who / love / buying); single lens = 1 row with its groups spread; a segment outside the lens returns `r: 3` and `y` on the bottom edge (dot state).
- [ ] **Step 4:** Quick node test: `node -e "global.window={};require('./shared/audiences-data.js');require('./shared/audience-marks.js');var L=window.AudienceMarks.layoutUniverse(window.AUDIENCES,'all',{w:1200,h:420});console.log(L.circles.length, L.circles.every(c=>c.x>=0&&c.x<=1200&&c.y>=0&&c.y<=420))"` → `51 true`. Overlap check: no two circles in the same group closer than r1+r2−1.
- [ ] **Step 5: Commit** `feat(audiences): consumption arc and bubble packing`.

### Task 4: Page shell, controls, cards, table

**Files:** Create `pages/audiences.html` (copy `formats.html` lines 1–417 shell/head as the base; `au-` prefix instead of `fm-`; link `audience-marks.css`, `audiences-data.js`, `audience-marks.js`).

- [ ] **Step 1:** Head + sidebar with Audiences active, page header ("Audiences" / sub per spec), Reach tray button `#auTrayBtn` with count badge.
- [ ] **Step 2:** Controls: search `#auSearch`, group chips `#auChips` (8, multi-select, tag colour by lens), property pills `#auPills` (9, multi), sort `#auSort` (size-desc, size-asc, az), view switch `#auViewCards / #auViewTable`, clear-all, tray `#auFilterTray`, count `#auCount`.
- [ ] **Step 3:** `filtered()` — search over name/group/topics/properties; group AND property intersections; sort. `render()` with FLIP move + stagger like formats (copy `snapshotRects/playMove/staggerIn`).
- [ ] **Step 4:** `cardHtml(seg,i)`: portrait `<img loading="lazy">`, lens tint bar, arc host `.au-arc` (top-right), topics overlay `.au-topics` (6 tags, shown on hover/focus), body: name, group tag, size (`fmtM`), top two channels text, tray toggle button `.au-add` (`aria-pressed`). Hover/focus → `setLive(card,true)` draws arcs.
- [ ] **Step 5:** `rowHtml(seg)` table columns: Segment (portrait 28px + name), Group, Size, Addressable, Top channel, Lives on (property initials chips), Topics (first three), Tray. Row hover floats `#auRowpeek` (portrait + arc) beside the row (copy `showRowpeek/hideRowpeek`).
- [ ] **Step 6:** Empty state + skeleton first paint (4 skeleton cards, universe bones) + arrival animation classes.
- [ ] **Step 7:** Verify in browser: 51 cards, chips filter counts, table toggles, console clean. **Commit** `feat(audiences): catalogue page with cards and table`.

### Task 5: Drawer

**Files:** Modify `pages/audiences.html`.

- [ ] **Step 1:** Markup: `.au-cardmodal` scrim + `<aside class="au-drawer" role="dialog">` with crumbs, prev/next/close, `#auDrawerBody`, `#auDrawerFoot`.
- [ ] **Step 2:** `renderDrawer(seg)`: left column portrait with large arc overlay; right column: name, lens + group tags, size block ("Audience size · published by KULT"), addressable block when present ("Addressable on KULT digital" + fit note), desc, "Where they live" list (property label + note), "What they read" tags, consumption bars (five labelled `.au-bar` rows with `%`), "Also see" (pair twin first, then two same-group by size) with click → `openDrawer`. Foot: Add to reach tray, Send to a media plan (`planner.html?audiences=<id>`), and a Live page link to kult.my/audience.
- [ ] **Step 3:** `openDrawer(id, fromNav, sourceEl)` / `closeDrawer()` / `stepDrawer(dir)` (order = current filtered list), arrow keys, Esc, focus return, `?a=<id>` deep link on open (`history.replaceState`), read on load.
- [ ] **Step 4:** Verify: open from card, row, keyboard Enter; arrows step; deep link reloads into the drawer. **Commit** `feat(audiences): segment drawer`.

### Task 6: Universe hero + property chips

**Files:** Modify `pages/audiences.html`.

- [ ] **Step 1:** Markup: `<section class="au-universe">` with lens switcher `#auLens` (All · Who they are · What they love · What they're buying, `role="radiogroup"`), `<svg id="auStage" viewBox="0 0 1200 420">`, floating label `#auStageLbl`, property chips row `#auProps` (nine, hover/focus lights matching circles, shows count).
- [ ] **Step 2:** `renderUniverse(lens)`: compute layout via `AudienceMarks.layoutUniverse`, create/update `<g class="au-node" data-id>` with `<circle>` and (for r ≥ 22) a `<text>` short label; write `transform: translate(x,y)` and `r`; CSS transitions on transform/r 420ms `--ease-settle`; reduced-motion → no transition. Lens band labels as `<text class="au-band">`.
- [ ] **Step 3:** Interactions: hover/focus node → `.is-hot` on it, `.is-kin` on nodes sharing ≥1 property, `.is-dim` on the rest; label shows name + size; click → `openDrawer`. Nodes are `tabindex=0` with `role="button"` and `aria-label`. Filters: nodes not in `filtered()` get `.is-out` (r → 3, opacity .35).
- [ ] **Step 4:** Hide the section under 720px when `(hover:none)`.
- [ ] **Step 5:** Verify: lens switch re-packs smoothly, chips light, filter drops to dots. **Commit** `feat(audiences): the audience universe`.

### Task 7: Fans-to-buyers strip

- [ ] **Step 1:** `<section class="au-pairs">` eyebrow "Fans to buyers" + five `.au-pair` cards: two portraits with an arrow, names and sizes, sub "Compare the two". Click → `openDrawer(buyer)` with fan pinned first in "Also see".
- [ ] **Step 2:** Staggered arrival like the formats wall. **Commit** `feat(audiences): fans-to-buyers strip`.

### Task 8: Reach tray

- [ ] **Step 1:** Bottom bar `#auCbar` (names, raw/unique reach, Clear, Open) shown when tray non-empty; `sessionStorage['collab-audiences-tray']`; max 5 with toast.
- [ ] **Step 2:** `reach(ids, mult)`: copy Karen's algorithm (sort by size desc; each new segment discounted by max overlap vs counted: same group 0.60, else 0.25) × refine multiplier; return `{raw, uniq, pct}`.
- [ ] **Step 3:** Sheet `#auCmodal`: columns per segment (portrait, name, group, size, arc), reach maths rows (raw, overlap %, unique, after refine), four refine selects from `AUDIENCE_REFINE`, "% kept" caption, footer Send to a media plan (`planner.html?audiences=a,b`) + Export toast.
- [ ] **Step 4:** Keyboard `r` toggles tray for the focused card/node; badge on header button updates. **Commit** `feat(audiences): reach tray with overlap and refine`.

### Task 9: Polish, docs, ship

- [ ] **Step 1:** Screenshot pass at 1440 / 1024 / 375; console clean; reduced-motion check via DevTools emulation; tab through cards; Lighthouse-style contrast sanity (text on tints ≥ 4.5:1).
- [ ] **Step 2:** `HANDOVER.md`: add `audiences.html` row, the three new shared files, the assets folder, the sessionStorage key. Bump nothing (shell untouched).
- [ ] **Step 3:** Commit `Audiences: a catalogue you can see`. Push if the user asks.
