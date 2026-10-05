# The "Runs on" chips in the media mix

Where every chip under **Runs on** in the planner's Media mix step comes from, what makes it orange or grey, and the full data behind each one. Rebuilt on 5 Oct 2026 from the production database (read-only), using the planner's own code to build the chips, so the names, numbers and colours below are exactly what users see. The data was last copied from Collab: Sales on 26 Aug 2026.

## In short

- Only the **TV** and **OTT** blocks have these chips. The **Web** block shows its sites as a different kind of chip (square, with a pin, clickable, capped with "+N more"). **Radio** and **Social** show a one-line note instead.
- **One chip = one TV channel or one OTT property** that this channel's ads can run on.
- **Orange = there is something to buy on it**: at least one priced line on the rate card. **Grey = no priced line on the rate card**, so nothing in the plan can run there. (All five grey chips today do have a reach figure.)
- **TV shows 86 chips (81 orange, 5 grey)**, all of them, with no "+N more". That is the long scroll in the screenshot. **OTT shows 3 (2 orange, 1 grey).**
- The chips are **labels, not buttons**: clicking one does nothing. Each line in the block above already names its channel or property.

## What a chip says

`● Astro Ria · 7,860,000 monthly · 14 lines on the rate card`

| Part | Example | Meaning |
| --- | --- | --- |
| Dot | ● | Orange chips only. On a grey chip the dot has no colour, so it shows as a small blank gap before the name. |
| Name | Astro Ria | The TV channel or OTT property, as Collab: Sales names it. |
| Reach | 7,860,000 monthly | People reached in a month. TV: Kantar Media DTAM. OTT: Google Analytics unique users from the Digital Brand Profiles deck. Left out when Sales has no monthly figure for it (8 TV chips today). |
| Note | 14 lines on the rate card | How many buyable lines the rate card has on it. Grey chips say "no line on the rate card" (TV) or "no line on the rate card yet" (OTT). |
| Tooltip | Kantar Media DTAM, Total Individual (Universe: 15,262K), Jan-Dec 2025 | Where the reach figure was read from: the source (plus the period when the source does not already say it) for TV, the source plus the deck file and slide for OTT. Chips with no Brand Profile entry (today the 8 without reach) have no tooltip. |

After the last chip, right-aligned in the same row, sits one line of small print. TV says "Monthly reach as Kantar Media DTAM states it (Total Individual universe 15,262K). Each line above names its channel and timebelt." OTT says "Reach as the Digital Brand Profiles deck states it. Each line above names its property."

## Colours and sizes (from the design tokens)

| Chip | Background | Text | Dot | Token |
| --- | --- | --- | --- | --- |
| Orange (buyable) | #FFEEE9 | #FF5825 | #FF5825 | `.c-tag-fire`: `--color-fire-bg`, `--color-orange` |
| Grey (nothing to buy) | #F0F0F0 | #5A5A5A | none (blank gap) | `.c-tag`: `--color-neutral-2`, `--color-neutral-5` |

Both: pill shape (radius 999px), 24px tall, 10px side padding, 12px text, a 6px dot space and 4px gaps. The name and reach are bold (700); only the "· N lines on the rate card" note is regular (400). The row is a grid: an 88px label column ("RUNS ON"), then the chips wrapping with an 8px gap. Code: `frontend/src/styles/collabrium-components.css:390-394` and `collab-planner.css:1088-1108`.

## Where each part comes from

| Part | Table in our database | Where Collab: Sales gets it | How it reaches us |
| --- | --- | --- | --- |
| Name, reach, tooltip | `kult_media_brands` (177 rows) | Sales' Brand Profile library: TV reach from Kantar Media DTAM, OTT reach from the Digital Brand Profiles deck | Copied from the Collab: Sales API by a script an engineer runs by hand (`database/sync_media_brands_inventory_live.mjs`). Last run 2026-08-26. |
| TV lines (the count) | `kult_media_inventory` (2,596 rows across all platforms; the TV rows give the 176 priced lines plus 4 left out) | Sales' Inventory library: the rate-card workbook's spots, by channel, entitlement and timebelt | Same script, same date. |
| TV spot prices | `kult_media_tv_rate_card` (240 rows) | The TV rate card: a price per spot length for each pricing category (x4.5, x8 and so on) | Same script, same date. |
| OTT lines (the count) | `kult_media_inventory` (platform Digital Video, bought by CPM, with a price) | The rate-card workbook's video lines on Stadium Astro, Sooka and Astro GO; YouTube lines are left out | Same script, same date. |

