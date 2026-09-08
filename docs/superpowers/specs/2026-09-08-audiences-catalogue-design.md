# Audiences catalogue — design

**Date:** 2026-09-08 · **Surface:** Collab:Media · **Route:** `pages/audiences.html` (nav: General › Audiences)

## What it is

A catalogue of every audience segment Collabrium Digitals sells, built so a
planner can *see* the audience landscape rather than read it. It is the
sibling of the Ad formats catalogue: same shell, same chip filters, same
drawer, same tray-to-planner hand-off. Where the formats page opens with
units playing their own samples, this page opens with the audience universe:
every segment as a bubble, sized by audience, clustered by what it has in
common with its neighbours.

Reference points: kult.my/audience (the 51 segments, their sizes, portraits,
properties, consumption and topics, read on 2026-09-08) and Karen's
`planner-wizard-collabrium_270826.html` (the nav placement, the four
demographic refine dimensions, the overlap rule, and 14 addressable persona
counts).

## Decisions taken

1. **Audience size is kult.my's published figure.** It is the number sales
   quote and it covers all 51 segments. Karen's addressable counts are a
   second, smaller figure ("addressable on KULT digital") shown only where a
   kult segment maps unambiguously to one of her personas. The drawer says
   which is which; nothing on the page adds the two together.
2. **Three lenses over eight groups.** kult's eight groups stay as the
   filter vocabulary. Above them sit three lenses that give the universe its
   colour and its first-level clustering:

   | Lens | Groups | Segments | Element |
   |---|---|---|---|
   | Who they are | Ethnicity, Income group, Life stage, Business & professionals | 23 | Earth |
   | What they love | Sports, Entertainment, Trendsetter | 21 | Water |
   | What they're buying | Shopping intent | 7 | Fire |

   The intent lens is the "groups by intent" view: a planner switching to it
   sees the seven in-market segments alone.
3. **No geographic map.** Neither source has per-segment geography. Karen's
   regional split applies uniformly to every segment, so it lives as a refine
   filter in the reach tray, not as a view.
4. **No platform filter.** kult offers Digital / Astro Go but publishes no
   per-segment mapping. Left out rather than guessed.
5. **Portraits are kult's.** The 51 segment photos are downloaded into
   `assets/audiences/` (resized, ~600px wide) rather than hotlinked. They are
   Astro group assets used inside an Astro group product; confirm before the
   page leaves the group.

## Structure

```
pages/audiences.html          the page: shell, hero universe, strip, controls, cards, table, drawer, tray
shared/audiences-data.js      51 segments + lens/group vocab + Karen's refine dimensions and overlap rule
shared/audience-marks.css     the consumption arc and the bubble styles, shared by cards, drawer, tray
shared/audience-marks.js      AudienceMarks.arc(el, segment) / .bubbleLayout(segments, lens) — pure functions
assets/audiences/*.jpg        portraits
```

The marks module is separate from the page for the same reason the format
previews are: the planner's audience step can later draw the same arc next
to each chosen persona.

### Data

Per segment:

| Field | Source | Notes |
|---|---|---|
| `id`, `name`, `group`, `lens` | kult / curation | slug is the deep-link key (`?a=epl-fans`) |
| `size` | kult "Audience Size" | integer |
| `desc` | kult | one sentence |
| `properties[]` | kult "Where they spend their time" | property key plus what they consume there |
| `consumption{}` | kult "Media Consumption" | up to five of: video, audio, tv, podcast, social, games, communities. Missing channels are missing, not zero |
| `topics[]` | kult "Top Content Consumption" | six strings |
| `portrait` | kult | local path |
| `addressable`, `fit` | Karen | only on mapped segments, else `null` |

Karen-to-kult mapping, kept to the unambiguous names: Comedy Fans ↔ Comedy
lover, Animation Fans ↔ Animation, Action & Adventure Fans ↔ Action &
adventure, Badminton Fans ↔ Badminton, Automotive Fans ↔ Automotive
enthusiasts, Automotive Buyers ↔ Automotive intent, Wellness Explorers ↔
Active lifestyle seekers, Adventure Seekers ↔ Adventure enthusiasts, Foodies ↔
Food & dining, Home Buyers ↔ Home & living. K-drama, Football followers,
Finance & investing and Business & professional have no clean twin and are
not mapped.

Properties vocabulary (nine): Astro Awani, Gempak, XUAN, SYOK, Stadium Astro,
Rasa, Media Hiburan, sooka, Ulagam.

