# Choosing from a rate card

**Date:** 2026-10-05 · **Page:** `pages/planner.html` · **Data:** `shared/tv-ratecard.js`

A note for whoever carries this into the production build. It explains
what was wrong with the Video media mix, what replaced it, and the one
contract you need to match when you point it at the real feed.

---

## What was wrong

The media mix shelf renders each available format as a chip. That is the
right control for what it was designed for: a short label like
"Leaderboard" or "MREC", eight or so per channel.

Video is not that. Every Video row is four fields:

    channel · spot type · timebelt · rate per 30s

and there are 176 of them. Put four fields in a chip and you get a
sentence; put 176 sentences in a row and you get a wall. Concretely, four
things break at once:

1. **Nothing aligns.** Chips size to their content and wrap, so the rate,
   the one number a planner is comparing on, lands at a different place
   on every row. There is no column for the eye to run down.
2. **The loudest text carries the least information.** "TVC Spot" is
   printed a few hundred times and "Astro Ria" fourteen times. What
   actually distinguishes one line from another, the timebelt and the
   rate, is buried mid-sentence.
3. **There is no way in.** No search, no filter. Finding "Astro AEC,
   prime, about RM 9,000" means reading hundreds of near-identical
   strings.
4. **"+168 more" is a trapdoor.** One click turns a tidy block into a
   seventy second scroll.

None of that is a styling problem, so none of it is fixable by styling.
The container is wrong.

## What replaced it

Three moves, in order of how much they matter.

**A table, not chips.** Four fields get four columns. The rate is
right-aligned with tabular numerals so prices compare straight down the
column. The channel is printed once as a group header, with its monthly
reach and its line count, instead of once per line. This alone removes
most of the noise.

**Search and two facets above it.** The search box matches across
channel, spot type, timebelt, daypart and genre, and every term has to
land, so `ria prime` narrows to ten lines rather than widening to
everything containing either word. The facets are daypart and genre,
each chip carrying its own count. Typing `ria prime` takes 176 lines to
10; clicking **Prime** takes it to 66.

**Browsing moved out of the mix section.** The mix section shows what is
*in the plan*. Picking from a rate card is a separate act, so it opens
in a panel over the page. What stays inline is one button, four
suggested lines (one per channel, biggest reach first, so four short
chips stand for four channels rather than four near-identical sentences
off the same one), and an honest count:

> 176 of 176 lines still out · 81 channels · RM 2,500 to RM 20,000 per 30s

The panel is an editor, not an adder: it opens with the plan's current
lines already ticked, so removing a line does not mean hunting for it a
second time somewhere else.

Everything is the DLS's own `c-table` system, including the checkbox
column, the sort headers and the sticky head. The only page-local rules
are the group row, the tabular rate column and the panel's height.

### Worth keeping when you port it

- **Checkboxes stay visible.** The DLS table reveals a row's checkbox on
  hover because selection is usually secondary there. Here it is the
  entire point of the screen, so every box carries `force-visible`.
- **Ticking a box repaints that row, not the table.** Rebuilding all 257
  rows to tick one drops the checkbox the keyboard is sitting on, which
  strands you halfway down the list. See `syncCardSelection()`.
- **The picker turns on from the shape of the data, not a row count.**
  `isCardChannel()` asks whether a channel's formats carry a `line`
  object. Plain format names keep the chip shelf, which is still the
  right control for them. Nothing is hardcoded to "Video".

## The data contract

`shared/tv-ratecard.js` holds the real card, transcribed on 5 Oct 2026
from `RUNS_ON_CHIPS.md`, which was read out of the production database.
86 channels, 176 buyable lines, 81 of them with something to buy. The
channel census, the channel numbers, the segments and every line's
entitlement, timebelt, days, pricing category and 30 second price are
production's own, and the derived figures agree with production exactly:
81 buyable and 5 grey channels, 8 with no published reach, and a segment
split of English 20, Chinese 14, Indian 13, Sports 10, Malay 7, News 7,
not stated 5, GenNext 5, Korean 5.