The planner loads these once, when it opens (and again only if someone presses Retry after a failed load): `GET /api/planning-insights/tv-lines` and `/ott-lines`, built by `backend/lib/tvLines.js` and `ottLines.js`. The browser turns them into chips in `frontend/src/utils/tvMix.js` (`tvChannelTags`) and `ottMix.js` (`ottPropertyTags`), and `frontend/src/components/ChannelBlock.jsx:190-206` draws them.

**Which TV lines count.** A rate-card row counts as a line when it is a TV spot bought per spot and its pricing category has a 30-second price on the TV rate card. Lines join their channel by channel number, never by name. Four TV rows are left out: three name another channel instead of a category ("Pricing Category as per Astro Arena Bola", "… as per Astro Premier League"), which is why Astro Arena Bola 2, Astro Premier League 2 and Astro Premier League 3 are grey; the fourth, a "Repeats" line on Astro Premier League, lists several categories at once ("x10, x8, x6, x5"). The server returns these four as unpriced; the chips do not show them.

## The order

Biggest monthly reach first. Channels with the same reach go A to Z, and channels with no reach figure come last. There is no grouping and no cap.

## The shape of the data (for a compact design)

- **86 TV chips.** Reach runs from 7,860,000 (Astro Ria) down to 136,000; 8 chips have no reach figure at all.
- **Lines per TV chip:** 0: 5 · 1: 41 · 2: 27 · 3: 4 · 4: 2 · 5 or more: 7. Most chips stand for one or two lines; a few carry many (Astro AEC 15, Astro Ria 14, Astro AWANI 9).
- **Audience segment of each channel's lines:** English 20 · Chinese 14 · Indian 13 · Sports 10 · Malay 7 · News 7 · not stated (no lines) 5 · GenNext 5 · Korean 5. This is a natural way to group the chips.
- **Sister channels share one reach figure** in Sales' data: Astro Arena and Arena 2 (5,310,000), Arena Bola and Arena Bola 2 (4,420,000), Astro Premier League 1, 2 and 3 (3,740,000).

## Data quirks to know before designing

These come from the Collab: Sales data, not the planner. They show up as chips today.

- **Two channels appear twice.** "Zee Cinema" (channel 251: orange, a line but no reach) and "Z Cinema" (channel 117: grey, 1,600,000 monthly); "Astro Tutor TV" (601: orange, no reach) and "Tutor TV" (603: grey, 314,000 monthly). Lines join channels by number, and the rate card and the Brand Profile library use different numbers for these, so each half becomes its own chip. A priced line whose channel number has no Brand Profile entry becomes a chip named after the rate card's own channel text, with no reach and no tooltip.
- **One chip's name is a sentence from the rate card:** "Love Nature Commercial buy is not available on Love Nature 4K channel".
- **8 orange chips have no reach figure:** Astro FAM Time, Astro Showtime, Astro Tennis, Astro Tutor TV, Love Nature Commercial buy is not available on Love Nature 4K channel, Rock Action, Rock X Stream, Zee Cinema.
- **Reach sources are not all the same.** Most TV figures are Jan-Dec 2025 against a 15,262K universe; 5 channels use a 15,534K universe and 1 uses Jan-Mar 2025. The small print under the chips names only the 15,262K universe.

## TV: every chip

