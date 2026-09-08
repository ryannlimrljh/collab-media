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
- 2026-09-08, second pass: the page split into two tabs, **Universe** and
  **Segments**, at the user's request, with the universe rebuilt as a
  full-bleed canvas after a network-graph reference they supplied. The
  canvas pans (drag) and zooms (wheel, +/−, double-click a circle, 0 to
  fit) and offers three arrangements: **Groups** (each group a hub with its
  segments on a ring, spokes drawn between them), **Properties** (the nine
  Astro properties as hubs and every segment pulled toward the ones it
  lives on, a small force layout run to rest at load) and **Size** (one
  pack, largest in the middle). Hovering a circle shows a card with the
  consumption rings, lights its group and the properties it lives on, and
  dims the rest; hubs and properties light their segments. Circles drift
  gently at rest and a halo breathes behind the hovered one; reduced
  motion stops both. The cards, table, filters and reach tray moved to the
  Segments tab unchanged (`?tab=cards` deep-links to it). The lens chips
  and property chips now live on the canvas, and the cards-tab filters no
  longer reach into the universe.
- 2026-09-08, third pass, on the user's notes: the spokes between circles
  are gone, so are the tab underline and the "Hover any circle or card"
  hint. Bubbles are drawn as soft spheres (a radial wash from white to the
  element tint, a hairline stroke, a drop shadow) and their radius follows
  a power curve above one (`12 + 118 · (size / 17M)^1.35` in layout units)
  so 9M and 17M no longer look alike; the order stays honest. The Groups
  arrangement packs each group organically around a soft hub disc with the
  group name floating above the cluster. Circles drift on their own slow
  clocks and ease away from the pointer, small ones further than large,
  written by one animation-frame loop; reduced motion stops it. The
  picture is fitted between the chips above and the reach tray below.
- 2026-09-08, fourth pass, on the user's notes and a glass-blob reference:
  the universe left SVG for HTML. Every bubble is a button of frosted
  glass — three washes of the lens's DLS colours (Earth: green and
  turquoise; Water: navy and purple; Fire: orange, salmon and amber) that
  wander slowly inside it, a white highlight, a backdrop blur, a hairline
  of white — over three ambient washes that drift behind the field. The
  layout fills the whole canvas: one scale so the bubbles cover about
  seventy percent of it, overlapping a little, groups spread across the
  space and relaxed apart, every bubble labelled with its name and size.
  Each group has a depth and each bubble a depth within it: nearer
  bubbles draw larger and on top, shift more with the pointer, and the
  whole plane tilts a few degrees toward it. The hover flicker is gone
  because the hit box no longer moves: the box holds its place while the
  glass inside drifts, swells and gives way, the hovered bubble is never
  pushed, and leaving waits a beat before the field relaxes. The
  Properties arrangement was dropped; Groups and Size remain.
- 2026-09-08, fifth pass, after the user's manager saw the glass ("looks
  like Mentos"): flat again, and calmer. No gradients, no glass, no tilt,
  no ambient washes. Each segment is a flat disc in its lens's element
  colour, mixed into white by its size — the smallest audiences pale, the
  largest at full strength — with a five-step legend in the corner. Ink is
  dark on every step, white only on the deepest Water discs, where the
  contrast allows it. The discs sit close but never touch, packed in a
  shuffled-by-hash order inside each group so the field reads as circles
  set down together, not a target, and a final firm pass guarantees the
  gap. The drift and the give-way to the pointer stay, at a fraction of
  their former reach.
- 2026-09-08, sixth pass, on the user's notes: the universe became a jar.
  There are no group rooms any more; the discs pour in from the top in
  lens-and-group order and settle under gravity, filling the space the
  way marbles fill a jar. `AudienceMarks.jar` is the physics — build,
  step, settle — position-based so the pile goes still; it runs every
  frame on the page, and settles at once for reduced motion or a hidden
  page. The pointer is a hand: moving through the jar stirs it (discs
  give way and drift with it), resting on a disc hovers it, and the disc
  under the pointer is found by distance rather than by the browser so a
  disc drifting under a still pointer still lights. Labels are smaller
  and white on every disc, so the colour ramp now starts at half strength
  to carry them; the lightest steps sit below the AA contrast line for
  small text, which the hover card and the Segments tab cover. The
  filters collapsed to one row: the lens chips and a single "Lives on"
  pill that opens the nine properties. The Arrange chips and the group
  captions are gone, since the jar has no arrangements to choose.