Refine dimensions and the overlap rule are copied from Karen's planner
verbatim: generation, income band, race, geography with their population
shares; 60% overlap within a group, 25% across groups; Malaysia total 16.15M.

## The page, top to bottom

**Header.** "Audiences" with the sub "Every segment Collabrium Digitals can
reach, sized and grouped so you can see who sits next to whom." Right side:
a Reach tray button with a count badge, mirroring the formats page's Spec
button.

**Universe (hero).** An SVG stage, full content width, 420px tall on
desktop. Every segment is a circle, radius proportional to the square root
of its size, filled with the lens's `-bg-strong` tint and stroked with the
lens colour. Circles pack into their groups; groups sit in three lens bands.
Above the stage, the lens switcher (All · Who they are · What they love ·
What they're buying). Picking a lens re-packs the stage: the other lenses'
circles shrink to dots and fade to the edge, the chosen lens's groups spread
to fill the width. Motion is `transform` and `opacity` only, one FLIP pass,
`--ease-settle`, 420ms; reduced motion snaps.

Hover or focus a circle: it lifts, its name and size appear in a floating
label, the rest of its group brightens, and the rest dim. (Sharing a property was the first idea; Awani and Gempak sit on
almost every segment, so that lit the whole stage. Properties light the
stage from their own chips instead.) Click opens the drawer. Below the stage, a row of nine property
chips ("Where they live"): hovering Gempak lights every segment that lives on
Gempak, with a count. This absorbs the matrix idea without a second view.

The universe is decorative-first but never the only way in: it hides on
touch widths under 720px, where the cards carry the page.

**Controls.** Search (name, group, topic, property), group chips (the eight
kult groups, multi-select), property pills (nine), sort (size high to low,
low to high, A–Z), and the view switch: Cards · Table. Filters drive the
universe too: a filtered-out circle drops to a dot.

**Cards view.** Portrait card, 4-up on desktop. The portrait fills the top;
the lens colour tints the bottom edge. Over the portrait's corner sits the
consumption arc: five thin concentric arcs (video, audio, TV, podcast,
social) drawn to the percentage, in the lens colour at stepped opacities.
Hover lifts the card and the arcs draw in; the six topic tags fade up over
the lower third of the portrait. Body: name, group tag, size, and the two
strongest channels as text ("89% social · 79% video"). An Add-to-tray toggle in the
corner puts the segment in the reach tray.

**Table view.** Same list as columns: segment, group, size, addressable
(where known), top channel, properties (as small logos or initials), topics
(first three). Hovering a row floats the portrait and arc beside the table,
the way the formats table floats its live sample.

**Drawer.** Portrait on the left, the arc drawn large over it. Right: name,
group and lens tags, size with "published by KULT" under it and, where
mapped, "addressable on KULT digital" with Karen's count and her fit note.
Description. "Where they live": the properties with what they consume there.
"What they read": the six topics. Consumption as five labelled bars. "Also
see": the three largest others in the same group.
Previous / next with arrow keys, deep link, Add to reach tray, and Send to a
media plan.

**Reach tray.** Bottom bar, up to five segments, kept for the tab session in
`sessionStorage`. Shows raw total and unique reach using the overlap rule.
When the unique figure passes Malaysia's 16.15M the sheet says so and points
at the planner's addressable counts, since KULT's sizes are audience-scale
figures across platforms rather than unique people.
Opens a sheet: the chosen segments as columns (portrait, size, arc), the
reach maths spelled out, and Karen's four refine selects; changing one
scales unique reach and says what percentage is kept. Footer: Send to a
media plan (`planner.html?audiences=a,b,c`), Export as placeholder toast.
The planner does not read the parameter yet.

**States.** Skeleton first paint in the shape of the universe and four cards. Empty state when filters match nothing. Toasts for tray full
and export.

**Access and motion.** Every circle, card and row is focusable; Enter opens,
`r` toggles the reach tray, arrows step the drawer. Touch: first tap
previews, second opens. `prefers-reduced-motion` gets end states. Colour is
never the only carrier: lens tags carry text, arcs carry percentages.

## Not in this build

- Planner does not consume `?audiences=`.
- Export is a toast.
- Platform (Digital / Astro Go) filter, pending per-segment data.
- Per-segment geography; the regional split stays a uniform refine multiplier.
- Karen's four unmapped personas are not on the page.

## Changed after build

- 2026-09-08: the fans-to-buyers strip and the `pair` field were removed at
  the user's request. The pairing was a curation, not a kult.my fact; the
  page now carries only what the site publishes, plus Karen's clearly
  labelled planner counts.
