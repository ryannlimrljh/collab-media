# Audiences & Ad formats — handover

**UX, interaction and design execution.** The two catalogue pages under
General. What they do, why they do it that way, and the rules worth keeping
if you change them.

For plumbing — data shapes, sources, deploy — see `HANDOVER.md` and the two
design notes, which carry a dated log of every pass:

- `docs/superpowers/specs/2026-09-07-formats-catalogue-design.md`
- `docs/superpowers/specs/2026-09-08-audiences-catalogue-design.md`

| | Ad formats | Audiences |
|---|---|---|
| Route | `pages/formats.html` | `pages/audiences.html` |
| Holds | 49 ad units, 6 families, 8 page slots | 51 segments, 8 groups, 3 lenses |
| Opens on | a drawing of a page with its ad slots marked | a jar of discs, one per segment |
| Deep links | `?slot=<key>`, `?f=<id>`, `?tab=catalogue` | `?a=<id>`, `?tab=cards` |
| Tray holds | 4 (compare) | 5 (reach) |

---

## 1. The shared grammar

Both pages are the same instrument played twice. A change to one usually
belongs in the other.

**A picture before a list.** Neither page opens on rows. Ad formats opens on
a drawn browser and phone with eight ad slots marked where they really sit;
Audiences opens on a jar that segments pour into. Both answer "what is
there?" before "which one?". Both are also an entry point rather than
decoration — clicking a slot filters the catalogue below it, clicking a disc
opens that segment.

**One filter line.** Search, then group/objective chips, then facet pills,
then sort and a view toggle. Chips carry counts. An applied-filter tray sits
under the line with removable chips. Same markup, same behaviour, same
overflow fades on both pages.

**Two views over one list.** Gallery of cards ⇄ table of rows, remembered in
`sessionStorage`. The table keeps the gallery's promise: hovering a row
floats its sample/portrait beside the table rather than making you switch
back.

**A drawer, not a page.** Opening anything swings a panel out of the thing
you clicked and back into it on close. Prev/next with arrow keys, a deep
link in the URL, and a hand-off into `planner.html`.

**A tray you fill, then act on.** Compare up to four formats; gather up to
five segments for reach. Both are session-scoped, both float at the bottom,
both open a sheet.

**Arrival.** Bones first, then the real thing cascades in. The bones wear the
real components' classes so they occupy the exact space the content will —
see §5.

---

## 2. Ad formats

### The placement picture

A desktop browser and a phone, drawn as wireframe furniture, with eight slots
marked: masthead, page skin, side rail, in-article, in-player, sticky footer,
full screen, in-feed.

- **Each slot demonstrates itself on hover.** The masthead drops from above,
  the rail slides in from the right, the sticky bar rises from the bottom of
  both frames, full screen wipes a sheet across both at once. The page skin
  widens both gutters from 42 to 124px and squeezes the story column from
  934 to 770 — which is what a skin actually does to a page. Everything else
  dims to 30%.
- **Keyframes, not transitions**, so a backgrounded tab still plays them.
- **A card rides the cursor** (`.fm-plcard`, fixed, 268px, `pointer-events:
  none`): sizes, devices, how many of the 49 fit the slot and how many were
  built for it. It sits 18px off the pointer and flips rather than leaving
  the window. Focus anchors it beside the slot instead, since a keyboard has
  no cursor — and then it must never cover the slot it describes.
- **No CTR per slot.** A benchmark belongs to a unit, not to a position on a
  page; averaging them would imply a claim the data does not support.
- **Clicking filters and scrolls** to the filter line, so you land on your own
  "Placement: …" chip and the first row of results. Clicking the same slot
  again releases it and stays put.
- **The picture takes the first fold.** `fitFold()` sizes the browser frame to
  whatever is left under the header, clamped 430–760px, and the spare height
  goes into the ad slots rather than into a gap. Re-fits on resize and via a
  `ResizeObserver` on the scrolling box.
- **Below 760px** the drawing steps aside and the eight slots become
  full-width cards. Those cards are the keyboard path and the legend at every
  width — nothing here is hover-only.

### The samples

Every card carries the unit *doing its thing* — a faux page or phone with the
unit where it really sits. 38 engines cover 49 units.

- **Sizes are `em`-based off a 10px stage**, so one markup renders at card
  (10px), drawer (14px), thumbnail (6px) and compare (9px).
- **Animation is gated on `.is-live`** — forty stages at rest cost nothing.
- **Two fills, no third answer.** A creative panel is flat `--fp-tint-strong`;
  a video surface is flat `--color-neutral-8`. Gradients survive only where
  one draws a thing rather than colours it.
- **Flat is the resting state.** The moment a sample plays, its creative
  surfaces turn from flat into a gradient running from the family's colour to
  a partner picked *by eye*, not by walking the wheel — amber→green spent its
  middle in yellow-green and looked dirty. The six: navy→purple,
  orange→amber, salmon→purple, green→navy, amber→salmon, purple→navy.
