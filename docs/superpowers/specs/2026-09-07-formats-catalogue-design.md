# Ad formats catalogue — design

**Date:** 2026-09-07 · **Surface:** Collab:Media · **Route:** `pages/formats.html` (nav: General › Ad formats)

## What it is

A catalogue of every ad unit KULT can run, built for the media planner who has to pick between forty of them. It replaces the flat list Karen's planner wizard carried under its Formats nav item with a gallery where every card shows the unit *doing its thing*, and the spec arrives over the sample instead of beside it.

Reference points: Karen's `planner-wizard-collabrium_270826.html` (the catalogue data and the nav placement) and kult.my/gallery (the highlight strip, the objective filters, the per-format spec fields).

## What was asked for, and what was added

Asked for:

- A new nav section **General › Ad formats** on every Collab:Media page.
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

## Changed after build

- 2026-09-09: the page opens on a picture. The catalogue used to begin with
  a strip of five brands and then forty-nine cards, so a planner met a list
  before they met an idea. It now has two tabs, **Placements** and
  **Catalogue**, and Placements is what a fresh visit lands on.

  **The drawing.** A desktop browser and a phone side by side, drawn as
  wireframe furniture — a masthead, a nav, a headline, body copy, a rail, a
  feed — with every ad slot marked where it really sits. Eight of them:
  masthead, page skin, side rail, in the article, in the player, sticky
  footer, full screen, in the feed. Each is a button carrying its own count
  at rest, so the picture reads with no pointer on it.

  **Hovering demonstrates.** A slot does on hover what it does on a real
  page: the masthead drops in from above, the skin unrolls from both
  margins, the rail slides in from the right, the sticky bar rises from the
  bottom edge of both frames, and full screen wipes a translucent sheet over
  the desktop page and the phone at once. Everything else dims to 30%. A
  caption under the drawing names the slot, says what it is, and gives two
  numbers: how many of the 49 fit it, and how many were built for it.
  Keyframes rather than transitions, so a backgrounded tab still plays them,
  and every demo sits inside `prefers-reduced-motion: no-preference`.

  **Clicking navigates.** A slot hands itself to the catalogue: the tab
  switches, the list filters to what fits, the units sold for that slot lead
  and wear a "Built for this slot" badge, the applied-filter tray gains a
  removable "Placement: …" chip and the URL becomes `?tab=catalogue&slot=…`.

  Slots are drawn in navy rather than a family colour. A slot is a position
  on a page and a family is a kind of ad; the two must never read as the
  same axis. Navy is Collab:Media's own element, which the favicon already
  uses.

  Under 760px the drawing steps aside and the eight slots become full-width
  cards, the same rule the audiences universe follows. The cards are the
  keyboard path and the legend at every width, so nothing here is
  hover-only.

- **Where the placement data comes from.** It is a curation, not a KULT
  field. `shared/formats-data.js` derives it at load from the sizes each
  unit is sold in — 970×250 and 728×90 are masthead, 300×250 and 800×600 are
  in-article, 300×600 is the rail, 320×50 and 320×100 are the sticky bar,
  320×480 is full screen — with the fifteen units whose size string does not
  say where they go written out by hand. Two fields land on every record:
  `placements`, every slot it can fill, and `home`, the one slot it was
  designed for.

  The counts are lopsided and that is the finding, not a fault: 33 units fit
  an in-article box and 5 fit a sticky footer, because most of KULT's
  interactive work is a creative treatment that drops into a standard slot.
  So the picture is an entry point and a fact about the inventory, not a
  narrow filter. The `home` field is what keeps it useful — it is what puts
  Catfish Ad at the top of the sticky list rather than Calculator Ad.

- **Search** matches a unit's home slot only. Typing "masthead" returns the
  three units sold for the masthead, not the twenty-eight that merely fit
  it; the picture is how you ask what fits.

- **Cache.** `formats-data.js` moved to `?v=2` with the placement fields.
  Bump the query whenever a shared file changes.

- 2026-09-09, and the hover that fought itself. Every demo animated the
  slot button, so the hit box travelled under the pointer: hovering the
  masthead sent it up and out from under the cursor, the pointer landed on
  the page behind it, the state cleared, the slot snapped back, and the
  cycle repeated. The sticky bar and the page skin were worse, since one
  drops out of the frame entirely and the other collapses to nothing.
  The button is now a hit box that never moves and never paints; everything
  visible lives in a `.in` span inside it, which is what the demos animate
  and what the dim applies to. Measured on all eight slots: the button's
  rectangle is identical at rest and mid-demo, and the pointer at a slot's
  centre still lands on that slot while its animation plays. It is the same
  lesson the audiences universe learned from its glass bubbles.