- 2026-09-08, seventh pass, on the user's notes: gravity is the real
  thing (9.81 m/s² with the jar taken to stand 1.5 m tall, so a disc
  dropped from the top lands in about a third of a second). Resizing the
  canvas — the rail folding, the window growing — no longer pours again:
  the discs stay, scale with the jar, and roll into whatever room appears
  (`jar.resize`). Stirring is a press-and-drag now, hovering a plain move,
  so the two never fight; a plain scroll moves the jar and a pinch or the
  ± buttons zoom it. The lines above and below the canvas are gone and
  the tab strip is the DLS's own. The filter line — search, group chips,
  Lives on — sits above both tabs and drives both: a filtered-out disc
  leaves the jar and a returning one pours back in (`jar.setActive`).
  The sort and view switch show only on the Segments tab.
- 2026-09-08, eighth pass: a micro stir on plain hover, and lens
  switches that never pour. A pointer moving through the jar without a
  button is a soft hand: each disc it brushes gets one small nudge as its
  rim is crossed, never the disc it is hovering, so the pile jostles a
  few pixels and settles. (The hand is now applied once per substep,
  after the contacts; it had been running inside the contact passes and
  landing nine times a frame.) Switching lens calls `jar.setLens`: the
  discs that matter grow, frame by frame, to the size the jar would give
  them alone and shove the rest aside; the rest shrink to marbles and
  fade. All / Who / What no longer rebuild the jar.
- 2026-09-08, ninth pass: the jar is fixed. No panning, no zoom, no
  controls over it; a scroll scrolls the page. The jar's walls stand 28px
  in from the canvas edges (`padX`) so no disc touches the side, and the
  jar no longer bleeds past the content width. The lens chips left the
  canvas for a row of their own between the filter line and the jar,
  left-aligned with the search box, with the size legend at the right.
- 2026-09-08, tenth pass: discs fell in slow motion in some situations.
  Two causes. The physics stepped once per painted frame with whatever
  time had elapsed, and Verlet carries speed as a displacement per step,
  so a slow frame halved the speed; the loop now runs a fixed 1/60 s
  clock and takes as many steps as the frame owes. And "settled" was a
  mean over all discs, so one disc rolling on its own could be frozen
  mid-roll; it is now the fastest disc.
- 2026-09-08, eleventh pass, the Segments tab: the kult.my photographs
  are gone from the page (the files stay in `assets/audiences/` until
  someone says to remove them). Each segment is drawn instead — a
  line-art doodle built from parts and picked by hash, so the same
  segment always has the same face: six haircuts, glasses or not, four
  tops, and one prop for its group (a cap for sports, headphones for
  entertainment, shades for trendsetters, a collar and tie for business,
  a bag for shopping, a coin for income, a heart for life stage). The
  card follows the ad-format card: a stage on the lens tint holding the
  doodle and the media consumption as five bars that grow when the card
  goes live, a body whose block swaps from description and size to three
  fact lines (audience, lives on, reads) on hover, and no pills over the
  stage. The row preview, the drawer, the related cards and the reach
  sheet use the same drawing and bars. `AudienceMarks.doodle(seg)` and
  `AudienceMarks.bars(el, seg)` live in the marks module.
- 2026-09-08, twelfth pass: the doodles became scenes. Each segment's
  drawing is a person in a pose with the props that tell its story — a
  football, scarf and trophy for EPL fans, a bowl and a plate for
  foodies, a key and a house for home buyers, a stroller for young
  families, a ketupat, a lantern and a diya for the three ethnic groups
  — composed from a library of fifty-odd motifs in `SCENES` in the marks
  module. The bars stay as they are and read each segment's published
  percentages directly.