- **The CTA stays flat.** It is the one place carrying white text, and a ramp
  under 3px type is a legibility problem, not a flourish.
- **Dark shapes use `--fp-ink`** (the family's colour at 40% of near-black),
  not `--color-neutral-9`, which read as a hole punched in the panel.
- **Going live scales the stage to 1.10**, not a colour wash. 1.14 closed the
  sides exactly and left a 5px band on top, which reads as one side gone
  wrong; at 1.10 the ground shows on all four sides and the browser bar keeps
  its full 15px. A margin on four sides is a frame; a margin on one is a
  mistake.

### The catalogue

Objective chips mirror kult.my's own vocabulary; facet pills cover family,
size and device. **A size filter answers the real planner question** — "what
fits the 300×250 I already have?"

**Search matches a unit's *home* slot only.** Typing "masthead" returns the
three units sold for it, not the twenty-eight that merely fit it. The picture
is how you ask what fits.

**A catalogue filter releases the placement.** Holding a slot and a filter at
once quietly shrinks the answer, and someone who has scrolled past the
picture cannot see why. Reaching for search, a chip or a facet drops the
slot; *clearing* a filter does not, since that is not a new question.

---

## 3. Audiences

### The jar

51 segments as flat discs poured in under real gravity (Verlet, fixed 1/60s
clock so a fall takes the same real time at any frame rate).

- **Colour is the category, taken from the illustrations** — sampling the
  dominant saturated colour of all 51 artworks gave eight readings, one per
  category, each landing on a DLS colour. `cat-<group>` sets `--au-color` and
  everything derives from it: the pill, the bars, the group chip, the disc.
- **Size is the radius.** The fill only whispers it (a narrow 56–70% mix into
  white), because the radius already says it and a wide ramp destroyed the
  labels — see §6.
- **A lens grows what matters.** Switching lens never re-pours: relevant discs
  grow where they sit and shove the rest aside; the rest shrink to marbles
  and go **neutral grey**, so colour in the jar always means category, never
  lens.
- **Stirring.** The pointer is a hand that pushes discs — but only once it has
  travelled 4px. Below that it is a click. See §6.
- **Every pour is different.** Each build takes its own seed, moving only
  where a disc starts and how long it waits. Sizes never move, and the wait
  stays under the 20ms between discs so the lens-then-group order still
  decides who lands first.

### The headline number

A stat block centred over the jar: an eyebrow, then the figure in Mulish 900.

- **It is labelled "combined reach · N segments · sizes overlap"**, never
  "total audience". These are audience-scale figures that overlap heavily —
  all 51 sum to 577.7M against a 16.15M addressable universe. See §8.
- **The jar counts itself.** A disc joins the sum once it has come to rest, so
  the number climbs as the audience piles in — roughly 15% of the total a
  second in, 85% at 2.3s, all of it by 4s. Filters tween instead.
- **The label sits above the figure**, not below. Discs pile up from the
  floor, so the lowest thing in the block is what meets them, and 56px of
  Mulish 900 survives landing on a pastel disc where an 11px caption does not.
- **The jar reserves the band.** `padTop` is measured from the headline's own
  height, so the discs settle under it. Headroom is not the page's to assume —
  the reach tray lifts the pile 68px, and closing it lets the discs grow.

### The segments

Cards with a drawn illustration per segment that plays a silent clip on
hover, revealing total audience and media mix as bars. Same tilt, drawer and
tray as Ad formats.

---

## 4. Design execution

**Colour.** One hue per category/family, derived from the artwork, never
invented. Grey means out of scope (dimmed discs, muted cells). Obsidian is
the only action colour. **Slots are navy, deliberately not a family colour** —
a slot is a position on a page and a family is a kind of ad, and the two must
never read as the same axis.

Semantic hues are reused as categorical ones (red = Sports, green =
Ethnicity, amber = Income). Acceptable here: every use is labelled with text,
and the formats page set the precedent. Watch only where they meet a status
colour in the same view.

**Type.** Mulish throughout, applied once at `shared/shell.css:12` from
`--font-primary`; neither page overrides it. Headings 800. The jar's figure
is the one 900 on either page. `--tracking-eyebrow` for the uppercase labels.
Source Serif 4 is in the font request but used nowhere — either drop it or
use it.

**Motion.** Demos take the DLS reveal pair (`--duration-reveal` 550ms on
`--ease-reveal`) because a demonstration wants time to be read. Fills and
dims stay quick (220ms / 360ms) because a colour change is an answer to the
pointer, not a performance. Re-sorts stagger at 38ms; filters at 22ms — the
wider wave is what makes a reshuffle read as a re-sort rather than a flicker.

**Tilt.** Cards tilt 4°. The placement picture tilts **3°**, less than the
cards, with perspective at 2400px — the opposite of the instinct. A thumbnail
can lean; a picture you aim at cannot, because the same angle that flatters a
card slides a 4px target out from under a still pointer. Measured: at 7° a
corner of the page skin travelled 26px between flat and full tilt; at 3° it
travels 7. Each device tilts on its own axis — a browser and a phone on a
desk do not share a hinge.

---

## 5. Skeletons

The bones wear the real components' classes, so real CSS produces the
heights and nothing jumps on arrival.

- Card bones use `.au-stage` (keeps its 4/3 at any column width) and
  `.au-swap` (fixed 96px). Titles run one, two or three bars because real
  names run one to three lines — bone cards measure 352/368/388, exactly as
  the real ones do.
- Filter bones are the **real chips with the ink taken out**, so every pill is
  its own label's width and the row wraps where the real row wraps. No widths
  to maintain.
- The jar sizes itself before the bones go in, and the disc bones rest on the
  floor the real discs settle on.
- The Segments tab's bones are the card grid whatever view is saved — a card
  carries the shape of a segment; a row of bars carries a spreadsheet.

---

## 6. Interaction laws, and the symptom that taught each

Keep these. Each cost real debugging time.

**Never animate a hit box.** Ad formats' slot demos moved the button itself:
hovering the masthead sent it out from under the cursor, the state cleared,
it snapped back, and the cycle repeated. The button is now a hit box that
never moves or paints; everything visible lives in a `.in` span inside it.
The audiences glass bubbles taught the same lesson first.

**Do not switch interaction state on pointerdown.** Everything the jar's stir
needed — discs going pointer-transparent, the pointer capture, the hand —
fired on press. A click on a disc then landed its press on the disc and its
release on the jar behind it, so the browser reported the click against their
common ancestor and nothing opened. All three now wait for the 4px that
already defined a stir.

**Never gate a thing on state only that thing updates.** The loop skipped
stepping while it judged the jar settled, and that judgement read
`J.growing` — a flag only the physics writes. A lens handed every disc a new
size without stepping, so a settled jar stayed settled and the lens appeared
to do nothing until you moved the mouse. Ask the discs directly instead. The
headline's tally had the identical shape.

**`el.click()` does not test a click.** It dispatches straight at the element
and never runs the pointer sequence, so it passed while real clicking was
broken. Drive real pointer events when testing pointer behaviour.

**A smooth scroll does not run in a backgrounded tab.** The slot click
filtered the list and appeared to go nowhere. Check a beat later whether
anything moved, and jump if not.

**FLIP must snapshot every card, not just visible ones.** Otherwise any card
arriving from below the fold reads as new and pops, and a filter looks like
the grid was thrown away. Playback stays culled; a card that would streak
more than a viewport arrives from the edge it came from.

**One long IIFE means a name taken twice is a feature going missing.** A
`var tiltFrame` overwrote a hoisted `function tiltFrame()` further down the
file and card tilt silently died, with nothing thrown.

**Bump `?v=` on shared assets or the change does not ship.** Twice a fix
looked like it had done nothing because the browser served the cached module.
Current: formats-data `?v=4`, format-previews `?v=8`/`?v=2`, audience-marks
and audiences-data `?v=5`.

---

## 7. Accessibility & parity

- **Contrast is measured, not eyeballed.** The jar's labels were white on
  pastel: all 48 failed 4.5:1 and 32 missed even 3:1, the worst at 1.58.
  Labels are now a deep shade of each disc's own colour (`color-mix(--au-color
  40%, #000)`), measuring 4.80–5.90. The slot fill is `color-mix(navy 88%,
  #000)` rather than raw navy, because white on raw navy is 4.54:1 — passing
  with nothing to spare at 10–11px.
- **Watch opacity.** The disc count carried `opacity: .85`, which washed it
  back into the fill and undid the contrast the ink had just bought.
- **Touch:** first tap plays/reveals, second opens. Both pages.
- **Keyboard:** cards and discs are real `<button>`s with descriptive
  `aria-label`s; focus does what hover does; Enter opens; `c` toggles compare,
  `r` toggles the reach tray.
- **Reduced motion** is respected in 6–7 places per page: samples show their
  end state, the jar settles instantly, arrivals skip the beat.

---

## 8. Open, and deliberately not done

- **"True" audience size is parked.** Published sizes are not headcounts —
  Malay alone is 17M against a 16.15M universe, and the 10 segments holding
  both numbers show a published→addressable ratio ranging 0.2%–296%. No
  arithmetic over them yields a real number. The only real counts are the 10
  `addressable` values, totalling 7.65M. Decision pending.
- **Planner does not read `?format=` / `?formats=` / `?audiences=`** yet.
- **Export PDF/Excel is a toast.** Live demo links are present but disabled.
- **Source Serif 4** is downloaded on all five pages and used on none.
- **`assets/audiences/`** holds 51 unreferenced kult.my photographs, awaiting
  a call on removal.
- **Standard display unit specs** need a rate-card check before being quoted.