- 2026-09-09, the two tabs became one page. A slot is how you enter the
  catalogue, not a separate place to be, so putting the two behind a tab
  strip made the visitor choose between the question and the answer. The
  picture now sits at the top of the page, a rule separates it from the
  catalogue, and clicking a slot filters the list and scrolls to the filter
  line — where the visitor lands on their own "Placement: …" chip, the
  count, and the first row of cards, rather than on the Recently-live wall.
  Clicking the same slot again lets it go and stays put. The URL is
  `?slot=<key>`; `?tab=catalogue` still works and lands on the catalogue.

  Two things came off with the tabs. The caption strip under the drawing
  went, because every slot already carries its own count and the drawing
  says the rest; its "Show the N" button is now just the slot itself. And
  the row of placement pills went from pointer screens, where it only
  repeated the picture. The pills remain below 760px, where the drawing
  steps aside and they are the whole interface.

  One thing had to be defended. A smooth scroll is an animation, and an
  animation does not run in a backgrounded tab, so the request silently did
  nothing and the click filtered the list and appeared to go nowhere. The
  scroll now checks a beat later whether anything moved, and jumps if not.

- 2026-09-09, Recently live comes off. The scattered wall of five brand
  cards was the first thing under the header when the page was a list; with
  the placement picture above it, it had become a second hero between the
  question and the answer, and a visitor who had just chosen a slot still
  had to scroll past five campaigns that ignored their choice.

  Everything it owned went with it: the wall's scatter layout, its tilt and
  drop tables, the peek-on-hover, the brand-logo lookup, the ResizeObserver
  that watched its box, and its skeleton bones. The resize and
  visibility handlers stay, since the filter line's edge fades and any open
  facet panel still need re-measuring; they no longer lay out a wall. One
  side effect worth noting: the page makes five fewer outbound requests,
  because the brand marks were resolved through Google's favicon service.

  `FORMAT_SHOWCASES` stays in `formats-data.js` with a note saying nothing
  renders it. The campaigns and the units they ran on are transcribed fact.

- Live demo stays, disabled. It was removed earlier the same day and put
  back at the user's request: present so nobody wonders where it went, but
  quiet and inert until the links are ready.

- 2026-09-09, the slot fills. Pointed at, focused or chosen, a slot now
  goes solid blue with white ink rather than deepening its wash. Every
  other active control on the page fills — the compare plus, the objective
  chips — so a slot that only tinted read as a different kind of thing.
  The state is driven by five custom properties set on the button
  (`--slot-bg`, `--slot-line`, `--slot-style`, `--slot-ink`, `--slot-ink2`)
  and read inside `.in`, so one selector list covers box and ink together.

  The fill is `color-mix(navy 88%, #000)` rather than the raw navy. White
  on `--color-navy` measures 4.54:1, which passes AA with nothing to spare
  at 10 and 11px; the deeper mix measures 5.60:1 for the label and 4.96 for
  the count at 92% white. The chosen slot keeps the fill after the click
  (`[aria-pressed="true"]`), so scrolling back up says which slot is
  filtering. The small-screen cards follow the same rule.

- And the results load. Choosing a placement changes the list wholesale
  rather than by a few cards, so a straight swap read as a flicker. The
  filtered section now shows bones first and the cards cascade in after
  460ms, the way the page itself arrives. The bones are sized to the number
  about to land, so the block does not jump, and the count and the applied
  chip are written immediately — the number is known, only the drawing is
  pending. `skeleton()` and the filter share one pair of bone builders,
  `boneCards` and `boneRows`. Releasing a slot is not a load and goes
  straight back to the full list. Reduced motion skips the beat.

