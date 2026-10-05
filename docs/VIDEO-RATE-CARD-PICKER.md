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

`shared/tv-ratecard.js` is the only thing to replace. One row per
buyable line:

```js
{ id, ch, spot, belt, rate, daypart }
```

| field | meaning |
|---|---|
| `ch` | channel id, joins to `TV_RATECARD.channels` |
| `spot` | what is being bought, "TVC Spot", "Animated Bug" |
| `belt` | timebelt or programme, "6pm - 10pm", "Liga Super Malaysia" |
| `rate` | ringgit per 30 second spot |
| `daypart` | **derived, see below** |

`daypart` is the only field your feed does not already carry. It is
derived from `belt` by a small set of patterns so the picker has
something coarse to filter on. If the feed ever grows a real
classification, use that instead and delete the guesswork.

Channels carry `{ id, name, reach, genre }`. `genre` drives the second
facet; `reach` drives both the group header and the default ordering.

### Two things to fix when the real data lands

1. **CPM is directional.** The card prices a 30 second spot, not a
   thousand impressions. To keep the existing split, forecast and
   booking machinery working without a special case, each line gets a
   CPM scaled from the old single Video CPM of 3.26 against the card's
   median rate. It is a placeholder. Compute it from real per-spot
   delivery when you have it. Everything else about the picker is
   independent of this.
2. **The rates on the smaller channels are reconstructed.** The channel
   census, being name, monthly reach and line count, is read off the
   production build and is accurate; so are the rates on the channels
   large enough to read in the recording. The rest are plausible rather
   than authoritative. Nobody should quote a number out of this file.

## What else changed

Expanding Video from one format to 176 pushed the AI catalogue from
6KB to 30KB, over the endpoint's 24KB cap, which would have returned
`400 catalogue did not parse` on every assistant call. Video now travels
as its own card, grouped so a channel is named once rather than once per
line, which brings it to 15.5KB; the cap moved to 40KB for headroom. See
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