One row per buyable line:

```js
{ id, ch, ent, belt, days, cat, rate, daypart }
```

| field | meaning |
|---|---|
| `ch` | **channel number**, which is how production joins a line to a channel |
| `ent` | entitlement, what is being sold |
| `belt` | timebelt or programme |
| `days` | which days it runs |
| `cat` | pricing category off the TV rate card, "x13" |
| `rate` | ringgit for a 30 second spot |
| `daypart` | **derived, see below** |

Channels carry `{ id, no, name, reach, segment, lines }`.

**Join on the number, never the name.** Two brands appear twice under
two numbers, because the rate card and the Brand Profile library
disagree: Zee Cinema (251, buyable, no reach) and Z Cinema (117, grey,
1,600,000); Astro Tutor TV (601, buyable, no reach) and Tutor TV (603,
grey, 314,000). Keyed by name they would collide into one.

`daypart` is the only field the feed does not carry. It is derived in
the generator by the **midpoint of the timebelt**, which is coarse but
survives every shape in the card: a point in time ("7.45pm"), a belt
that runs past midnight ("9pm - 1am"), a full day, and the programme
buys that name a competition instead of a clock. Prime is a midpoint
from 6pm to 11pm, Late from 11pm to 6am, Daytime otherwise; anything
starting "ROS" or spanning a full day is Run of schedule, and anything
matching a competition is a Programme buy. Replace the whole thing the
moment the feed grows a real classification.

**Source oddities are preserved on purpose**, because hiding them would
hide a data problem: Astro Ceria's timebelt of `d`, Astro Prima's
`12pm - 12pm`, channel 550 whose name is the sentence "Love Nature
Commercial buy is not available on Love Nature 4K channel", and the
inconsistent spacing in `10pm -11pm` and `6pm -12am`.

### The one thing still to fix when you port it

**CPM is directional.** The card prices a 30 second spot, not a thousand
impressions. To keep the existing split, forecast and booking machinery
working without a special case, each line gets a CPM scaled from the old
single Video CPM of 3.26 against the card's median rate. It is a
placeholder and nothing else in the picker depends on it. Compute it
from real per-spot delivery when you have it.

## The "Runs on" chips are now redundant

Production draws 86 chips under **Runs on** in the Video block, each
naming a channel, its monthly reach and its line count. They are labels,
not buttons: clicking one does nothing. They are also the second half of
the long scroll, and they repeat what is already on screen, because the
picker's group header carries exactly the same three facts for every
channel that has something to buy.

The only thing the chips say that the group headers cannot is that five
channels exist but carry no priced line. That is one sentence, and it
now sits under the table:

> 5 more channels carry no priced line and cannot be bought: Astro Arena
> Bola 2, Astro Premier League 2, Astro Premier League 3, Z Cinema,
> Tutor TV.

So the Video block can drop the chip row entirely and lose nothing. Web
is a different case and should keep its own chips: those are clickable
must-buy pins, not labels.

## What else changed

Expanding Video from one format to 176 pushed the AI catalogue from
6KB to 30KB, over the endpoint's 24KB cap, which would have returned
`400 catalogue did not parse` on every assistant call. Video now travels
as its own card, grouped so a channel is named once rather than once per
line, which brings it to 16.4KB; the cap moved to 40KB for headroom. See
`aiCatalogue()` in the page and the `VIDEO RATE CARD` block in
`api/_prompt.mjs`. The model is told the rate is per 30 second spot and
is not a CPM.

## Known soft spots

- The budget-by-format bar on the summary step draws one segment per
  format. Its legend is per channel, so long line names never reach it,
  but a mix of fifty-odd lines would make the segments slivers. It has
  not been redesigned for that.
- Sorting by rate drops the channel grouping and shows a flat list, by
  design: grouping and a global price sort fight each other.
- The card is a transcription with a date on it, not a feed. It goes
  stale the moment Sales re-syncs. Point it at the real endpoint rather
  than re-transcribing.