- 2026-09-09, four interaction notes.

  **The picture tips.** The browser and the phone tilt together under the
  pointer, one angle taken from where it sits across the whole stage and
  written to both frames, so they read as one plane rather than two cards.
  Seven degrees against the catalogue cards' four: a 450px picture needs
  more than four to register at all. Nothing inside the frames is measured
  for it, so the slots keep their own hit boxes; verified that all ten stay
  reachable at both tilt extremes. The first attempt tilted each slot box
  instead, which was the wrong object — the user wanted the whole device.

  **The page skin pushes in.** It used to unroll from the margins with a
  scaleX, which said nothing about what a skin is. Hovering it now widens
  both gutters from 42 to 88px and the story column gives way, 934 to
  842px, which is exactly what a page skin does to a page. It needs no
  reveal of its own, so `fm-slot-inl` came out.

  **A catalogue filter lets the placement go.** Holding a placement and a
  catalogue filter at once quietly shrinks the answer, and a planner who
  has scrolled past the picture cannot see why. Reaching for search, an
  objective chip, or a facet now drops the slot: the applied chip, the
  count, the URL and the filled slot all say so. Clearing a filter does
  not, since that is not a new question.

  **Every filter re-sorts, not just the sort.** `snapshotRects` measured
  only what was on screen, so any card arriving from below the fold read as
  new and popped in — a filter looked like the grid had been thrown away
  and drawn again. It now measures every card. Playback stays culled, since
  animating a card nobody can see is waste, and a card that would streak
  more than a viewport height arrives from the edge it came from instead of
  travelling. The stagger widens from 14/22ms to 38ms, which is what makes
  a reshuffle read as a re-sort. Measured: filtering 49 to 44 moves eleven
  cards and pops none, where before every card below the fold popped.

- 2026-09-09, and per device. The tilt was one angle across both frames,
  which made them read as a single sheet. They are two devices, so they
  tip on their own axes now: the pointer belongs to whichever frame it is
  over and that frame alone takes the angle, the other easing back to flat.
  A browser and a phone on a desk do not share a hinge.

  The desktop frame grew from 452 to 568px and keeps the extra for its
  slots — the in-article box to 112, the in-player to 92, the rail to 268 —
  with more of the story drawn around them. The phone stays at 452 and
  aligns to the bottom, so the two stand on the same floor rather than
  being stretched to match. The skin pushes deeper on hover as well: the
  gutters go 42 to 124px and the story column gives way from 934 to 770.

  Checked again after the geometry changed: all ten slots stay reachable
  at both tilt extremes and flat.

- 2026-09-09, the browser takes the first fold. Its height was a literal,
  which meant it ended wherever it happened to end. `fitFold()` now sizes
  it to whatever is left of the scrolling box under the header and the
  lede, less a 24px gap, clamped to 430–760 so a short laptop still gets a
  usable picture and a tall monitor does not get an absurd one. The offset
  is measured in the container's own content space, so the answer is the
  same whether or not the visitor has scrolled. The phone is capped at the
  browser's height, so on a short screen the two shrink together and on a
  tall one the phone stays a phone.

  The extra height goes into the ad slots rather than into a gap above the
  sticky bar: the article and the rail are flex columns now and the
  in-article box, the in-player and the side rail grow proportionally, with
  minimums so they never collapse. A taller browser window really does mean
  bigger units.

  It re-fits on window resize and through a ResizeObserver on `#fmContent`,
  which is the scrolling box itself — the rail folds shortly after load and
  changes the width without a window resize, and the box's height is the
  fold. Its height comes from the layout rather than from the content, so
  sizing the picture inside it cannot feed back. One more `fitFold()` runs
  after the boot beat, because the first measurement happens at parse time
  before the rail has taken its width back; without it the picture opened
  12px short. Measured at a 760px viewport: desk 482 with a 24px gap to the
  fold, and all ten slots still reachable flat and tilted.

- 2026-09-09, the demos slow down. They ran at 340–400ms on `--ease-settle`,
  which is the speed of an acknowledgement; a slot is demonstrating a
  placement and wants time to be read. They now take the DLS's own reveal
  pair, `--duration-reveal` at 550ms on `--ease-reveal`, which the tokens
  file describes as the beat for entrance reveals more deliberate than
  `--duration-slow`. The skin's push takes it too, being the heaviest move
  in the picture, and so does a frame settling back to flat after the tilt.

  The fill and the dim stay quicker — 220ms for background, border and
  colour, 360ms for the dim — because a colour change is the answer to the
  pointer rather than a performance, and matching it to the demos would
  make hovering feel like the page was thinking.

