# Handover: the Video media mix, 5 Oct 2026

One round of work, one problem: **choosing from the Video rate card was
unusable.** This is what changed, why, and what a person picking it up
needs to know before they change it again.

- **Live:** https://collab-media.vercel.app/pages/planner.html, step 3
- **Branch:** `collab-ai-live`, five commits, `cac4114..89163db`
- **The reference doc:** `docs/VIDEO-RATE-CARD-PICKER.md` says how the
  thing works and what to swap when it meets the real feed. This file
  says what happened and what to watch.

---

## 1. The problem

A 70 second screen recording of the production planner scrolling, and
not reaching the end, through the Video block.

Every Video row is four fields, `channel · entitlement · timebelt ·
rate per 30s`, and there are 176 of them. They were rendered as chips,
which is the right control for a short label like "Leaderboard" and the
wrong one for a four field record. Four things broke at once:

1. **Nothing aligned.** Chips size to their content and wrap, so the
   rate, the one number being compared, landed somewhere different on
   every row. No column for the eye to run down.
2. **The loudest text carried the least information.** "TVC Spot"
   printed a few hundred times, "Astro Ria" fourteen times.
3. **No way in.** No search, no filter.
4. **"+168 more" was a trapdoor.** One click turned a tidy block into
   the scroll in the recording.

Below that sat 86 **Runs on** chips, labels rather than buttons, which
were the second half of the same scroll.

None of this is a styling problem, so none of it was fixable by
styling. The container was wrong.

## 2. What shipped

| | |
|---|---|
| `6bd729e` | A table instead of a chip wall: four columns, search, two facets, the picker panel |
| `04e58d8` | The rate card aligned with production, line for line, from `RUNS_ON_CHIPS.md` |
| `f680bae` | The panel folds out of its button; channels get a mark |
| `33e678e` | Real Astro channel logos, monogram kept as the fallback |
| `89163db` | Runs on dropped where there is no pool; logo tile radius tightened |

**Files:** `pages/planner.html` (the picker, +635 lines),
`shared/tv-ratecard.js` (new, the card), `api/_prompt.mjs` and
`api/plan.mjs` (the assistant, see §5), plus the two docs.

**The shape of the fix.** Four fields get four columns. The channel is
printed once per group, with its logo, reach and line count, instead of
once per line. The rate is right aligned with tabular numerals so prices
compare straight down. A search box matches across every field and
requires every term to land, so `ria prime` narrows to 10 of 176 rather
than widening. Two facets, daypart and segment, each carrying its own
count. Browsing moved into a panel; what stays inline is a button, four
suggestions and an honest count.

## 3. The decisions someone will want to undo, and why not

**The picker turns on from the shape of the data, not a row count.**
`isCardChannel()` asks whether a channel's formats carry a `line`
object. Nothing is hardcoded to "Video", and a channel of plain format
names keeps the chip shelf, which is still right for it. If you add a
second rate card channel it will just work.

**Checkboxes are always visible.** The DLS table reveals a row's
checkbox on hover because selection is usually secondary there. Here it
is the entire point of the screen, so every box carries
`force-visible`. Do not "fix" this back to the component default.

**Ticking a box repaints that row, not the table.** `syncCardSelection()`
updates the row, its group header and the footer in place. Rebuilding
all 257 rows to tick one drops the checkbox the keyboard is sitting on
and strands you halfway down the list. This was found by testing, not
by reading.

**The panel is an editor, not an adder.** It opens with the plan's
current lines already ticked, so removing a line does not mean hunting
for it a second time somewhere else. That is why the primary button
changes between "Use these 6 lines" and "Take Video out of the mix".

**The logo tile is light, and landscape.** Many Astro marks carry their
own solid background, but AXN, BBC News, HISTORY, Astro Vaanavil and
Arena Bola are dark artwork on a transparent ground and vanish on
anything dark. Checked against white, a DLS tint and near black before
choosing. The artwork is 144x80, so a square tile shrinks it to nothing.

**The tile radius is a bare 4px.** The only place in this work that
steps outside the DLS token scale. `--radius-sm` is 12px, which on a
28px tile is almost a pill and fights the squared off corners of the
artwork inside it. There is no token below 12px. Flagged here rather
than left to be discovered.

**Runs on is dropped where there is no site pool.** Not a list of
channel names: Video and Audio have no pool, and Audio's row only ever
read "bought as airtime, no site pool to pick from", a label with
nothing under it. Web, Social and OTT keep theirs, because those chips
are clickable must-buy pins rather than labels.

## 4. What is real, what is not

This matters more than anything else in this file.

| | Status |
|---|---|
| Channel census: names, numbers, monthly reach, segments, line counts | **Production's own**, from `docs/RUNS_ON_CHIPS.md`, read out of the production database on 5 Oct 2026 (Collab: Sales data of 26 Aug 2026) |
| Every line: entitlement, timebelt, days, pricing category, 30s price | **Production's own**, same source |
| Channel logos | **Astro's own**, referenced from the public channel guide's CDN, not copied in |
| `daypart` | **Derived here.** Nothing upstream carries it |
| Per line CPM | **Placeholder.** Directional only |

The derived figures agree with production exactly: 86 channels, 176
lines, 81 buyable and 5 grey, 8 with no published reach, and a segment
split of English 20, Chinese 14, Indian 13, Sports 10, Malay 7, News 7,
not stated 5, GenNext 5, Korean 5.

