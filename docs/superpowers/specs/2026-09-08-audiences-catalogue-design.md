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
- 2026-09-08, thirteenth pass: the numbers went back to the ring chart —
  the five concentric arcs, on a white disc over the drawing's corner, on
  the card, the row preview and the reach sheet. The bar chart and its CSS
  were removed with it. The drawings were redrawn to a reference the user
  supplied: the character is now one soft squircle of the lens colour that
  is body and head at once, with a tiny face on it (eyes, mouth and a
  stray tick, all picked by the segment's seed), stick arms and legs in
  the same weight as the props, and a three-stroke hand at the end of each
  arm. Props are outline only — no solid black shapes — at that one pen
  width. Behind the character sit a pale wash and a faint group backdrop
  (a stadium arc for sports, bunting for ethnicity, an arch for
  trendsetters, a skyline for business, shelves for shopping, steps for
  income, a sun and cloud for life stage, curtains for entertainment),
  both drawn thin. A drawn ground line, a shadow and two or three margin
  accents finish it. Everything organic is generated from a seeded
  wobble, so a segment's drawing never changes but no two are alike.
- 2026-09-08, fourteenth pass: the frames were too busy, so everything
  that was not carrying meaning came out — the faint group backdrops, the
  margin accents and the ground marks. What is left is a pale wash, one
  drawn ground line, the shadow, the character and at most two props (a
  third only ever repeated what the first two said). In their place the
  characters got an identity: a hairstyle drawn as a band over the top of
  the body that falls down both sides by however much the style calls for
  — none, a single curl, a crop, a bob, long hair, a bun, curls, a
  ponytail — plus glasses, earrings or a beard. Which look a segment gets
  comes from its own seed, except where the segment says who it is:
  New Mothers and Experienced Mothers are drawn as the women KULT
  describes them to be.
- 2026-09-08, fifteenth pass: a finer pen (1.6 rather than 2), one prop a
  scene turned into a block of colour, and postures that do something. The
  drawing primitives now take their fill and stroke from the group above
  them, so the first prop of every scene is wrapped in a tint chosen per
  motif — an amber football, a turquoise mountain, a purple controller, a
  salmon heart — and the handful of shapes that read on their own (heart,
  star, leaf, plane, notes) drop the outline entirely and become flat
  silhouettes, as in the reference. Five action poses joined the five
  standing ones: run, jump, climb, kick and push, each with its own legs,
  arms, lean into the movement and, for a jump, the ground left behind.
  Adventure Seekers climbs, Wellness Explorers runs, the football fans
  kick, Badminton and the concert-goers jump, and the parents and
  shoppers push. Sitting now bends at the knee instead of lying flat.
- 2026-09-08, sixteenth pass, against a fuller set of references the user
  supplied. The drawing now follows seven rules, written at the head of
  the doodle section in the marks module: one pen width for everything;
  the line always on top, so legs go behind the body and arms in front;
  limbs as white tubes outlined in that pen with a mitten hand, never
  bare sticks; a prop either white with a dark outline or one flat accent
  colour with no outline, never both; the accent drawn from the four DLS
  colours that sit beside any mascot colour, one coloured prop a scene;
  the mascot one squircle turned to the front, three-quarter or side; two
  props at most and no scenery. The turn is decided by the movement where
  there is movement (a runner and a kicker are seen side on, a climber
  and a pusher three-quarter) and by the seed otherwise, and a profile
  shows one eye with the mouth beneath it. Legs grew to nearly half the
  figure, and sitting now folds the knees up with the body on the ground.
- 2026-09-08, seventeenth pass: the user supplied drawn artwork, one
  illustration per segment, in the style the last several passes had been
  chasing. It replaces the generated doodles everywhere a segment is
  pictured — card, table row, row preview, drawer, related cards, reach
  sheet. The 2400px masters live in `assets/stills/` and are kept out of
  git (149 MB); the page loads 700px JPEGs from `assets/stills-web/`,
  2.3 MB for all 51, generated with `sips -Z 700 -s formatOptions 88`.
  Both sets are named by segment id, and the art is 4:3 like every box
  that holds it. The doodle generator came out of the marks module with
  them, which leaves it at 261 lines: the consumption arc and the jar.
- 2026-09-08, and the bug that followed: the illustrations arrived
  cropped to a corner for anyone who already had the page open. The
  sizing rule that makes an image fill its box lives in
  `shared/audience-marks.css`, whose cache-busting query was still `?v=1`
  from the first build, so browsers served the old file. All three shared
  assets are now `?v=2`, and the rule that matters most sits in the
  page's own stylesheet, which ships with the HTML and can never be a
  version behind. Bump the query whenever a shared file changes.
- 2026-09-08, eighteenth pass: the illustrations move. The user supplied
  a four-second animation per segment, so hovering a card now plays its
  clip over the still, the way the ad-format cards play their sample.
  The 1112px masters with audio live in `assets/clips/` and are kept out
  of git (87 MB); the page plays 600px silent H.264 from
  `assets/clips-web/`, 4.4 MB for all 51, encoded with
  `ffmpeg -an -vf scale=600:-2 -crf 28 -preset medium -movflags +faststart`.
  Nothing is fetched until a pointer lands: the video element is built on
  first hover, and it fades in only once it is actually playing, so a
  card never shows a black frame. A play asked for before any data has
  arrived is refused, so the clip asks again on `canplay` — and only
  fades in if the pointer is still on it. Cards, the row preview and the
  drawer all play; the drawer stops when it closes; reduced motion keeps
  the still.
- 2026-09-08, nineteenth pass: the ring chart became a bar chart, shown
  on hover. A card's face swaps from its description to the total
  audience and five bars — one per channel the segment reports, in a
  fixed order — which grow from the baseline one after another. The bars
  take the card's own category pill colour, literally the same token, so
  the two always agree. "Lives on" and "Reads" left the card; they are
  still in the drawer and the table. The floating row preview, the reach
  sheet's columns and the jar's hover card carry the same bars, standing
  complete rather than growing. Cards also gained the ad-format card's
  pointer tilt. The lens chips moved out of the universe panel to sit
  with the search and the group chips above both tabs, so they filter the
  cards as well: a lens hides cards but only shrinks discs, since in the
  jar the field should keep its shape, so the jar asks for the filtered
  list without the lens applied and lets `setLens` do the rest. The arc
  and its stylesheet came out with the rings, leaving the marks module at
  232 lines and its stylesheet at eight.
- 2026-09-08, twentieth pass: colour follows the category, not the lens.
  The illustrations are drawn one colour per category, so that is where
  the page takes it from. Sampling the dominant saturated colour of all
  51 artworks gave eight readings, one per category, each landing on a
  DLS colour: Ethnicity green, Income amber, Life stage turquoise, Sports
  red, Trendsetter salmon, Business navy, Entertainment purple, Shopping
  orange. A `cat-<group>` class sets `--au-color` and the DLS derives the
  tints from it (8% on white for a surface, 16% for a layer above), so
  the pill, the bars, the group chip and the disc in the jar all follow
  the picture. The category tag darkens its ink to 78% of the colour
  mixed with the ink so amber and turquoise stay readable. The lens keeps
  its own three colours, for the lens chips alone.
- 2026-09-08, and after: the coloured rule under the pictures in both
  modals came off — the pill and the bars already say which category it
  is — and the reach tray's thumbnails play their clips like everything
  else, stopping when the sheet closes. The drawer's "Also see"
  thumbnails play as the pointer crosses them.
- 2026-09-08, twenty-first pass: three faults in the jar. The hover card
  styled every `span` and `i` beneath it, and the bar chart is built from
  exactly those two tags, so a bar's track collapsed into a 7px dot and
  its label went full width; the card's type rules are now scoped to its
  own children (`> div > b`, `> div > span`, `> div > span > i`), and the
  chart draws inside it as it does on a card — five tracks 76px wide,
  filled to the channel's share in the category's colour. The lens toggle
  stuttered because the growth rewrote each disc's width, height and
  margin on every frame, laying out 51 elements 60 times a second; the
  box is now sized once, when the lens sets a new target radius, and the
  frames in between write only a transform, the growth riding on
  `scale(r/rt)`. And a disc outside the lens no longer keeps a pale
  version of its category colour — it goes neutral grey, so colour in the
  jar always means the category and never the lens. The lens chips lost
  their dots for the same reason: green, navy and orange are now spoken
  for by Ethnicity, Business and Shopping.
- 2026-09-08, twenty-second pass: a colour audit, and the jar's labels
  failed it. Measured live, all 48 visible disc labels fell short of
  4.5:1 and 32 of them missed even 3:1, the worst at 1.58 — white ink on
  turquoise and amber. White was safe when a disc was one deep lens
  colour; it stopped being safe when the fill started mixing toward white
  by size and the palette moved to eight category hues, three of them
  inherently light. Dropping the size ramp alone would not have saved it
  (the labels would still top out at 1.76 on turquoise), so the ink
  changed: each label is now a deep shade of its own disc,
  `color-mix(--au-color 40%, #000)`, and the fill ramp narrowed from
  52-100% to 56-70% so the ink always has something light to sit on. The
  count lost its `opacity:.85`, which had been quietly washing it back
  into the fill and undoing the gain. Every name and every count now
  measures between 4.80 and 5.90. Discs outside the lens take neutral ink
  to match their grey. The size legend came out altogether: the radius
  already says how big a segment is, its five dots were drawn as a grey
  ramp while every disc on screen was a coloured one, and with the fill
  ramp this quiet there is no longer a scale to explain.
- 2026-09-09, twenty-third pass: the bones now stand where the page will.
  Measured against the real thing, the old skeleton was guessing: the card
  stage was drawn 16/10 against a real 4/3, the table's rows stood 34px
  against a real 98, the filter pills were nine hand-typed widths against
  labels that run from 62 to 208, and the jar kept its 560px default and
  then collapsed to 440 the moment the real one measured itself. Four
  changes fix it, and none of them is a new number to maintain. The
  filter line draws the real chips and has its ink taken out, so a pill
  is exactly as wide as the label it stands for and the row wraps where
  the real row wraps. The card's bones wear the card's own classes, so
  the stage keeps its aspect ratio at any column width and `.au-swap`
  its fixed 96px; the titles run one, two or three bars because the real
  names run one, two or three lines, and the bone cards come out at
  352/368/388 exactly as the real ones do. A row's height turned out to
  be set by the properties column, whose pills are wider than half the
  column and so stand one per line, five of them 92px high; the bones
  keep that and measure 98 to 117, the range the real rows occupy. And
  the jar sizes itself before the bones go in. The disc bones moved from
  a scatter across the canvas to a pile resting on the floor the real
  discs settle on, in neutral-3 rather than neutral-2, which was
  invisible against the warm canvas.
- 2026-09-09, and after: the second the page waited before showing itself
  is gone. Nothing on this page is fetched — the segments arrive with the
  document — so the wait was staging, not loading, and the page now
  builds in the same tick it parses in (DOMContentLoaded at 117ms, 51
  cards and 51 discs already real). The arrival stagger stays; it is the
  content coming in, not a delay. One consequence to note: with nothing
  asynchronous left to wait for, `skeleton()` runs and is replaced before
  the browser can paint, so the bones can no longer be seen. The call is
  left in place against the day the data comes from somewhere else.
- 2026-09-09, and after: the segment tab's bones are the card grid, and
  only the card grid. A card carries the shape of a segment — a picture,
  a name, a group, a size — where a row of bars carries the shape of a
  spreadsheet, so the skeleton now forces the cards view on whatever the
  visitor last chose and hands the table back the moment the real
  segments arrive. The row bones and the one CSS rule that served them
  came out.
- 2026-09-09, and after that: the second is back. Nothing is fetched, so
  it remains staging rather than loading — the page takes a moment to
  compose itself rather than appearing mid-thought — and the bones sized
  in the passes above are on screen again for it. Anyone who asked for
  less motion still skips straight to the page.
- 2026-09-09, and again: a link into the segments spent its first second
  watching the jar. The tab was only decided after the pause, so whatever
  was asked for, the bones on screen were the universe's. `setTab` now
  splits in two — `paintTab` says which panel is on show, `setTab` adds
  what happens when it goes on show — and the skeleton calls the first of
  those before laying a single bone. A `?tab=cards` load opens on eight
  card bones with the jar hidden; everything else opens on the jar, which
  only measures itself when it is the one on screen.
- 2026-09-09, sorting and the jar's headline. Changing the sort rebuilt
  the grid, so every card was a new element and the FLIP had nothing to
  recognise: the cards blinked into their new order. A sort keeps the
  same segments and only moves them, so the cards are now moved rather
  than rebuilt — each card keeps its element and its picture across the
  sort — and the snapshot covers every card, not only the ones on screen,
  so a card arriving from below the fold knows it came from below. What
  travels a short way travels; what would streak across the whole screen
  arrives from the edge it came from instead. The stagger widens from
  16ms to 38ms for a sort, which is what makes a reshuffle read as a
  re-sort rather than a flicker. Three viewport reads moved from
  `window.innerHeight` to the page's own `vh()` helper, which is the one
  that keeps answering in a backgrounded tab.
  The jar gained a headline number in the room the discs leave above
  them: the combined size of whatever the filters have left, counting to
  its new value over 520ms rather than snapping. It is labelled
  "combined reach … sizes overlap", not "total audience", because these
  are published audience-scale figures that overlap heavily — all 51 add
  to 577.7M against an addressable universe of 16.15M, and the tray's
  deduplicated number remains the one to quote for a buy.
- 2026-09-09, the headline, properly placed. Tucked in the top-left
  corner at 44px it read as a stray caption. It now stands centred over
  the jar as a stat block — an eyebrow line, then the figure at
  clamp(52px, 7.2vw, 96px) in Mulish 900, the weight the font already
  loads and the format previews already use. The label went above the
  number rather than below it: the discs pile up from the floor, so the
  lowest thing in the block is the one that has to survive meeting them,
  and 96px of black reads over a pastel disc where an 11px caption does
  not. Even so the headroom was not the page's to assume — it changes
  with the reach tray, which lifts the pile 68px, and with the lens — so
  the band is now the jar's ceiling: `padTop` is measured from the
  headline's own height rather than fixed at 14, and the discs settle
  under it. That left them starting their pour inside the jar, since the
  pour began just above the ceiling; they now start above the canvas
  instead, which the `inside` flag already allowed for. 87px of clearance
  with the tray open or shut, 143px under a lens, and the discs are about
  a tenth smaller for it.
- 2026-09-09, and smaller with it: the weight was carrying the emphasis,
  so the figure came down from clamp(52-96px) to clamp(34-58px) and kept
  Mulish 900. The block is 72px tall rather than 103, which the measured
  ceiling passes straight back to the discs.
- 2026-09-09, a little bigger, a little roomier. The discs cover more of
  the jar: the share the scale aims for went from 0.32 + 0.20 to 0.37 +
  0.24 of the area, about 7% on the radius, which the area formula
  governs here rather than the cap. The taller pile ate the headline's
  clearance, so the ceiling's margin over the block went from 30 to 40 —
  a change worth under 1% of the disc size and worth 15px of air. The
  jar's hover card takes the DLS's larger step throughout: 16px of
  padding and 16px between the picture and the words, on the large
  radius, with its bars at 172px. Shared assets go to ?v=4; the disc
  change lives in audience-marks.js, and without the bump a cached copy
  keeps the old sizes.
- 2026-09-09, the jar counts itself. The headline no longer runs a clock
  of its own while the discs pour: a disc is added to the sum once it has
  come to rest, so the number climbs as the audience piles in. Stepping
  the physics frame by frame, it reaches 15% of the total a second in,
  45% at 1.7s, 85% at 2.3s and all of it by 4s. Discs the filters have
  removed, and those a lens has shrunk to marbles, are not counted —
  they are not in the total either — and a disc sent back up to pour
  again loses its place in the count until it lands.
  Two things had to change for the sum to be trustworthy. The tally is
  now the only place that decides how the number moves: `setJarTotal`
  states a target and nothing more, and the tally either lets the discs
  carry it or, when the jar is at rest, tweens to it. Before that a stale
  flag let a filter change leave the number untouched — 51 segments went
  to 6 and the headline still read 577.7M. And the loop stops drawing the
  moment it judges itself settled, so a disc still being jostled on that
  last frame was left out of the sum for good: the jar going quiet is now
  itself the signal that everything in it has landed. All five states
  measured exact: the full 577.7M, sports 38.8M, back to 577.7M, the love
  lens 235.5M, and back again.
- 2026-09-09, the disc opens the segment, and closes back into it. A disc
  has always been a button that opens the drawer — the same gesture as a
  card, so the universe is somewhere to act from rather than only look
  at. Closing was half the trip, though: it looked for the segment's card
  to swing back into, and on the universe tab that card sits in a hidden
  panel and measures nothing, so the swing was refused and the drawer
  merely faded. It now closes back into whatever is actually on screen —
  the disc in the jar, the card, or the row.
- 2026-09-09, the lens leaves the drawer. The header carried two pills,
  the lens beside the category, and the lens was the weaker of the two:
  it is a filter for finding a segment, not a fact about it, and the
  drawer is where you have already found it. Only the category pill
  remains, which is also the one the colour follows. `lensTag` and the
  lens-to-DLS-tag map went with it; the lens still names itself in the
  table's second line and still answers to search.
- 2026-09-09, and the outbound link with it. The drawer's footer sent
  people to kult.my's own audience page, which is where the numbers came
  from but not where the work happens; it left two actions that both
  belong here, the media plan and the reach tray. The size still says
  where it was published.
- 2026-09-09, clicking a disc never reached the disc. Everything the stir
  needs was switched on at pointerdown rather than at the first real
  movement: the discs were told to stop taking pointer events so the hand
  could reach past them, the pointer was captured, and the hand itself
  began pushing. Any one of those breaks a click. The discs going
  pointer-transparent is the one that did it — the press landed on a disc
  and the release landed on the jar behind it, so the browser reported
  the click against their common ancestor, the world, and the handler's
  `closest('.au-bub')` found nothing. All three now wait for the pointer
  to travel its 4px, which is the same threshold that already decided
  whether a gesture counted as a stir at all. A press opens the segment; a
  drag stirs and opens nothing.
  Worth recording how this was missed: it was verified with `el.click()`,
  which dispatches straight at the element and never runs the pointer
  sequence — it exercised a path a real click does not take, and passed.
- 2026-09-09, the lens waited for the mouse. Choosing a lens looked like
  it had done nothing until the pointer moved away, and then the discs
  resized all at once. The loop skips stepping while it judges the jar
  settled, and that judgement read `J.growing` — a flag only the physics
  writes. A lens hands every disc a new target size without stepping, so
  a jar at rest kept calling itself settled and never started; moving the
  pointer far enough to become a hand forced a step by another route,
  which set the flag, which started the animation. The test now asks the
  discs directly whether any is away from its target. Measured on a jar
  settled to a maxSpeed of 0.46: after `setLens` all 51 discs need
  resizing while `J.growing` still reads false — the old test called that
  settled, the new one does not.
- 2026-09-09, no two pours alike. The physics is deterministic, so with
  each disc leaving the same spot at the same moment the pile landed in
  exactly the same arrangement on every visit — the same jar, poured from
  the same jug. Each pour now takes its own seed, which moves only where
  a disc starts across the width and by how long it waits. Sizes are
  untouched, and the wait is kept under the 20ms that separates one disc
  from the next so the lens-then-group order still decides who lands
  first and like still settles near like. Across three pours no disc
  landed within a pixel of where it had before, the median disc moving
  some 300px, with the radii identical throughout.