| # | Chip | Channel no. | Monthly reach | Lines on the rate card | Segment | Reach source |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Orange | 104 | Astro Ria · 7,860,000 | 14 | Malay | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 2 | Orange | 105 | Astro Prima · 6,810,000 | 5 | Malay | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 3 | Orange | 801 | Astro Arena · 5,310,000 | 4 | Sports | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 4 | Orange | 802 | Astro Arena 2 · 5,310,000 | 3 | Sports | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 5 | Orange | 108 | Astro Citra · 4,710,000 | 2 | Malay | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 6 | Orange | 803 | Astro Arena Bola · 4,420,000 | 7 | Sports | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 7 | Grey | 804 | Astro Arena Bola 2 · 4,420,000 | 0 | – | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 8 | Orange | 106 | Astro Oasis · 4,400,000 | 2 | Malay | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 9 | Orange | 811 | Astro Premier League · 3,740,000 | 3 | Sports | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 10 | Grey | 812 | Astro Premier League 2 · 3,740,000 | 0 | – | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 11 | Grey | 813 | Astro Premier League 3 · 3,740,000 | 0 | – | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 12 | Orange | 815 | Astro Badminton · 3,670,000 | 2 | Sports | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 13 | Orange | 413 | Astro Showcase · 3,200,000 | 2 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 14 | Orange | 611 | Astro Ceria · 3,000,000 | 2 | GenNext | Kantar DTAM, universe 15,534K, Jan - Dec 2025 |
| 15 | Orange | 701 | AXN · 2,600,000 | 3 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 16 | Orange | 401 | HITS Movies · 2,600,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 17 | Orange | 810 | Astro Grandstand · 2,560,000 | 2 | Sports | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 18 | Orange | 404 | Astro BOO · 2,530,000 | 1 | Malay | Kantar DTAM, universe 15,262K, Jan-Mar 2025 |
| 19 | Orange | 501 | Astro AWANI · 2,400,000 | 9 | News | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 20 | Orange | 203 | Astro Vellithirai · 2,300,000 | 2 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 21 | Orange | 416 | tvN Movies · 2,200,000 | 1 | Korean | Kantar DTAM, universe 15,262K, January – December 2025 |
| 22 | Orange | 112 | Astro Rania · 2,160,000 | 1 | Malay | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 23 | Orange | 202 | Astro Vinmeen · 2,100,000 | 2 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 24 | Orange | 113 | Astro Aura · 1,630,000 | 1 | Malay | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 25 | Orange | 306 | Astro AEC · 1,600,000 | 15 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 26 | Grey | 117 | Z Cinema · 1,600,000 | 0 | – | Kantar DTAM, universe 15,262K, January – December 2025 |
| 27 | Orange | 709 | Asian Food Network · 1,500,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 28 | Orange | 393 | Astro Daebak · 1,500,000 | 2 | Korean | Kantar DTAM, universe 15,262K, January – December 2025 |
| 29 | Orange | 309 | Celestial Movies · 1,500,000 | 2 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 30 | Orange | 216 | KTV · 1,500,000 | 2 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 31 | Orange | 211 | Sun TV · 1,500,000 | 2 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 32 | Orange | 814 | Astro Football · 1,490,000 | 2 | Sports | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 33 | Orange | 201 | Astro Vaanavil · 1,400,000 | 3 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 34 | Orange | 222 | Colors Tamil HD · 1,400,000 | 1 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 35 | Orange | 223 | Zee Tamil HD · 1,400,000 | 2 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 36 | Orange | 703 | Lifetime · 1,300,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 37 | Orange | 214 | Adithya · 1,200,000 | 1 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 38 | Orange | 116 | Colors Hindi HD · 1,200,000 | 1 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 39 | Orange | 212 | Sun Music · 1,100,000 | 1 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 40 | Orange | 707 | TLC · 1,100,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 41 | Orange | 395 | tvN · 1,100,000 | 2 | Korean | Kantar DTAM, universe 15,262K, January – December 2025 |
| 42 | Orange | 311 | Astro AOD · 1,000,000 | 4 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 43 | Orange | 217 | Sun Life · 1,000,000 | 2 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 44 | Orange | 310 | TVB Jade · 975,000 | 6 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 45 | Orange | 555 | HISTORY · 968,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 46 | Orange | 300 | iQIYI HD · 937,000 | 2 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 47 | Orange | 706 | HITS · 916,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 48 | Orange | 392 | KBS World · 910,000 | 1 | Korean | Kantar DTAM, universe 15,262K, January – December 2025 |
| 49 | Orange | 308 | Astro QJ · 905,000 | 2 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 50 | Orange | 321 | Celestial Classic Movies · 897,000 | 1 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 51 | Orange | 553 | Discovery Asia · 896,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 52 | Orange | 305 | TVB Classic · 884,000 | 2 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 53 | Orange | 554 | BBC Earth · 868,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 54 | Orange | 333 | Astro Hua Hee Dai · 831,000 | 5 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 55 | Orange | 552 | Discovery Channel · 826,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 56 | Orange | 396 | K-PLUS · 784,000 | 2 | Korean | Kantar DTAM, universe 15,262K, January – December 2025 |
| 57 | Orange | 215 | Sun News · 765,000 | 1 | Indian | Kantar DTAM, universe 15,262K, January – December 2025 |
| 58 | Orange | 715 | HGTV · 687,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 59 | Orange | 702 | HITS NOW · 682,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 60 | Orange | 618 | Moonbug · 681,000 | 1 | GenNext | Kantar DTAM, universe 15,534K, Jan - Dec 2025 |
| 61 | Orange | 319 | TVB Xing He · 619,000 | 2 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 62 | Orange | 511 | CNN · 604,000 | 1 | News | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 63 | Orange | 316 | CTI Asia · 586,000 | 1 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 64 | Orange | 817 | Astro Sports Plus · 575,000 | 2 | Sports | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 65 | Orange | 325 | Phoenix Chinese Channel · 568,000 | 1 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 66 | Orange | 615 | Cartoon Network · 563,000 | 1 | GenNext | Kantar DTAM, universe 15,534K, Jan - Dec 2025 |
| 67 | Orange | 320 | TVBS Asia · 554,000 | 2 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 68 | Orange | 326 | Phoenix InfoNews Channel · 544,000 | 1 | Chinese | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 69 | Orange | 512 | BBC News · 473,000 | 1 | News | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 70 | Orange | 515 | CNA · 465,000 | 1 | News | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 71 | Orange | 714 | Crime + Investigation · 429,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 72 | Orange | 513 | Al Jazeera English · 424,000 | 2 | News | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 73 | Orange | 717 | BBC Lifestyle · 337,000 | 1 | English | Kantar DTAM, universe 15,262K, January – December 2025 |
| 74 | Orange | 619 | Blippi & Friends · 326,000 | 1 | GenNext | Kantar DTAM, universe 15,534K, Jan - Dec 2025 |
| 75 | Orange | 831 | Astro Golf · 321,000 | 2 | Sports | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 76 | Grey | 603 | Tutor TV · 314,000 | 0 | – | Kantar DTAM, universe 15,534K, Jan - Dec 2025 |
| 77 | Orange | 517 | Bloomberg TV · 298,000 | 1 | News | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 78 | Orange | 516 | CNBC Asia · 136,000 | 1 | News | Kantar DTAM, universe 15,262K, Jan-Dec 2025 |
| 79 | Orange | 412 | Astro FAM Time  | 1 | English | – |
| 80 | Orange | 411 | Astro Showtime  | 2 | English | – |
| 81 | Orange | 819 | Astro Tennis  | 2 | Sports | – |
| 82 | Orange | 601 | Astro Tutor TV  | 1 | GenNext | – |
| 83 | Orange | 550 | Love Nature Commercial buy is not available on Love Nature 4K channel  | 1 | English | – |
| 84 | Orange | 414 | Rock Action  | 1 | English | – |
| 85 | Orange | 415 | Rock X Stream  | 1 | English | – |
| 86 | Orange | 251 | Zee Cinema  | 1 | Indian | – |