**The two to fix when this meets the real feed.** `daypart` is derived
from the midpoint of the timebelt, which is coarse but survives every
shape in the card, including a point in time, a belt running past
midnight, a full day, and the programme buys that name a competition
instead of a clock. Replace it the moment the feed grows a real
classification. And the per line CPM is scaled from the old single Video
CPM of 3.26 against the card's median rate, because the card prices a 30
second spot rather than a thousand impressions; nothing in the picker
depends on it, but **nobody should quote it.**

**Join lines to channels by number, never by name.** Zee Cinema (251)
and Z Cinema (117), Astro Tutor TV (601) and Tutor TV (603) are each two
numbers for one brand and collide if keyed by name.

**Source oddities are preserved on purpose**, because tidying them would
hide a data problem: Astro Ceria's timebelt of `d`, Astro Prima's
`12pm - 12pm`, channel 550 whose name is a whole sentence, and the
inconsistent spacing in `10pm -11pm`.

## 5. The regression this nearly shipped

Expanding Video from one format to 176 pushed the AI catalogue from 6KB
to 30KB, past the endpoint's 24KB cap. Every assistant call would have
returned `400 catalogue did not parse`. Video now travels as its own
card, grouped so a channel is named once rather than once per line,
which brings it to 16.4KB; the cap moved to 40KB for headroom.

A second bug came out of printing the rendered prompt rather than
trusting the patch: inserting `days` shifted the column indices, so the
model was being told `RM Mon - Sun /30s`. **If you add a field to a
line, print the prompt and read it.**

## 6. Interaction and motion

**Opening.** The panel folds out of the button that opened it, reusing
`p-fold-open` and `p-fold-close` and the same measure the trigger trick
as the why, thread and brief sheets, so the page has one motion language
rather than two. Only the shell moves; the backdrop fades. 0.8s out,
0.55s back, `cubic-bezier(.25,.9,.35,1)`, `transform-origin: 0 0`.

Two guards, both from testing:

- The fold is **skipped when the trigger is off screen**. Folding from a
  point past the bottom of the page is not a fold, it is a shape flying
  in from nowhere. Measured `dy: 2673px` once, which is what prompted it.
- `instantMotion()` (reduced motion, or a backgrounded tab) **shows the
  backdrop at once** rather than on a 20ms timer, which was flashing it
  empty for a frame.

**Search** is instant, every term must land, and it matches channel,
entitlement, timebelt, daypart and segment. **Facets** are multi select
within a row and AND across rows. **Sorting by rate** drops the channel
grouping and goes flat, by design: grouping and a global price sort
fight each other.

**Keyboard.** Space and Enter work on any checkbox cell and on the sort
headers, Escape closes the panel, and focus lands in the search box
after the fold rather than during it, or it scrolls the page mid
animation.

**Lazy loading** is on for the 80 logos; only visible rows fetch. A
logo that fails to load is swapped for its monogram by a capturing
`error` listener, because image errors do not bubble, so the list
degrades instead of going blank.

**Accessibility.** The channel mark is `aria-hidden` either way, because
the name sits right beside it. The monogram is near black on its tint
rather than the tone's own colour, which at 11px would run as low as
1.8:1 for amber on cream. The tint is a hint and not a legend: the
Segment facet is the real signal, and five DLS tones have to cover eight
segments.

## 7. Not done

- **Production's own 86 Runs on chips** can go on the same grounds the
  prototype's did. They are labels, they repeat what the group headers
  now carry, and they are the second half of the scroll in the
  recording. The only thing they say that a group header cannot is that
  five channels carry no priced line, which is one sentence and already
  sits under the table.
- **The budget by format bar** on the summary step draws one segment per
  format. Its legend is per channel, so long line names never reach it,
  but a mix of fifty odd lines would make the segments slivers. Not
  redesigned for that.
- **The card is a transcription with a date on it, not a feed.** It goes
  stale the moment Sales re-syncs. Point it at the real endpoint rather
  than re-transcribing it.
- **Logos are referenced, not vendored.** If Astro moves the CDN they
  break, and the monogram fallback catches it. Downloading the 80 files
  and repointing `logo` at a local path is a one line change.

## 8. Checking it yourself

```bash
npm install
node --env-file=.env.local scripts/dev-server.mjs   # http://localhost:8797
node --test test/*.test.mjs                         # 85 tests
```

Then open the planner, fill the brief enough to unlock step 3, and in
the Video block press **Browse the rate card**. Worth trying:

- type `ria prime`, expect **10 of 176 lines**
- type `aec prime`, expect **11 of 176**
- click the **Prime** daypart chip, expect **66 of 176**
- tick a group header checkbox, expect every line shown on that channel
  to tick and the footer to total them
- sort by **Rate /30s**, expect the grouping to drop and a flat list
- look for **BBC Lifestyle**, the one channel with no logo, and expect
  the monogram `BL`

A caveat on how this was verified: screenshots through the automated
browser were unreliable, because the pane reports `document.hidden` and
stops compositing, which also trips the page's own instant motion guard.
Behaviour was checked by reading the live DOM and computed styles on the
deployed site, which is the firmer check. **The fold animation itself was
never watched running.** The CSS was proved to resolve correctly and
the JS mirrors `openBrief`, which works, but a human should look at it
once.
