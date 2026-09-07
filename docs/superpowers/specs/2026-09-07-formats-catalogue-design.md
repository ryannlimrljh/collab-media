# Formats catalogue — design

**Date:** 2026-09-07 · **Surface:** Collab:Media · **Route:** `pages/formats.html` (nav: General › Formats)

## What it is

A catalogue of every ad unit KULT can run, built for the media planner who has to pick between forty of them. It replaces the flat list Karen's planner wizard carried under its Formats nav item with a gallery where every card shows the unit *doing its thing*, and the spec arrives over the sample instead of beside it.

Reference points: Karen's `planner-wizard-collabrium_270826.html` (the catalogue data and the nav placement) and kult.my/gallery (the highlight strip, the objective filters, the per-format spec fields).

## What was asked for, and what was added

Asked for:

- A new nav section **General › Formats** on every Collab:Media page.
- A catalogue of formats with examples, use cases, dimensions.
- Hovering a format plays an interactive sample with a micro-animation, and shows its details.

Added on top:

1. **Recently live strip.** KULT's five gallery highlights (Marigold, Eucerin, TNB, Peel Fresh, KFC) as brand cards. Brand marks resolve through the shell's existing logo chain; the sample is the format they ran on. Click jumps to that format.
2. **Objective chips that mirror kult.my's own filter vocabulary** (Awareness, Consideration, Conversion, Lead gen, Gamification, Video, High impact) plus facet pills for Family, Size and Device. A size filter answers the real planner question: "what can I run in the 300×250 slot I already have?"
3. **Gallery ⇄ table.** The same list as columns (family, objective, funnel, sizes, devices, benchmark, CPM, inventory). Hovering a row floats its live sample beside the table, so the list view keeps the gallery's promise.
4. **Detail drawer** with sizes drawn to scale against each other, a benchmark meter, industries the unit has run for, CPM and inventory where the rate card has them, "Also consider" (three related units, live on hover), previous/next with arrow keys, deep link (`?f=spin-wheel`), and a Replay button.
5. **Compare tray.** Up to four formats, kept for the tab session. Opens a side-by-side sheet with live samples and the highest published CTR highlighted. Export PDF/Excel are placeholder actions (toast) — kult.my has the same "download list, max 5 specs" idea, so this is the seam for it.
6. **Send to a media plan.** The drawer and the compare sheet link into `planner.html?format=…` / `?formats=a,b`. The planner does not read the parameter yet; that is the next build.
7. **Touch and keyboard parity.** On touch the first tap plays, the second opens. Cards are focusable; focus plays the sample, Enter opens, `c` toggles compare. Reduced-motion users get the end state of every sample instead of the animation.

## Structure

```
pages/formats.html            the page: shell, controls, gallery, table, drawer, compare
shared/formats-data.js        49 formats (40 KULT gallery units + 9 standard display units)
shared/format-previews.css    the miniatures: faux page/phone, one engine per preview key
shared/format-previews.js     FormatPreviews.mount(el, format) / .live(el, on)
```

The preview module is independent of the page so the planner's media-mix step can later show a sample next to each ticked format.

### Data

Specs (objective, sizes, devices, industries, benchmark, tagline, description, demo URL, funnel tags) were transcribed from each format's page on kult.my/gallery on 2026-09-07. `bestFor`, `cpm` and `inventory` come from Karen's rate-card catalogue and are `null` when nothing is on file. The nine standard display units have no gallery page; their copy and sizes are catalogue defaults flagged `source: "catalogue"` and the drawer says so.

Families are a curation, not a KULT field: Interactive, Gamification, Video, Social, High impact, Display. Each maps to an element colour for its tag and for the sample's "brand" tint (Interactive → Water, Gamification → Fire, Video → Wood, Social → Earth, High impact → Gold, Display → neutral).

### Samples

Every stage is a faux desktop page or phone with the unit where it really sits. Animations are gated on `.is-live`, so forty stages at rest cost nothing. Sizes are `em`-based off a 10px stage, so the same markup renders at card (10px), drawer (14px), thumbnail (6px) and compare (9px) sizes. Two samples need real numbers and get a JS ticker: the countdown ticks, the calculator counts up.

38 distinct engines cover the 49 formats (standard display units share one engine that draws the unit at its real proportion).

## Not in this build

- Planner does not yet consume `?format=` / `?formats=`.
- Export PDF/Excel is a toast.
- No thumbnails or video from kult.my are embedded; the "Live demo" links open the real page in a new tab.
- Standard display unit specs need a rate-card check before they are quoted.