## TV: the lines behind each chip

Each line is one buyable spot: what is sold (entitlement), when it airs (timebelt and days), its pricing category and its price for a 30-second spot.

### Astro Ria (14 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 12pm | Mon - Sun | x4.5 | RM 4,500 |
| 1 min AWANI Ringkas + Sponsor Tag On | 12pm - 6pm | Mon - Sun | x8 | RM 8,000 |
| Branded Promo | 12pm - 6pm | Mon - Sun | x8 | RM 8,000 |
| TVC Spot | 12pm - 6pm | Mon - Sun | x8 | RM 8,000 |
| 1 min AWANI Ringkas + Sponsor Tag On | 6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun) | Mon - Sun | x13 | RM 13,000 |
| 1 minute special report coverage | 6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun) | Mon - Sun | x13 | RM 13,000 |
| Animated Bug | 6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun) | Mon - Sun | x13 | RM 13,000 |
| Lower 3rd Bottom Banner | 6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun) | Mon - Sun | x13 | RM 13,000 |
| Opening & Closing | 6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun) | Mon - Sun | x13 | RM 13,000 |
| TVC Inside Program | 6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun) | Mon - Sun | x13 | RM 13,000 |
| TVC Spot | 11pm - 12am | Mon - Sun | x13 | RM 13,000 |
| TVC Spot | 6pm - 10pm | Mon - Thu | x13 | RM 13,000 |
| TVC Spot | 6pm - 12am | Fri - Sun | x13 | RM 13,000 |
| TVC Spot | 10pm -11pm | Mon - Thu | x15 | RM 15,000 |