- 2026-09-09, the slots say something. The demo showed where a unit sits
  and nothing else, which made the picture pretty but gave a planner little
  reason to move the pointer across it. Hovering or focusing a slot now
  floats a card beside it carrying what you need before you pick a slot:
  the sizes it runs at, the devices it reaches, how many of the 49 fit it
  and how many were built for it, the units sold for it by name, and the
  line that says clicking filters the catalogue.

  Two fields joined `FORMAT_PLACEMENTS` for it, derived in the data file
  rather than the page. `sizes` comes from the size-to-slot map where a
  slot has sizes of its own — those are the ones that define it, so
  in-article reads 300×250 and 800×600 rather than every size its 29 units
  happen to offer — and from the units built for it where it does not.
  Composite labels like "Skinner + Masthead + MREC" name a bundle rather
  than a size and are left out. `devices` is the union across those same
  units. A `leads` field named them too, and came out the same day: the
  card is a decision about a slot, and a list of unit names is the answer
  the catalogue below gives once the slot is chosen.

  The card takes no pointer events, so it can overlap the picture without
  ever breaking the hover underneath it — verified that a pointer over the
  card still reaches the phone's in-feed slot behind it. It sits beside the
  slot where there is room and flips to the other side where there is not;
  a slot that spans the frame, like the sticky footer, gets it above
  instead, so the card never covers the thing it describes. A scroll
  dismisses it, since it is fixed and would otherwise be stranded.

  Nothing here is hover-only. The same facts are in each slot's accessible
  name, focus opens the card as hover does, and below 760px the card is off
  and the slot cards carry the sizes on their face.

  No CTR figure. A benchmark belongs to a unit, not to a position on a
  page, and averaging them per slot would imply a claim the data does not
  support.

- 2026-09-09, and the card rides the pointer. Anchored to the middle of a
  slot it could sit a long way from where the visitor was looking: the side
  rail is 270px tall and the page skin runs the whole height of the frame.
  It now sits 18px off the cursor and follows it, flipping to the other
  side or the other corner rather than leaving the window. The pointer is
  read once per painted frame, in the same loop that drives the frame tilt,
  rather than once per move event.

  Following the cursor means it does overlap the slot it describes, which
  is what a cursor tooltip does and is not a problem while it takes no
  pointer events. The earlier rule against covering the slot still governs
  the keyboard path: a keyboard has no cursor, so focus anchors the card
  beside the slot, flipped where there is no room and set above a slot that
  spans the frame.

- 2026-09-09, the samples get one fill rule, and hover zooms them.

  Half the miniatures painted their creative as a flat colour and half as
  a gradient, which read as two design systems sharing a grid. There are
  two surfaces now and no third answer: a creative panel is a flat
  `--fp-tint-strong` (the hero, the masthead, the interstitial, the
  expandable, the balloon's full state) and a video surface is a flat
  `--color-neutral-8` (the in-banner video, the big player, the TikTok
  card). The page skin, which had been a brand-to-tint gradient, is a flat
  `--fp-brand`. Gradients survive only where one is drawing a thing rather
  than colouring it: the close cross, the wheel's segments, and the sheen
  that sweeps past. Nine gradients came out; three stayed.

  Going live used to wash the stage with `--fp-tint`, which said something
  had happened without saying look here. It now scales the stage to 1.14,
  which is what closes the 6% margin the faux page leaves either side, so
  the sample grows to fill the frame and the wrap clips the overflow. The
  ground behind it no longer changes colour at all. Reduced motion keeps
  the sample at rest size.

- 2026-09-09, and the zoom settles at 1.10. Two passes got here. Pushing
  the sample to fill the frame edge to edge cropped the faux browser bar
  off the top, which is the thing that says a page is a page, so that came
  out. The plain 1.14 that remained closed the sides exactly and left a 5px
  band along the top, which read as one side gone wrong rather than as a
  margin. At 1.10 the ground shows on every side — 6px at the sides, 8px at
  the top, measured — the browser bar keeps its full 15px, and the sample
  still visibly grows. A margin on four sides is a frame; a margin on one
  is a mistake.

- 2026-09-09, the card tilt came back from the dead. The catalogue cards
  stopped tilting under the pointer and nothing threw. The frame tilt added
  for the placement picture declared `var tiltFrame = null` in the same
  scope as the card tilt's own `function tiltFrame()`, further down the
  file, so the assignment quietly overwrote the hoisted function and
  `requestAnimationFrame(tiltFrame)` was handed null from then on. Every
  visible symptom pointed elsewhere — the class was applied, the handlers
  fired, the transition was in place, only the inline transform was never
  written. The variable is `hotFrame` now, with a note saying why.

  Worth recording as a shape: one long IIFE holding every behaviour on the
  page means a name taken twice is not a redeclaration error, it is a
  feature going missing.