### Astro Prima (5 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12pm - 12pm | Mon - Sun | x4 | RM 4,000 |
| TVC Spot | 12pm - 6pm | Mon - Sun | x6 | RM 6,000 |
| TVC Spot | 6pm - 12mn | Sat - Sun | x8 | RM 8,000 |
| TVC Spot | 7pm - 12mn | Mon - Sun | x8 | RM 8,000 |
| TVC Spot | 6pm -7pm | Mon - Fri | x14 | RM 14,000 |

### Astro Arena (4 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| 1 min AWANI Ringkas + Sponsor Tag On | Others | Mon - Sun | x6 | RM 6,000 |
| Any | Others | Mon - Sun | x6 | RM 6,000 |
| Any | News and Talk Shows (1st Run) | Mon - Sun | x8 | RM 8,000 |
| Any | All (Live or Delayed) | Mon - Sun | x10 | RM 10,000 |

### Astro Arena 2 (3 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | Others | Mon - Sun | x6 | RM 6,000 |
| Any | News and Talk Shows (1st Run) | Mon - Sun | x8 | RM 8,000 |
| Any | All (Live or Delayed) | Mon - Sun | x10 | RM 10,000 |

### Astro Citra (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 9pm | Mon - Sun | x5 | RM 5,000 |
| TVC Spot | 9pm - 1am | Mon - Sun | x8 | RM 8,000 |

### Astro Arena Bola (7 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | Others | Mon - Sun | x6 | RM 6,000 |
| Any | Asean Championship Mitsubishi Cup, AFC Champions League Elite, AFC Champions League TWO, Asian Cup Championship | Mon - Sun | x10 | RM 10,000 |
| Any | Liga Super Malaysia (Live or Delayed) | Mon - Sun | x12 | RM 12,000 |
| Any | MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Knock Out Stage (Live or Delayed) | Mon - Sun | x12 | RM 12,000 |
| Any | MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Quarter-Finals (Live or Delayed) | Mon - Sun | x15 | RM 15,000 |
| Any | MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Semi-Finals (Live or Delayed) | Mon - Sun | x18 | RM 18,000 |
| Any | MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Finals (Live or Delayed) | Mon - Sun | x20 | RM 20,000 |

### Astro Oasis (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x3.5 | RM 3,500 |
| TVC Spot | 6pm - 12am | Mon - Sun | x5 | RM 5,000 |

### Astro Premier League (3 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | Others vs Others (Live or Delayed) | Mon - Sun | x10 | RM 10,000 |
| Any | Big 6 vs Others (Live or Delayed) | Mon - Sun | x15 | RM 15,000 |
| Any | Big 6 vs Big 6 (Live or Delayed) | Mon - Sun | x20 | RM 20,000 |

### Astro Badminton (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | Others | Mon - Sun | x5 | RM 5,000 |
| Any | All (Live or Delayed) | Mon - Sun | x7 | RM 7,000 |

### Astro Showcase (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x5 | RM 5,000 |
| TVC Spot | 6pm -12am | Mon - Sun | x10 | RM 10,000 |

### Astro Ceria (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | d | Mon - Sun | x5 | RM 5,000 |
| Any | 8am - 6pm | Mon - Sun | x8 | RM 8,000 |

### AXN (3 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x5 | RM 5,000 |
| TVC Spot | 6pm - 9pm | Mon - Sun | x7 | RM 7,000 |
| TVC Spot | 9pm - 12am | Mon - Sun | x10 | RM 10,000 |

### HITS Movies (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Astro Grandstand (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | Others | Mon - Sun | x8 | RM 8,000 |
| Any | All (Live or Delayed) | Mon - Sun | x15 | RM 15,000 |

### Astro BOO (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x3 | RM 3,000 |

### Astro AWANI (9 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| 1 min AWANI Ringkas + Sponsor Tag On | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |
| 1 minute special report coverage | 7.45pm | Mon - Sun | x5 | RM 5,000 |
| Animated Bug | 7.45pm | Mon - Sun | x5 | RM 5,000 |
| Branded Promo | 7.45pm | Mon - Sun | x5 | RM 5,000 |
| Lower 3rd Bottom Banner | 7.45pm | Mon - Sun | x5 | RM 5,000 |
| Lower Third Banner | 7.45pm | Mon - Sun | x5 | RM 5,000 |
| Opening & Closing | 7.45pm | Mon - Sun | x5 | RM 5,000 |
| TVC Inside Program | 7.45pm | Mon - Sun | x5 | RM 5,000 |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Astro Vellithirai (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x4.5 | RM 4,500 |
| TVC Spot | 6pm - 12am | Mon - Sun | x7 | RM 7,000 |

### tvN Movies (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x6 | RM 6,000 |

### Astro Rania (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x3 | RM 3,000 |

### Astro Vinmeen (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 8pm | Mon - Sun | x5 | RM 5,000 |
| TVC Spot | 8pm - 12am | Mon - Sun | x8 | RM 8,000 |

### Astro Aura (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x3 | RM 3,000 |

### Astro AEC (15 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 12pm | Mon - Sun | x4 | RM 4,000 |
| 1 min AWANI Ringkas + Sponsor Tag On | 12pm - 6pm | Mon - Sun | x5 | RM 5,000 |
| Extension 1 minute market spotlight | 12pm - 6pm | Mon - Sun | x5 | RM 5,000 |
| TVC Spot | 12pm - 6pm | Mon - Sun | x5 | RM 5,000 |
| 1 min AWANI Ringkas + Sponsor Tag On | 6pm - 12am (excl. 8pm - 8:30pm & 10:30pm - 11pm) | Mon - Sun | x9 | RM 9,000 |
| Branded Stage with sponsor's logo | 6pm - 12am (excl. 8pm - 8:30pm & 10:30pm - 11pm) | Mon - Sun | x9 | RM 9,000 |
| Extension 1 minute market spotlight | 6pm - 12am (excl. 8pm - 8:30pm & 10:30pm - 11pm) | Mon - Sun | x9 | RM 9,000 |
| Lower Third Banner | 6pm - 12am (excl. 8pm - 8:30pm & 10:30pm - 11pm) | Mon - Sun | x9 | RM 9,000 |
| Opening & Closing | 8pm - 8.30pm | Mon - Sun | x9 | RM 9,000 |
| TVC Spot | 10.30pm - 12mn | Mon - Sun | x9 | RM 9,000 |
| TVC Spot | 6pm - 8pm | Mon - Sun | x9 | RM 9,000 |
| TVC Spot | 8.30pm - 10.30pm | Mon - Sun | x9 | RM 9,000 |
| 1 minute market spotlight (PRIME TALK) | 8pm - 8.30pm | Mon - Sun | x13 | RM 13,000 |
| TVC Spot | 10.30pm - 11pm | Mon - Sun | x13 | RM 13,000 |
| TVC Spot | 8pm - 8.30pm | Mon - Sun | x13 | RM 13,000 |

### Asian Food Network (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Astro Daebak (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 8pm | Mon - Sun | x4 | RM 4,000 |
| TVC Spot | 8pm - 12am | Mon - Sun | x6 | RM 6,000 |

### Celestial Movies (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x4 | RM 4,000 |
| TVC Spot | 6pm - 12am | Mon - Sun | x6 | RM 6,000 |

### KTV (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x4.5 | RM 4,500 |
| TVC Spot | 6pm - 12am | Mon - Sun | x7 | RM 7,000 |

### Sun TV (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x5 | RM 5,000 |
| TVC Spot | 6pm - 12am | Mon - Sun | x8 | RM 8,000 |

### Astro Football (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | Others | Mon - Sun | x5 | RM 5,000 |
| Any | All (Live or Delayed) | Mon - Sun | x8 | RM 8,000 |

### Astro Vaanavil (3 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 8pm | Mon - Sun | x3.5 | RM 3,500 |
| TVC Spot | 8pm - 12am | Mon - Sun | x4.5 | RM 4,500 |
| 1 min AWANI Ringkas + Sponsor Tag On | 12am - 8pm | Mon - Sun | x5 | RM 5,000 |

### Colors Tamil HD (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x7 | RM 7,000 |

### Zee Tamil HD (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x4.5 | RM 4,500 |
| TVC Spot | 6pm - 12am | Mon - Sun | x7 | RM 7,000 |

### Lifetime (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Adithya (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x3.5 | RM 3,500 |

### Colors Hindi HD (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Sun Music (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x3 | RM 3,000 |

### TLC (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### tvN (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 8pm | Mon - Sun | x4 | RM 4,000 |
| TVC Spot | 8pm - 12am | Mon - Sun | x6 | RM 6,000 |

### Astro AOD (4 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 10.30pm - 12am | Mon - Fri | x8 | RM 8,000 |
| TVC Spot | 12am - 8.30pm | Mon - Fri | x8 | RM 8,000 |
| TVC Spot | ROS 12am - 12am | Sat - Sun | x8 | RM 8,000 |
| TVC Spot | 8.30pm - 10.30pm | Mon - Fri | x13 | RM 13,000 |

### Sun Life (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x3.5 | RM 3,500 |
| TVC Spot | 12am - 8pm | Mon - Sun | x4.5 | RM 4,500 |

### TVB Jade (6 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 1pm | Mon - Sun | x4 | RM 4,000 |
| TVC Spot | 1pm - 12am | Sat - Sun | x5 | RM 5,000 |
| TVC Spot | 1pm - 6.30pm | Mon - Fri | x5 | RM 5,000 |
| TVC Spot | 10.30pm - 12am | Mon - Fri | x6 | RM 6,000 |
| TVC Spot | 6.30pm - 8.30pm | Mon - Fri | x6 | RM 6,000 |
| TVC Spot | 8.30pm - 10.30pm | Mon - Fri | x8 | RM 8,000 |

### HISTORY (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### iQIYI HD (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x3.5 | RM 3,500 |
| TVC Spot | 6pm - 12am | Mon - Sun | x6 | RM 6,000 |

### HITS (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x4 | RM 4,000 |

### KBS World (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x4 | RM 4,000 |

### Astro QJ (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x3.5 | RM 3,500 |
| TVC Spot | 6pm - 12am | Mon - Sun | x6 | RM 6,000 |

### Celestial Classic Movies (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Discovery Asia (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x3 | RM 3,000 |

### TVB Classic (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 12pm | Mon - Sun | x3 | RM 3,000 |
| TVC Spot | 12pm - 12am | Mon - Sun | x5 | RM 5,000 |

### BBC Earth (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x3 | RM 3,000 |

### Astro Hua Hee Dai (5 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 12pm | Mon - Sun | x4.5 | RM 4,500 |
| Extension 1 minute market spotlight | 12pm - 6pm | Mon - Sun | x6 | RM 6,000 |
| TVC Spot | 12pm - 6pm | Mon - Sun | x6 | RM 6,000 |
| Extension 1 minute market spotlight | 6pm - 12am | Mon - Sun | x8 | RM 8,000 |
| TVC Spot | 6pm - 12mn | Mon - Sun | x8 | RM 8,000 |

### Discovery Channel (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x4 | RM 4,000 |

### K-PLUS (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 8pm | Mon - Sun | x4 | RM 4,000 |
| TVC Spot | 8pm - 12am | Mon - Sun | x6 | RM 6,000 |

### Sun News (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### HGTV (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### HITS NOW (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x4 | RM 4,000 |

### Moonbug (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | ROS 12am - 12am | Mon - Sun | x3.5 | RM 3,500 |

### TVB Xing He (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x3 | RM 3,000 |
| TVC Spot | 6pm - 12am | Mon - Sun | x5 | RM 5,000 |

### CNN (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### CTI Asia (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x2.5 | RM 2,500 |

### Astro Sports Plus (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | Others | Mon - Sun | x5 | RM 5,000 |
| Any | All (Live or Delayed) | Mon - Sun | x6 | RM 6,000 |

### Phoenix Chinese Channel (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x2.5 | RM 2,500 |

### Cartoon Network (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | ROS 12am - 12am | Mon - Sun | x3.5 | RM 3,500 |

### TVBS Asia (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x2.5 | RM 2,500 |
| TVC Spot | 6pm - 12am | Mon - Sun | x3.5 | RM 3,500 |

### Phoenix InfoNews Channel (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x2.5 | RM 2,500 |

### BBC News (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### CNA (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Crime + Investigation (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x3 | RM 3,000 |

### Al Jazeera English (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Branded Promo | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### BBC Lifestyle (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x4 | RM 4,000 |

### Blippi & Friends (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | ROS 12am - 12am | Mon - Sun | x3.5 | RM 3,500 |

### Astro Golf (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | Others | Mon - Sun | x5 | RM 5,000 |
| Any | Competitive Rounds (Live or Delayed) | Mon - Sun | x8 | RM 8,000 |

### Bloomberg TV (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### CNBC Asia (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Astro FAM Time (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Astro Showtime (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | 12am - 6pm | Mon - Sun | x5 | RM 5,000 |
| TVC Spot | 6pm -12am | Mon - Sun | x10 | RM 10,000 |

### Astro Tennis (2 lines)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | Others | Mon - Sun | x5 | RM 5,000 |
| Any | All (Live or Delayed) | Mon - Sun | x6 | RM 6,000 |

### Astro Tutor TV (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| Any | ROS 12am - 12am | Mon - Sun | x3 | RM 3,000 |

### Love Nature Commercial buy is not available on Love Nature 4K channel (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Rock Action (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x7 | RM 7,000 |

### Rock X Stream (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

### Zee Cinema (1 line)

| Entitlement | Timebelt | Days | Category | 30s spot |
| --- | --- | --- | --- | --- |
| TVC Spot | ROS 12am - 12am | Mon - Sun | x5 | RM 5,000 |

## OTT: every chip and line

| Chip | Property | Monthly reach | Lines | Reach source |
| --- | --- | --- | --- | --- |
| Orange | Stadium Astro | 1,019,860 | 2 | Google Analytics Apr25, Digital-Brand-Profiles-Total-Updated-May-2025.pptx slide 38 |
| Orange | Sooka | 559,858 | 3 | Google Analytics Apr25, Digital-Brand-Profiles-Total-Updated-May-2025.pptx slide 43 |
| Grey | Astro GO | 537,800 | 0 | Google Analytics Apr25, Digital-Brand-Profiles-Total-Updated-May-2025.pptx slide 44 |

| Line | Property | CPM | Product code |
| --- | --- | --- | --- |
| Stadium Astro · Pre-roll Video (Skippable) | Stadium Astro | RM 50 | MBNS_STADIUMA_PREROLLSKP_25 |
| Stadium Astro · Pre-roll Video (Non-Skippable up to 15s) | Stadium Astro | RM 60 | MBNS_STADIUMA_PREROLLNONSKP_25 |
| Sooka · Video Ads (preroll & midroll) skippable | Sooka | RM 50 | MBNS_SOOKA_VDSKP_25 |
| Sooka · Vertical Video Ads | Sooka | RM 60 | MBNS_SOOKA_VVA_26 |
| Sooka · Video Ads (preroll & midroll) non-skippable | Sooka | RM 60 | MBNS_SOOKA_VDNONSKP_25 |
