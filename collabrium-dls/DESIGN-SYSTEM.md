# Collabrium Design Language System

**v0.9.40** — 2026-08-12 — Sourced from the Collabrium brand deck
(Google Slides). This is a first pass: everything under "Needs Input" below
is a placeholder, not a signed-off value. Build with it, but flag it in
your output.

## Overview

Collabrium renders on a near-black-on-warm-canvas interface (Neutral-9
text on the `Canvas warm` `#FCFAF5` background — see [Color
Palette](#color-palette)) that reads as calm and product-grade rather than as a
marketing surface — this is a dense, multi-department dashboard, not a
landing page. Mulish carries every functional string *and every
heading* (800 ExtraBold, letter-spacing 0): labels, buttons, tables,
nav, display through h5. Source Serif 4 is a deliberate overlay for
brand-statement moments only — a pitch-deck lede, a pull quote, a hero
numeral — never a heading token, never anything you'd call "UI." Five
saturated accent colors (Orange, Salmon Pink, Green, Navy, Amber) map
one-to-one to a five-element metaphor and a department cluster; they
classify what something belongs to, they never mean "click me" —
Obsidian `#2B2B2C` is the system's only actionable color, and every
screen earns exactly one Primary button. Shapes are **soft and
generous** (20px cards, 16px buttons, 12px inputs), and elevation is a real
Neutral-4-based shadow ladder used routinely, not just on modals —
cards carry `shadow-1` at rest.

---

## Needs Input (read this first)

Items below are either missing from the source brand deck or contradicted
themselves across slides. Each has a placeholder so work isn't blocked —
replace with confirmed values as the brand team signs off, and update the
changelog when you do.

| # | Gap | What's happening | Placeholder in use |
|---|-----|-------------------|---------------------|
| 1 | Pink hex conflict | Deck lists Pink `#FF4BB9` on one slide and Salmon Pink `#FF7A90` (tied to the Wood element + department system) on another, more developed slide; the real logo asset shipped with a third value (`#FFA6A8`) | **✅ Resolved** — user confirmed this document is the canonical source; `#FF7A90` is final. The logo asset (`logo.html`) has been corrected to match. See [Changelog](#changelog). |
| 2 | Functional green hex | Deck lists functional Green as `#FD3343`, identical to the Red error color — almost certainly a copy/paste typo; the real logo asset shipped with a third value (`#00D97B`) for its Earth frame | **✅ Resolved** — user confirmed this document is the canonical source; `#00C26E` is final. The logo asset (`logo.html`) has been corrected to match. See [Changelog](#changelog). |
| 3 | No numeric type scale | Typescale tokens had use cases but no sourced size/weight/line-height/letter-spacing — an earlier draft used an invented guess | **✅ Resolved** — sourced from a teammate's fuller deck extraction; see [Typescale](#typescale) and [Reconciliation](#reconciliation--teammates-design-system) |
| 4 | No spacing scale | Only "4px base unit, 16px card padding, 8px gap" mentioned — an earlier draft used an invented 9-step guess | **✅ Resolved** — real scale sourced from the teammate's extraction; see [Spacing](#spacing--shape) |
| 5 | No border-radius values | No numbers in the deck as originally read — an earlier draft used an invented flat 4/8/12px guess | **✅ Resolved** — real per-surface radii (12/16/20px) sourced from the teammate's extraction; see [Radius](#spacing--shape) |
| 6 | No accessibility targets | Section exists with blank fields (min body text, min contrast, max line length) | WCAG 2.1 AA defaults proposed in [Accessibility](#accessibility) |
| 7 | No component specs | No buttons, inputs, cards, tables, badges, or states (hover/active/disabled/error) defined anywhere in the deck | Full spec in [Components](#components)/[Component Rules](#component-rules), also **live-rendered** in `preview.html`'s Components section with a per-component "Copy markup" button — still not reviewed against a real screen or by the brand team |
| 8 | No final logo asset | A real animated wordmark + mark SVG (`logo.html`, trimmed to a fixed 5-frame Gold→Water→Wood→Fire→Earth sequence with `coin.svg` as the Gold frame), the full vector source library (`SVG/` — every letter and element icon), and a combined static lockup (`logo-lockups/collabrium-default-logo.svg`, the default — see [Logo](#logo)) now exist. The ink-color discrepancy between the static lockup and the animated mark is **resolved** — both use `#2B2B2C`. Still missing: 4 of 5 department-colored lockup variants (Fire, Wood, Water, Earth), a clear-space rule, minimum size, and monochrome/reverse versions | Use `logo.html` for the live mark, `logo-lockups/collabrium-default-logo.svg` as the default static mark, and `SVG/` for individual pieces; don't extract a still frame or hand-composite the `SVG/` files as a "final" lockup without brand-team sign-off |
| 9 | Photography direction | Deck explicitly marks this "Placeholder. Will be incorporated later when we nail down the logo." | No placeholder proposed — genuinely blocked on logo finalization |
| 10 | No technical implementation values | Section exists with blank fields (loading strategy, font-display value, file formats, token/CSS variable format) | **Partially resolved** — file formats and token/CSS format answered with a real integration guide (5 required files, in order, see [Technical Implementation](#technical-implementation)); loading strategy and `font-display` still genuinely need eng input, left open |
| 11 | Icon weight policy reversed, propagated | [Iconography](#iconography) moved from "Fill exclusively" to a two-tier Regular/Fill split, with no cited source (deck or teammate build) | **Resolved** — [Component Rules](#component-rules) #6, the Guidelines Do/Don't list, the stylesheet `<link>`s (now loading both Regular and Fill), and every icon instance in `preview.html`'s live Components gallery have all been reclassified per-tier, in both this document and its mirrored copy in `preview.html`. Four judgment calls made where the rule's examples didn't explicitly cover a case, none brand-team-confirmed: (1) the Tabs component's own "Settings" tab icon, treated as Tier 2 like SidebarNav rather than Tier 1 like a generic nav control; (2) the Stat/KPI card's trend indicators (caret-up/down, flat minus), treated as Tier 2 (expressive/informational) despite "arrow up/down" appearing in the Tier 1 example list, since they're not clickable; (3) Date picker's trigger-button calendar icon, kept Tier 2 per the explicit "Card / section header: Calendar... Fill" example despite sitting inside a button; (4) the "Copied" confirmation checkmark shown briefly after a Copy action, treated as a Tier 2 status confirmation rather than inheriting the Copy button's own Tier 1 weight |

---

## Brand Foundation

**Name:** Collabrium — Astro Digital Growth [OS]. From *Collab*oration +
Equi*librium*.

**Essence:** The shared home for Astro's digital teams — where six
functions (Content, Product, Marketing, Sales, Commercial, Editorial) stop
working around each other and start working together, without losing what
makes each one good at its job.

**Positioning statement:** "Collabrium is where Astro's Sales, Media,
Influence, Content, and Studio teams stop working in parallel and start
working together — so no rep, no editor, no strategist is ever the last to
know. Built from the ground up to bring people together, not just tools."

**Tone & personality:** Warm, collaborative, quietly confident.
- **Team-first** — talks like a colleague, not a control panel
- **Easy confidence** — sure of itself without needing to prove it
- **Plainspoken** — says the true thing simply, no jargon
- **Steady** — calm and dependable

**Voice & copywriting:** Write like you're talking to a teammate, not
briefing a system. Favor warm, human verbs (*see, share, meet in the
middle*) over mechanical ones (*sync, deploy, restore*). Keep it short and
plain — confidence doesn't need extra words.

**Content rules** (sourced from the teammate's
extraction):
- **Person.** Second person for the reader ("Nothing waiting on you"),
  first-person plural only for the system's own actions ("We'll try
  again in a minute"). Never "the user."
- **Casing.** Sentence case everywhere — headings, buttons, table
  headers, toasts. UPPERCASE is reserved for eyebrow labels and section
  kickers, always at `--tracking-eyebrow` (0.12em) wide tracking.
- **Emoji: never.** Not in UI, not in decks. Status is carried by a
  Phosphor Fill icon and a color.
- **Numbers.** Malaysian ringgit, `RM 100,000` — space after RM, comma
  thousands. Tabular figures in Mulish wherever numbers appear in a
  column.
- **Empty and error states stay human.** "Nothing waiting on you. When a
  brief needs your call, it lands here." — not "No records found."
- **One idea per sentence.** Fragments are fine as a lede.
- **The em-dash aside is a Collabrium house move** in the product's own
  copy, for the second beat of a thought ("Balance restored across
  execution, measurement, and allocation — not just speed for its own
  sake"). This describes Collabrium's brand voice specifically, not a
  general writing instruction for this document.

---

## Color Palette

### Brand accents

| Name | Hex | Usage | Element | Department cluster |
|---|---|---|---|---|
| Orange | `#FF5825` | Visibility & energy — brand/decorative | Fire | Marketing · PR · Sales · Brand & Creative |
| Salmon Pink | `#FF7A90` | Growth & vision — brand/decorative. Canonical value (Needs Input #1, resolved) | Wood | Strategy · R&D · Innovation · Product Design |
| Green | `#00C26E` | Support & stability — brand/decorative. Canonical value (Needs Input #2, resolved) | Earth | HR · People Ops · Customer Success · Admin |
| Navy Blue | `#1473E6` | Depth & flow — brand/decorative | Water | Data Analytics · Logistics · Supply Chain · Exec Strategy |
| Amber | `#FFA425` | Order & structure, warnings, celebratory highlights, chart series 6 | Gold | Finance · Legal · Compliance · QA & Audit |
| Obsidian | `#2B2B2C` | Primary action background, filled CTA buttons, active link borders, selected badge strokes — the dominant CTA color regardless of what brand colors share the screen | — | — |

### Secondary accents (not yet department-mapped)

| Name | Hex | Usage |
|---|---|---|
| Purple | `#9F56FF` | AI and premium feature UI, secondary tags, chart series 5 |
| Turquoise | `#00D9D9` | Additional secondary accent, reserved for future elements |

### Functional colors

| Name | Hex | Usage |
|---|---|---|
| Red | `#FD3343` | Errors, destructive actions, invalid input |
| Green | `#00C26E` | Success icons, valid input. Canonical value (Needs Input #2, resolved — deck's stated hex duplicated Red) |

### Neutrals

| Token | Hex | Usage |
|---|---|---|
| Neutral-9 | `#080808` | Primary text, headings, icon strokes, dark surface fills |
| Neutral-8 | `#171717` | Deepest dark surface — footer bands, full-bleed dark sections |
| Neutral-7 | `#222222` | Dark surface for inverted sections and modal overlays |
| Neutral-6 | `#292929` | Near-black accent surface, layered dark contexts |
| Neutral-5 | `#5a5a5a` | Secondary body text, icon secondary state, muted description, footer copy |
| Neutral-4 | `#bdbdbd` | Subtle shadow base, disabled control fills |
| Neutral-3 | `#d8d8d8` | Hairline borders on cards, dividers, input outlines, button strokes |
| Neutral-2 | `#f0f0f0` | Subtle background tint — alternating sections, card hover, input fills |
| Neutral-1 | `#ffffff` | Card surfaces, button text on dark fills, inverted text — no longer the page canvas (see Warm canvas below) |

### Warm canvas

**The default page canvas everywhere** — product UI (app/dashboard
screens) and brand/editorial contexts (decks, landing pages, type
specimens, printed collateral) alike. Component fills
(cards, inputs, and so on) are **not** affected by this — they
keep their own documented values, mostly `Neutral-1` white, which
sits as a deliberate figure-ground contrast against this warmer page
background instead of blending into a same-white canvas.

| Token | Hex | Usage |
|---|---|---|
| Canvas warm | `#FCFAF5` | Page canvas — the default background for every screen, product and editorial alike |
| Canvas warm card | `#FAF7F2` | Fill for a surface that's meant to blend into the warm canvas (e.g. a quote block, a featured stat) rather than stand apart from it |

### Elemental background tints

**These are the only permitted coloured backgrounds in the system.** A
surface may take a background colour, but only the lightest shade of the
element that *already owns that content* — 8% element on white, or the
`-strong` step (16%) for a nested or hovered layer inside an
already-tinted panel. Never a mid or full-strength element colour as a
fill, and never an element that doesn't own the content.

| Element | `-bg` (8%) | `-bg-strong` (16%) | Owns |
|---|---|---|---|
| Fire | `#FFEEE9` | `#FFDED3` | Marketing · PR · Sales · Brand & Creative |
| Wood | `#FFF2F4` | `#FFE4E9` | Strategy · R&D · Innovation · Product Design |
| Earth | `#E6F9F1` | `#CDF3E2` | HR · People Ops · Customer Success · Admin |
| Water | `#E8F1FD` | `#D0E3FB` | Data · Logistics · Supply Chain · Exec Strategy |
| Gold | `#FFF6E9` | `#FFEDD3` | Finance · Legal · Compliance · QA & Audit |

### Elements — motif & motion (for department-colored surfaces)

| Element | Motif | Motion |
|---|---|---|
| Fire (Orange) | Burst patterns, upward-tapered forms, irregular organic edges | Pulse outward, rise upward, flare briefly; expanding ring, warm radial glow |
| Wood (Salmon Pink) | Branching line structures, cross-section texture, organic curves | Branch outward from a point, growing line, expand from a single point |
| Earth (Green) | Grid structures, horizontal banded layers, concentric squares | Settle downward, gentle weight, anchored transitions |
| Water (Navy) | Sinuous single-line curves, droplet/teardrop forms, flow diagrams | Flow in from the side, liquid-fill chart animation, continuous transitions |
| Gold (Amber) | Hexagonal grid, sharp diagonal cuts, faceted forms, ledger lines | Arrive with sharp precision, clean geometric wipes, brief glint on hover |

---

## Typography

**Primary — Mulish.** Carries **everything functional and every
heading**: display through h5, body copy, navigation, buttons, form
fields, table content, captions, metadata, small UI labels. Keep in the
10–16px range for UI contexts. Headings are weight **800 ExtraBold** at
**letter-spacing 0** — the weight does the work, not tracking. SIL Open
Font License 1.1, free, self-hosting and commercial use permitted, no
attribution required.

**Secondary — Source Serif 4.** This is
*not* the display/heading font. Mulish owns the heading tokens. Source Serif 4 is a
deliberate **overlay for brand-statement moments only**: pitch-deck
ledes, brand story copy, pull quotes, and hero display numerals. Rules:
never below ~18–20px; never mix fonts inside a single sentence
(emphasis is a weight change, not a font swap); never in a dense
numeric column or table; at most one serif hero moment per view. Same
license terms as Mulish.

**Fallback stack:**
```css
font-family: 'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
```

**Local install — `fonts/collabrium-fonts.zip`.** A real font pack in
this folder, sourced directly from Google's official font repository
(github.com/google/fonts, not the web-embed CSS API — those are
unicode-range subsets, not proper desktop files): one variable-font
`.ttf` per family/style (covers every weight in a single file — no
separate Light/Regular/Bold downloads needed), plus each family's
`OFL.txt`. `preview.html`'s Fonts tab has a "Download font pack" button
wired to it. A browser cannot install a font into the OS directly (no
website can — that's a hard, universal security boundary, not something
specific to this page), so after downloading, the last step is always
manual: double-click each `.ttf` and confirm "Install Font."

### Typescale

Every token below is Mulish (Primary) at letter-spacing 0 unless noted.
Values are sourced, not guessed: they come from a
teammate's independent extraction of the same source deck (see
[Reconciliation](#reconciliation--teammates-design-system)). Heading weights are **800**
at letter-spacing 0, `display` uses the Primary font, and there's a
**responsive `-lg` tier** for ≥1280px viewports.

| Token | Size | Line-height | Size (lg) | Line-height (lg) | Weight | Use case |
|---|---|---|---|---|---|---|
| display | 40px | 56px | 48px | 66px | 800 | Hero headlines, cover slides |
| h1 | 32px | 38px | 40px | 56px | 800 | Page-level heading |
| h2 | 26px | 36px | 32px | 44px | 800 | Section headings |
| h3 | 22px | 30px | 24px | 34px | 800 | Card/subsection titles |
| h4 | 20px | 28px | 22px | 30px | 800 | Minor headers/section label |
| h5 | 16px | 20px | — | — | 700 | Table group headers |
| body1 | 16px | 22px | — | — | 500 | Default body copy |
| body1 strong | 16px | 22px | — | — | 700 | Emphasis in body copy |
| body2 | 14px | 20px | — | 22px | 400 | Secondary supporting text |
| body2 strong | 14px | 20px | — | 22px | 700 | Emphasis in body2 |
| label1 | 14px | 20px | — | — | 700 | Prominent form/field labels |
| label2 | 13px | 18px | — | — | 700 | Buttons, tags, chips |
| label3 | 11px | 16px | — | — | 700 | Metadata tags, dense table headers (uppercase, +0.04em) |
| link1 | 16px | 24px | — | — | 500 | Primary inline links |
| link2 | 13px | 18px | — | — | 500 | Footer links, inline micro-actions |
| footnote | 12px | 16px | — | — | 400 | Legal disclaimers, citations |
| caption | 12px | 16px | — | — | 400 | Timestamps, image captions |

**Eyebrow/kicker tracking:** `+0.12em` (`--tracking-eyebrow`) for small
uppercase labels above a heading. This is the only other place tracking
is applied besides `label3`.

Note: the deck's two usage-matrix slides disagree on the pitch-deck/
marketing row (one says Secondary font for "pitch deck title slides" and
"quote/testimonial callouts," the other broadens this to general marketing
copy and even the logo wordmark). Treated the narrower, first version as
canonical — logo wordmark should be neither font per the deck's own
"Logo wordmark: Neither" row on the first matrix.

---

## Iconography

Collabrium icons are bold, chunky silhouettes with rounded,
organic forms, from a two-library system in **two weights** — the weight is
decided by what the icon *does*, not by taste. See [Needs Input #11](#needs-input-read-this-first)
for open judgment calls on this split.

- **Primary — Phosphor** (phosphoricons.com, MIT License, free). Both weight
  stylesheets load together: Regular for Tier 1 icons, Fill for Tier 2 (see
  below).
- **Fallback — Remix Icon** (remixicon.com, Apache 2.0, free). Only when
  Phosphor lacks the glyph, following the same tier split (e.g. `ri-plus-line`
  for Tier 1, `ri-check-circle-fill` for Tier 2).

### The two tiers

**Tier 1 — functional/control icons → Regular (outline).** Icons inside
buttons, toolbars, and as affordances: these are actions the user *performs*,
not concepts being communicated. At `icon-sm` (16px) and `icon-base` (20px),
Regular reads more precisely and feels less heavy than Fill — Fill on a small
`+` or `×` reads as visually heavy. Applies to: add, close, more-horizontal,
more-vertical, chevron up/down/left/right, arrow up/down/left/right, sort,
drag handle, expand, collapse, refresh, search (inside an input field),
filter, check and minus (the Checkbox marks), pencil-simple, trash,
download-simple, upload-simple.

Where a slug legitimately serves both tiers, the status meaning wins the
default and the control call site opts out — e.g. `x-circle` is Tier 2 (the
error status indicator in `Toast`), while a remove affordance uses plain `x`
instead (see `Tag`'s remove button).

**Tier 2 — expressive/status/decorative icons → Fill.** Icons that
communicate meaning, status, or context rather than trigger an action; they
carry visual weight intentionally, and at `icon-md` (24px) and above, Fill
reads naturally. Applies to: status indicators (success, warning, error,
info), sidebar navigation items, card header icons, department indicators,
feature highlights, empty-state illustrations, onboarding icons.

| Icon type | Examples | Weight | Class prefix |
|---|---|---|---|
| Action inside a button | Plus, X, DotsThree | Regular | `ph` |
| Toolbar affordance | Sort, Filter, Refresh | Regular | `ph` |
| Navigation control | ChevronDown, ArrowLeft | Regular | `ph` |
| Search inside input | MagnifyingGlass | Regular | `ph` |
| Sidebar nav item | House, Users, Chart | Fill | `ph-fill` |
| Status indicator | CheckCircle, Warning | Fill | `ph-fill` |
| Card / section header | Calendar, Briefcase | Fill | `ph-fill` |
| Empty state | FolderOpen, CloudSlash | Fill | `ph-fill` |

**Color rule:** icons inherit the text color of their surrounding context.
They don't use elemental/accent colors unless inside a department-specific
surface where that element's color is already established.

**Size scale:**

| Token | Size | Usage |
|---|---|---|
| icon-micro | 14px | Table cells, tag labels, badge indicators |
| icon-sm | 16px | Inline with body text, buttons, form field icons, status indicators |
| icon-base | 20px | Sidebar navigation, card action buttons, standard UI |
| icon-md | 24px | Card headers, section titles, modal headers, featured actions |
| icon-lg | 32px | Department indicators, feature highlights, onboarding steps |
| icon-empty | 48px | Empty state panels, zero-data views, section placeholders |
| icon-hero | 64px | Full-page empty states, first-run onboarding, error pages |

---

## Spacing & Shape

### Spacing

Base unit 4px. Tokens are **value-named** (`spacing-16` = 16px) rather
than step-numbered, matching the source scale exactly.

| Token | Value | Purpose |
|---|---|---|
| spacing-4 | 4px | Base unit |
| spacing-8 | 8px | Element gap — default gap between elements |
| spacing-12 | 12px | Tight internal padding (button horizontal padding, table cells) |
| spacing-16 | 16px | Card padding — the deck's stated default |
| spacing-20 | 20px | Compact section-internal spacing |
| spacing-24 | 24px | Section-internal spacing (card title block to body), dialog padding |
| spacing-32 | 32px | Page gutter — horizontal page padding |
| spacing-40 | 40px | Large internal spacing (empty-state vertical padding) |
| spacing-48 | 48px | Section gap — between distinct dashboard sections |
| spacing-60 | 60px | Large section gap — between major page regions |
| spacing-120 | 120px | Full-page / hero-level spacing |

**Semantic aliases:** `--card-padding` (16px), `--element-gap` (8px),
`--section-gap` (48px), `--page-gutter` (32px). Prefer these in component
code — they say *why*, not just how much.

**Content max-width:** 1200px for centered, reading-width content
(settings forms, detail panels). Collabrium is a product surface, so most
layouts run full-bleed within the app shell rather than centering.

### Radius

Collabrium is a distinctly **soft-cornered** system: 20px on
cards, 16px on buttons. Radius is specified **per surface**, not as one
abstract ramp.

| Token | Value | Applies to |
|---|---|---|
| radius-sm | 12px | Inputs, small buttons, icon buttons |
| radius-md | 16px | Standard and large buttons |
| radius-lg | 20px | Cards, modals, nav, feature panels, swap widgets |
| radius-pill | 999px | Pills, badges, tags, avatars |
| radius-link | 32px | Link-styled pill CTAs |

**Rule:** one radius token per component type across the whole product —
see [Component Rules](#component-rules), Rule 1. Never go below 12px on
an interactive surface; sharp corners are off-brand here.

### Elevation

Collabrium has a
real shadow ladder and uses it routinely — cards carry `shadow-1` at
rest, not just a border. Every shadow is built on **Neutral-4
(`#bdbdbd`), never black** — that's what keeps them soft and on-brand.

| Token | Value | Use |
|---|---|---|
| shadow-hairline | `0 0 0 1px #d8d8d8` | Hairline ring (border substitute) |
| shadow-1 | `0 1px 2px rgba(189,189,189,.45)` | Cards, secondary buttons — default resting elevation |
| shadow-2 | `0 2px 8px rgba(189,189,189,.42)` | Hover / raised state |
| shadow-3 | `0 8px 24px rgba(189,189,189,.40)` | Popovers, dropdowns |
| shadow-4 | `0 16px 48px rgba(189,189,189,.44)` | Dialogs / modals |
| shadow-inset | `inset 0 1px 0 rgba(255,255,255,.6)` | Optional top-edge highlight |
| shadow-focus | `0 0 0 3px rgba(20,115,230,.28)` | Focus ring (Water-based) |
| shadow-overlay | `rgba(8,8,8,.56)` | Modal scrim (a fill, not a shadow) |

**Focus rings are Water (Navy), not Obsidian.** This
is the one place an element color legitimately drives an interactive
state.

### Motion

The
governing principle: **"Movement settles; it never bounces."** No
overshoot, no elastic easing.

| Token | Value | Use |
|---|---|---|
| duration-instant | 80ms | Micro feedback (press, toggle) |
| duration-fast | 140ms | Hover, focus transitions |
| duration-base | 220ms | Default UI transitions |
| duration-slow | 360ms | Panel / section reveals |
| duration-ambient | 900ms | Background / ambient motion |

Each element owns an easing curve, used when the motion is thematically
tied to that element (e.g. a Water-owned panel slides with
`--ease-flow`). `--ease-standard` is the default for everything else —
reach for an elemental curve deliberately, not by default.

| Token | Curve | Character |
|---|---|---|
| ease-standard | `cubic-bezier(.2,.6,.2,1)` | Default UI easing — quick out, soft settle |
| ease-settle | `cubic-bezier(.16,.84,.24,1)` | **Earth** — anchored arrivals |
| ease-flow | `cubic-bezier(.37,0,.29,1)` | **Water** — continuous, uninterrupted |
| ease-flare | `cubic-bezier(.05,.7,.1,1)` | **Fire** — pulse outward, rise |
| ease-precise | `cubic-bezier(.4,0,.2,1)` | **Gold** — sharp, decisive |
| ease-grow | `cubic-bezier(.25,.46,.45,.94)` | **Wood** — branching growth |

---

## Logo

**Concept — "Balance in motion."** Collabrium's mark is built on a
5-elements theory (Gold, Fire, Water, Wood, Earth) representing how
different functions/energies sustain each other in balance — none succeeds
alone, the system depends on collaboration to maintain equilibrium. Each
element maps to a brand color and department cluster (see [Color
Palette](#color-palette)).

> Like the elements themselves, work moves constantly, unpredictably, and
> rarely in sync. What it needs isn't less movement — it's a structure
> grounded enough to hold it and harmonious enough to let each element
> feed the next instead of fighting it. Collabrium is that structure: a
> daily reading of where your elements stand, what's overflowing, what's
> stalled, and where balance needs restoring — so the same forces that
> could create chaos are the ones that create your outcome.

### Default static lockup — `logo-lockups/collabrium-default-logo.svg`

A combined,
non-animated wordmark lockup, with the "O" rendered as a solid Gold/Amber
`#FFA425` ring rather than the animated filmstrip. This is the asset for
any context that can't run `logo.html`'s animation (favicons, print,
email, static deck slides, social previews).

**Default-logo rule:** whenever the Collabrium mark is used without a
specific department/element context, **this Gold lockup is the default**
— not a static frame grabbed from the animation, not any other element's
color. Only when the surface is already department-specific (e.g. a
Marketing-owned deck cover, a Finance report header) does the mark switch
to that department's own element-colored lockup instead:

| Element | Department | Lockup file |
|---|---|---|
| Gold | Finance · Legal · Compliance · QA & Audit | `logo-lockups/collabrium-default-logo.svg` ✅ |
| Fire | Marketing · PR · Sales | `logo-lockups/fire.svg` — not yet provided |
| Wood | Strategy · R&D · Product | `logo-lockups/wood.svg` — not yet provided |
| Water | Data · Logistics · Exec | `logo-lockups/water.svg` — not yet provided |
| Earth | HR · CS · Admin | `logo-lockups/earth.svg` — not yet provided |

`logo.html`'s wordmark and this lockup both use `#2B2B2C` (Obsidian) — the two
logo assets agree on wordmark black.

**The real asset — `logo.html`.** A working animated wordmark exists in
this folder: the word "COLLABRIUM" with the O rendered as a looping
filmstrip, in a fixed sequence — **Gold → Water → Wood → Fire → Earth**
— matching the 5 documented elements. The Gold frame's artwork is
`coin.svg`, not the `gold.svg` bracket icon used elsewhere in this
system (Color Palette, ElementBadge, sidebar-nav dots, etc.) — see the
Vector source library note below for why. The file embeds as a
clean, always-animating mark with no dev/debug UI (no visible
element-name label or play/pause control).

**Vector source library — `SVG/`.** This folder holds the individual
vector files `logo.html` is assembled from — confirmed by diffing them
against the animation's path data, they match exactly (letters and the
five core-element icons are byte-identical to what's embedded in
`logo.html`). Use these, not a screenshot or a hand-traced copy, for any
new build that needs the mark in pieces (e.g. a static lockup, a
single-element icon on its own, print work).

- **Wordmark letters (8 files):** `a.svg`, `b.svg`, `c.svg`, `i.svg`,
  `l.svg`, `m.svg`, `r.svg`, `u.svg` — every unique letter in
  "C•LLABRIUM" except the O, which is the animated element mark, not a
  static letter.
- **Element icons (10 files):** `fire.svg`, `wood.svg`, `earth.svg`,
  `water.svg` (4 of the 5 documented elements, all used live in
  `logo.html`'s animation) plus `sun.svg`, `moon.svg`, `cloud.svg`,
  `mountain.svg` (decorative-only, not used in `logo.html`'s animation)
  and `coin.svg` — the Gold frame's artwork in `logo.html`'s animation,
  replacing `gold.svg` there. `gold.svg` (the bracket-shaped icon)
  remains the Gold element icon used everywhere *else* in this system
  (Color Palette, ElementBadge, sidebar-nav dots, Chart color mapping) —
  the two are deliberately different assets for different purposes.
- **Motive variants (5 files):** `motive sun.svg` and `motive moon.svg`
  are byte-identical duplicates of `sun.svg`/`moon.svg` (no actual
  difference). `motive water.svg`, `motive cloud.svg`, and
  `motive coin.svg` are genuinely different artwork from their base
  icon — doubled/grounded/alternate compositions that read as
  background-texture motifs rather than a small mark, consistent with
  the "Motif" column in the Elements table above. Their exact intended
  usage (pattern fill vs. standalone icon) isn't documented anywhere —
  flagged as unconfirmed, not guessed.
- **⚠️ Known color drift in the raw exports:** `wood.svg` still carries
  the original off-palette `#FFA6A8` and `earth.svg`/`mountain.svg`
  still carry `#00D97B` — the same conflict already resolved in
  `logo.html` (Needs Input #1/#2). These source files have **not** been
  edited to match, since they may be managed as master exports outside
  this repo (e.g. from Figma/Illustrator) — don't silently "fix" them;
  confirm with whoever owns that source before touching fill colors
  there. `logo.html`'s corrected values remain the canonical reference
  for Wood and Earth either way.

### Department logos

Distinct from the generic single-element lockups in the table above,
these four are **named product/department lockups** — each one is its
own sub-brand wordmark ("Collab" + the department name), tinted to
that department's element color, not just the base Collabrium mark
recolored. Live in `preview.html`'s Logo area (Department logos grid,
after the Element/Usage/Department table), each with a "Download .svg"
button pulling directly from its file below.

⚠️ **First pass — definitions synthesized from a one-line brief per
department, not sourced from a deck or product spec.** Confirm scope
and wording with the product/brand team before treating these as
final.

| File | Department | Element | Definition |
|---|---|---|---|
| `logo-lockups/collabContent.svg` | CollabContent | Wood · Salmon Pink `#FF7A90` | The content generation workspace where campaign copy, creative briefs, and content assets get produced, organized, and approved. |
| `logo-lockups/collabInfluencers.svg` | CollabInfluencers | Earth · Green `#00C26E` | Influencer management system for sourcing, briefing, and measuring creator partnerships from discovery through payout. |
| `logo-lockups/collabSales.svg` | CollabSales | Gold · Amber `#FFA425` | Manage the sales pipeline, from lead to close, tracking opportunities, quotes, and forecasting through to account handoff. |
| `logo-lockups/collabStudio.svg` | CollabStudio | Fire · Orange `#FF5825` | Creative studio, hosting creative-output AI agentic tools for visual, video, and design generation for campaigns. |

These four don't cover all five elements (no Water/Data-Logistics
department product exists yet) and aren't a 1:1 substitute for the
generic per-element lockups in the Default-logo rule table above —
that table is about recoloring the base Collabrium mark for a
department-owned surface; this one is about distinct named products
that happen to live inside Collabrium.

⚠️ **Needs Input #8 — further resolved, not closed.** Individual static
vector assets now exist for every letter and element (see `SVG/` above),
closing most of the original gap. Still missing: a single **combined**
static lockup (all letters + a chosen element frame composed as one
file, for contexts that can't run the animation — favicons, print,
email, a static deck slide), a clear-space rule, a minimum size, and
monochrome/reverse versions. Don't treat a screenshot of `logo.html`, or
an ad-hoc composite of the `SVG/` files, as a final lockup — confirm
with the brand team before using one in a real build.

## Photography & Visual Direction

⚠️ **Needs Input #9 — explicitly blocked.** The source deck states:
"Placeholder. Will be incorporated later when we nail down the logo." No
draft proposed; this depends on the logo work above.

---

## Accessibility

⚠️ **Needs Input #6.** Deck has an Accessibility section with blank
values. Proposed WCAG 2.1 AA defaults below — confirm with brand/eng
before treating as policy.

| Target | Draft value |
|---|---|
| Minimum body text | 14px (matches body2 token) |
| Minimum contrast ratio | 4.5:1 for body text, 3:1 for large text (24px+) and UI components |
| Maximum line length | ~75 characters |

## Technical Implementation

⚠️ **Needs Input #10 — partially resolved.** The deck's
original blank fields (loading strategy, `font-display` value, file
formats served, design tokens/CSS variable format) needed engineering
input, not a design guess — that's still true for loading strategy and
`font-display`, left open below. File formats and the token/CSS format
are answerable now: this system ships as plain CSS custom properties
(no build step, no CSS-in-JS, no Sass) and literal CSS class rules — see
below for exactly what a consuming project needs and in what order.

### Using this system in an existing project

A project adopting this system needs five files, together, in this order,
or colors, pills, and icons won't render correctly:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
<link rel="stylesheet" href="tokens.css" />
<link rel="stylesheet" href="components.css" />
```

| # | File | What it's for | If missing |
|---|---|---|---|
| 1 | Google Fonts — Mulish + Source Serif 4 | the two typefaces | text falls back to a system font — doesn't crash, just doesn't look right |
| 2–3 | Phosphor Icons, **both** the Regular and Fill stylesheets, pinned to `@2.1.1` | every icon in every component (see [Iconography](#iconography)'s two-tier weight system — both weights are genuinely needed, not one-or-the-other) | icon classes (`ph-house`, `ph-fill ph-house`) render as an empty box — this was the literal "icons not pulling" report |
| 4 | `tokens.css` | every color/spacing/radius/shadow/motion value, as CSS custom properties | components render with no color, no radius, no spacing — everything collapses to unstyled browser defaults |
| 5 | `components.css` | the actual component CSS rules (`.c-btn`, `.c-badge`, `.c-card`, etc.) | markup copied from `preview.html`'s "Copy markup" buttons has class names with no CSS behind them anywhere else, so nothing is styled at all |

`components.css` depends on `tokens.css` — every rule in it references
a `var(--token-name)`, none are hardcoded — so load `tokens.css` first,
or component styling silently falls back to inherited/default values
with no error to point at.

**Class names are `c-`-prefixed** (`.c-btn`, `.c-card`, `.c-badge`, …)
specifically to reduce collision risk with a consuming project's own
existing classes. Don't rename them when adopting the system, and don't
reuse the `c-` prefix for unrelated classes in the same project.

**Still genuinely open, needs engineering input, not a design guess:**
loading strategy (is `components.css` a hard dependency on every page,
or code-split per component used?) and the exact `font-display` value
(the deck never specified one; `swap` above is what `preview.html`
itself uses, not a confirmed brand decision).

## Component Rules

These apply to every component below. They exist so ten different people
(or ten different Claude sessions) building ten different screens produce
one consistent product, not ten dialects.

1. **One radius per component type.** Buttons, inputs, and tags always use
   the same radius token across the whole product — don't let one screen's
   button be `radius-sm` and another's `radius-md`. See the mapping in each
   component below.
2. **Obsidian is the only primary-action color.** Brand/element colors
   (Orange, Salmon Pink, Green, Navy, Amber) classify — they mark which
   department or element something belongs to. They never mean "click me."
   A green badge on an HR record and a green primary button are not the
   same kind of signal; only Obsidian carries the second one.
3. **Only use tokens, never raw values.** Padding, gaps, font sizes, radii,
   and colors all come from the tables in this document. If a screen needs
   a value that isn't a token, that's a sign the token set is incomplete —
   flag it, don't invent a one-off pixel value.
4. **Every interactive component defines its full state set.** Default,
   hover, active/pressed, focus-visible, and disabled at minimum; add error
   for anything that takes input. A component spec that only shows the
   default state isn't finished.
5. **Contrast is checked, not assumed.** Every text/background and
   icon/background pairing in a component must clear the ratios in
   [Accessibility](#accessibility) (draft: 4.5:1 body, 3:1 large
   text/UI). This applies inside brand-colored surfaces too — e.g. white
   text on Amber `#FFA425` fails AA; use Obsidian text on light accent
   fills instead (see each component's notes).
6. **Icon weight follows the Tier 1/Tier 2 split, not taste**, per
   [Iconography](#iconography) — Regular for functional/control icons, Fill
   for expressive/status icons. Never mix in a Remix icon next to a
   Phosphor one within the same component instance.
7. **Secondary font (Source Serif 4) does not appear inside components.**
   Buttons, inputs, tags, table cells, and modal body copy are Primary
   font only, per [Typography](#typography). A modal *title* may use `h3`
   (Primary, per the resolved typescale) — Secondary stays reserved for
   marketing/hero moments outside the component layer.

---

## Components

⚠️ **First full draft — see Needs Input #7.** Built from the
token set above since the source deck defined none of this. Treat sizes,
paddings, and state colors as a starting point for review, not a
signed-off spec — nothing here has been checked against a real screen or
by the brand/design team yet.

**Live gallery — `preview.html`, Components tab.** Every component
below is also rendered live in `preview.html`'s left pane, right next
to this same spec in the DESIGN.md tab on the right — each with a
"Copy markup" button. That page is the reference implementation; these
tables are the reference spec. If they ever disagree, that's a bug —
fix both together (see the doc-sync rule: nothing here ships without
preview.html matching, and nothing in preview.html ships without this
file updated to match).

⚠️ **`components.css` is the actual portable copy of this CSS.** Every rule you see rendered in the gallery lives there,
not just inline in `preview.html` — `preview.html` itself now loads it
via `<link>` rather than duplicating a private copy, specifically so
the two can't drift the way `tokens.css` and its own embedded copy once
did. "Copy markup" gives you HTML; `components.css` (plus `tokens.css`
and the Phosphor/Google Fonts links) is what actually makes that HTML
look like anything — see [Technical Implementation](#technical-implementation)
for the full integration checklist. If you add or change a component
here, `components.css` needs the matching edit in the same pass, same
as `preview.html` does.

**It's genuinely interactive, not just styled markup.**
SidebarNav and Tabs switch on click, Checkbox/Radio/Switch actually
toggle (including via keyboard, not just mouse), Table rows and
DataTable rows select on click, Toast and Modal dismiss and — for
Modal — reopen, Filters' triggers/pills/Clear-all respond, Pagination
advances, and Date picker days select. Two things are deliberately
inert: the Date picker's month-nav arrows and its trigger button don't
do anything, since wiring real calendar math or a real open/close
toggle (which would hide the calendar with no way to reveal it in a
static gallery) is out of scope for a component reference — the panel
just stays permanently visible so you can see it.

**Scope note.**
32 components: the original 7 basics
(Button, Input field, Card, Badge & Tag, Table row, Modal / dialog,
Empty state), 9 transcribed directly from the teammate's real
component source (SidebarNav, Tabs, Checkbox, Radio,
Switch, Toast, Tooltip, DataTable, ElementBadge), 8 **designed
from scratch** — Stat/KPI card, Filters, Pagination, Date
picker, **Segmented Control**, **Slider**, **Chip**, **Progress
Bar** — plus two chart
guidelines, [Chart color mapping](#chart-color-mapping) and [Chart
chrome & marks](#chart-chrome--marks) (neither a rendered component),
and 8 more: **App Shell** (the page-level composition layer — Sidebar
placement, Content region, Page header), Textarea, Password field,
**Search input** (a text search field with a clear button, in
Default/User Search/Item Search variants — the last two searching and
selecting a person or item from a dropdown), **Stepper** (a
multi-step progress indicator), **FileUploader** (click-to-browse/
drag-and-drop file attachment), **Dropdown** (a trigger+panel in
Single select/Multiple select variants — the former, separately
transcribed **Select** and designed-from-scratch **MultiSelect**,
consolidated into one component), and **Info Banner** (an inline,
persistent, container-anchored notification — distinct from Toast's
floating/viewport-level/auto-dismissing behavior). The Stat/KPI card
batch, App Shell, Stepper, FileUploader, Dropdown, Search input, Info
Banner, **Segmented Control**, **Slider**, **Chip**, and **Progress
Bar** have **no source in
either the original brand deck or the teammate's build**; they're
built entirely from this document's own token system (color, type,
spacing, radius, elevation, motion) and marked ⚠️ **designed, not
transcribed** in their own sections — treat them as a first pass
needing real design/brand review before shipping, more provisional
than the transcribed components above them.
See each section below for source notes, and don't let a
new component ship without updating this count too. Don't skip straight
to markup for a new component — write the spec here first (variants,
sizes, states, Do/Don't), the same process every component above went
through.

- [App Shell](#app-shell)
- [Badge & Tag](#badge--tag)
- [Button](#button)
- [Card](#card)
- [Chart chrome & marks](#chart-chrome--marks)
- [Chart color mapping](#chart-color-mapping)
- [Checkbox](#checkbox)
- [Chip](#chip)
- [DataTable](#datatable)
- [Date picker](#date-picker)
- [Dropdown](#dropdown)
- [ElementBadge](#elementbadge)
- [Empty state](#empty-state)
- [FileUploader](#fileuploader)
- [Filters](#filters)
- [Info Banner](#info-banner)
- [Input field](#input-field)
- [Modal / dialog](#modal--dialog)
- [PageHeader](#pageheader)
- [Pagination](#pagination)
- [Password field](#password-field)
- [Progress Bar](#progress-bar)
- [Radio](#radio)
- [Search input](#search-input)
- [Segmented Control](#segmented-control)
- [SidebarNav](#sidebarnav)
- [Slider](#slider)
- [Stat / KPI card](#stat--kpi-card)
- [Stepper](#stepper)
- [Switch](#switch)
- [Table row](#table-row)
- [Tabs](#tabs)
- [Textarea](#textarea)
- [Toast](#toast)
- [Tooltip](#tooltip)

### App Shell

⚠️ **Designed from scratch, no source in the brand deck or the
teammate's build.** Added after real downstream builds
showed why it was missing: separate teams built dashboards on this spec
and produced different navigation shells (pure sidebar, top-bar-only,
sidebar **and** top-bar) plus a card-chrome deviation and a Badge
semantics miss. The component tables weren't wrong — [SidebarNav](#sidebarnav),
[Card](#card), and [Badge & Tag](#badge--tag) already specify their own
internals correctly. What was missing is the composition layer that
says how those pieces combine into an actual screen. This section is
that layer.

App Shell governs **structure and
layout only** — placement, size, spacing, and which region a component
occupies. It never defines or restates a component's own style (fill,
border, radius, typography, state colors) — that's the owning
component's section, always. Where App Shell needs to mention a style
property at all (e.g. that the canvas is warm-toned), it references the
token or the component's own section rather than restating the value,
and if a style decision doesn't already belong to some component, that's
a sign it belongs in that component's spec, not here.

**Canonical pattern: sidebar-only. No separate Top bar chrome — Page
header is the top of every screen.** [SidebarNav](#sidebarnav) already
has its own Header slot (logo/workspace switcher) and Footer slot
(account/profile) — that's a complete app frame without a second nav
surface. No persistent bar runs across the top independent of the page's
own content. Instead, **Page header**, below, *is* the top of the
screen: full width, title/subtitle on the
left, CTAs/actions right-aligned. Global-scope controls (notifications,
account) have nowhere defined to live yet — that's an
explicit, acknowledged gap, not a silent omission; revisit this
decision if/when the product actually needs them.

**Page canvas — a structural fact, not a new color:** the whole
viewport is one continuous background region using whatever [Color
Palette](#color-palette)'s Warm canvas token currently resolves to —
App Shell doesn't set or
restate that value, it just establishes that there's a single shared
background behind everything, not per-section fills. Sidebar and Card
sit on top of it using whatever fill their own component sections
document — again, not App Shell's to state.

| Property | Value |
|---|---|
| Background | `background: var(--color-canvas-warm)`, applied to `.c-shell` itself in `components.css` |
| Scope | the whole shell — Sidebar and Card read as `Neutral-1` surfaces against it, per their own sections; App Shell references the token, never the hex |

⚠️ **Enforced in code as of 2026-08-05**, not just documented: until this
revision, "default everywhere" was prose only — nothing in
`components.css` actually applied it, so a screen only got Canvas warm
if whoever built it remembered to set it by hand (the same class of gap
[Using this system in an existing project](#using-this-system-in-an-existing-project)
exists to close for colors/pills/icons generally). `.c-shell` is App
Shell's own full-viewport container, so setting the background there —
once, on the token, in the one file every consuming project already
loads — is what actually makes "every screen" true instead of aspirational.

#### Main nav — a direct instance of SidebarNav, not a variant

**The main nav follows the SidebarNav component exactly** — same 240px
width, `radius-lg`, 1px border on all four sides, `Neutral-1` fill, same
internal anatomy (Header, Section label, Nav item, icon, trailing count,
Footer) — no properties overridden. It simply doesn't sit flush: it's
inset by `spacing-16` (16px) from the top, left, and bottom edges of the
viewport, so its rounded corners and border render cleanly against the
`Canvas warm` background instead of clipping against the browser edge.
Height is `calc(100dvh - 32px)` to account for the two 16px insets. The
right edge needs no inset of its own — Content region's `page-gutter`
already provides the visual gap to whatever sits next to it.

| Property | Value |
|---|---|
| Component | [SidebarNav](#sidebarnav), unmodified — width, radius, border, fill, and internal anatomy all as documented there |
| Placement | inset `spacing-16` (16px) from the viewport's top, left, and bottom edges; no inset on the right edge |
| Height | `calc(100dvh - 32px)` |

The Locked/"Soon" nav-item state is
a component state (fill, text color, icon opacity,
cursor, a Badge) — that's [SidebarNav](#sidebarnav)'s concern, not a
layout/placement one, so it lives in that component's own table
instead. App Shell only says *where* SidebarNav sits, never *how it
looks* — see the scope note in this section's opening paragraph.

**Responsive** ⚠️ provisional, first pass, no source: below 1024px,
collapse to a 72px icon-only rail (labels hidden, tooltip on hover
instead); below 768px, becomes an off-canvas drawer, sliding in over the
content with `shadow-4` beneath it — still the same SidebarNav instance
and the same inset placement rule, just triggered by a different
affordance, not a third variant.

#### Content region

| Property | Value |
|---|---|
| Background | none of its own — inherits the page canvas described above |
| Padding | `--page-gutter` (32px) horizontal, `--section-gap` (48px) top — reusing existing [Spacing & Shape](#spacing--shape) tokens, no new values introduced |
| Max-width | full-bleed by default; 1200px centered only for reading-width content (settings, detail panels) — existing rule, unchanged |
| Section gap | `--section-gap` (48px) between distinct regions (stat-card row → main panels → activity panel) |
| Column grid | 4 columns. A box's width is always a whole span of 1, 2, 3, or 4 of them — never an arbitrary fraction — so boxes of different widths can still share a row cleanly (a 1-col box next to a 3-col box, two 2-col boxes, etc). `.c-shell-grid` + `.c-shell-span-1`/`-2`/`-3`/`-4` in `components.css` |
| Row height | within a row, every box stretches to match whichever box is naturally tallest — no hardcoded height, no per-box scroll unless a box's own component spec says otherwise. Free from CSS Grid's own `align-items: stretch` default, which is also why `.c-shell-grid` is a grid, not a wrapping flex row |
| Column gap | spacing-16–20 between boxes *within* a row — pick one value per product and hold it, don't vary row to row. Defaults to spacing-16 in `.c-shell-grid` |
| Row gap | spacing-24, fixed default *between* stacked rows of boxes — distinct from Section gap above (48px, between whole distinct regions like a stat row vs. a table) and from Column gap (16–20, horizontal, product's choice) |

⚠️ **Added 2026-08-05, not yet reconciled with Stat/KPI card's own
`.c-stats`:** `.c-stats` predates this grid and uses its own `auto-fit`
column count (`repeat(auto-fit, minmax(180px, 1fr))`, `gap: 16px` on both
axes) rather than a fixed 4-column span — that's Stat/KPI card's own
component spec, not overridden here, same "don't touch another
component's internals" rule that applies to [SidebarNav](#sidebarnav).
The two systems can currently disagree on how many boxes fit per row at
a given width. Left as an open question rather than a silent migration
of `.c-stats`; revisit if that inconsistency turns out to matter in a
real build.

#### Page header — the top of every screen

The title/subtitle/actions block every downstream build has been
inventing from scratch — this gives it one shape, and it's also the *only* top-of-screen chrome
the shell has, not a block nested below a separate bar. The title/
subtitle is the [PageHeader](#pageheader) component — App Shell
composes it directly rather than keeping a second copy of that
anatomy here. PageHeader itself only ships Default/With-subtitle
variants, not an Actions one — the row below is specific to this
placement, added directly to `.c-pageheader` here (`.c-pageheader-row`/
`.c-pageheader-actions` in `components.css`) rather than folded into
PageHeader's own documented variants.

| Property | Value |
|---|---|
| Width | 100% of the main column (everything to the right of Sidebar) — full-bleed, matching Content region's own full-bleed rule, not a padded/inset block among the cards below it |
| Actions / CTAs | right-aligned row, `--element-gap` (8px) between items, built from existing [Button](#button) variants — zero, one, or several are all valid; the row simply collapses when empty. A period selector ("This month ▾") is a [Dropdown](#dropdown) (Single select) trigger styled as a pill, not a new control |
| Gap to content below | `--section-gap` (48px) |

⚠️ **Known gap:** the "Dropdown trigger styled as a pill" period-selector
call above has no built variant yet — Single select's trigger is now
[Input Field](#input-field)'s own container, so it's `radius-sm`, not
`radius-pill`, and no pill modifier exists on it. The live demo
currently substitutes Filters' own `.c-filter-trigger` instead, which
is neither Dropdown-based nor pill-shaped. Flagged rather than silently
left inconsistent; needs a follow-up pass to either build the pill
trigger or revise this row to match what's actually reusable today.

⚠️ **Reserved, added 2026-08-05, not yet specced:** everything above is
Level 1 — the shared outer frame (Sidebar, Content region, Page header)
every screen gets. A **Level 2** exists conceptually for
drill-down/detail screens — a Back control and breadcrumb replacing or
augmenting Page header's plain title/subtitle once a user navigates
into a specific record — but has no rules yet. Deliberately deferred:
guessing Back/breadcrumb behavior with no real detail-view build to
react against risks the same fate as App Shell's own first-draft flush-
rail nav variant (plausible, wrong, undone later). **Trigger to actually
write it: the moment a team is about to build the first real drill-down
screen, before they build it** — not after divergent builds show up, or
this section will have recreated the exact "N teams, N answers" problem
App Shell itself exists to close, just one level deeper. When written,
Level 2 extends this section (same relationship Main nav has to
SidebarNav — a use of the existing frame, not a second one) rather than
replacing it.

**Do:** let Sidebar own primary navigation and its own Header/Footer
slots — there's no second nav surface to reach for. Keep the whole
viewport on `Canvas warm` and let Sidebar/Card read as white surfaces
against it — that contrast is the system now, not an inconsistency to
fix. **Don't:** override any of SidebarNav's own properties (width,
radius, border, fill) to make it work as the main nav — if it doesn't
fit, adjust placement (inset/margin), not the component; a component
used two different ways is still one component, not two specs to keep
in sync. **Don't:** add a persistent global top bar back in without a
deliberate spec change — if notifications or an
account menu become a real requirement, that's a spec change, not a
quiet addition on top of this. **Do:** size every box in Content region
to a whole 1/2/3/4-column span, never an arbitrary width — a box that
doesn't fit one of those four should be reconsidered, not special-cased
with a one-off fraction. **Don't:** give a box its own fixed height to
solve a row-height mismatch — that's what Row height's `align-items:
stretch` is already for; a hardcoded height fights it instead of using
it.

### Badge & Tag

**These are two separate components.**

**Badge** — conveys *status or tone*. 22px tall, `spacing-8` horizontal
padding, caption type at weight 700, `radius-pill`,
**a 1px border** in a stronger tint of the same hue, which is what makes
these read as deliberate at small sizes. **`white-space: nowrap`** is
required — a fixed-height pill and wrapping text are incompatible;
if a label risks being that long, shorten the label rather than let the
component reflow.

| Variant | Fill | Text | Border |
|---|---|---|---|
| Neutral | Neutral-2 `#f0f0f0` | Neutral-5 | Neutral-3 |
| Success | Green at 12% | `#00854c` (darkened for AA) | Green at 32% |
| Danger | Red at 10% | Red `#FD3343` | Red at 30% |
| Warning | Amber at 14% | `#9a5c00` (darkened for AA) | Amber at 38% |
| Info | Water at 10% | Water `#1473E6` | Water at 28% |
| Selected | Neutral-1 | Neutral-9 | Obsidian `#2B2B2C` |

Note the darkened Success and Warning text values — full-strength Green
and Amber both fail AA on their own light fills at this size.

**Tag** — labels *which element/department owns* something. 24px tall,
10px horizontal padding, caption type at weight 700, `radius-pill`, with
a **6px dot** in the element's full-strength color and matching text
color. Fill is the owning element's `-bg` tint (8% — the same [Elemental
background tint](#color-palette) used everywhere else a surface is
colored by the element that owns its content), not a generic neutral
fill — Fire's tag uses `--color-fire-bg` behind orange text/dot,
Water's uses `--color-water-bg` behind navy, and so on for all five
elements. Distinct from Badge because ownership is not a status.

Both accept an optional leading `icon-micro` (14px) in the text color —
weight follows the icon's own [Iconography](#iconography) tier (a Tag's
element motif icon, e.g. `flame`/`drop`, is **Tier 2, Fill**, since it's a
department indicator, not a control).

**Max label length:** Badge labels take 20 characters maximum, Tag
labels 24. Limits are enforced at content level — the component itself
never truncates; a label that exceeds the limit must be rewritten, not
clipped. Both are system-generated labels, so this is an authoring
rule, not a display rule.

**Grouping:** spacing-4 between adjacent Badges or Tags.

**Do:** use Badge for state (Live, Paused, Blocked), Tag for ownership
(Fire · Marketing). **Don't:** fill either solid with a brand color and
put white text on it — several accents fail contrast that way at this
size.

### Button

All buttons are **weight 700**. Radius varies by
size, and Secondary carries `shadow-1`.

| Variant | Fill | Text/icon color | Border | Use for |
|---|---|---|---|---|
| Primary | Obsidian `#2B2B2C` | Neutral-1 `#ffffff` | none | The one main action on a screen or card |
| Secondary | Neutral-1 `#ffffff` | Neutral-9 `#080808` | 1px Neutral-3 + `shadow-1` | Secondary actions alongside a primary button |
| Ghost | transparent | Neutral-9 `#080808` | none | Low-emphasis actions, toolbar/table-row actions |
| Danger | Red `#FD3343` | Neutral-1 `#ffffff` | none | Destructive commit actions (delete, revoke) |
| Link | transparent | Neutral-9 `#080808` | none, underlined (3px offset) | Inline text-level actions; no height or padding |

**Sizes:**

Verified directly against the
teammate's `Button.jsx`: the real component uses **14px for sm, and 16px for both md and lg**
— md and lg share a type size and differ only in height/padding. That
16px doesn't correspond to any named label token in this document; it's
a component-specific override, not a scale mismatch to "fix" elsewhere.

| Size | Height | Horizontal padding | Type size | Weight | Radius |
|---|---|---|---|---|---|
| sm | 32px | spacing-12 (12px) | 14px | 700 | `radius-sm` (12px) |
| md (default) | 40px | spacing-16 (16px) | 16px | 700 | `radius-md` (16px) |
| lg | 48px | spacing-20 (20px) | 16px | 700 | `radius-md` (16px) |

**States:**

| State | Primary | Secondary | Ghost |
|---|---|---|---|
| Default | Obsidian fill | Neutral-1 fill, Neutral-3 border | transparent |
| Hover | Neutral-8 `#171717` fill | Neutral-2 `#f0f0f0` fill | Neutral-2 fill |
| Active/pressed | Neutral-7 `#222222` fill | Neutral-3 fill | Neutral-3 fill |
| Focus-visible | above + 2px Obsidian outline, 2px offset | same | same |
| Disabled | Neutral-4 `#bdbdbd` fill, Neutral-1 text | Neutral-3 border, Neutral-4 text | Neutral-4 text |
| Loading | Primary fill, centered spinner replaces label, button width unchanged | same pattern | same pattern |

Leading icon optional, `icon-sm` (16px), same color as label — weight
follows the icon's own [Iconography](#iconography) tier, not the button
(e.g. a leading `plus` is **Tier 1, Regular**; a leading `check-circle`
would stay **Tier 2, Fill**).

**Icon-only.** Any color variant except Link (which
has no fixed height to square against) can render icon-only: no visible
label, square hit area matching the button's own height at that size
(32×32 sm, 40×40 md, 48×48 lg), zero horizontal padding, centered icon
at `icon-sm` (16px). The icon must be pulled from **Tier 1 (functional/
control)** of [Iconography](#iconography) — e.g. `dots-three`, `x`,
`pencil-simple`, `trash` — never a Tier 2 icon, since the button itself
is already the control action; a Tier 2 icon there would double up a
status/decorative mark where an action mark belongs. Always requires an
`aria-label` describing the action (e.g. "More options"), since there's
no visible text for assistive tech to read.

**Do:** keep one Primary button per screen/card region. **Don't:** use an
element/department color as a button fill — that's a classification color,
not an action color (Rule 2 above).

### Card

Base surface for grouping content — dashboard tiles, list items, panels.

| Property | Value |
|---|---|
| Fill | Neutral-1 `#ffffff` |
| Border | 1px Neutral-3 `#d8d8d8` |
| Elevation | `shadow-1` at rest — cards carry both border and shadow |
| Radius | `radius-lg` (20px) |
| Padding | spacing-16 (16px), per the deck's stated card padding |
| Header gap | spacing-12 (12px) between icon-chip and title block |
| Header-to-body gap | spacing-16 (16px), only when a subtitle or body content follows the header |
| Title | h5 (16px/700). Subtitle: caption, Neutral-5, weight 400 |
| Transition | `box-shadow var(--duration-base) var(--ease-settle)` |

**Footer (optional)** —
spacing-16 (16px) margin above it, spacing-12 (12px) top padding, 1px
Neutral-3 top border, caption type, Neutral-5. Same visual pattern as
the Modal footer's divider, scaled down.

**Variants:**
- **Static** — default surface above, no interaction.
- **Interactive/clickable** — hover raises to `shadow-2`; cursor pointer; focus-visible gets `shadow-focus`.
- **Element-accented** — a 3px top border in the owning element's color. The rest of the card stays neutral.
- **Icon-chip header** — a 36×36 chip at `radius-sm`, `icon-md` glyph in the element's full-strength color — **Tier 2, Fill** (a department indicator, per [Iconography](#iconography)). The chip background is the element color at **12% opacity** (a one-off `color-mix`), not the standard 8% `-bg` token used for full-card tinting — these are two different tint strengths for two different purposes, don't conflate them. This is the standard way a card declares which department owns it.
- **Warm** — `canvas-warm-card` fill, border dropped. For a surface that's deliberately blending into the (now default-everywhere) warm page canvas — e.g. a quote block, a featured stat — rather than standing apart from it; not restricted to brand/editorial anymore (see Color Palette's Warm canvas note).
- **Element-tinted** — full card background in the owning element's `-bg` tint (8%). Use sparingly; the icon-chip variant is usually the better signal.

**Do:** let cards carry `shadow-1` — that's the intended resting state.
Use the 12% icon-chip tint and the 8% full-card `-bg` tint deliberately —
they're not interchangeable. **Don't:** tint a card with an element that
doesn't own its content.

### Chart chrome & marks

⚠️ **Designed from scratch — no source in either the original brand
deck or the teammate's build.** Chart.js v4 has been adopted as this
system's charting library. This section is a companion to [Chart color
mapping](#chart-color-mapping) above (which covers categorical/
sequential/diverging color-role assignment): it specs the chrome
(axes, tooltip, legend), the marks (bar/line/area/radial), and the
card/KPI container every chart sits in. Still first-pass, not reviewed
by the brand team, and — like the rest of this document — a spec to
build against rather than a transcription of any one existing build.

Gridline color follows [Chart color mapping](#chart-color-mapping)'s
existing "Neutral-3 for gridlines" rule above — carried forward as-is,
not a new value.

#### Chart chrome (every chart)

| Element | Rule |
|---|---|
| X-axis | No border, no gridlines |
| Y-axis | No border; only gridline on the chart, color Neutral-3, hairline |
| Axis tick labels (X & Y) | `footnote` token (`--text-footnote-*`: 12px / 16px lh / 400 weight), Neutral-5 |
| Axis titles (when present, e.g. Bubble/Scatter) | `label2` token (`--text-label2-*`: 13px / 18px lh / 700), Neutral-5 |
| Tooltip surface | Neutral-1 bg, 1px Neutral-3 border, `cornerRadius: 8` (literal — no matching radius token exists), `padding: 10` (literal) |
| Tooltip title (the value) | `label2` token, Neutral-9 |
| Tooltip body (the label) | `label3` token, Neutral-5 |
| Legend | `position: 'bottom'`, `align: 'start'` (left-aligned row), `caption` token labels, Neutral-5, circular `usePointStyle` swatches (`boxWidth`/`boxHeight: 10`), item padding tied to `--spacing-16` (not a literal) |

#### Marks

| Mark | Rule |
|---|---|
| Bar corner radius | `--spacing-4` (4px), top-only |
| Bar max thickness (vertical) | `--spacing-24` (24px cap, dataviz spec) |
| Bar max thickness (horizontal) | `--spacing-20` (20px) — its own token, distinct from vertical |
| Bar hover | `color-mix()` 15% toward Neutral-9 from the base color |
| Line stroke | 2px, `tension: 0.3` |
| Line points | 3px radius, 2px Neutral-1 ring border, 5px on hover |
| Area/line fill wash | `color-mix(…, transparent 88%)` off the line's own color — never full-strength |
| Radial grid rings + angle lines | Neutral-3 |
| Radial tick numbers + point labels | `footnote` token; ticks get an opaque Neutral-1 `backdropColor` + `backdropPadding: --spacing-4` so the dataset fill never swallows the number |

#### Per-chart-type marks

| Chart type | Stroke / line width | Fill | Points | Notes |
|---|---|---|---|---|
| Bar (single-series) | — | mid (full-strength theme color); hover → hover (color-mixed 15% darker) | — | rounded 4px top, 24px cap |
| Horizontal bar | — | mid | — | same radius rule; thickness should come from `--spacing-20` above — if an implementation hardcodes `maxBarThickness: 20` as a literal instead, treat that as a bug to fix, not a second deliberate literal-value exception (the tooltip's `cornerRadius`/`padding` above remain the only genuine one, since no matching token exists for those) |
| Line (plain) | 2px | none (`fill: false`) | 3px radius, 2px white ring border, 5px on hover | `tension: 0.3` for a gentle curve, not sharp joints |
| Area (filled line) | 2px | fill wash — `color-mix(…, transparent 88%)`, a ~12% wash, never the full-strength color | same as Line | the only chart where the line's own color also becomes a fill, at reduced opacity |
| Scatter | 1px point border | mid | 6px radius, 8px on hover | no line connecting points |
| Doughnut / Pie | 2px slice border, white | Same-hue ramp (light→dark, one rung per slice) | — | border color is Neutral-1 (the gap-between-slices trick) |
| Radar | 2px | fill wash (~12% wash) | 3px, white border | `suggestedMin`/`suggestedMax` fixed to the 0–10 rating scale, not auto-scaled |
| Bubble | series color as point border | `-wash` variant of each series color (30% or 15% transparent — see [Chart color mapping](#chart-color-mapping)'s ramp) | radius = third data dimension | 3 series max, all-pairs-validated slots only |
| Polar area | 2px slice border, white | Same-hue ramp, translucent (30% for saturated rungs, 15% for the two pale tint rungs) | — | translucency is deliberate: lets grid rings show through the whole wedge, not just at the tick spoke |

#### Card / KPI / container

| Element | Rule |
|---|---|
| Chart card padding | [Card](#card)'s own default (`--spacing-16`) — no override |
| Chart canvas | `flex: 1 1 auto` + a min-height floor (260px, 300px for `.tall`) — not a fixed height, so it fills whatever a CSS-Grid-stretched card gives it |
| KPI label | [Stat / KPI card](#stat--kpi-card)'s own `caption` token, weight 700, `tracking-eyebrow`, uppercase, Neutral-5 — not a new token set |
| KPI value | [Stat / KPI card](#stat--kpi-card)'s own `h1` token, Neutral-9 |
| KPI badge | Reused [Badge & Tag](#badge--tag)'s `.c-badge`/`.c-badge-success`/`.c-badge-error` verbatim, with a local `.kpi-tile .c-badge { align-self: flex-start }` fix — [Stat / KPI card](#stat--kpi-card)'s container is a column flexbox with no `align-items`, which was silently stretching the badge to full card width |
| "View as table" button | Reuses `.c-btn c-btn-secondary c-btn-sm` verbatim — no bespoke button CSS. Every chart gets one except Bubble (structurally has no accompanying `<table>` at all) |
| Chart grid | `repeat(3, 1fr)` → 2 cols @1100px → 1 col @640px, `--spacing-16` gap |

⚠️ **Known implementation risk, not a doc decision:** an
implementation may be tempted to style the KPI label/value with
`label1`/`h3` instead of the `caption`/`h1` documented above. Treat
that as a bug to fix against this spec, not a second valid token set —
[Stat / KPI card](#stat--kpi-card) stays the single source of truth for
KPI typography.

#### Chart type selection

Choose chart type based on what the data communicates, not aesthetics.

| Data story | Use this chart |
|---|---|
| Compare values across categories | Horizontal bar chart |
| Change over time | Line chart |
| Cumulative volume over time | Area chart (fill ≤ 12% opacity) |
| Part of a whole | Doughnut chart (max 5 segments) |
| Correlation / distribution | Scatter chart |
| 3 variables (x, y, size) | Bubble chart |
| Performance across dimensions | Radar chart (max 6 axes) |
| Volume by category (non-linear) | Polar area chart |
| Single headline number | Stat tile — not a chart |
| Forecast vs actual over time | Multi-series area + line chart with projection zone annotation |
| Cumulative concentration | Concentration curve (area chart with annotated callouts) |
| Positive / negative contributions | Diverging horizontal bar chart (bridge/waterfall) |
| Deal stage pipeline | Weighted pipeline bar component (custom — built in HTML/CSS, not chart library) |
| 2×2 performance matrix | Scatter chart with quadrant zone backgrounds |
| Budget / gap breakdown | Segmented bar + detail table (custom component from `components.css`) |

**Do:** pick a chart type from the table above by what the data needs
to say, not by preference; give every chart the same chrome (no axis
borders, Neutral-3 gridlines, one tooltip/legend spec) so a user can
move between charts without relearning the furniture. **Don't:** fill
an area/line mark above ~12% opacity, or exceed 5 Doughnut segments / 6
Radar axes / 3 Bubble series — past those caps, pick a different chart
type instead of cramming more into the same one.

### Chart color mapping

⚠️ **Designed from scratch — a guideline, not a rendered
component; no source in either the original brand deck or the
teammate's build, and no chart library has been chosen yet.** This maps
existing tokens onto chart roles so that whichever library gets picked
later stays consistent with the rest of the system, rather than
inventing chart-specific colors.

| Chart role | Rule |
|---|---|
| Categorical, department-aligned (≤5 series) | Walk the department table top-to-bottom: Fire/Orange, Wood/Salmon Pink, Earth/Green, Water/Navy, Gold/Amber, at full strength for the mark itself (line/bar/dot). For an area fill under a line, use that series' `-bg` tint (8%), never the full-strength color as a fill. |
| Categorical, 6–7 series | Extend with the two secondary accents (Purple, Turquoise) in that order — they exist specifically as this reserve. |
| Categorical, >7 series | Don't add more brand colors — >7 simultaneous hues aren't reliably distinguishable anyway. Differentiate with line/marker pattern (dash, dot) instead. |
| Sequential (single-metric intensity, e.g. heatmap) | A single-hue ramp from that metric's owning element's `-bg` tint (lightest) to its full-strength color (darkest) — e.g. a Water-owned intensity map ranges `--color-water-bg` → `--color-navy`. Never a rainbow/multi-hue ramp; it breaks the one-element-per-surface rule everywhere else in this system. |
| Diverging (e.g. spend variance around zero) | Green (positive) ↔ Neutral-3 (midpoint) ↔ Red (negative) — reuses the same pairing as Badge success/danger and Toast tones, not a new pair. |
| Gridlines / axes | Neutral-3 for gridlines, Neutral-5 for axis labels/ticks — never Neutral-9, which is too heavy and competes with the data itself. |
| Chart chrome vs. data-ink | Axes, gridlines, and legend text always use caption/footnote type at Neutral-5; only the data marks get full-strength brand color. |

**Do:** assign categorical chart colors by walking the department
table in order, not arbitrarily. **Don't:** use more than one hue
family within a single sequential or diverging scale, or let a legend
introduce a color that isn't already a token in this document.

### Checkbox

**Transcribed from the teammate's `Checkbox.jsx`.**
Supports multi-select and an indeterminate (partial-selection) state.

| Part | Spec |
|---|---|
| Box | 18×18px, 6px radius (⚠️ a one-off literal value — doesn't map to `radius-sm` or any named token; a compact control gets its own smaller radius), spacing-8 gap to the text, 2px top margin for optical alignment with the first text line |
| Box — unchecked | 1px Neutral-3 border, Neutral-1 fill |
| Box — checked / indeterminate | Obsidian border and fill, `icon-micro` (14px) check or minus glyph in Neutral-1 — **Tier 1, Regular** (the Checkbox marks are explicitly called out in [Iconography](#iconography)) |
| Label text | body1, weight 500, Neutral-9 |
| Description (optional) | caption, Neutral-5, below the label |
| Disabled | 50% opacity, `cursor: not-allowed` |
| Transition | `background-color`, `border-color` — `var(--duration-fast) var(--ease-standard)` |

**Do:** pair every checkbox with a real `<label>`, never an icon alone.
**Don't:** reuse the 6px box radius anywhere else — it belongs to this
control's compact size only, not the shared radius scale.

### Chip

⚠️ **Designed from scratch — no source in either the original brand
deck or the teammate's build.** Built from this document's own token
system by reusing Badge's pill anatomy, Button's hover/pressed/
focus-visible recipe, Tag's remove-affordance convention, and
Checkbox's own check glyph — not transcribed. Treat as a first pass
needing real design/brand review; revised once from a tested reference
build, see [Changelog](#changelog).

Interactive pill representing either a user-entered value (**Input
Chip**) or a selectable filter option (**Filter Chip**). Distinct from
Badge and Tag, which both look similar but are read-only: **Badge**
labels *status*, system-generated; **Tag** labels *ownership*,
system-generated; **Chip** always represents a selection or an input
value, and is always interactive.

- **Input Chip** — represents a value the user entered or confirmed.
  Lives inside or directly below an input area. Always has a × remove
  button. Not toggleable — it exists, or it's removed.
- **Filter Chip** — represents a predefined selectable option, toggled
  on or off. Lives in a toolbar or filter row. Comes in two selection
  modes (see Selection modes below) and is optionally removable.

| Part | Spec |
|---|---|
| Container — Input Chip | 24px height (one-off literal, matching **Tag**'s own compact scale, per [Badge & Tag](#badge--tag) — this is an embedded/inline context, not a standalone control), spacing-8 (8px) horizontal padding, `radius-pill`, Neutral-2 `#f0f0f0` fill, 1px Neutral-3 `#d8d8d8` border — Badge's Neutral-variant recipe, not Tag's (Tag itself carries no border). No leading icon — there's no confirmed use case for one on a user-entered value, so the slot doesn't exist for this variant at all |
| Container — Filter Chip | 32px height (matches **Button sm**), spacing-12 (12px) horizontal padding — also Button sm's own horizontal padding — `radius-pill`, Neutral-1 `#ffffff` fill, 1px Neutral-3 border, **no shadow**. Default content is text-only; a leading category icon is an optional secondary variant (see Leading icon row below) |
| Label | `label2` (13px/18px, weight 700), Neutral-9 `#080808` — the typescale table's own use case for `label2` is "Buttons, tags, chips" |
| Leading icon (optional, Filter Chip only) | Two distinct uses, never both on the same chip at once: **(1) category icon** — `icon-sm` (16px), a secondary variant for when every option in the group has a clear glyph (e.g. a department icon); **Tier 1, Regular** — a judgment call, not an explicit example in [Iconography](#iconography), since it identifies/classifies rather than expressing status (see [Needs Input #11](#needs-input-read-this-first) for the doc's existing precedent of flagging tier calls this way). **(2) selection tick** — Multi-select's own active-state indicator (see States below), reusing Checkbox's exact `ph-check` glyph, which [Iconography](#iconography) already lists as **Tier 1, Regular** ("check and minus, the Checkbox marks"). If a chip carries a category icon and becomes active in a multi-select group, the tick replaces it rather than rendering both — one leading-icon slot, one purpose at a time. Either icon inherits the label's color; spacing-4 (4px) gap to the label |
| Remove button (×) | `icon-micro` (14px) `x` glyph, **Tier 1, Regular** — a remove affordance, the same reasoning as **Tag**'s own remove button; Neutral-5 `#5a5a5a` at rest, Neutral-9 on hover; 24×24px hit target via padding — the same hit-target precedent as FileUploader's row × and Input Field's Clear ×; spacing-4 (4px) gap from the label; stops click propagation so removing the chip never triggers whatever the chip sits inside |
| Internal gap | spacing-4 (4px) between every part — icon → label → × |

**States — Input Chip.** Not toggleable; only the × remove button is
interactive.

| State | Container | Label | Remove (×) |
|---|---|---|---|
| Default | Neutral-2 fill, 1px Neutral-3 border | Neutral-9 | Neutral-5 |
| Remove — hover | unchanged | unchanged | Neutral-9 — only the × responds, the container never does |
| Focus-visible | Neutral-2 fill + 2px Obsidian outline, 2px offset — reuses **Button**'s exact focus-visible token | unchanged | unchanged |
| Disabled | 40% opacity throughout, `cursor: not-allowed`, no hover response | — | — |

**Selection modes — Filter Chip.** A Filter Chip group is either
Single-select or Multi-select — pick one per group; never mix modes
within a single group.

| Mode | Behaviour | Wrapper / chip roles |
|---|---|---|
| Single-select | Mutually exclusive — selecting one deselects any other in the group. Exactly one chip is always active; clicking the already-active chip is a no-op, the same contract [Segmented Control](#segmented-control) uses. There is no "none selected" state, since this mode represents a required, always-applicable choice (e.g. a status a record always has exactly one of), not an optional add-on filter | `role="radiogroup"` on the wrapper, `role="radio"` + `aria-checked` per chip |
| Multi-select (default) | Independent — each chip toggles on its own, any number (including zero) can be active at once, semantically identical to a checkbox group. The active state adds the leading selection tick described in the Anatomy table above, reinforcing the checkbox-like independence (Single-select's active state relies on fill/text color alone, since mutual exclusivity already makes the one active choice unambiguous without needing a tick) | `role="group"` on the wrapper, `role="checkbox"` + `aria-checked` per chip |

**States — Filter Chip.** The entire chip surface is the toggle
target, in both selection modes.

| State | Fill | Border/shadow | Text | Leading icon |
|---|---|---|---|---|
| Inactive — default | Neutral-1 `#ffffff` | 1px Neutral-3 | Neutral-9 — mirrors **Button Secondary**'s own default | category icon, if that variant is in use |
| Inactive — hover | Neutral-2 `#f0f0f0` | 1px Neutral-3 | Neutral-9 — matches **Button Secondary**'s own hover token (`Hover \| Neutral-2 fill`) | unchanged |
| Inactive — pressed | Neutral-3 `#d8d8d8` | 1px Neutral-3 | Neutral-9 — matches **Button Secondary**'s own `Active/pressed \| Neutral-3 fill` | unchanged |
| Active — default | Obsidian `#2B2B2C` | none | Neutral-1 `#ffffff` — matches **Button Primary**'s own default; Obsidian signals the filter is engaged, the same reasoning as Input Field's focus border and Slider's track fill | Multi-select only: `ph-check` tick, Neutral-1 (replaces a category icon if one was showing); Single-select: none, per Selection modes above |
| Active — hover | Neutral-8 `#171717` | none | Neutral-1 — matches **Button Primary**'s own hover | unchanged |
| Active — pressed | Neutral-7 `#222222` | none | Neutral-1 — matches **Button Primary**'s own `Active/pressed` | unchanged |
| Focus-visible | current fill + 2px Obsidian outline, 2px offset, `radius-pill` — reuses **Button**'s exact focus-visible token | | | |
| Disabled | 40% opacity throughout, `cursor: not-allowed`, no hover response — matches **Button Ghost**'s disabled and Segmented Control's own disabled convention, not Checkbox/Radio/Switch's 50%-opacity convention (that belongs to compact toggle controls, not pill-shaped ones) | | | |

**Transition:** `background-color`, `color`, `border-color` —
`duration-fast` (140ms), same hover/focus duration as Button —
`ease-standard`, the non-elemental default, since Chip isn't owned by a
specific brand element (same reasoning as Segmented Control, Toast,
and SidebarNav's collapse transition). No `box-shadow` in the
transition property list, since Filter Chip no longer carries one at
any state.

**Content rules:**
- Filter Chip labels: 24 characters maximum, enforced at
  content-authoring level — the component itself never truncates; a
  label that exceeds the limit must be rewritten (the same authoring
  rule Badge and Tag use for their own label limits).
- Input Chip labels: user-generated content can't be pre-constrained at
  authoring time, so it truncates with an ellipsis instead, once the
  chip exceeds its container's available width; max-width is set by
  the usage context, not inside the component itself.
- Filter Chip's category-icon variant is optional — a chip without one
  is valid. Never use an icon as a substitute for a missing label.
  Input Chip never has a leading icon at all (see Anatomy above).
- No trailing icon other than × is permitted on either variant. A
  second trailing icon belongs to Badge or a Select trigger, not Chip.

**Grouping and overflow:**

| Rule | Spec |
|---|---|
| Gap between chips | spacing-4 (4px) — the same grouping rule Badge and Tag use |
| Wrap behaviour | chips wrap to a new line at a spacing-4 row gap; never horizontal scroll |
| Overflow — Input Chip groups | beyond 3 visible chips, collapse the rest into a `+N` chip (Neutral-2 fill, 1px Neutral-3 border, Neutral-5 label, no ×). Clicking it expands the hidden chips in place; once expanded, the control itself switches from the `+N` chip to a **Link button** reading "Show less" (transparent, Neutral-9, underlined 3px offset, no fixed height/padding — Button's own Link recipe, verbatim) to re-collapse. It isn't chip-shaped once expanded, since collapsing isn't a value or an option the way the chips around it are. Neither state is individually removable — it doesn't represent a value of its own |
| Overflow — Filter Chip groups | no hard limit; wrap naturally. If a row wraps past 2 lines, use [Dropdown](#dropdown)'s Multiple select instead |

**Placement:**
- Input Chips: inside or directly below the input field they
  represent, only. Never in a standalone row away from that field.
- Filter Chips: in a toolbar, filter row, or control bar. Not inside a
  form as a Checkbox substitute — use Checkbox when the choice is
  submitted as part of a form.
- Never mix Input and Filter Chips in the same group — their
  behavioural contracts differ (removable-only vs. toggleable).

**Accessibility:**
- Input Chip: `role="listitem"` per chip, inside a `role="list"`
  wrapper. The × requires `aria-label="Remove [label text]"` (e.g.
  `aria-label="Remove Marketing"`).
- Filter Chip: see Selection modes above for the role/`aria-checked`
  pairing per mode.
- Keyboard — Input Chip: Backspace in an empty adjacent input removes
  the last chip in the group; Delete or Backspace while a chip itself
  is focused removes it.
- Keyboard — Filter Chip, Multi-select: Space or Enter toggles the
  focused chip; Tab moves between chips.
- Keyboard — Filter Chip, Single-select: arrow keys move focus between
  chips (the standard radio-group pattern); Space or Enter selects the
  focused chip; Tab moves focus out of the group entirely.
- Color: an active Filter Chip never relies on Obsidian fill alone —
  the Neutral-1 text color change signals active state too, in both
  selection modes. Multi-select's tick is a reinforcement on top of
  that, not a replacement for it — decorative to assistive tech, since
  `aria-checked` already carries the state.

**Do:** use Input Chip for user-entered or confirmed values. Use Filter
Chip for predefined toggleable options — Single-select when exactly
one choice always applies, Multi-select when any number (including
zero) can. Give every × an `aria-label` naming what it removes. Keep
the `+N` overflow control non-removable in either of its states.
**Don't:** mix Input and Filter Chips in the same group. Don't use
Filter Chip inside a form that requires explicit submit — use Checkbox
instead. Don't use an accent/elemental color as an active Filter Chip's
fill — Obsidian is correct (Rule 2, [Component Rules](#component-rules)).
Don't truncate a Filter Chip label — rewrite it instead. Don't mix
Single-select and Multi-select behaviour within one group.

### DataTable

**Transcribed from the teammate's `DataTable.jsx`.**
A composed, bordered table container — distinct from the bare Table row
spec above, which is for inline use inside another surface. Pick one per
data view; don't mix them in the same screen.

| Part | Spec |
|---|---|
| Container | 1px Neutral-3 border, `radius-lg` (20px, matches Card), `overflow: hidden` (clips the header to the radius), Neutral-1 fill |
| Header cell | spacing-12/spacing-16 padding, Neutral-2 fill, **h5 type (16px/700 — heavier than the bare Table row header's label3/uppercase)**, Neutral-9, 1px Neutral-3 border-bottom, align per-column |
| Body cell | spacing-12/spacing-16 padding, **body2 type (14px/20px — this is the source's own "footnote" token, which maps to this doc's body2 scale, not the 12px footnote token)**, weight 500, Neutral-9, tabular figures when numeric, 1px Neutral-3 border-bottom (none on the last row) |
| Row | `cursor: pointer` only when `onRowClick` is set; reuses Table row's Neutral-2 hover fill for consistency (DataTable has no separate hover token of its own yet) |

**Do:** keep header labels short — the heavier h5 weight wraps
awkwardly on long labels. **Don't:** add a fifth border style here; it
inherits Table row's border and hover conventions on purpose.

### Date picker

⚠️ **Designed from scratch — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by extension from the Select and Modal footer patterns,
not transcribed. Treat as a first pass needing real design/brand
review.

| Part | Spec |
|---|---|
| Trigger | same box as Select (sm/md/lg heights, `radius-sm`, 1px Neutral-3 border, Neutral-1 fill) but with a leading `calendar` icon (`icon-sm`, Neutral-5) instead of a trailing caret; **Tier 2, Fill** — kept Fill per [Iconography](#iconography)'s own "Card / section header: Calendar... Fill" example, despite sitting inside a trigger button; shows the formatted date (body1/weight 500) or placeholder text (Neutral-5) |
| Popover panel | `radius-md` (16px), 1px Neutral-3 border, `shadow-3`, spacing-16 padding, 8px below the trigger — same popover convention as Filters |
| Month header | flex row, `justify-content: space-between`; prev/next month Ghost icon-buttons (32×32, `caret-left`/`caret-right`) — **Tier 1, Regular** (navigation control) — flank a centered month/year label (h5, 16px/700) |
| Weekday row | 7-column grid, caption/700/uppercase/Neutral-5, spacing-4 bottom gap |
| Day cell | 36×36px, `radius-sm` (12px), numeral centered (caption or body2) |
| Day — default | transparent fill, Neutral-9 text |
| Day — hover | Neutral-2 fill |
| Day — today | 1px Obsidian **border only** (never filled) — kept visually distinct from "selected" |
| Day — selected (single) | Obsidian fill, Neutral-1 text |
| Day — in-range (range mode) | Neutral-2 fill, Neutral-9 text, flush block between the two range boundaries (no radius on inner edges) |
| Day — range start/end | Obsidian fill, Neutral-1 text, `radius-sm` only on the outer edge |
| Day — disabled / outside month | Neutral-4 text, no hover, `cursor: not-allowed` |
| Footer (range mode only) | Secondary + Primary button pair, right-aligned, spacing-8 gap, spacing-16 top padding + top border — same footer convention as Modal |

**Do:** always mark "today" with an outline rather than a fill, so it's
never confused with the actively selected date. **Don't:** use a filled
state for hover — full Obsidian fill is reserved for selected/range-
boundary days only.

### Dropdown

⚠️ **Designed, not sourced** (Single select rebuilds the former
transcribed **Select** as a custom panel on top of [Input
Field](#input-field)'s own container, instead of a native `<select>`;
Multiple select absorbs the former **MultiSelect**, itself since
rebuilt from a chip-based trigger into a count-based one, on the same
container). Reuses Filters'/Date picker's popover convention for both
panels, Input Field's own container for both triggers, and this
system's own Checkbox glyph for Multiple select's rows — not invented
patterns. Treat as a first pass needing real design/brand review.

A trigger that opens a panel of options, in two variants — both built
directly on Input Field's own container (`.c-field`/`.input-wrap`/
`.icon-trailing`, its real `:focus` swap, `.c-field-error`, `:disabled`,
all reused unmodified, not a second, bespoke trigger recipe), so both
are `radius-sm`, matching Input Field itself:

- **Single select** — pick exactly one option; the trigger shows the
  current value and closes the panel on pick (the former Select).
- **Multiple select** — pick any number of options; the trigger
  summarizes the count ("3 selected") rather than listing chips, and
  stays open across picks (the former MultiSelect).

| Part | Spec |
|---|---|
| Field label (optional) | caption, weight 700, Neutral-9, spacing-4 below it — literally Input Field's own `<label>` for both variants |
| Panel | `radius-md` (16px), 1px Neutral-3 border, `shadow-3`, Neutral-1 fill, spacing-8 below the trigger, **always exactly the trigger's own rendered width, with no floor** (both sit in the same parent and share one `width: 100%` rule with no `min-width`, so a wider/narrower trigger drags the panel with it automatically — an earlier `min-width: 240px` floor was removed after it made the panel run wider than a trigger narrower than 240px, breaking the exact-match guarantee it was meant to be documenting) — true for both variants, in every Style. The panel keeps its own `radius-md`/popover recipe regardless of the trigger's `radius-sm` — the two aren't tied together |

**Single select — Container.** The trigger box is [Input
Field](#input-field)'s own container, reused as-is, not recreated:
`.c-field`/`.input-wrap`/`.icon-trailing` (border, `radius-sm`, real
`:focus` swap, `.c-field-error`, `:disabled`) are all inherited
unmodified from there — the same reuse Multiple select's own trigger
makes. Only a trailing caret icon (reusing the same `.icon-trailing`
slot Input Field's own Success state already established) and a Style
axis Input Field itself doesn't have are new, both scoped to this
component's own class so bare Input Field, Textarea, Password field,
and Search input stay untouched. Supersedes an earlier draft that gave
Single select its own Button-Secondary-styled, `radius-md` trigger
instead — that recipe is gone.

**Single select — Style.** Two trigger treatments, same box
dimensions (Input Field's own `radius-sm`, 40px height) and panel in
every case — only the resting chrome changes:

| Style | Rest | Hover |
|---|---|---|
| Outlined (default) | Neutral-1 fill, 1px Neutral-3 border — Input Field's own recipe | Neutral-2 fill |
| Borderless | transparent fill, no border — for inline placements (toolbars, table headers) that shouldn't read as a boxed field; stays borderless through every State too, including Open and Filled — the only Style where those don't swap to a solid Obsidian border | Neutral-2 fill |

Every Style keeps the same 1px border **width** at rest, just varying
its color (transparent for Borderless) — so Open's 1px→2px width swap
compensates by the same 1px/side in every Style, with no per-style
exception to remember for the padding math; Borderless just keeps that
swapped border fully transparent rather than colouring it Obsidian the
way Outlined does, so nothing ever becomes visible there — same trick
Multiple select's own Style axis uses.

**Single select — States.**

| State | Spec |
|---|---|
| Default | placeholder value text, Neutral-5 — Input Field's own documented placeholder treatment (lighter than a real value, so Default and Filled are distinguishable without a caption) |
| Hover | real `:hover` (plus a `.hover` class for static demos) — background escalates one step per the Style table above; new for this trigger, since Input Field itself has no Hover state documented |
| Open | real `:focus` — Input Field's own 2px Obsidian border swap, spacing-12→11px padding compensate, inherited unmodified (Borderless keeps that swapped border transparent, so no visible border shows in that Style) — plus the panel visible below; a `.open` class stands in for real focus/click in a static demo |
| Filled | holds a value — the input's real `value` (not `placeholder` — so it renders Neutral-9 automatically, no extra class needed for that part), border swaps to Obsidian in Outlined — Borderless stays borderless, no visible border here either — the same "holds a value" recipe Filters' own Filter trigger — active state uses |
| Disabled | Input Field's own `:disabled` recipe (Neutral-2 fill, Neutral-5 text) — flattens Borderless's own resting chrome to this one muted look, same rationale as Multiple select's Disabled |
| Read-only | the trigger stops opening the panel (its click target is inert, chevron hidden) while still showing its current value — `pointer-events: none` alone doesn't block a focused element's keyboard activation, a real implementation needs its own guard |
| Error | Input Field's own `.c-field-error` recipe (2px Red border, padding compensated to 11px, its `.c-helper` turns Red) — reused verbatim, the same recipe Multiple select's Error uses, not a bespoke error-text element |

**Single select — Dropdown Option** — the row sub-component inside
Single select's panel (Multiple select has its own, documented below —
the two aren't interchangeable, since one has a checkbox and the other
doesn't):

| State | Spec |
|---|---|
| Default | option label only, body2/400/Neutral-9 — the same font token as the trigger's own input text, not body1, so the row and the value it fills in read as one typographic family; no fill |
| Hover | real `:hover` (plus a `.hover` class for static demos) — Neutral-2 fill, same token as Table row's own hover |
| Selected | Neutral-2 fill (same token as Hover — Table row's own "selected reuses hover's fill" precedent) plus a trailing check glyph (`icon-sm`, Obsidian, **Tier 1, Regular**) as the actual distinguishing mark, not the fill |
| Disabled | Neutral-4 text, no fill on hover/click, `cursor: not-allowed` |

**Multiple select — Container.** The trigger box is [Input
Field](#input-field)'s own container, reused as-is, not recreated:
`.c-field`/`.input-wrap`/`.icon-trailing` (border, `radius-sm`, real
`:focus` swap, `.c-field-error`, `:disabled`) are all inherited
unmodified from there. Only a trailing caret icon (reusing the same
`.icon-trailing` slot Input Field's own Success state already
established) and a Style axis Input Field itself doesn't have are new
— both scoped to this component's own class so bare Input Field,
Textarea, Password field, and Search input stay untouched.

**Multiple select — Style.** Two trigger treatments, same box
dimensions (Input Field's own `radius-sm`, 40px height) and panel in
every case:

| Style | Rest | Hover |
|---|---|---|
| Outlined (default) | Neutral-1 fill, 1px Neutral-3 border — Input Field's own recipe | Neutral-2 fill |
| Borderless | transparent fill, no border; stays borderless through Open and Filled too, the only Style where those don't swap to a solid Obsidian border | Neutral-2 fill |

Same 1px-border-**width**-at-rest trick as Single select's own Style
axis — only the colour changes, so Open's 1px→2px width swap never
needs a per-style exception for its padding math either; Borderless
just keeps that swapped border fully transparent instead of colouring
it Obsidian, same as Single select's own Borderless.

**Multiple select — States.**

| State | Spec |
|---|---|
| Default | placeholder "Select brands" (or similar), Neutral-5 — Input Field's own documented placeholder treatment |
| Hover | real `:hover` (plus a `.hover` class for static demos) — background escalates one step per the Style table above; new for this trigger, since Input Field itself has no Hover state documented |
| Open | real `:focus` — Input Field's own 2px Obsidian border swap, spacing-12→11px padding compensate, inherited unmodified (Borderless keeps that swapped border transparent, so no visible border shows in that Style), plus the panel visible below; a `.open` class stands in for real focus/click in a static demo. The trigger being tabbed to before the panel is actually triggered shares this same real `:focus` swap — it isn't documented as its own separate State, since it's visually identical to Open minus the panel |
| Filled | shows "N selected" as the input's real `value` (not `placeholder` — so it renders Neutral-9, not the lighter placeholder colour, automatically, no extra class needed for that part), border swaps to Obsidian in Outlined — Borderless stays borderless, no visible border here either |
| Disabled | Input Field's own `:disabled` recipe (Neutral-2 fill, Neutral-5 text) — flattens Borderless's own resting chrome to this one muted look, same rationale as Single select's Disabled |
| Read-only | the trigger stops opening the panel (its click target is inert, chevron hidden) while still showing its current "N selected" value — same caveat as Single select's Read-only: `pointer-events: none` alone doesn't block a focused element's keyboard activation, a real implementation needs its own guard |
| Error | Input Field's own `.c-field-error` recipe (2px Red border, its `.c-helper` turns Red) — reused verbatim, not a bespoke error-text element the way Single select needed one |

**Multiple select — Behaviour.** Three interaction modes; the closed
trigger looks identical across all three (still "N selected" or the
placeholder) — the difference only shows once the panel is Open:

| Behaviour | Spec |
|---|---|
| Standard | plain checkbox list, grouped, Clear/Done footer below |
| With Select All | adds a pinned **Select All** row (see Dropdown Option below) above the list, separated by a divider |
| Searchable | the trigger's own input becomes editable (its `readonly` attribute is dropped) instead of just a display surface — typing filters the list live; this is the one Behaviour where Input Field's container is genuinely, not just visually, an input |

**Footer** (Multiple select only) — Ghost "Clear" + Primary "Done",
space-between, `spacing-8` gap, 1px Neutral-3 top border, `spacing-12`
padding — Modal footer's divider convention at a smaller scale;
unchanged from the chip-based version.

**Multiple select — Dropdown Option** — the checkbox row sub-component
inside Multiple select's panel, reusing this system's own
[Checkbox](#checkbox) glyph (`.c-checkbox-box`/`.on` +
`ph-check`/`ph-minus`) verbatim rather than a second, ad-hoc checkbox
recipe:

| State | Spec |
|---|---|
| Default | unchecked box, option label, body2/400/Neutral-9 — the same font token as the trigger's own input text, not body1, so the row and the "N selected" value share one typographic family; no fill |
| Hover | real `:hover` (plus a `.hover` class for static demos) — Neutral-2 fill, same token as Table row's own hover |
| Selected | checked box (Obsidian fill, `ph-check` glyph) — no extra row fill; a checkbox list signals "checked" through the box itself, unlike Single select's Dropdown Option, which has no checkbox to rely on and needs fill+check together |
| Indeterminate | Obsidian fill like Selected, but a `ph-minus` glyph instead of `ph-check` — **for the Select All row only**, when some but not all options in the list are checked |
| Disabled | Neutral-4 label text, checkbox kept at its own unchecked Neutral-3/Neutral-1 recipe, `cursor: not-allowed` |

**Select All row** — pinned as the first row in the list (With Select
All Behaviour only), separated from the option rows by a 1px Neutral-3
divider, label set to weight 700 so it reads as a header-like action
rather than one more option. Ticking it checks every option, unticking
clears every option, and it shows Indeterminate whenever the list is
partially checked. It's a checkbox row, not a plain button — that's
the only way it can show Indeterminate at all.

**Variants:** Single select — Outlined/Borderless Style ×
Default/Hover/Open/Filled/Disabled/Read-only/Error State, plus
its own Dropdown Option row sub-component (Default/Hover/
Selected/Disabled). Multiple select — Outlined/Borderless Style
× Default/Hover/Open/Filled/Disabled/Read-only/Error State ×
Standard/With Select All/Searchable Behaviour (Behaviour only visibly
differs when Open), plus its own Dropdown Option row sub-component
(Default/Hover/Selected/Indeterminate/Disabled) and the pinned
Select All row.

**Standing note:** if you're looking for **Select**, it's now the
**Single select** variant of this component (see above) — its trigger
has also changed containers since: it was briefly its own Button-
Secondary-styled, `radius-md` box (to match Multiple select's then-chip
-based trigger), and is now Input Field's own container instead, same
as Multiple select's. If you're looking for that Button-Secondary
recipe, or Multiple select's older chip-based "Nescafé ×, Milo ×"
trigger and its Badge-chip/clear-all recipe, none of that exists
anymore: both variants now share one `radius-sm` box built on [Input
Field](#input-field)'s own container, and Multiple select's trigger
reads "N selected" rather than listing chips.

**Do:** keep both variants' trigger at the same box dimensions (Input
Field's own `radius-sm`, 40px height) so they read as one component
family across each variant's own Style axis; keep every trigger and panel each at
`width: 100%` of the same parent so the panel can never drift narrower
or wider than the trigger, in any Style, either variant; reuse Input
Field's and Checkbox's own recipes verbatim wherever this component's
anatomy overlaps with theirs, scoped to this component's own classes,
rather than a duplicate recipe that can drift out of sync; let
Multiple select's footer Clear empty the selection while leaving the
menu open (so more options can be picked), and let Done close the menu
without touching the selection — they're deliberately different
scopes; give Select All a real checkbox, never a plain button, since
Indeterminate is a checkbox-only concept. **Don't:** rely on
`pointer-events: none` alone to make either variant's Read-only
non-interactive — it doesn't stop keyboard activation, only the mouse;
give the Select All row its own remove or clear control — that's the
footer Clear's job, Select All only toggles the list's own checkboxes.

### ElementBadge

**Transcribed from the teammate's `ElementBadge.jsx`.**
Distinct from Tag (above): use ElementBadge when the visual specifically
needs the element's icon, not just a color dot.

| Part | Spec |
|---|---|
| Chip | default 32×32px (size prop), `radius-sm` (12px), fill = owning element color at **12% tint** (the same one-off `color-mix` used by the Card icon-chip pattern — not the 8% `-bg` token) |
| Glyph | sized at 60% of the chip box, centered — **Tier 2, Fill** (a department indicator, per [Iconography](#iconography)) |
| Label (optional, `showLabel`) | spacing-12 gap from the chip; element name (caption, weight 700, `tracking-eyebrow`, uppercase, Neutral-9) over a sublabel (caption, Neutral-5 — defaults to the element's function, e.g. "Visibility & Energy") |
| No label | chip renders alone with a native `title` attribute carrying the element name, for accessibility |

**Elements:** Fire (Orange · Visibility & Energy) · Earth (Green ·
Support & Stability) · Water (Navy · Depth & Flow) · Gold (Amber · Order
& Structure) · Wood (Salmon Pink · Growth & Vision).

⚠️ **Asset gap:** the source component renders a raster PNG glyph per
element (`assets/elements/*.png`) rather than a Phosphor icon — this
skill doesn't have those PNGs, only the `SVG/` wordmark/letter library.
Until element glyphs are added here, substitute the closest Phosphor
icon for each element's motif (flame, mountain, drop, etc.) rather than
leaving the chip empty.

**Do:** use ElementBadge whenever a department-owned item needs its
icon, not just Tag's color dot. **Don't:** recolor the chip tint away
from its owning element — this is a fixed identity marker, not a
themeable accent.

### Empty state

| Part | Spec |
|---|---|
| Icon | `icon-empty` (48px) for section-level empty states, `icon-hero` (64px) for full-page ones; **Neutral-4** color; **Tier 2, Fill** (an empty-state illustration, per [Iconography](#iconography)) |
| Heading | h4 (20px/800), Neutral-9 |
| Body | body1 at weight 500, Neutral-5, max-width ~380px |
| Action | optional Primary button below the body text, `spacing-8` above it |
| Container | `spacing-40` vertical / `spacing-24` horizontal padding, `spacing-8` internal gap, centered |

**Do:** always say what causes the empty state and, where possible, how to
resolve it ("No campaigns yet — create your first one") rather than a bare
"No data." **Don't:** use a generic spinner or blank card as a stand-in
for a real empty state — the deck's icon-empty/icon-hero tokens exist
specifically so this state gets real visual weight.

### FileUploader

⚠️ **Designed from scratch — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by reusing Badge-Neutral's box model, Table row's/
SidebarNav's active-state recipe, and the Filters/Date picker popover
pattern — not transcribed. Treat as a first pass needing real
design/brand review.

Click-to-browse or drag-and-drop file attachment; attached files list
as rows below the drop zone.

| Part | Spec |
|---|---|
| Drop zone | `radius-lg` (20px), spacing-24 padding, centered content, 1px dashed Neutral-3 border, Neutral-1 fill |
| Drop zone — drag-over | 2px dashed Obsidian border, Neutral-2 fill — the same Obsidian-border/Neutral-2-fill pairing Table row's selected state and SidebarNav's active item already use for "currently engaged," reused here rather than inventing a new tint |
| Upload icon | `upload-simple`, `icon-md` (20px), Neutral-5, **Tier 1, Regular** per its explicit listing in Iconography |
| Label | body2 (14px/20px), weight 700, Neutral-5 |
| Hint (optional) | caption (12px), Neutral-5 |
| File row | flex row, spacing-12 gap, spacing-8/spacing-12 padding, 1px Neutral-3 border, `radius-sm`, Neutral-1 fill — the same bordered "panel" recipe Filters'/Date picker's popover uses |
| Kind badge | reuses Badge-Neutral's exact box model — 22px tall, spacing-8 padding, `radius-pill`, Neutral-2 fill, Neutral-3 border, `--font-primary` |
| File name | body2, Neutral-9, truncates with ellipsis |
| File size | caption, Neutral-5 |
| Remove (×) | `icon-sm` (16px) `x` glyph, **Tier 1, Regular** (a remove affordance, per Iconography) — 24×24px hit target, Neutral-5, hover fill Neutral-2 |

**Variants:** Default (idle, no files), Drag-over, Has files.

**Do:** keep the drop zone visible even once files are attached, so more
can be added without a separate "add more" affordance. **Don't:** style
the kind badge as a status Badge variant (Success/Danger/Warning) — it's
always Neutral; file type isn't a status.

### Filters

⚠️ **Designed from scratch — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by composing existing Button, Input, Select, Badge, and
Chip patterns, not transcribed. Treat as a first pass needing real
design/brand review.

A control cluster for narrowing a data view — sits directly above a
Table row list or DataTable. Renders as two rows (see **Two-row
structure** below): a Filter Bar that's always present, and an Applied
Filters row that only exists once a filter actually holds a value.

**Choosing a variant.** **Default** — the full row of named-dimension
triggers documented below — is the baseline; use it unless one of the
two departures below applies. These are independent axes, not a single
ladder — they're driven by different constraints and can apply on
their own:

| Constraint | Use |
|---|---|
| Normal case | **Default** — a named trigger per dimension, per the Part/Spec table below |
| More than ~8 filterable dimensions | **Tiered exposure** (see Overflow behaviour below) — 4–6 primary dimensions stay as named triggers, the rest always sit behind "More filters" |
| Compact filtering specified, or screen real estate is limited (a narrow sidebar panel, a dense toolbar sharing space with other controls) — regardless of dimension count | **Compact filter** — a single icon-bearing trigger (see Filter trigger below) opening every dimension as a nested list, rather than a row of named triggers at all |

Compact filter isn't gated by dimension count the way Tiered exposure
is — a 3-dimension view still collapses to Compact filter if space is
the actual constraint, and a 10-dimension view stays on Tiered exposure
if it isn't. Don't combine Compact filter with a row of Default
triggers in the same bar — pick one per view, per **Filter trigger**
below.

| Part | Spec |
|---|---|
| Bar | horizontal flex row, spacing-8 gap, spacing-16 margin-bottom; wrap behaviour depends on which Overflow variant is in use — see **Overflow behaviour** below |
| Search input (optional) | Reuses [Search input](#search-input)'s own **Default** variant verbatim, at the Filter Bar's own 32px (sm) height rather than that component's generic 40px (md) — border/radius/fill live on the `<input>` itself, not a wrapper div, so Focus is a genuine `:focus` swap (2px Obsidian border, padding compensated by 1px), exactly as documented there. Leading `magnifying-glass` (`icon-sm`, Neutral-5), **Tier 1, Regular** (search inside an input field, per [Iconography](#iconography)); a Clear (×) button appears only once the field holds a value — `icon-sm`, Neutral-5 at rest → Neutral-9 on hover, removed from tab order (not just visually hidden) when empty, same behaviour as Search input's own Clear row. Sits first in the bar, before any filter trigger, whenever present. Optional — include it only when the dataset is large enough to warrant text search alongside structured filters; a Filters bar with no search input is equally valid |
| Search input — width & divider (desktop) | 240px default width on ≥641px viewports — this row's own default size, not a fixed literal borrowed from elsewhere. Immediately followed by a 1px Neutral-3 vertical divider (matching the trigger row's own 32px height), separating it from the filter triggers that follow — only rendered when both a search input and at least one trigger are present in the bar |
| Search input — mobile (≤640px) | Same breakpoint Toast's own responsive collapse already uses. The search input drops its fixed 240px width and grows to the Filter Bar's full width instead, wrapping onto its own row above the filter triggers; the divider is hidden, since there's nothing beside the search input on that row to divide from |
| Filter trigger | Button Secondary, sm or md — label only by default. A leading `sliders`/`funnel` icon (**Tier 1, Regular**, per [Iconography](#iconography)) is optional, and reserved for **Compact filter** — a single, unlabeled "Filter" trigger that stands in for the entire row of named triggers (see **Choosing a variant** above), not a permanent fixture alongside them. A named-dimension trigger (e.g. "Department", "Status") never carries one, since the label already identifies the dimension and a row of repeated icons reads as noise, not information. Compact filter opens a dropdown listing every dimension as nested triggers — the same nested-list panel the Overflow trigger below uses for its own hidden dimensions, not a second mechanism — so it's never a dead button with nothing behind it. That nested-list panel also carries its own universal **Clear all** (Link style, Neutral-5, sentence case, same recipe as the Applied Filters row's own Clear all below) — visible only when ≥1 filter is applied across *any* dimension — so Compact filter can reset every dimension at once, not just the one currently drilled into |
| Filter trigger — active | 1px Obsidian border (replaces the default Neutral-3 border), Neutral-9 text — the trigger itself signals engagement directly. A small circular **Badge** — Obsidian fill, Neutral-1 text, caption/700, per [Badge & Tag](#badge--tag) — sits trailing the label, inside the trigger's own padding (not overlaid outside it), showing the count of applied values for that dimension. An early same-day draft tried an external Neutral badge overlaying the corner instead — reverted back to this recipe on review, since the Obsidian border reads as the clearer "engaged" signal and keeping the badge inside the trigger avoids clipping/overlap issues with adjacent triggers |
| Overflow trigger (optional variant) | Once triggers exceed the bar's width: either let the bar wrap (default), or collapse the overflow behind a single "+N more" trigger — see **Overflow behaviour** below |
| Dropdown panel | `radius-md` (16px — a compact popover, not the full 20px Card radius), 1px Neutral-3 border, `shadow-3`, spacing-16 padding, positioned 8px below the trigger |
| Dropdown panel — edge collision | Left-aligned to its trigger by default. On a narrow viewport, a trigger sitting near the right edge otherwise pushes the panel past the screen edge and crops it — flip to right-aligned against that same trigger instead whenever left-aligning would extend past the viewport's right edge (a runtime collision check against available width, not a fixed breakpoint, since which trigger is "near the edge" depends on the bar's own layout, not the viewport size alone). Re-check on resize/orientation change while a panel is open. A `max-width` safety net (viewport width minus a small margin) additionally caps the panel itself on very narrow screens, regardless of alignment |
| Dropdown Option (checkbox row) | Reuses [Dropdown](#dropdown)'s own Multiple select Dropdown Option verbatim — this system's [Checkbox](#checkbox) glyph (`.c-checkbox-box`/`.on` + `ph-check`), Neutral-2 row-hover fill, body2/400/Neutral-9 label — not a second, ad-hoc checkbox recipe. A Filter trigger's dropdown is functionally the same "checkbox list + commit footer" shape as Multiple select's panel, so it shares that panel's anatomy rather than inventing a parallel one |
| Dropdown panel — footer | Ghost "Clear" + Primary "Done", space-between, spacing-8 gap, 1px Neutral-3 top border, spacing-12 padding — [Dropdown](#dropdown)'s Multiple select footer, reused verbatim rather than a bespoke single-button footer — see **Dropdown apply behaviour** below |
| Applied filter chip | **Input Chip**, verbatim (per [Chip](#chip)): 24px height, Neutral-2 `#f0f0f0` fill, 1px Neutral-3 `#d8d8d8` border, `label2` Neutral-9 `#080808` text, no leading icon, trailing × (`icon-micro`, `x`, Neutral-5 at rest → Neutral-9 on hover, 24×24 hit target) to remove it individually. Not Filter Chip's own Multi-select active state (Obsidian fill, leading tick) — Input Chip's own "represents a value the user entered or confirmed, always removable, not toggleable" description is the closer match, since a chip in this row is never toggled back on in place, only removed. Label is **the value alone** — e.g. "Marketing", not "Department: Marketing": at Input Chip's compact 24px height a short, scannable value list reads better than a repeated "Dimension:" prefix on every chip, and the owning trigger's own label already supplies that context immediately above the tray |
| Row 2 container | Neutral-1 `#ffffff` fill, 1px Neutral-3 border, `radius-sm` (12px), spacing-12 padding — a bordered tray that visually separates the chips from the trigger bar above, rather than leaving them floating loose directly beneath it. Sits spacing-8 below Row 1 — see **Two-row structure** below |
| Clear All — Filter Bar | Button Ghost, Red `#FD3343` text (the same Red as Badge/Danger and Toast/Danger), right-aligned, spacing-16 left margin from the last trigger. Title case ("Clear All"), matching Button's own label casing. Visible only when ≥1 filter is applied **and** the Applied Filters row is hidden |
| Clear all — Applied Filters row | Button's Link variant, verbatim (Neutral-9, no recoloring), right-aligned, spacing-16 left margin from the last chip. Sentence case ("Clear all"), matching Link's own casing convention. Visible only when the Applied Filters row is visible. Same recipe as **Applied Filters overflow**'s own "Show less" control below, so the two read as one family of text-link actions inside the same tray rather than two different treatments — dropped the earlier Neutral-5 recoloring for this reason |

Clear All (Filter Bar) and Clear all (Applied Filters row) are mutually
exclusive — never rendered at the same time; which one shows follows
directly from whether the Applied Filters row itself is visible (see
**Two-row structure** below).

**Overflow behaviour.**

| Variant | Rule |
|---|---|
| Default — wrap | The bar wraps to another line at spacing-8 row gap once its triggers exceed available width. Use when vertical space isn't constrained |
| Overflow trigger | Triggers exceeding the bar's width are hidden behind a "+N more" Button Secondary trigger. It follows the same active-trigger recipe above (Obsidian border, trailing Obsidian badge inside the trigger) once it's carrying a count, showing the total applied values across every hidden dimension, not just one. Clicking it opens a dropdown listing the hidden dimensions as nested triggers. A minimum of 2 triggers must stay visible in the bar before the overflow trigger is allowed to appear |
| Tiered exposure (recommended past ~8 dimensions) | Split dimensions into two fixed tiers, chosen editorially per view — not computed from container width or usage data: **4–6 primary** dimensions render as permanent named triggers, always visible regardless of width; every other dimension always routes to a single **"More filters"** trigger — **Compact filter**'s own recipe and nested-list panel, just labeled "More filters" and scoped to only the secondary-tier dimensions rather than all of them. Unlike the Overflow trigger variant above, which dimension sits where here never shifts with the viewport — the split is authored once, not measured at render time |

**Choosing the primary tier (Tiered exposure only).** 4 is the
practical floor for the primary set to read as real coverage rather
than a token gesture; 6 is a sensible ceiling before the bar itself
becomes the same "which filters actually matter" problem Tiered
exposure exists to solve — past 6, add a search field inside the "More
filters" panel rather than raising the primary count further. Pin the
primary set editorially per view (e.g. "Department, Status, Priority,
Owner always matter for this table") rather than computing it from
usage analytics — a primary set that reorders itself between sessions
based on "most used" reads as the bar rearranging at random, which is
disorienting rather than helpful.

**Dropdown apply behaviour.** Changes made inside a Filter trigger's
dropdown are pending, not live, until committed. The panel's footer —
Ghost "Clear" + Primary "Done", per [Dropdown](#dropdown)'s Multiple
select — lets **Clear** empty the pending selection while leaving the
panel open (so more options can still be picked), and lets **Done**
commit the pending selection and close the panel, the same split of
scope Multiple select's own footer documents. Clicking outside the
panel closes it **without** committing anything pending inside, same
as clicking outside a Multiple select trigger — a filter is never
applied by an accidental click away from the panel.

**Two-row structure.**

| Row | Visibility | Contains |
|---|---|---|
| Row 1 — Filter Bar | Always visible | Search input (optional), filter triggers, overflow trigger (optional), Clear All (only while Row 2 is hidden) |
| Row 2 — Applied Filters | Renders below Row 1, inside its own bordered container (see Row 2 container above), only once ≥1 filter value is applied; hidden entirely — removed from layout flow, not just visually collapsed — when nothing is active | Applied filter chips (up to 5 visible, then a "+N"/"Show less" overflow control — see **Applied Filters overflow** below), Clear all (only while Row 2 is visible) |

Row 2's container sits spacing-8 below Row 1 when present, itself
spacing-12 padded. Chips inside sit spacing-4 apart, same grouping rule
as Chip/Badge/Tag elsewhere in this document.

**Applied Filters overflow.** Reuses [Chip](#chip)'s own Input Chip
overflow mechanic verbatim, at a higher visible cap suited to a filter
bar's own denser chip count: beyond **5** visible chips (Chip's own
generic default is 3 — Filters' Applied Filters row can hold values
from several dimensions at once, so it earns its own higher cap rather
than inheriting Chip's), collapse the rest into a `+N` chip (Neutral-2
fill, 1px Neutral-3 border, Neutral-5 label, no ×). Clicking it expands
the hidden chips in place, inside the same Row 2 container; once
expanded, the control itself switches from the `+N` chip to a **Link
button** reading "Show less" (Neutral-9, underlined, 3px offset —
Button's own Link recipe, verbatim) to re-collapse — the identical
expand/collapse contract Chip's own Input Chip overflow already
documents, just at this row's own cap.

**State orchestration.**

| State | Filter trigger | Count badge | Row 2 (Applied Filters) |
|---|---|---|---|
| No filters applied | Default — Neutral-1 fill, Neutral-3 border | Hidden | Hidden, removed from flow |
| 1 value applied, one dimension | Border turns Obsidian, text Neutral-9 | Shows "1", trailing the label, Obsidian fill | Visible — one chip, labeled with the value alone (e.g. "Marketing") |
| 2 values applied, one dimension | Border stays Obsidian | Shows "2" | Visible — two chips, same dimension |
| A chip's × is clicked | Reverts to Default (Neutral-3 border) if this removes that dimension's last value, otherwise unchanged | Decrements by 1; hides once it reaches 0 | That chip is removed; Row 2 itself hides entirely if it was the bar's last remaining chip |
| Clear All / Clear all is clicked | Every trigger returns to Default (Neutral-3 border) | Every badge hidden | Hidden, every chip removed, row exits the flow |

**Sync rule:** Row 2's chips are the source of truth. A trigger's count
badge is always *derived* from how many chips exist for that
dimension — it is never stored or updated independently of the chips
themselves, so the two values can never drift apart.

**Filter trigger states.**

| State | Spec |
|---|---|
| Rest — no active filters | Button Secondary default: Neutral-1 fill, 1px Neutral-3 border, Neutral-9 text |
| Rest — with active filters | Fill unchanged (Neutral-1), border swaps to 1px Obsidian, plus the trailing Obsidian count badge documented in the Part/Spec table |
| Hover | Neutral-2 `#f0f0f0` fill — Button Secondary's own hover token |
| Open | Neutral-2 `#f0f0f0` fill — reuses that same Button Secondary token while the dropdown is open, communicating a committed, in-progress state rather than a passing hover; visually identical to Hover, distinguished by the dropdown itself being on screen |
| Focus-visible | 2px Obsidian outline, 2px offset — reuses Button's exact focus-visible token |
| Disabled | 40% opacity, `cursor: not-allowed`, count badge hidden |

**Transition.**

| Element | Motion | Duration | Easing |
|---|---|---|---|
| Dropdown panel — open | fade in + slide down 4px | `duration-fast` (140ms) | `ease-standard` |
| Dropdown panel — close | fade out + slide up 4px | `duration-fast` (140ms) | `ease-standard` |
| Row 2 (Applied Filters) — appear/disappear | fade in/out | `duration-fast` (140ms) | — |
| Individual chip — enter | fade in + scale from 95% | `duration-fast` (140ms) | — |
| Individual chip — exit | fade out + scale to 95% | `duration-fast` (140ms) | — |
| Count badge — value change | opacity | `duration-fast` (140ms) | — |

`prefers-reduced-motion: reduce`: every transition above becomes
instant — no fade, slide, or scale — the same fallback this document
already applies to Chip, Card, and Progress Bar.

**Filter persistence.**
- Active filters serialize to the page's URL query parameters by
  default, so a filtered view is shareable as a plain link.
- Fallback: `sessionStorage`, never `localStorage` — filter state
  shouldn't outlive the tab/session that set it.
- On load: restore from URL query parameters if present (the URL wins
  over the session fallback); Row 2 renders directly in its restored
  state with no entrance transition on first paint — the Individual
  chip enter transition above applies to chips added during the
  session, not ones already present when the page loads.

**Do:** surface a live count on the trigger the instant a filter is
applied, and always pair it with a Clear All/Clear all escape hatch —
whichever row is currently visible carries it. **Don't:** apply a
filter destructively — on every keystroke, or on an accidental click
outside the dropdown — require the panel's own Clear/Done footer
instead.

### Info Banner

⚠️ **Designed from scratch, no source in the brand deck or the
teammate's build.** Built entirely from this document's own token
system — treat it as a first pass needing real design/brand review
before shipping.

Inline, persistent notification embedded within a section or card.
Distinct from Toast: anchored to its parent container rather than
floating; persistent or manually dismissible rather than
auto-dismissing; full container width rather than a fixed pixel width;
content-level rather than viewport-level.

| Part | Spec |
|---|---|
| Container | full width of the parent, spacing-12 vertical / spacing-16 horizontal padding, `radius-md`, 1px border matching the tone, tone fill (see the tone table below), no shadow |
| Icon | `icon-base` (20px), vertically centered with Message and the Close button (not top-aligned — with no Title above it, Message is a single short line as often as not, and top-aligning against a taller Close button read as misaligned); **Tier 2, Fill** — same rationale as Toast, a status indicator rather than a control |
| Message | body2, weight 400, tone text color at 80% opacity — the banner's only text content |
| Action slot (optional) | the last element in the banner's content, after Message — spacing-8 above it, maximum 2 actions. Both actions share one style: body2, weight 400, tone text color at 80% opacity (identical to Message), underlined — there's no separate Ghost-button/Link distinction |
| Close (optional) | Ghost IconButton, sm, right-aligned and vertically centered with Icon and Message, `x`, **Tier 1, Regular** (a close affordance), `aria-label="Dismiss"` — present only on the dismissible variant |

**Variants:**

| Variant | Spec |
|---|---|
| Dismissible | close button rendered top-right; the user closes it manually via the `x`; use when the information is helpful but not critical |
| Persistent | no close button rendered; remains until the underlying condition resolves; use when the banner describes an ongoing system state the user can't resolve by dismissing it |

**Tone → icon/color:**

Icon color follows Toast's pattern — full-strength tone color, since a Tier 2 Fill status icon isn't held to the same small-text AA contrast math as body copy. Fill, border, and Message text reuse Badge's existing tone values directly (including its AA-darkened Success/Warning text), except Neutral's text, which uses Neutral-9 rather than Badge's Neutral-5 — Banner's Message is body copy that needs to read as primary content, not a small caption label, so it follows Toast's own Neutral-9 choice instead.

| Tone | Icon | Icon color | Fill | Text | Border |
|---|---|---|---|---|---|
| Neutral | `info` | Neutral-9 | Neutral-2 | Neutral-9 | Neutral-3 |
| Info | `info` | Water `#1473E6` | Water at 10% | Water `#1473E6` | Water at 28% |
| Success | `check-circle` | Green | Green at 12% | `#00854c` (darkened for AA) | Green at 32% |
| Danger | `x-circle` | Red | Red at 10% | Red `#FD3343` | Red at 30% |
| Warning | `warning` | Amber | Amber at 14% | `#9a5c00` (darkened for AA) | Amber at 38% |

All five icons are **Tier 2, Fill**.

**Tone usage — when to use each:**

| Tone | Use when |
|---|---|
| Neutral | a general FYI with no positive/negative charge — a fact worth surfacing, not a status |
| Info | the default tone when in doubt — a feature note, tip, or informational context that isn't itself a status change |
| Success | confirming a condition completed positively — a sync finished, a state is healthy |
| Warning | a caution or approaching limit the user should notice but that isn't blocking yet |
| Danger | a failing or blocking condition — typically paired with the Persistent variant, since a failure state doesn't resolve just because the user closed the banner |

**Placement:**

| Property | Spec |
|---|---|
| Position | always at the top of its parent section or card, above all other content |
| Width | full width of the parent container |
| Multiple banners | stack with spacing-8 gap |
| Maximum | 2 banners per section |

**Content length:**

| Property | Spec |
|---|---|
| Message | 120 characters maximum |
| Action labels | 3 words maximum |
| Enforcement | at content-authoring level — the component itself does not truncate |
| Rationale | limits are authoring rules, not display rules |

**Action slot rules:** maximum 2 actions, never destructive, always the
last element in the banner (after Message, nothing renders below it).
Both actions are styled identically to Message — body2, weight 400,
tone text color at 80% opacity — underlined, with no other visual
distinction between a "primary" and "secondary" action beyond order.
Clicking an action does not auto-dismiss the banner — dismissal is
always explicit, via the close button.

**Animation:**

| Property | Spec |
|---|---|
| Entrance | slide down + fade in |
| Exit | slide up + fade out |
| Duration/easing | `duration-base` / `ease-standard` — the same pair Toast uses, for the same reason: Banner isn't owned by a specific brand element |
| Stacked reposition | when one banner is dismissed, the banners below it shift up |
| Reduced motion | instant appear/disappear when `prefers-reduced-motion` is set |

**Accessibility:** `role="note"` on the persistent variant,
`role="status"` on the dismissible variant, `aria-live="polite"`,
`aria-label="Dismiss"` on the close button. Never rely on color alone.
Focus does not move to the banner on appear. Escape dismisses the
active dismissible banner. Respects `prefers-reduced-motion`.

**Do:** use Persistent when the banner describes a system state outside
the user's control; use Info as the default tone when in doubt.
**Don't:** put a destructive action in the action slot; use Banner for
transient feedback (that's Toast's job); place a Banner outside a
section or card.

### Input field

Anatomy, top to bottom: label → input box → helper or error text.

| Part | Spec |
|---|---|
| Label | caption token at weight 700, Neutral-9 text, spacing-4 (4px) below it before the input |
| Input box | 40px height (md; sm 32px, lg 48px), `radius-sm` (12px), 1px Neutral-3 border, Neutral-1 fill, spacing-12 (12px) horizontal padding, body2 type at weight 400 (matches the shipped component; see the Focus behavior note below) |
| Helper text | caption token, Neutral-5, spacing-4 above it |
| Error text | caption token at weight 700, Red `#FD3343`, replaces helper text |

**States:**

| State | Border | Fill | Notes |
|---|---|---|---|
| Default | Neutral-3 | Neutral-1 | — |
| Focus | 2px Obsidian `#2B2B2C` (border swap; padding reduces from spacing-12 to 11px to compensate) | Neutral-1 | Input field (and Textarea/Password field/Search input, which all inherit its States table) is a deliberate exception to the system-wide "Focus rings are Water, not Obsidian" policy in [Elevation](#elevation) — that policy still holds for Card, Empty state, and everything else |
| Error | 1px Red `#FD3343` | Neutral-1 | Error text replaces helper text below |
| Disabled | Neutral-3 | Neutral-2 | Neutral-5 text, no cursor |

Optional leading/trailing icon, `icon-sm` (16px), Neutral-5 — sits inside
the input box, spacing-8 from the text. Weight follows the icon's own
[Iconography](#iconography) tier (e.g. a trailing `magnifying-glass` for
in-field search is **Tier 1, Regular**).

**Do:** always render a `<label>`, even if visually hidden. **Don't:** use
placeholder text as a substitute for a label — placeholders disappear the
moment someone types, per the source deck's own accessibility intent.

⚠️ **Designed, not sourced.** The rules below fill gaps
the original deck and the teammate's build never covered (placeholder
styling, a required-field marker, a success state, autofill, adornments,
a counter, and ARIA wiring). Treat as a first pass pending real
design/brand review.

**Placeholder text** — Neutral-5, same body2/weight 400 as entered text
(not italic, not a separate lighter weight) so it reads as a hint rather
than disabled content. Still never a substitute for the `<label>` above.

**Required field indicator** — a single Red `#FD3343` asterisk (`*`)
directly after the label text, no gap token needed (`4px`/`margin-left:
spacing-4` from the last character), no parenthetical "(required)"
string. Optional fields get no marker at all — don't add "(optional)"
text either; the absence of `*` is the signal.

**Success / valid state:**

| State | Border | Fill | Notes |
|---|---|---|---|
| Success | 1px Green `#00C26E` | Neutral-1 | Trailing `check-circle`, `icon-sm` (16px), Green, **Tier 2, Fill** (a status confirmation, per [Iconography](#iconography)) — fires after the field passes validation (on blur or submit), not on every valid keystroke |

**Autofill styling** — browser autofill (`:-webkit-autofill` and
`:autofill`) must be overridden so the fill stays Neutral-1, not the
browser's default yellow/blue tint: use a same-color `box-shadow inset`
trick (`box-shadow: 0 0 0 1000px var(--color-neutral-1) inset`) plus
`-webkit-text-fill-color: var(--color-neutral-9)` rather than fighting
`background-color`, which autofill ignores.

**Focus behavior** — plain `:focus`, not `:focus-visible` — a mouse click
into a field shows the same 2px Obsidian border swap a keyboard `Tab`
does; this is a border-color/width change, not an outline or shadow ring,
so the box's overall size is kept constant by dropping the horizontal
padding from spacing-12 (12px) to 11px at the same time the border grows
from 1px to 2px.

**Prefix/suffix text adornments** — a fixed, non-editable string (e.g.
`$`, `kg`, `@`) inside the box, opposite the label side from a leading/
trailing icon if both are present: caption token, Neutral-5, no
background, spacing-8 from the editable text, vertically centered.
Never interactive — if it needs to be clickable, it's a leading/trailing
icon instead, not a text adornment.

**Character/word counter** — caption token, Neutral-5, right-aligned
under the box at the same spacing-4 offset as helper text (shares that
line, doesn't stack a second line unless an error is also showing).
Format `12/280`. Switches to Red `#FD3343` once the limit is reached or
exceeded, replacing the count color only — not the border, unless the
field also fails validation.

**Accessibility wiring** — helper text needs `aria-describedby` pointing
at its `id` from the input; when the field enters the Error state, the
input also needs `aria-invalid="true"` and the `aria-describedby` target
swapped to the error text's `id` (not both helper and error referenced
at once). Draft, pending [Needs Input #6](#needs-input-read-this-first).

**Responsive sizing clarification** — the sm/md/lg sizes are a density
choice picked per context (e.g. a table's inline edit vs. a full form),
not tied to a viewport breakpoint. Don't swap an input's size at a media
query; if a form needs to adapt on a narrow screen, change the layout
(stack fields, go full-width) and keep the chosen size fixed.

### Modal / dialog

| Part | Spec |
|---|---|
| Overlay | `shadow-overlay` — Neutral-9 at 56% opacity, covers viewport |
| Panel | Neutral-1 fill, 1px Neutral-3 border, `radius-lg` (20px), `shadow-4`, max-width ~480px for simple confirmations, wider for forms |
| Header | h3 title (22px/800) + optional description in body1/Neutral-5 + Ghost icon-button close (`x`, `icon-base`, 20px, top-right) — **Tier 1, Regular** (a close affordance, per [Iconography](#iconography)) |
| Body | body1, `spacing-24` padding on all sides |
| Footer | Secondary button + Primary button, right-aligned, `spacing-8` gap, `spacing-24` above |

**Do:** put the Primary (commit) action on the right, Secondary (cancel)
on the left of it, matching the button order convention above. **Don't:**
use a modal for anything that isn't a focused, single decision — long
forms or multi-step flows need a full page or panel, not a modal (this
mirrors the deck's own steady, uncluttered tone).

### PageHeader

⚠️ **Designed from scratch — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by reusing the existing Typescale's h1 and body2 tokens,
not transcribed. Treat as a first pass needing real design/brand review.
This is also App Shell's own [Page header](#app-shell) — App Shell
composes this component directly for the title/subtitle block, then
adds its own actions row on top (documented in App Shell's own
subsection, not here — see the note there on why).

A page-level title block — sits flush at the top of a page or panel,
no background or border of its own.

| Part | Spec |
|---|---|
| Title | `h1` token (32px/38px, 40px/56px at `-lg`, weight 800), Neutral-9 — the largest heading weight in the system, matching the Typescale's "Page-level heading" use case |
| Subtitle (optional) | `body2` token (14px/20px, weight 400), Neutral-5 — sits directly below the title |
| Gap | `spacing-8` (8px) between title and subtitle |
| Container | no background, no border, no padding — flush in the surrounding page layout |

**Variants:** Default (title only) and With subtitle (title + sub).

**Do:** reserve PageHeader for the single page-level title per view —
it's not for card or section headers, which have their own patterns
(see [Card](#card)). **Don't:** add a border, background fill, or
bottom divider to PageHeader itself; if a page needs a divider under
its header, that belongs to the page layout, not this component.

### Pagination

⚠️ **Designed from scratch — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system, not transcribed. Treat as a first pass needing real
design/brand review.

Sits as a table or list footer — same border convention as DataTable.

| Part | Spec |
|---|---|
| Container | flex row, `justify-content: space-between`, spacing-16 padding-top, 1px Neutral-3 top border |
| Result count | caption, Neutral-5 (e.g. "Showing 1–20 of 248"), left-aligned |
| Page number button | 32×32px, `radius-sm` (12px), caption/700 numeral |
| Page number — default | transparent fill, Neutral-5 text |
| Page number — hover | Neutral-2 fill, Neutral-9 text |
| Page number — current | Obsidian fill, Neutral-1 text — the only filled state, kept unambiguous against its neighbors |
| Prev / Next | 32×32px Ghost icon-buttons (`caret-left`/`caret-right`, `icon-sm`); **Tier 1, Regular** (navigation control, per [Iconography](#iconography)); disabled at the first/last page — Neutral-4 icon, `cursor: not-allowed` |
| Ellipsis | static "…" in the same 32×32 box for alignment, caption/Neutral-5, no interactive state |
| Page-size select (optional) | Select, sm, right-aligned, spacing-8 gap from the Next button (e.g. "20 / page") |

**Do:** cap visible page-number slots at roughly 7 and collapse the
rest behind an ellipsis (`1 … 4 5 [6] 7 8 … 24`), keeping the current
page and its immediate neighbors always visible. **Don't:** disable
Prev/Next by hiding them — keep the slot present but visually inactive,
so the control cluster doesn't shift width across pages.

### Password field

⚠️ **Designed, not sourced.** Same anatomy as Input
field with one fixed trailing control.

| Part | Spec |
|---|---|
| Input box | identical to Input field's spec, but always reserves 40px right padding regardless of size, so masked text never runs under the toggle |
| Masking | native `type="password"` dot masking — no custom mask character |
| Show/hide toggle | `eye` / `eye-slash`, `icon-sm` (16px), Neutral-5, trailing inside the box at spacing-12 from the right edge; **Tier 1, Regular** (a functional control, per [Iconography](#iconography)) |
| Toggle behavior | click swaps the input's type between `password`/`text` and swaps the icon `eye` ↔ `eye-slash`; state doesn't persist across a page reload |

**Do:** give the toggle a real, focusable button with an `aria-label`
that updates between "Show password" and "Hide password" as state
changes. **Don't:** rely on the icon swap alone to communicate state to
assistive tech.

### Progress Bar

⚠️ **Designed from scratch — no source in either the original brand
deck or the teammate's build.** Built from this document's own token
system by reusing Slider's track anatomy, the system's department
elemental colors for stacked department contexts, and the data viz
chromatic palette for non-department stacked contexts — not
transcribed. Treat as a first pass needing real design/brand review.

A horizontal, read-only bar communicating progress toward a known goal
(**Determinate**) or an active, unmeasured process (**Indeterminate**).
Distinct from [Slider](#slider): Slider is an input control the user
drags to set a value; Progress Bar is a read-only display of a value
the system provides. The two deliberately share track anatomy and
sizing — they often sit near each other in dashboard layouts — but
Progress Bar has no thumb, no drag interaction, and no focus-visible
state of its own.

| Part | Spec |
|---|---|
| Track | Full width of parent, `radius-pill`, Neutral-3 `#d8d8d8` fill for the unfilled portion — the same unfilled-track token as [Slider](#slider), keeping the read-only track language consistent across both components |
| Fill — single | `radius-pill`, fills left to right proportionally. Default fill: Obsidian `#2B2B2C` — the same value-committed color as Slider's own track fill and Input field's focus border; communicates "here is the current value" without implying success or department ownership. Success override: Green `#00C26E`, only when explicitly signaling completion, passed via prop. Department override: the owning department's elemental color, passed via prop — same override logic as [SidebarNav](#sidebarnav)'s icon and Tag's dot |
| Fill — stacked segments | Contiguous blocks, no gap between segments; `radius-pill` on the outermost edges only (the first segment's left edge, the last segment's right edge) — interior edges are flush/square. See Stacked color rules, below |
| Fill — indeterminate | A moving gradient overlay — Neutral-5 `#5a5a5a` at 40% opacity, animated left to right — over the Neutral-3 track. Not a percentage fill; communicates activity, not progress |
| Label — trailing | caption (12px/400), Neutral-5, right-aligned, same baseline as the track's own vertical center; spacing-8 (8px) between the track's right edge and the label |
| Label — header row | Two labels above the track: title (caption/700/Neutral-9), left-aligned; value (caption/400/Neutral-5), right-aligned; spacing-4 (4px) between the header row's bottom and the track's top |
| Label — inside fill | Large size only (16px track); caption/700/Neutral-1, centered vertically and horizontally within the fill. Only renders when the fill's width exceeds 40px — narrower fills suppress the label |

**Variants:**

| Variant | Spec |
|---|---|
| Determinate — Single | One fill advancing 0% to 100%. Default fill: Obsidian. Use for task completion, upload progress, goal attainment |
| Determinate — Stacked | Multiple contiguous colored segments. Use for breakdowns (budget by department, capacity by team). Department elemental colors map department segments; the data viz chromatic palette (Purple, then Turquoise) covers non-department data — see Stacked color rules, below |
| Indeterminate | Animated shimmer, no fill percentage. Use for background tasks, API calls, loading states of unknown duration. Always single — stacked indeterminate is not permitted |

**Sizes:**

| Size | Track | Label | Use |
|---|---|---|---|
| Compact | 4px (matches Slider's own compact track, for visual consistency between the two) | caption (12px) | Dense tables, card metadata, inline with compact controls |
| Default | 8px | caption (12px) | Standard dashboard use, section summaries, sidebar metrics |
| Large | 16px | caption (12px), inside fill only | Prominent single metrics, hero stat sections, department breakdown charts |

⚠️ All three track heights are one-off literals — same precedent as
Slider's own 4px track height and SidebarNav's 36px child-item height:
no named height token exists for a horizontal track rail.

**Stacked color rules.**

*Department breakdown* — use when segments map to Collabrium
departments. Pull the department table's own colors, in the order
departments are presented:

| Order | Element | Color |
|---|---|---|
| 1 | Fire | Orange `#FF5825` |
| 2 | Wood | Salmon Pink `#FF7A90` |
| 3 | Earth | Green `#00C26E` |
| 4 | Water | Navy Blue `#1473E6` |
| 5 | Gold | Amber `#FFA425` |

*General data breakdown* — use when segments represent non-department
data. Pull from the same Purple/Turquoise reserve [Chart color
mapping](#chart-color-mapping) uses to extend categorical charts past
5 department-aligned series — not a department color, since these
segments don't belong to one:

| Order | Color |
|---|---|
| 1 | Purple `#9F56FF` |
| 2 | Turquoise `#00D9D9` |

Only two colors exist in this reserve, so a general breakdown's own
overflow threshold is 2 segments, not 5 — segment 3 onward already
falls to the Overflow segment rule, below.

*Overflow segment rule:* beyond the mapped colors above (5 for a
department breakdown, 2 for a general one), additional segments use
Neutral-4 `#bdbdbd` — signals unmapped or uncategorized data, the same
"don't add more brand colors" logic [Chart color mapping](#chart-color-mapping)
applies past 7 categorical series.

*Remainder rule:* the Neutral-3 unfilled portion sits at the right end,
representing the unallocated remainder. If segments sum to 100%, no
remainder shows, and the last segment takes the outer `radius-pill`
instead.

**States:**

| State | Notes |
|---|---|
| Read-only | No interactive states of its own. Exception: when embedded in an interactive parent (e.g. a table row, a card), the bar inherits the parent's hover treatment only — it never adds its own |
| Indeterminate — active | Shimmer animates continuously |
| Indeterminate — `prefers-reduced-motion` | Shimmer stops; a static Neutral-4 `#bdbdbd` fill at 60% track width shows instead |
| Error | Fill switches to Red `#FD3343` — the same value as Badge's Danger text and Toast's Danger icon. Single determinate only; stacked has no single error state |
| Complete | Fill at 100%. Success/Green `#00C26E` is passed via prop to signal completion explicitly — the bar never auto-changes color on reaching 100%; the caller decides |

**Transition:**

| Property | Value |
|---|---|
| Fill width on initial mount (entrance) | Determinate only (single or each stacked segment). Fill starts at 0% and animates up to its real value the same way a value change does — `width`, `duration-base` (220ms), `ease-standard`; not a separate token or a longer "reveal" duration. Fires once, whenever the bar first mounts with a real value (page load, a newly-rendered row, data arriving async) — not tied to scroll position or viewport visibility; that's a presentation choice for a specific gallery/demo, not a rule of the component itself |
| Fill width on value change | `width` — `duration-base` (220ms), `ease-standard` |
| Indeterminate shimmer | keyframe animation; gradient travels from -100% to 200% on the X axis, infinite repeat; animation-duration of `duration-ambient` (900ms) — this document's own precedent for continuous/looping motion (see Search input's Loading spinner: "the one duration token named for a continuous loop rather than this system's usual one-shot 'movement settles' transitions"), a stronger match than an earlier draft's computed `duration-slow` × 2 (720ms), which also read as too fast to perceive as loading once actually built |
| Color change (e.g. to Error) | `background-color` — `duration-fast` (140ms), `ease-standard` — same pairing as Checkbox, SidebarNav, and Slider's own thumb-shadow transition |
| Reduced motion — determinate | width transition disabled, on both the initial-mount entrance and later value changes; value (and the entrance) jumps instantly |
| Reduced motion — indeterminate | animation disabled entirely; static Neutral-4 fill at 60% track width (same as the State row, above) |

**Label placement rules.**

| Placement | Use |
|---|---|
| No label | Bar only — value is obvious from surrounding context |
| Trailing | A single compact value, space-limited |
| Header row | The metric needs a name — the most common pattern for a named progress row |
| Inside fill | Large size only, single variant only, fill width > 40px only. Never on stacked |

Stacked label rule: always header row above, never trailing or inside
— segment-level values are communicated via a legend at the usage
level, not inline on the bar itself.

**Content rules:**

- Include a unit whenever the number is ambiguous (`47%` not `47`;
  `RM 25,000` not `25000`).
- Malaysian ringgit follows the system content rule: `RM 100,000` —
  space after RM, comma thousands.
- Header row title: caption/700, 40 characters maximum, enforced at
  authoring level.
- Indeterminate: suppress the label slot entirely — no percentage
  exists to show.
- Stacked at 0%: the segment isn't rendered — a zero-width segment
  with a visible edge isn't permitted.

**Accessibility:**

- Determinate: `role="progressbar"`; `aria-valuenow`,
  `aria-valuemin="0"`, `aria-valuemax="100"`; an `aria-label` or
  associated `<label>` naming the metric.
- Indeterminate: `role="progressbar"`; omit `aria-valuenow` entirely —
  its absence signals indeterminate.
- `aria-valuetext` is required whenever the value carries a unit (e.g.
  `aria-valuetext="RM 25,000 of RM 100,000"`).
- Stacked: `role="group"` on the wrapper; each segment is its own
  `role="progressbar"` with an `aria-label` naming the segment (e.g.
  "Marketing — 32%") and its own `aria-valuenow`.
- Color: never rely on fill color alone — a label or `aria-valuetext`
  always accompanies the bar. Error state additionally surfaces its
  status message via `aria-live="polite"` on the parent.
- Motion: the indeterminate animation respects
  `prefers-reduced-motion` per the Transition rules, above.

**Placement:**

- Always full width of its parent container or defined column — never
  an intrinsic inline width, same rule as [Slider](#slider).
- Compact: table cells, card metadata, tight label rows.
- Default: section summaries, sidebar metric panels, standalone
  progress rows.
- Large: hero stat sections, prominent KPIs — one per visible section,
  maximum.

**Do:** use Obsidian as the default fill — it communicates a committed
value without implying success or department ownership; only apply
the Success/Green fill when explicitly signaling completion via prop;
use department elemental colors for department stacked breakdowns and
the Purple/Turquoise data viz reserve for non-department ones; include
`aria-valuetext` whenever a unit matters; suppress the label slot
entirely on indeterminate bars. **Don't:** assume 100% fill means
complete — completion color must be passed explicitly via prop;
animate a determinate bar backward — progress bars never decrease; use
more than 5 segments in a department stacked bar, or more than 2 in a
general one — anything past that uses the Neutral-4 overflow color;
put a label inside a Compact (4px) track or a stacked fill; use a
department elemental color as a single-fill bar's default — department
colors classify ownership, not progress.

### Radio

**Transcribed from the teammate's `Radio.jsx`.**
Same text/spacing pattern as Checkbox; visually an outline that never
fills solid.

| Part | Spec |
|---|---|
| Circle | 18×18px, `radius-pill`, spacing-8 gap to the text, 2px top margin for optical alignment |
| Circle — unchecked | 1px Neutral-3 border, Neutral-1 fill |
| Circle — checked | 1px Obsidian border, Neutral-1 fill, inner 9×9 Obsidian dot (`radius-pill`) |
| Label / description | same as Checkbox — body1/weight 500/Neutral-9, caption/Neutral-5 |
| Disabled | 50% opacity, `cursor: not-allowed` |
| Transition | `border-color` — `var(--duration-fast) var(--ease-standard)` |

Grouped via a shared native `name` attribute — only one Radio per group
may be checked.

**Do:** use Radio for a mutually-exclusive choice of ≤4-5 visible
options; reach for Select once it's more than that. **Don't:** mix Radio
and Checkbox visuals within the same choice group — the outline-only vs.
filled-box distinction signals single- vs. multi-select.

### Search input

⚠️ **Designed, not sourced** (Default variant absorbs the
former "Search input clear button"; User Search absorbs the former
UserPicker, designed from scratch with no source in either the
original brand deck or the teammate's build). Reuses Input field's box
anatomy and focus behavior, Filters'/Date picker's popover convention,
and Table row's hover treatment — not invented patterns. Treat as a
first pass needing real design/brand review.

A single input with a leading `magnifying-glass` and a clear (×)
button that appears once there's a value, in three variants:

- **Default** — plain text search, no dropdown (the former "Search
  input clear button").
- **User Search** — searches and selects a single person from a list,
  collapsing to an avatar/name/role summary once a value is set
  (the former UserPicker).
- **Item Search** — the same dropdown/collapse mechanics as User
  Search, without the avatar, for searching non-person records.

| Part | Spec |
|---|---|
| Box | same anatomy as Input field: 40px height, `radius-sm`, 1px Neutral-3 border, Neutral-1 fill; border/radius/fill live on the `<input>` itself (icon and clear button sit on top of it), so Active is a genuine `:focus`, not a JS-toggled class |
| Leading icon | `magnifying-glass`, `icon-sm` (16px), Neutral-5, **Tier 1, Regular** (search inside an input field, per Iconography) |
| Clear (×) | appears only once the field has a non-empty value; `icon-sm` (16px), **Tier 1, Regular**, Neutral-5 default / Neutral-9 hover, 24×24px hit target, spacing-12 from the right edge; hidden — removed from tab order, not just visually suppressed — when the field is empty |
| Active | 2px Obsidian border swap, padding reduced 1px/side to compensate — real `:focus` (not `:focus-visible`), same rule as Input field, not the Water shadow-focus ring |
| Error | 1px Red border, error text below in caption/700 Red, replacing helper text — matches Input field's own documented Error row |
| Disabled | Neutral-4 text, Neutral-2 fill, Neutral-3 border, `cursor: not-allowed`, clear button not rendered |
| Dropdown panel (User/Item Search) | `radius-md` (16px), 1px Neutral-3 border, `shadow-3`, spacing-8 below the trigger — same popover convention as Filters/Date picker |
| Dropdown row — User Search | avatar + name + role, spacing-12 gap, spacing-8/spacing-12 padding, Neutral-2 fill on hover — same hover token as Table row |
| Dropdown row — Item Search | item name + optional subtitle, same gap/padding/hover as User Search's row, no avatar |
| Loading (User/Item Search) | centered spinner, Neutral-5, spacing-16 padding — see the note below |
| Empty state (User/Item Search) | "No matches found", body2, Neutral-5, centered, spacing-16 padding |
| Avatar (User Search only) | 32×32px circle, `radius-pill`, Neutral-2 fill, Neutral-9 text, `--font-primary`, weight 700, caption size — shows initials |
| Selected/collapsed (User/Item Search) | same 40px-height box as the Default state so selecting doesn't reflow the surrounding layout; shows the selected item plus a clear (×) |
| Selected — hover | clear (×) swaps to Neutral-9 — Input field's own icon-button hover convention, a color change only, never a background fill |
| Selected — disabled | clear (×) visually hidden, Neutral-4 text, `cursor: not-allowed` — the button stays in the markup as a real `disabled` element (already out of the tab order on its own) rather than being omitted, so its 24px + spacing-12 footprint still counts toward the row's own sizing; this keeps Selected — disabled at the exact same rendered width as Selected and Selected — hover in both User Search and Item Search, instead of the row shrinking once the button disappears |

**Variants:** Default, User Search, Item Search — each with Default,
Active, Has value, Disabled, and Error; User Search/Item Search add
Searching, No results, Loading, Selected, Selected — hover, and
Selected — disabled.

⚠️ **Loading has no source anywhere in this system** — Button's own
"Loading" row is spec-text-only, with no CSS/markup backing it
anywhere. Treated as the same family as Iconography's explicit Tier 1/
Regular `refresh` (an ongoing-process icon, not a status/decorative
one) — `spinner-gap`, rotated via a plain `linear infinite` animation
at `--duration-ambient` (900ms), the one duration token named for a
continuous loop rather than this system's usual one-shot "movement
settles" transitions.

**Standing note:** if you're looking for **UserPicker**, it's now the
**User Search** variant of this component — folded in here rather than
kept as a separate spec, alongside the old "Search input clear button"
section (now the **Default** variant).

**Do:** keep every variant's collapsed/default state at the same 40px
height so selecting or clearing a value never reflows the surrounding
layout; keep Selected — disabled at the same rendered *width* as
Selected and Selected — hover too, by keeping the clear button in the
markup and only hiding it visually rather than omitting it, so its
layout space still counts toward the row's own sizing; keep the clear
button keyboard-reachable via `Tab` once it's visible. **Don't:** show
both a clear button and a separate trailing
icon at once; style the dropdown's empty state as a full [Empty
state](#empty-state) (icon + heading + body) — it's an inline "nothing
matched" message inside a compact popover, not a page-level empty
state; use a Tier 2/Fill icon for the loading spinner — it's a process
indicator, not a status mark.

### Segmented Control

⚠️ **Designed from scratch — no source in either the original brand
deck or the teammate's build.** Built from this document's own token
system by reusing Button Ghost's hover/pressed recipe, SidebarNav's
nested-radius convention, and a deliberate distinction from Tabs — not
transcribed. Treat as a first pass needing real design/brand review.

Single-row control for switching between 2–5 mutually exclusive view
states of the same content. Distinct from **Tabs** (in-page section
switching with a full-width Neutral-3 border-bottom track, body1
labels, and no fill on the active tab — use Tabs when sections can grow
past 5 or need their own full content regions) and from **Radio** (a
form input requiring explicit submit — use Radio when the choice is
deferred, not immediate). Where Tabs navigates *between sections*,
Segmented Control switches *between views of a single section* — a
tightly bounded set where 2–5 is a hard limit, not a soft guideline.

| Part | Spec |
|---|---|
| Track (container) | Neutral-2 `#f0f0f0` fill, 1px Neutral-3 `#d8d8d8` border, spacing-4 (4px) padding all sides, spacing-4 (4px) gap between segments, `radius-md` (16px) |
| Segment — inactive | transparent fill, spacing-8 vertical / spacing-12 horizontal padding, `radius-sm` (12px — same nested-interactive-element radius SidebarNav uses: a control inside a container takes one radius tier smaller than the container's own), Neutral-5 icon/text |
| Segment — active | Neutral-1 `#ffffff` fill, `shadow-1`, `radius-sm` (12px), Neutral-9 `#080808` icon/text. The fill/shadow render on a single shared **Pill** element (see Transition below) that moves and resizes to sit behind whichever segment is currently active, rather than being painted on each segment independently |
| Icon | `icon-base` (20px) default size, `icon-micro` (14px) compact size; **Tier 1, Regular** throughout — consistent across active and inactive states. Active state is communicated by fill, shadow, and text weight, not by icon weight. Segments are button-like controls, not expressive status indicators — Tier 1 Regular is correct per [Iconography](#iconography) |
| Label (text fallback) | `caption` (12px/16px), weight 500 inactive / weight 700 active, uppercase (`text-transform: uppercase`) — the casing convention used by section kickers and SidebarNav section labels for compact categorical labels; 6 characters maximum per segment |

**Sizes:**

| Size | Height | Icon | Text |
|---|---|---|---|
| Default | 36px | `icon-base` (20px) | `caption` |
| Compact | 28px | `icon-micro` (14px) | `caption` |

**States:**

| State | Fill | Text/icon | Notes |
|---|---|---|---|
| Inactive | transparent | Neutral-5 | — |
| Active | Neutral-1 `#ffffff` + `shadow-1` | Neutral-9 `#080808` | — |
| Hover — inactive only | Neutral-2 `#f0f0f0` | unchanged | Reuses **Button Ghost's** hover token (`Hover \| Neutral-2 fill`) — the same token SidebarNav's own Nav item hover reuses rather than inventing a nav-specific value; the active segment does not visually respond to hover — it is already elevated |
| Active/pressed | Neutral-3 `#d8d8d8` | unchanged | Direct match to **Button Ghost's** `Active/pressed \| Neutral-3 fill`, the same unfilled-by-default control family SidebarNav's own Nav item — active-pressed row cites. This is the momentary mouse-down state, a different axis from the persistent "Active" (selected) row above — see SidebarNav's own note on "active" vs. "active-pressed" being different axes |
| Focus-visible | current fill + 2px Obsidian outline, 2px offset | unchanged | Reuses **Button's** exact focus-visible token verbatim; `radius-sm` — same as Button and SidebarNav's Nav item |
| Disabled — single segment | transparent | Neutral-4, 40% opacity | `cursor: not-allowed`, no hover response — matches **Button Ghost's** disabled and SidebarNav's Nav item disabled, not Checkbox/Radio's 50%-opacity convention (that belongs to compact toggle controls, not row-based interactive elements) |
| Disabled — whole control | track + all segments at 40% opacity | — | `cursor: not-allowed` throughout |

**Variants:**

| Variant | Spec |
|---|---|
| Icon only (default) | Use when every option has a universally understood Phosphor icon. Requires a tooltip on hover showing the full option label — same bubble visuals as [Tooltip](#tooltip): `caption`/500, Neutral-7 `#222222` fill, Neutral-1 text, `radius-sm`, spacing-4 / spacing-8 padding, positioned above the segment. Each segment also requires `aria-label` since there is no visible text |
| Text only (fallback) | Use when no adequate Phosphor icon exists for one or more options (e.g. MTD/QTD/YTD, Day/Week/Month). Phosphor icons only — no custom SVGs |
| Mixed (not permitted) | All segments within one instance must use the same content type. A mix of icon and text segments is not permitted — if one option can't be represented by an icon, switch the whole instance to text |

**Segment width:** all segments share equal width (`flex: 1`). Minimum
segment width: 32px icon-only, 48px text. Track width is determined by
context. If a default-size instance would force segments below minimum
width, use compact size rather than adjusting widths.

**Transition — sliding Pill.** ⚠️ **Revised 2026-08-10, superseding this
component's original fill-swap-in-place design.** The active fill,
`shadow-1`, and `radius-sm` render on a single absolutely-positioned
**Pill** element, one per Segmented Control instance, sitting behind
the segments (`z-index` below them) inside a `position: relative`
track. On selection, the Pill's `width`/`height`/`transform:
translate()` animate from the previously-active segment's box to the
newly-active one's, so it visibly slides and resizes between segments
of different widths (e.g. an icon-only segment to a longer text
segment) rather than the fill simply appearing in the new spot. The
segment's own text/icon color and weight still swap instantly (not
animated) — only the Pill's position, size, fill, and shadow move.

| Property | Value |
|---|---|
| Duration | `duration-fast` (140ms) — same hover/focus duration as Button |
| Easing | `ease-standard` — the non-elemental default, since Segmented Control isn't owned by a specific brand element (same reasoning as Toast, SidebarNav collapse, and accordion transitions) |
| Reduced motion | `prefers-reduced-motion` disables the Pill's transition entirely — it jumps to the newly-active segment's position/size with no animation |
| Initial position | set with no transition on first render/page load, so the Pill never visibly slides in from an arbitrary starting point the first time a Segmented Control mounts |

⚠️ **Implementation note — containing-block offset.** The Pill's
containing block (an absolutely-positioned element inside the track's
`position: relative`) is the track's own **padding box**, which is
already inset by the track's 1px border. A naive `translate()`
computed from the track's full border-box `getBoundingClientRect()`
double-counts that 1px, landing the Pill 1px off both the top and left
edge of the segment it's supposed to match — subtract the track's own
border width from the translate calculation, or the Pill and the
active segment visibly disagree on their top/bottom/left/right
spacing.

**Placement:** always inline within a section, card, or toolbar — never
full page width. Typically right-aligned within the parent toolbar or
section header row. Never inside a form as a substitute for Radio — a
Segmented Control's selection takes effect immediately with no separate
save step; if the choice is deferred, that's Radio.

**Content rules:** 2 segments minimum, 5 segments maximum. Beyond 5 use
Tabs or a Select dropdown instead. Text label: 6 characters maximum —
enforced at content-authoring level, not truncated by the component; a
label that exceeds the limit must be rewritten.

**Accessibility:** `role="group"` on the track with `aria-label`
describing the control's purpose (e.g. `aria-label="View mode"`). Each
segment: `role="radio"`, `aria-checked="true"` / `aria-checked="false"`.
Keyboard: arrow keys navigate between segments, Space or Enter selects
the focused segment, Escape returns focus to the previously-focused
element outside the control. Icon-only segments each require
`aria-label` describing the option (e.g. `aria-label="List view"`).
Active state never relies on color alone — fill, shadow, and text
weight all change together.

**Do:** use for switching between views of the same content (List/Grid/
Board). Switch the whole instance to text when one option has no clear
icon — never mix within one instance. Show a tooltip on hover for
icon-only instances. **Don't:** exceed 5 segments — use Tabs instead.
**Don't:** use for page-level navigation (that's SidebarNav) or form
inputs (that's Radio). **Don't:** use an elemental/accent color as the
active segment's fill — Neutral-1 is correct; accent colors classify
ownership, they never signal selection (Rule 2 in [Component
Rules](#component-rules)).

### SidebarNav

**Transcribed from the teammate's `SidebarNav.jsx`.**
Primary app-level navigation, not a page-local menu. This is also
what App Shell uses as the main nav — same
component, unmodified, just inset from the viewport edges rather than
centered on a page; see [App Shell](#app-shell) for the placement rule.

**Global navigation rule.** SidebarNav is the
canonical navigation pattern for all Collabrium builds. No alternative
navigation orientation (top nav, bottom nav, tab bar) should be used
unless explicitly documented as an exception for a specific context.

| Part | Spec |
|---|---|
| Container | 240px width (expanded) / 72px width (collapsed) — hard max-width in both states: `overflow-x: hidden`, never horizontally scrollable at either width, `radius-lg` (20px), 1px Neutral-3 border, Neutral-1 fill, spacing-12 (12px) padding **on all four sides equally**, spacing-4 (4px) gap between items |
| Header (optional) | spacing-8 top/right/left, spacing-16 bottom padding — logo lockup or workspace switcher slot, **horizontal padding equal on both sides**; see Header logo rule below. Expanded is a flex row, `align-items: center`, logo left-aligned, toggle right-aligned, both in normal flex flow, same row. Collapsed is not this same flex row — the logo is independently centered as the header's only in-flow content, and the toggle is a separate floating overlay button anchored to the rail's own right edge (see Collapsible state below for both) |
| Section label (optional) | spacing-16 top, spacing-8 sides, spacing-4 bottom padding; caption size, weight 700, `tracking-eyebrow`, uppercase, Neutral-5. A 1px Neutral-3 hairline sits above every section label except the first one in the list (e.g. between Overview and Workspace), separating one department/area group from the next |
| Nav item | 40px height minimum (grows to fit a wrapped 2-line label — see the wrapping rule below), full width, 0/spacing-12 padding, `radius-sm` (12px — smaller than the container's own radius, standard for nested interactive rows), spacing-12 gap between icon and label, body1 type (16px) |
| Nav item — active | Neutral-2 fill, Neutral-9 text, weight 700 |
| Nav item — inactive | transparent fill, Neutral-5 text, weight 500 |
| Nav item — locked/soon | for sections that exist in the IA but aren't built yet. Transparent fill (same as inactive), Neutral-4 text (one step more muted than inactive's Neutral-5), icon at 40% opacity, `cursor: not-allowed`, no hover/focus feedback. Trailing slot carries a Badge (Neutral variant, "Soon" label) instead of the trailing-count slot — the two are mutually exclusive on one item |
| Nav item — hover | Neutral-2 fill, text color unchanged from whatever active/inactive state it already has — reuses Table row's own hover token (`Row hover \| Neutral-2 fill`) and Button Ghost's hover, rather than a nav-specific value |
| Nav item — focus-visible | 2px Obsidian outline, 2px offset, additive on top of the current fill — reuses Button's exact focus-visible token; Nav item is a clickable row control at `radius-sm` like Button, not a Card-like surface, so this is used instead of Card's `shadow-focus`/Water-ring exception |
| Nav item — active-pressed | Neutral-3 fill — direct match to Button Ghost's `Active/pressed \| Neutral-3 fill`, same unfilled-by-default control family |
| Nav item — disabled | Neutral-4 text/icon, fill stays transparent, `cursor: not-allowed` — matches Button Ghost's disabled and Pagination's Ghost icon-button disabled, not Checkbox/Radio/Switch's 50%-opacity convention (that belongs to compact toggle controls, not row-based nav items) |
| Icon | `icon-base` (20px); may take an element color override when the item is department-specific; **Tier 2, Fill** (a sidebar nav item, per [Iconography](#iconography)) |
| Trailing count | optional, caption/700/Neutral-5, right-aligned |
| Footer (optional) | pinned to the bottom (`margin-top: auto`), spacing-16 padding-top — sign-out, account, or help slot |
| Transition | `background-color`, `color` — `var(--duration-fast) var(--ease-standard)` |

**Note on "active" vs. "active-pressed"** — these are different axes.
"Active"/"inactive" (above) is the *persistent selection* state (which
page you're on); "active-pressed" is the *momentary* mouse-down state,
and can land on either an active or inactive item. Hover, focus-visible,
active-pressed, and disabled all apply orthogonally on top of whichever
active/inactive state the item already has.

**Labels wrap, they don't truncate.** 240px
(expanded) is a hard max-width with no horizontal scroll; a label too
long for one line wraps to a second line instead of truncating with an
ellipsis or overflowing the container.

**Do:** use section labels to group items by department/area, one level
deep. **Don't:** nest a second level of grouping — if the hierarchy needs
more than one level, that's a sign the item belongs in a sub-page's Tabs
instead.

**Collapsible state.**

| Part | Spec |
|---|---|
| Collapsed width | 72px — a one-off literal, not a named spacing token (same precedent as Second-level navigation's 36px child-item height and Tooltip's 6px/10px padding): the collapsed rail needs to fit the logo/element icon and the toggle icon side by side on one row |
| Expanded width | 240px |
| Toggle trigger — expanded | same row as the header logo, right-aligned, vertically centered |
| Toggle trigger — collapsed | a separate floating overlay button, `position: absolute`, anchored to the rail's own right edge and vertically centered to the same row as the logo, straddling the rail's own border (half in / half out) rather than sitting fully inside the padding. Sized down from the expanded toggle's 28px button / 18px icon to a **24px button / 16px icon**, since the full expanded size would crowd the independently-centered logo in the 72px rail |
| Toggle trigger — icon | Remix Icon's `ri-sidebar-fold-line` (collapse) / `ri-sidebar-unfold-line` (expand), replacing `chevron-left`/`chevron-right`. Phosphor has no equivalent glyph for this specific affordance, so this correctly invokes the documented Remix **fallback** rule in [Iconography](#iconography) ("only when Phosphor lacks the glyph"), not a by-taste library swap. **Tier 1, Regular** (hence the `-line` suffix) — collapsing/expanding a panel is literally one of Iconography's own listed Tier 1 examples ("expand, collapse") |
| Collapsed — visible elements | icon only; labels, section labels, and trailing count text are all hidden |
| Collapsed — alignment | every nav item's icon is center-aligned horizontally within the 72px rail. The header logo/element icon is **independently** centered the same way (not paired with the toggle icon — the toggle is a floating overlay anchored to the rail's own right edge instead, see Toggle trigger — collapsed, above, and doesn't participate in this centered alignment at all). Expanded stays left-aligned throughout |
| Collapsed — trailing count | converts to an 8px dot badge (matches `spacing-8`) in the item's owning element accent color (same override logic as the Icon row above), overlaid top-right on the icon |
| Collapsed — logo | collapses to the individual department element icon, `SVG/{element}.svg` (`fire.svg`/`wood.svg`/`earth.svg`/`water.svg`); the default (no department context) collapses to `SVG/coin.svg` specifically — not the expanded-state default (`logo.html` live, or a department lockup — see the Header logo rule above) |
| Toggle behavior — logo asset | the logo swaps entirely on toggle, not just resizes or repositions. Expanding restores the live `logo.html` embed (default context) or the static lockup (department context); collapsing (either context) swaps to the static element icon/`coin.svg` (`SVG/`). The implementation needs a conditional for "restore the iframe" vs. "restore an img" rather than a single `img.src` swap, since the default expanded state is no longer an `<img>` |
| Collapsed — hover label | SidebarNav's own sub-pattern, not a reused [Tooltip](#tooltip) instance. Appears on icon hover **or keyboard focus**, shows the full nav item label, positioned to the right of the icon: same bubble visuals as Tooltip (6px/10px padding, `radius-sm`, Neutral-7 fill, Neutral-1 text, caption/500, opacity-only transition, `pointer-events: none`) but built and owned independently, because Tooltip's own spec assumes a plain relatively-positioned trigger wrapper — that model doesn't survive being placed inside SidebarNav's own scrolling item list (a vertically-scrolling container's `overflow-x` is forced to clip too, per the CSS overflow spec, which silently cuts off anything trying to render past its edge). SidebarNav's hover label is implemented as a single element that positions itself against the hovered icon directly, escaping that scroll container rather than living inside it |
| Transition | `width` — `var(--duration-slow) var(--ease-standard)` (`duration-slow`'s stated purpose is "panel / section reveals," an exact match; `ease-standard` since a sidebar collapse isn't owned by a specific brand element — per Motion's own rule, "reach for an elemental curve deliberately, not by default") |
| Persistence | collapsed/expanded state saved to `localStorage`, restored on load |

**Header logo rule.**

| Context | Logo |
|---|---|
| Default (expanded, no department context) | the live animated mark, `logo.html`, embedded via `<iframe>` — SidebarNav's header has plenty of room to run the animation at 240px, per [SKILL.md](SKILL.md)'s own rule ("use `logo.html` wherever the mark can animate") |
| Department-specific (expanded, passed via prop) | still the matching department's element-colored **static** lockup from `logo-lockups/` (see the Logo section's table above — only the Gold/default variant currently exists; the other 4 are flagged not-yet-provided) — `logo.html`'s animation always cycles through all 5 elements in sequence, so it can't freeze on one department's color; a department-specific header needs the static, single-color lockup instead |
| Collapsed (any context) | individual department element icon, `SVG/{element}.svg`; default collapses to `SVG/coin.svg` specifically — 72px has no room to run the full wordmark animation, matching [SKILL.md](SKILL.md)'s "where it can't [animate], use a static lockup" half of the same rule |
| Alignment | Expanded: always left-aligned. Collapsed: **independently** center-aligned within the 72px rail (see the Collapsible state's "Collapsed — alignment" row above) — the toggle trigger sits on the same row but doesn't share this centered alignment, since it's a floating overlay anchored to the rail's own right edge instead (see "Toggle trigger — collapsed," above) |

**Do:** always reference the logo library (`logo.html` embedded live for
the expanded default, a department lockup from `logo-lockups/` for an
expanded department-specific header, `SVG/` for collapsed) — never build
or embed a custom one-off logo asset for a header.

**Department switcher.**

When a SidebarNav instance receives 2 or more departments via the
`departments[]` prop, the header logo becomes an interactive trigger:
selecting it opens a dropdown listing each department's logo variant,
and selecting one switches the entire nav and page context to that
department. This is what the Header row's "workspace switcher slot"
(see the main Part/Spec table's Header row, above) was reserved for —
Department switcher is that slot, not a separate header element. Only
active in expanded mode — see Collapsed mode, below.

**Detection:**

- Trigger renders when `departments[]` contains 2 or more items.
- When `departments[]` has 0 or 1 item, no chevron renders and the logo
  stays static — existing default behavior (see Header logo rule,
  above), unchanged.

| Part | Spec |
|---|---|
| Department switcher trigger | expanded mode only, not accessible collapsed (see Collapsed mode, below); logo + chevron treated as one paired trigger button, sized to its own content rather than the full header width; chevron `chevron-down`/`chevron-up`, **Tier 1, Regular** (same pair and tier as Second-level navigation's own parent chevron, above), `icon-micro` (14px), Neutral-5 at rest; spacing-8 between logo and chevron; hover: Neutral-2 fill on the trigger itself only (logo + chevron), not the full header zone — a hover target that size would falsely suggest the whole header row is clickable, when only the logo/chevron pairing is; active/open: chevron swaps to `chevron-up`, Neutral-2 fill persists; `aria-haspopup="listbox"`, `aria-expanded` toggles true/false |

**Dropdown.**

| Part | Spec |
|---|---|
| Container | 240px width (matches SidebarNav's own Expanded width, above), positioned below the header area flush left with the sidebar container; Neutral-1 fill, 1px Neutral-3 border, `radius-md`, `shadow-3` — same popover convention as Filters/Date picker/Select; max 5 items visible before an internal scroll, same overflow rule as the sidebar itself (scrollbar hidden by default, visible on hover) |
| Department item | 40px height, 0/spacing-12 padding — matches Nav item exactly; logo-only — department logo lockup (from `logo-lockups/`), left-aligned (matches Nav item's own left-aligned content), no department-name text renders in the list (each option still carries an accessible name via `aria-label` for screen readers, since the visual label is gone); every lockup renders at a **uniform rendered size for its shared "collab" text**, not just a uniform bounding-box height — lockup SVGs aren't all proportioned the same way internally (e.g. the default lockup's own canvas is a different aspect ratio from the 4 department ones), so scaling every asset to the same box height alone can still render the shared wordmark portion at visibly different sizes; correct with a per-asset scale adjustment (tuned by eye against the shared "collab" text, not derived from a formula) rather than a single uniform height rule; hover: Neutral-2 fill; active/selected: Neutral-2 fill, trailing `check` icon (**Tier 1, Regular**); `role="option"`, `aria-selected` on the active department |
| Default option | always first in the list; its dropdown thumbnail is the **static** default lockup (`logo-lockups/collabrium-default-logo.svg`), not the live `logo.html` mark — a list of thumbnails isn't the place for a live animated embed; the header trigger itself still shows the live `logo.html` mark when Default is the active context, per the Header logo rule, above. Represents no specific department context |
| Missing asset fallback | if a department's lockup doesn't yet exist in `logo-lockups/` (see the Logo section's table — only the Gold/default variant currently exists), render `SVG/{element}.svg` as a placeholder in place of the missing lockup |
| List | `role="listbox"`; keyboard: arrow keys navigate options, Enter selects, Escape closes; closes on outside click, Escape, or item selection |

**Animation:**

| Property | Spec |
|---|---|
| Entrance | fade in + slight slide down from the header's bottom edge |
| Exit | fade out + slight slide up |
| Duration/easing | `duration-fast` / `ease-standard` — `duration-fast`'s stated purpose ("hover, focus transitions") is the closest fit for a quick dropdown reveal, and `ease-standard` since, like SidebarNav's own collapse and accordion transitions, a department switcher isn't owned by a specific brand element |
| Reduced motion | instant appear/disappear when `prefers-reduced-motion` is set |

**On switch:**

- The selected department's logo replaces the header logo immediately —
  the static lockup from `logo-lockups/` for the expanded state,
  `SVG/{element}.svg` for the collapsed state (per the Header logo rule
  and Collapsible state's own "Collapsed — logo" row, above).
- The entire nav item list replaces with the selected department's own
  navigation structure.
- The active nav item resets — routing navigates to the selected
  department's home item.
- Every accordion's open/closed state resets to all-closed on switch.
- The selected department is saved to `localStorage` and restored on
  load — same mechanism as Collapsible state's own Persistence row,
  above.
- Outgoing nav items fade out and incoming items fade in, using
  `duration-fast` (same token as the dropdown's own animation, above).

**Collapsed mode:**

- The department switcher is not accessible collapsed.
- The collapsed element icon (`SVG/{element}.svg`) passively reflects
  the active department but isn't a trigger.
- Expanding the sidebar is required to reach the department switcher.

**Accessibility:**

- Trigger: `aria-haspopup="listbox"`, `aria-expanded` reflects open/closed.
- Dropdown: `role="listbox"`.
- Each option: `role="option"`, `aria-selected` on the active item.
- Keyboard: arrow keys navigate, Enter selects, Escape closes and
  returns focus to the trigger.

**Second-level navigation.**

Distinct from the section-label Do/Don't above, which governs
*section labels* grouping items (still capped at zero extra nesting).
This is a separate structural concept — an individual **nav item**
expanding to show its own **child items** — and is supported up to one
level deep.

| Part | Spec |
|---|---|
| Depth supported | 2 levels maximum (parent + children); a third level isn't supported — content needing 3 levels belongs in page-level Tabs or a sub-page instead |
| Parent item | shows a trailing chevron, `chevron-down`/`chevron-up` — **Tier 1, Regular** ("chevron up/down" and "expand, collapse" are both Iconography's own Tier 1 examples) |
| Expand trigger | clicking anywhere on the parent item toggles it — not just the trailing chevron. The chevron swaps `chevron-down` ↔ `chevron-up` to reflect the parent's own open/closed state |
| Expand behavior | accordion — children render inline below the parent, no separate panel/overlay. Independent, not mutually exclusive: each parent's open/closed state is its own; opening one parent does **not** close any other open parent. There's no single-open-at-a-time grouping in this spec |
| Expand/collapse transition | children reveal/hide via a height transition, `var(--duration-slow) var(--ease-standard)` — reuses the same "panel/section reveals" duration as the Collapsible state's own width transition above, and the same default (non-elemental) easing, since an accordion isn't owned by a specific brand element either |
| Closing preserves state | collapsing a parent doesn't reset which child was active — reopening it shows the same active child again, exactly as it was left |
| Children width/indent | full width, not inset. Children are not a narrower block indented from the icon column; each child item spans the same full width as any other Nav item, with spacing-16 (16px) left padding on the item itself doing the indent instead of an outer margin |
| Child item height | 36px (a one-off literal value, not a named token — same precedent as Tooltip's 6px/10px padding and Checkbox's 6px radius: a smaller nested control gets its own compact size, smaller than the parent Nav item's 40px) |
| Child item type | body2 (14px), weight 500 inactive, weight 700 active |
| Active child | shows Nav item's own active state (Neutral-2 fill, Neutral-9 text, weight 700) |
| Active parent with active child | parent shows weight 700 text, but **no** active fill — the fill signal stays exclusively on the active child, so the two don't both read as "selected" at once. The parent's weight-700 state is only ever a side effect of one of its own children being selected, never of clicking/expanding the parent header itself — expanding or collapsing a parent never changes anyone's active state on its own, it's a pure open/closed toggle. Collapsed exception: this "text-only, no fill" treatment relies on the label, which is hidden entirely at 72px — with nothing else left to signal selection, the collapsed parent icon takes the normal Active fill instead (Neutral-2 background), same as any other active item gets. This doesn't reintroduce the "two things read as selected" problem the fill-less rule exists to avoid, because the active child isn't visible either while collapsed |
| Sidebar-wide exclusivity | exactly one destination is ever the active selection across the whole nav at a time — whether that's a top-level Nav item or a second-level child. Selecting any item (top-level or child) clears every other item's active state **and** any active child in any other (or the same) accordion panel first, so a plain Nav item and a leftover active child, or two different parents' active children, can never both read as "selected" simultaneously |
| Collapsed sidebar | accordion closes, and the parent's own children are never shown while collapsed — the icon-hover label (Collapsible state, above) shows the parent's own label only, not its children. The parent icon stays clickable, it just does something different than expanded: with no room to reveal children at 72px, clicking the parent icon routes straight to the parent's **first child** instead, selecting it as the sidebar's one active destination (same "click a group icon, land on its default sub-page" pattern collapsed rails commonly use) — the parent picks up its own active styling as the usual side effect of that child being selected, per the Active parent with active child row above |

**Overflow behavior.**

- The nav item list scrolls (`overflow-y: auto`) once items exceed the
  container's available height.
- Horizontal scroll is never permitted, in either state — the
  container's `overflow-x: hidden` (see Container row above) applies at
  both the 240px expanded and 72px collapsed widths. Content that would
  overflow horizontally (a long label, an unswapped logo asset) must wrap
  or be resized to fit, never scroll sideways.
- Scrollbar is hidden by default, visible on hover of the container as
  a thin overlay scrollbar (e.g. `scrollbar-gutter` left unreserved, or an
  absolutely-positioned custom thumb) that never reserves layout space.
  Showing it on hover must not shift or shrink the nav items' own width.
- Footer (existing optional sub-part above) is pinned outside the
  scrolling region via its own `margin-top: auto` and never scrolls with
  the item list.

⚠️ **Needs Input — SidebarNav.**
- Mobile/responsive behavior — not yet defined.
- Keyboard navigation (arrow keys, `Enter`, `Escape` on the accordion) —
  to be defined in a future accessibility pass.

### Slider

⚠️ **Designed from scratch — no source in either the original brand
deck or the teammate's build.** Built from this document's own token
system by reusing Button Ghost's hover/pressed recipe, Switch's thumb
anatomy, Tooltip's bubble visuals, and Button's focus-visible token —
not transcribed. Treat as a first pass needing real design/brand
review.

A drag control for selecting a single value or a range along a
continuous axis. Distinct from **Input field** (use Input when the
user needs to type an exact value) and **Select** (use Select for
discrete named options). Two variants — Single and Range — share all
anatomy and token values; the only structural difference is the number
of thumbs and where the filled track renders.

| Part | Spec |
|---|---|
| Track | 4px height (one-off literal — same precedent as SidebarNav's 36px child-item height: a track rail has no named height token), full width of parent, `radius-pill`, Neutral-3 `#d8d8d8` fill for the unfilled portion. Runs flush with the component's own left/right edges — don't inset it to keep the thumb from overhanging; see the Thumb row below |
| Track fill | Obsidian `#2B2B2C` for the filled portion — minimum end to the thumb (Single), or between the two thumbs (Range). Obsidian signals "value committed here," the same meaning Input field's focused border carries — not "click me" |
| Thumb | 20×20px, `radius-pill`, Neutral-1 `#ffffff` fill, 2px Obsidian border, `shadow-2` — the same circular Neutral-1 concept as Switch's own thumb, at a slightly larger precision-drag size, one shadow rung higher (Switch's own thumb rests at `shadow-1`) and with an added 2px Obsidian border Switch's thumb doesn't have, for a clearer edge against the light Neutral-3 track. Hit target: 44×44px via padding or a `::before` pseudo-element — visual size stays 20×20px. At rest, the thumb is centered on the track's own 4px line, not on the top of its own (taller) hit-target box — the two need a shared vertical center, or the thumb reads as floating off-center against the track. At 0%/100% the thumb is allowed to visually overhang the track's own ends by half its own width — normal for a point value, matching native OS sliders and most component libraries; don't inset the track to prevent it |
| Value tooltip | appears above the active thumb on hover and during drag; same bubble visuals as [Tooltip](#tooltip): caption/500, Neutral-7 `#222222` fill, Neutral-1 text, `radius-sm`, 6px vertical / spacing-8 (8px) horizontal padding, `pointer-events: none`. Centered above the thumb, follows thumb position during drag, disappears after drag-end via an opacity transition |
| Min/max labels (optional) | caption (12px/400), Neutral-5, below the track at each end, always visible when present; spacing-4 (4px) between track bottom and label top |
| Static value label (optional) | caption (12px/400), Neutral-9, right-aligned above the track's end; use only when the current value must stay visible at rest. Mutually exclusive with the value tooltip — when a static label is present, the tooltip is suppressed |

**Variants:**

| Variant | Spec |
|---|---|
| Single | one thumb; track fill runs from the minimum end to the thumb |
| Range | two thumbs; track fill renders only between them. Each thumb shows its own value tooltip. The most recently moved thumb sits on top at the same position (`z-index` managed dynamically). Thumbs may touch but never cross |

⚠️ **Implementation note — how crossing is actually prevented.** Clamp
the dragged handle's *value* against its partner's current value, not
either handle's live `min`/`max` attribute. A native range thumb's
on-screen position is rendered by the browser from that same input's own
current `min`/`max`/`value` — shrinking one handle's live bound to
enforce the constraint doesn't just stop future dragging, it also makes
the browser reinterpret what "100%"/"0%" means for that handle's own
(now-narrower) range, snapping its visible thumb to the wrong end of the
track instead of to the touch point. Only clamp the handle that actually
just moved (compare against the specific input that fired, not both
unconditionally) — otherwise correcting one handle can incorrectly drag
the *other* one along with it.

**Sizes:**

| Size | Track | Thumb | Use |
|---|---|---|---|
| Default | 4px | 20×20px | Standard dashboard use |
| Compact | 2px | 16×16px (matches `icon-sm` — the smallest interactive control size in this system) | Dense layouts, table-embedded |

Both sizes keep the same 44×44px hit target regardless of visual size.

⚠️ **Reference-implementation caveat, not a spec change.** A true 44×44px
hit target on a *native* `<input type="range">` gets impractical past a
certain size — the browser hit-tests the element's own rendered box, and
stretching that arbitrarily large starts overlapping neighboring rows
without extra JS-based hit-testing. The tested reference build
approximates this with a shorter (~24px) interactive box rather than the
full 44×44 — noticeably better than the bare 20×20/16×16 visual thumb,
but short of the documented target. Flagged here rather than silently
shipped smaller; revisit if a real build needs the full 44×44.

**States:**

| State | Fill | Thumb | Notes |
|---|---|---|---|
| Default | Obsidian track fill | Neutral-1 fill, 2px Obsidian border, `shadow-2` | `cursor: pointer` on the thumb |
| Hover — thumb | unchanged | `shadow-3` | Matches interactive Card's hover-raise convention (one shadow rung up from rest) — not a literal reuse of Card's own `shadow-1`→`shadow-2` values, since the thumb's own resting state already sits at `shadow-2`; `cursor: grab`; value tooltip fades in |
| Dragging | unchanged | `shadow-3` | `cursor: grabbing`; value tooltip visible, tracks the thumb |
| Focus-visible | unchanged | current fill + 2px Obsidian outline, 2px offset | Reuses **Button's** exact focus-visible token verbatim; `radius-pill` to match the thumb's own shape |
| Disabled | Neutral-3 for both filled and unfilled track | Neutral-4 border, 40% opacity throughout | `cursor: not-allowed`, no hover or drag response — matches **Button Ghost's** disabled, not Checkbox/Radio/Switch's 50%-opacity convention (that belongs to compact toggle controls, not drag controls) |

**Transition:**

| Property | Value |
|---|---|
| Thumb position during drag | immediate — no transition; lag between pointer and thumb would break the physical drag feel |
| Track fill width during drag | immediate — same reason |
| Thumb shadow (hover/drag) | `box-shadow` — `duration-fast` (140ms), `ease-standard` |
| Value tooltip entrance | opacity 0→1 — `duration-fast`, `ease-standard` |
| Value tooltip exit | opacity 1→0, starting after a `duration-base` (220ms) delay once drag ends — the delay gives a moment to read the final value before the tooltip clears; the fade itself is still `duration-fast`/`ease-standard` |
| Reduced motion | tooltip appears/disappears instantly; shadow changes are instant |

**Accessibility:**

- Single: a native `<input type="range">` — the browser handles `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` natively; add an `aria-label` or a visible `<label>`.
- Range: two stacked `<input type="range">` elements — each needs its own `aria-label` ("Minimum value" / "Maximum value") and `aria-valuemin`/`aria-valuemax` updated dynamically to reflect the other thumb's current position.
- Clicking anywhere on the track jumps the value to that point — not reserved for dragging only. Single gets this for free from the native element's own default behavior. Range's two overlapping inputs can't resolve a click natively (it can only ever land on whichever one is stacked on top), so it's resolved explicitly: the click moves whichever thumb is *nearer* that point. When the two thumbs are touching (tied), the click's own direction breaks the tie — a click to the right of the pair moves the upper thumb, a click to the left moves the lower one, since picking by distance alone can otherwise choose the handle that immediately gets clamped back by the crossing-prevention rule above, silently undoing the click.
- `aria-valuetext` is required whenever the raw number needs a unit (e.g. `aria-valuetext="RM 25,000"`).
- Keyboard — Single: Arrow Left/Right decrements/increments; Home/End jumps to minimum/maximum.
- Keyboard — Range: same per thumb; Tab moves focus between the two thumbs.
- Color: the active fill never relies on Obsidian alone — the thumb's white fill and Obsidian border also signal position.

**Content rules:**

- Min/max labels must include a unit when it isn't obvious from context.
- Malaysian ringgit follows the system content rule: `RM 100,000` — space after RM, comma thousands.
- Value tooltip format matches the min/max labels — never show a raw number where the labels show a formatted one.
- Don't use Slider when fewer than ~10 distinct values are valid — use Select or Radio instead.

**Placement:**

- Always full width of its parent container or defined column — never an intrinsic inline width.
- Always paired with a visible label above it, using the same label convention as Input field (caption/700/Neutral-9, spacing-4 below).

**Do:** give every slider a label; use `aria-valuetext` when the unit
matters; keep the thumb's hit target at 44×44px regardless of its
visual size. **Don't:** use Slider for fewer than ~10 distinct
values — use Select or Radio instead; use an elemental/accent color for
the track fill — Obsidian is correct (Rule 2, [Component
Rules](#component-rules)); suppress the tooltip on Range — knowing the
exact values during drag is critical.

---

### Stat / KPI card

⚠️ **Designed from scratch — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by extension from the existing Card spec, not
transcribed. Treat as a first pass needing real design/brand review.

A dashboard summary tile for a single metric — extends the base Card,
doesn't replace it.

| Part | Spec |
|---|---|
| Container | same as base Card: `radius-lg` (20px), Neutral-1 fill, 1px Neutral-3 border, `shadow-1` at rest, spacing-16 padding |
| Label | caption, weight 700, `tracking-eyebrow`, uppercase, Neutral-5 — the metric name (e.g. "TOTAL SPEND") |
| Value | h1 (32px/800) for a standard tile; the `display` size (40px/800) for a single featured/hero stat card in a row of otherwise-standard tiles — never mix the two sizes within one row |
| Trend | inline row below the value, spacing-8 gap above it: `caret-up`/`caret-down`/`minus` (`icon-micro`, 14px) + delta value + comparison period, all caption/700; **Tier 2, Fill** — a judgment call, not explicit in [Iconography](#iconography)'s examples; treated as expressive/informational (not clickable) despite "arrow up/down" appearing in the Tier 1 example list, see [Needs Input #11](#needs-input-read-this-first) |
| Trend color | Green = positive change, Red = negative change, Neutral-5 = flat/no comparison available — reuses the exact Badge success/danger hues, not new colors |
| Icon chip (optional) | top-right or top-left, same 36×36 `radius-sm` chip at 12% element tint as Card's icon-chip pattern — marks which department the metric belongs to; **Tier 2, Fill** (a department indicator) |
| Footer (optional) | same as Card's Footer sub-part — spacing-16 margin-top, spacing-12 padding-top, 1px Neutral-3 top border, caption/Neutral-5 (e.g. "As of 9:41am") |
| Sparkline slot (optional) | reserved space below the trend row for a mini inline chart — see Chart color mapping below for how its line/fill should be colored; this spec doesn't define chart rendering itself |

**Variants:** Static (default) and Interactive/clickable (same hover →
`shadow-2` + focus-visible → `shadow-focus` pattern as Card).

**Do:** show exactly one primary value per card — that's what makes it
scannable at a glance. **Don't:** stack more than one KPI in a single
card; that's a table row or a multi-column summary bar, not a stat
card. **Don't:** color the trend for decoration — only use Green/Red
when the number is a genuine directional comparison against a stated
period.

### Stepper

⚠️ **Designed from scratch — no source in either the original
brand deck or the teammate's build.** Built from this document's own
token system by reusing Checkbox/Radio's on/off treatment, SidebarNav's
active/inactive label weighting, and the caption token for supporting
text — not transcribed. Treat as a first pass needing real design/brand
review.

Tracks progress through a multi-step flow — onboarding, a multi-page
form, a checkout — as an ordered list of steps, each in one of three
states.

| Part | Spec |
|---|---|
| Indicator | 24×24px circle, `radius-pill` |
| Indicator — Completed | Obsidian fill, Neutral-1 text, shows the step number (not an icon — fill vs. outline is what carries the state) |
| Indicator — Active | Neutral-1 fill, 2px Obsidian border, Obsidian text |
| Indicator — Upcoming | Neutral-1 fill, 1px Neutral-3 border, Neutral-5 text |
| Label | body2 (14px/20px); weight 700 + Neutral-9 when Active, weight 400 + Neutral-5 when Completed/Upcoming — same bold-vs-muted pattern as SidebarNav's active/inactive nav items |
| Description (optional) | caption (12px), Neutral-5 — smaller than the label, spacing-4 below it |
| Connector | 1px fill in Neutral-3 (the hairline-border token), not a literal border |
| Connector — horizontal | sits between each pair of indicators, sharing an equal `flex: 1` share of the row so every connector is the same length regardless of neighboring label width |
| Connector — vertical | fixed spacing-16 length, held spacing-8 off the indicator above (the rail's own gap) and spacing-8 off the indicator below (the list's gap) — equal on both sides, never touching either circle |

**Variants:** orientation (Horizontal / Vertical) and per-step description
are independent, giving Horizontal/Vertical × With/No description as
four presentations, not four hard-coded variants.

**Do:** derive each step's state from a single `currentStep` index —
before it is Completed, at it is Active, after it is Upcoming — rather
than tracking state per step. **Don't:** let the connector's length or
spacing depend on label or description length; both orientations keep
it fixed/equal on purpose (see the Connector rows above).

### Switch

**Transcribed from the teammate's `Switch.jsx`.**
For an immediately-applied binary setting — no separate Save step. Use
Checkbox instead when the choice is part of a form that gets submitted.

| Part | Spec |
|---|---|
| Track | 40×24px, `radius-pill`, spacing-12 gap to the text (wider than Checkbox/Radio's spacing-8, since the track itself is the primary visual) |
| Track — off | Neutral-4 fill |
| Track — on | Obsidian fill |
| Track transition | `background-color` — `var(--duration-base) var(--ease-standard)` |
| Thumb | 18×18px circle, `radius-pill`, Neutral-1 fill, `shadow-1`, 3px from top |
| Thumb position | left: 3px (off) → 19px (on) |
| Thumb transition | `left` — `var(--duration-base) var(--ease-settle)` (the anchored-arrival easing, matching the toggle's physical drop) |
| Label / description | same as Checkbox — body1/weight 500/Neutral-9, caption/Neutral-5 |
| Disabled | 50% opacity, `cursor: not-allowed` |

**Do:** label a Switch with what it controls ("Email notifications"), not
its state ("On/Off"). **Don't:** use Switch inside a form that requires
an explicit Save — that implies deferred application, which contradicts
what a Switch signals.

### Table row

| Part | Spec |
|---|---|
| Header row | label3, Neutral-5 text, uppercase, 1px Neutral-3 border-bottom only |
| Body row | body2, Neutral-9 text, 1px Neutral-3 border-bottom, spacing-12 (12px) vertical padding |
| Row hover | Neutral-2 fill |
| Row selected | Neutral-2 fill + 2px Obsidian left border |
| Numeric columns | right-aligned, tabular figures if the font supports them |
| Cell icon | `icon-micro` (14px), inherits cell text color — weight follows the icon's own [Iconography](#iconography) tier |

**Do:** apply the border only to `border-bottom`, never both top and
bottom on every row — a table with hairlines on all four sides of every
cell reads as noisy at data-table density. **Don't:** exceed roughly 8-10
visible columns before reaching for horizontal scroll or a
column-priority/collapse pattern; a table that requires zooming out to
read is a layout failure, not a data problem.

### Tabs

**Transcribed from the teammate's `Tabs.jsx`.**
In-page section switching, not app-level navigation (use SidebarNav for that).

| Part | Spec |
|---|---|
| Container | flex row, spacing-4 gap, 1px Neutral-3 border-bottom (full-width track) |
| Tab | inline-flex, spacing-8 gap, 40px height, 0/spacing-12 padding, no fill or border, body1 weight 700 |
| Tab — active | Neutral-9 text, 2px Obsidian underline (drawn as an **inset** `box-shadow: inset 0 -2px 0 var(--color-obsidian)`, not a real border — keeps the underline from shifting row height) |
| Tab — inactive | Neutral-5 text, no underline |
| Icon (optional) | `icon-sm` (16px), leading; **Tier 2, Fill** — a judgment call, not explicit in [Iconography](#iconography)'s examples; treated like SidebarNav (a persistent selection control) rather than a generic Tier 1 nav control, see [Needs Input #11](#needs-input-read-this-first) |
| Trailing count (optional) | caption/700/Neutral-5 |
| Transition | `color`, `box-shadow` — `var(--duration-fast) var(--ease-standard)` |

**Do:** keep tabs to a single row — wrap the container or let it scroll
horizontally rather than shrinking labels to fit. **Don't:** use Tabs for
more than ~6 sections; beyond that, use SidebarNav or a Select instead.

### Textarea

⚠️ **Designed, not sourced.** Extends Input field for
multi-line content; shares its label, border, fill, and type tokens so
the two align in a form.

| Part | Spec |
|---|---|
| Label | same as Input field |
| Box | `min-height` 96px (~4 lines at body1's 22px line-height), `radius-sm` (12px), 1px Neutral-3 border, Neutral-1 fill, spacing-12 (12px) padding on all sides, body1 type at weight 500 |
| Resize | `resize: vertical` only, `min-height` above as the floor, no max — never `resize: both` or `resize: horizontal` |
| Helper text / Error text | same as Input field |

**States:** same Default/Focus/Error/Disabled table as Input field above.

**Do:** reuse Input field's border, radius, and type tokens so a form
mixing single- and multi-line fields stays visually consistent. **Don't:**
let the box shrink below its `min-height`, including mid-resize-drag.

### Toast

**Transcribed from the teammate's `Toast.jsx`.**
Transient, auto-dismissing system feedback — not a place for a decision
with real consequences.

| Part | Spec |
|---|---|
| Container | 320–420px width, spacing-12/spacing-16 padding, Neutral-1 fill, 1px Neutral-3 border, `radius-md` (16px — a compact transient surface, not the Card's 20px), `shadow-3`, spacing-12 gap, `role="status"` |
| Icon | `icon-base` (20px), 2px top margin for optical alignment with the title; **Tier 2, Fill** (a status indicator, per [Iconography](#iconography) — see the tone table below) |
| Title (optional) | body1, weight 700 |
| Message (optional) | caption, Neutral-5 |
| Action slot (optional) | spacing-8 above it — holds a Link or Ghost button |
| Close (optional) | Ghost IconButton, sm, top-right, `x`, **Tier 1, Regular** (a close affordance), `aria-label="Dismiss"` |

**Tone → icon/color:**

All four are **Tier 2, Fill** status indicators, per [Iconography](#iconography) — none are clickable, so none are Tier 1 despite `x-circle`'s slug overlap with the Tier 1 `x` remove affordance used elsewhere (e.g. Tag/filter-pill removal).

| Tone | Icon | Color |
|---|---|---|
| Neutral | `info` | Neutral-9 |
| Success | `check-circle` | Green |
| Danger | `x-circle` | Red |
| Warning | `warning` | Amber |

**Do:** keep one Toast on screen at a time — stack only if truly
necessary, newest on top. **Don't:** put a destructive action in a
Toast's action slot; a surface that disappears on its own is the wrong
place for an irreversible decision.

**Positioning:**

| Property | Spec |
|---|---|
| Default position | bottom-right corner of the viewport |
| Offset | spacing-24 from the bottom edge, spacing-24 from the right edge |
| Mobile | full width, anchored to the bottom of the screen, spacing-12 left/right/bottom margin |
| Stacking layer | above all page content; below the Modal's `shadow-overlay` scrim (see [Modal](#modal)) — this document has no numeric z-index token scale, so the relationship is stated structurally rather than as a value |
| Scroll behavior | fixed position — does not scroll with the page |

**Auto-dismiss timing:**

| Property | Spec |
|---|---|
| Default duration | 5000ms |
| Neutral / Success / Warning | auto-dismiss after 5000ms |
| Danger | does not auto-dismiss — requires explicit dismissal via the Close button |
| Hover behavior | the dismiss timer pauses on mouse enter, resumes on mouse leave |
| Minimum display time | 2000ms, regardless of user interaction |

**Animation:**

| Property | Spec |
|---|---|
| Entrance | slide up from the bottom edge + fade in |
| Exit | fade out + slight slide down |
| Duration | `duration-base` (220ms) — closest of the [Motion](#motion) duration tokens to a toast-appropriate 200ms, and its stated purpose ("default UI transitions") fits |
| Easing | `ease-standard` — the non-elemental default, since Toast isn't owned by a specific brand element (same reasoning as the Sidebar collapse and accordion transitions); also matches Toast's existing opacity `Transition` row above |
| Stacking reposition | when a Toast is added or removed, the remaining stack animates to its new position rather than jumping |
| Reduced motion | when `prefers-reduced-motion` is set, all of the above is disabled — Toasts appear and disappear instantly |

**Stacking behaviour:**

| Property | Spec |
|---|---|
| Maximum visible | 3 Toasts on screen at once |
| Stack order | newest on top |
| Gap between stacked Toasts | spacing-8 |
| Queue | a 4th trigger while 3 are visible queues rather than displaying immediately |
| Queue order | FIFO — first triggered, first to appear when space opens |
| Dismiss timers | each Toast in the stack keeps its own independent timer, unaffected by the others |

**Layout variants:**

| Variant | Spec |
|---|---|
| Title + Message (full) | the documented default above — icon aligns to the title, message sits below |
| Title only | icon aligns vertically to the title; no Message slot renders |
| Message only | icon aligns to the message text; the message renders at body1 weight 500 (not caption, since it's now the primary content rather than a secondary line under a title) |
| Title + Message + Action | Action slot renders below the message, spacing-8 above it (existing rule, unchanged) |
| Icon + Close only | not permitted — a message is required at minimum |

**Content length:**

| Property | Spec |
|---|---|
| Title | 50 characters maximum |
| Message | 100 characters maximum |
| Enforcement | at content-authoring level — the component itself does not truncate or clip |
| Over limit | the copy must be rewritten, not shortened by the component |
| Rationale | Toast content is system-generated, so character limits are an authoring rule, not a display rule |

### Tooltip

**Transcribed from the teammate's `Tooltip.jsx`.**
Supplementary, non-interactive information only.

| Part | Spec |
|---|---|
| Trigger wrapper | relatively-positioned inline-flex around the trigger content |
| Bubble | 6px/10px padding (a one-off compact value, not the spacing scale), `radius-sm` (12px), Neutral-7 fill, Neutral-1 text, caption size, weight 500, `white-space: nowrap` |
| Placement | top (default) / bottom / left / right, centered on the trigger's cross-axis, 8px gap from the trigger |
| Visibility | opacity 0 → 1 on hover **or** keyboard focus; `pointer-events: none` at all times |
| Transition | `opacity` — `var(--duration-fast) var(--ease-standard)` |

**Do:** trigger on focus as well as hover, so keyboard users get the same
information sighted mouse users do. **Don't:** put interactive content
(links, buttons) inside a Tooltip — `pointer-events: none` means nothing
inside is ever clickable by design.

## Guidelines

A condensed, skimmable version of every rule in this document. If you only
read one section before building, read this one.

### Do

- Use Obsidian `#2B2B2C` as the only primary-action fill. Every screen has
  exactly one Primary button doing the main job.
- Use the warm canvas (`#FCFAF5`) as the page background for every
  screen — product/dashboard and brand/editorial alike (see [Color
  Palette](#color-palette)'s Warm canvas note).
  Component fills (cards, inputs, etc.) keep their own documented values
  — mostly `Neutral-1` white — unaffected by this.
- Use Mulish for 100% of UI text **and every heading** — headings at
  weight 800, letter-spacing 0.
- Reserve Source Serif 4 for genuine brand-statement moments only (deck
  ledes, pull quotes, hero numerals), never as a heading-token swap, and
  never below ~18–20px.
- Use the tinted-fill + bordered pattern for every Badge, and darken
  Success/Warning text (`#00854c`, `#9a5c00`) so it clears AA.
- Map department/element colors 1:1 using the table in
  [Color Palette](#color-palette) — don't invent a color for a department
  that isn't listed there.
- Tint a surface only with the element that already owns its content, and
  only at the `-bg` (8%) or `-bg-strong` (16%) step.
- Use Regular weight for Tier 1 (functional/control) icons and Fill for
  Tier 2 (expressive/status) icons; fall back to Remix only when Phosphor
  has no matching glyph, following the same tier split.
- Pull every spacing, radius, and color value from a token in this
  document — no arbitrary pixel or hex values.
- Let cards carry `shadow-1` at rest, and build every shadow on
  Neutral-4 (soft grey), never black.
- Keep radius soft: 20px cards, 16px buttons, 12px inputs. Never below
  12px on an interactive surface.
- Give every interactive component its full state set — hover, active,
  focus-visible, disabled, plus error for anything that takes input.
- Right-align numeric table columns and use tabular figures where the
  font supports them.
- Always render a real `<label>` on form inputs, even if visually hidden.

### Don't

- Never use a brand/element color (Orange, Salmon Pink, Green, Navy,
  Amber) as a primary button fill — those colors classify, they don't
  mean "click me."
- Never use Source Serif 4 in body copy, buttons, form inputs, table
  data, or dense numeric columns.
- Never mix two fonts inside a single sentence or heading — emphasis is a
  weight change, not a font swap.
- Never apply negative letter-spacing to headings — Collabrium headings
  are weight 800 at tracking 0.
- Never assign icon weight by taste — Regular for Tier 1, Fill for Tier 2 —
  and never mix Phosphor and Remix icon styles within the same component
  instance.
- Never build a shadow on black — every shadow in this system is
  Neutral-4 based.
- Never fill a small badge/tag solid with a brand color and put white
  text on it — several accents (Amber, Salmon Pink) fail contrast at that
  size and weight.
- Never use a radius outside the token set (`radius-sm/md/lg/pill/link`) —
  no one-off corner values.
- Never tint a surface with an element that doesn't own its content, and
  never at full or mid strength — `-bg`/`-bg-strong` only.
- Never add bounce or overshoot easing — movement settles.
- Never use placeholder text as a substitute for a real label.
- Never use a modal for a multi-step flow — modals are for one focused
  decision; multi-step work needs a full page or panel.
- Never let a table exceed roughly 8–10 visible columns without a
  collapse or horizontal-scroll pattern.
- Never introduce a new accent color for a one-off UI need — flag it as a
  gap in [Needs Input](#needs-input) instead of guessing.
- Never treat any value in this document as final while it's still
  marked ⚠️ — call it a draft in your own output too.

---

## Reconciliation — teammate's design system

This document was cross-checked against a second, independently
built Collabrium design system at
`~/Desktop/Collabrium Design System/`, derived from the same source deck
(its `uploads/[KULT][EXT] Collabrium DLS.pptx`). That build extracted the
deck far more thoroughly than this one had, so **where the two disagreed
on a sourced value, theirs won.**

**Confirmed identical (no change needed):** all five element colors and
their department mappings, Obsidian as sole action color, the full 9-step
neutral ramp, the functional Red/Green, the Purple/Turquoise reserves,
both font families, the complete 7-step icon size scale, the Phosphor-fill
icon rule, and the brand voice/tone.

**Corrected here from their values:** radius (was a 4/8/12px guess, is
really 12/16/20px per-surface), elevation (was "flat by default", is
really a 4-step Neutral-4 shadow ladder used routinely), heading weight
(600 → 800), heading letter-spacing (negative → 0), the type scale sizes
and its responsive `-lg` tier, `display` moving from Secondary to Primary
font, body weight (400 → 500), the spacing scale (missing 20/40px steps,
wrong 64/96 top end), focus rings (Obsidian → Water), and Badge/Tag
being two components rather than one.

**Added from their system:** the warm canvas surface, the elemental
background tint system, all motion tokens, semantic spacing aliases, the
Danger and Link button variants, and the card icon-chip pattern.

**What this system still has that theirs doesn't:** the real vector logo
source (`SVG/`, every letter and element as an editable SVG) and the
animated `logo.html` — their `assets/logo/` is PNG-only, which their own
readme flags as a gap. Also the installable desktop font pack
(`fonts/`), where theirs loads from Google Fonts via `@import`.

**What theirs has that this doesn't (deliberately not migrated):** a
production React component library (`components/*.jsx` with `.d.ts`
types and per-component `.prompt.md` files), a full app UI kit
(`ui_kits/collabrium-app`), deck slide templates (`slides/`), an
oxlint-based adherence config, and a `_ds_manifest.json` for tooling.
Those are a genuinely bigger engineering asset than this HTML gallery.
This system stayed documentation-and-tokens-first rather than absorbing
them — if the team wants one canonical thing, **their repo is the better
base to converge on**, with this one's logo/font assets and gap-tracking
folded in.

10 more component specs (SidebarNav, Tabs, Select,
Checkbox, Radio, Switch, Toast, Tooltip, DataTable, ElementBadge) were
transcribed directly from the teammate's real `.jsx` source — same
methodology as the reconciliation above, not a guess. One asset gap
surfaced in the process: ElementBadge relies on raster PNG element
glyphs (`assets/elements/*.png`) that this skill doesn't have — see that
component's spec for the interim substitution.

The remaining 5 dashboard components — Stat/KPI card,
Filters, Pagination, Date picker, and a Chart color mapping guideline —
exist in neither system, so they're explicitly **not** a reconciliation:
there was nothing to reconcile against. They're a first design pass built on this
document's own token system, not transcribed from anything, and are
flagged as more provisional than every component above them —
candidates for real review once a design/brand pass is available, and
also worth checking against the teammate's build if/when they add
these themselves, the same way the reconciliation above worked in the
other direction.

---

## Design Tokens

Every value in this document is also available as CSS custom properties
in `tokens.css`, in this same folder — colors (including warm canvas and
elemental tints), the full spacing scale with semantic aliases, radius,
the type scale with responsive tiers, the elevation ladder, motion
durations and easings, and icon sizes. It's a mechanical rendering of the
tables above, not a new source of truth; if a value changes here, update
`tokens.css` to match.

```css
@import url("tokens.css");

.btn-primary {
  background: var(--color-obsidian);
  color: var(--color-neutral-1);
  border-radius: var(--radius-md);
  padding: 0 var(--spacing-16);
}
```

`preview.html` in this folder is a two-pane microsite: the left pane
renders the live visual system (logo, palette, type, spacing) against
`tokens.css`; the right pane is a source viewer with four tabs —
**DESIGN.md** (this file, Compact/Extended toggle, Compact mirrors
`SKILL.md`), **Tailwind v4** (a full `@theme` mapping), **CSS Variables**
(the raw `tokens.css`), and **Design Tokens** (a JSON export) — each with
Copy and a per-tab **Download** button whose label updates dynamically
to match the active tab's extension (`.md`, `.css`, or `.json`).
Everything is embedded inline so the page works opened directly via
`file://`, no server required. A
separate **Download dls (.zip)** button next to the per-tab controls
links out to GitHub's repo archive for the whole `collabrium-dls` folder
(all assets, not just this panel's text) — the one thing on this page
that needs an internet connection, since it isn't embedded.

If your stack is Tailwind v4, map the same values into a `@theme` block
rather than maintaining two token sources by hand:

```css
@import "tailwindcss";
@import url("tokens.css");

@theme {
  --color-obsidian: var(--color-obsidian);
  --color-orange: var(--color-orange);
  --radius-md: var(--radius-md);
  --spacing-16: var(--spacing-16);
  /* ...map the rest of tokens.css as needed — see preview.html's
     Tailwind v4 tab for the full mapping */
}
```

---

## Licensing Attribution

| | Mulish | Source Serif 4 |
|---|---|---|
| Designer | Vernon Adams, with further development by Jacques Le Bailly (Cyreal) | Frank Grießhammer, Adobe |
| Publisher | Google Fonts | Adobe (Source type superfamily) |
| License | SIL Open Font License 1.1 | SIL Open Font License 1.1 |
| Distribution | Google Fonts, GitHub | Google Fonts, GitHub (Adobe Fonts repo) |
| Attribution required | No | No |
| Commercial use | Yes, unrestricted | Yes, unrestricted |
| Self-hosting | Yes | Yes |
| Modification | Yes | Yes |
| Cost | Free | Free |

---

## Changelog

- **v0.9.40 — 2026-08-12** — Corrected and expanded the existing
  **Filters** component in place (not a new component; the same
  section that's existed since it was first flagged as a gap in
  v0.7.0), then built it into the live gallery — all in one pass,
  consolidated here from what was originally ten separate same-day
  entries (v0.9.40–v0.9.49) as the spec settled.

  **Structure.** A **Two-row structure** rule formalizes an
  always-visible Filter Bar plus a conditionally-rendered Applied
  Filters row (Row 2), which only renders once ≥1 filter value is
  applied. Row 2 is its own bordered tray (Neutral-1 fill, 1px
  Neutral-3 border, `radius-sm`, spacing-12 padding) separating the
  chips from the trigger bar above, rather than floating loose beneath
  it.

  **Choosing a variant.** Three ways to lay out Row 1, chosen for
  different reasons rather than a single ladder: **Default** — a named
  trigger per dimension — is the baseline. **Tiered exposure** applies
  past ~8 filterable dimensions: 4–6 primary dimensions (4 as the
  practical floor, 6 as the ceiling before adding in-panel search
  instead) stay as permanent named triggers, pinned editorially rather
  than by usage data; every other dimension always routes to a single
  "More filters" trigger. **Compact filter** (formerly called "generic
  trigger," renamed for clarity) is a single icon-bearing trigger that
  replaces the named-trigger row entirely — used whenever compact
  filtering is specified or screen real estate is limited, regardless
  of dimension count; it's an independent axis from Tiered exposure,
  not gated by the same ~8-dimension threshold. Compact filter (and
  Tiered exposure's own "More filters") opens every dimension as a
  nested list with its own back button and a universal Clear all,
  reusing one nested-list recipe rather than inventing a second
  mechanism per variant.

  **Filter trigger.** A leading `sliders`/`funnel` icon is optional and
  reserved for Compact filter only — named-dimension triggers never
  carry one. Active state: 1px Obsidian border + Neutral-9 text, with
  a small circular Obsidian-fill Badge trailing the label *inside* the
  trigger's own padding (an early same-day draft tried an external
  Neutral badge straddling the corner instead; reverted after review —
  the border reads as the clearer "engaged" signal, and an inside
  badge avoids clipping against adjacent triggers). Overflow trigger
  ("+N more") follows the same active recipe once it's carrying a
  count.

  **Dropdown panel.** Explicitly reuses [Dropdown](#dropdown)'s own
  Multiple select anatomy verbatim rather than a bespoke recipe: the
  same `.c-checkbox-box` glyph for option rows, and a Ghost "Clear" +
  Primary "Done" footer (an early draft used a single full-width
  "Apply" button instead; replaced so a Filter trigger's dropdown reads
  as the same component family as Multiple select). **Edge collision**:
  left-aligned to its trigger by default, but flips to right-aligned
  whenever left-aligning would push it past the viewport's right edge
  — a runtime check against available width, not a fixed breakpoint,
  re-checked on resize/orientation change while open, since a trigger
  near the right edge of a narrow screen otherwise cropped the panel
  (the mobile bug this closes).

  **Applied filter chip.** **Input Chip** verbatim (per
  [Chip](#chip)): 24px height, Neutral-2 fill, 1px Neutral-3 border,
  `label2` Neutral-9 text, no leading icon, plain × to remove — not
  Filter Chip's Obsidian-fill active state (an early draft's choice;
  a chip here is only ever removed, never toggled back on in place,
  which is Input Chip's contract). Label is the value alone (e.g.
  "Marketing") — an early draft required a "[Dimension]: [Value]"
  prefix; dropped it since it read as clutter at this compact height,
  and the owning trigger's own label already supplies that context
  above the tray. **Applied Filters overflow**: beyond 5 visible chips
  (Chip's own generic default is 3; this row earns a higher cap since
  it can hold values from several dimensions at once), the rest
  collapse into a `+N` chip that expands in place and becomes a "Show
  less" Link to re-collapse — Chip's own Input Chip overflow mechanic,
  reused verbatim. **Clear All** (Filter Bar, Ghost/Red, shown when Row
  2 is hidden) and **Clear all** (Row 2 / nested lists, Button's Link
  variant verbatim — Neutral-9, matching "Show less" exactly) are
  mutually exclusive.

  **Search input** (optional). Reuses [Search input](#search-input)'s
  own **Default** variant verbatim at the Filter Bar's own 32px height:
  border/radius/fill live on the `<input>` itself, a genuine `:focus`
  swap, and a Clear (×) that appears only once the field holds a
  value. 240px default width with a 1px Neutral-3 divider after it on
  ≥641px viewports; on ≤640px (Toast's own existing breakpoint) it
  drops the fixed width, goes full-width on its own row, and hides the
  divider.

  **Also documented:** a **State orchestration** table (trigger/badge/
  chip state through no filters → values applied → a chip removed →
  Clear all, with the sync rule that chip count always drives badge
  count, never the reverse); a full **Filter trigger states** table;
  a **Transition** table (dropdown panel, Row 2, chip enter/exit, all
  on existing `duration-fast`/`ease-standard` tokens with a
  `prefers-reduced-motion` fallback); and a **Filter persistence** note
  (URL query params by default, `sessionStorage` fallback, URL wins on
  load).

  **Live gallery.** Built into `preview.html`, replacing the old
  placeholder markup (a static, non-interactive `.c-filterbar` with a
  handful of dead classes) and removing the three now-stale delegated
  click handlers that predated this build. `components.css` gets the
  real `.c-filter-*` ruleset, reusing Checkbox's `.c-checkbox-box`,
  Button's `.c-btn-ghost`/`.c-btn-primary`, and Chip's `.c-chip-input`/
  `.c-chip-remove`/`.c-chip-overflow`/`.c-chip-showless` verbatim
  rather than parallel recipes. The gallery demo shows **Default** with
  a 10-dimension set (5 primary named triggers + 5 behind "More
  filters," demonstrating Tiered exposure) and **Compact filter** with
  a smaller 4-dimension sample.

- **v0.9.39 — 2026-08-11** — Added **Progress Bar**, a new component:
  a horizontal, read-only bar for Determinate (single or stacked
  segments) and Indeterminate progress. Designed from scratch by
  reusing Slider's track anatomy (Neutral-3 unfilled track,
  `radius-pill`), Obsidian as the default value-committed fill (the
  same color as Slider's own track fill and Input field's focus
  border — not Neutral-9, an earlier draft's mistaken citation caught
  before writing), department elemental colors for department stacked
  breakdowns, and the Purple/Turquoise data viz reserve (the same one
  [Chart color mapping](#chart-color-mapping) uses past 5 categorical
  series) for non-department stacked breakdowns. Three sizes (Compact
  4px / Default 8px / Large 16px track, one-off literals per Slider's
  own precedent), Success/Error color overrides passed via prop rather
  than automatic, and an indeterminate shimmer that respects
  `prefers-reduced-motion`. Slotted alphabetically between Password
  field and Radio; component count 31 → 32.

  Follow-up work on the same component, same day: (1) fixed the
  indeterminate shimmer's duration after building a reference preview
  (`progress-bar-preview.html`) and finding the original `duration-slow`
  × 2 (720ms) — a computed guess with no real precedent in this
  document — too fast to actually read as "loading"; switched to
  `duration-ambient` (900ms), which already has a documented precedent
  for exactly this use (Search input's Loading spinner names it "the
  one duration token named for a continuous loop rather than this
  system's usual one-shot 'movement settles' transitions"). (2) Built
  Progress Bar into the live gallery: `components.css` gets the real
  `.c-progress-*` ruleset (track/fill, size variants, stacked segments,
  indeterminate shimmer with its `prefers-reduced-motion` fallback),
  and `preview.html`'s Components tab gets a live demo — Determinate
  Default/Complete/Error, a department-colored Stacked example, an
  animating Indeterminate example, and a summarized three-size
  (Compact/Default/Large) reference strip. (3) Added a **Fill width on
  initial mount (entrance)** row to the Transition table: Determinate
  fills (single or stacked) animate from 0% up to their real value on
  first mount, reusing the exact same `width`/`duration-base`/
  `ease-standard` transition already documented for a value change —
  not a new token or a separate "reveal" duration. This is a
  component-level rule (fires whenever a bar first mounts with a
  value); the live gallery additionally defers this animation until
  the Progress Bar section actually scrolls into view, which is a demo
  presentation choice, not part of the component's own spec.

- **v0.9.38 — 2026-08-11** — Added a **Department logos** section to
  [Logo](#logo), documenting the four existing named
  department-product lockups (`collabContent.svg`,
  `collabInfluencers.svg`, `collabSales.svg`, `collabStudio.svg`) —
  each mapped to its element/color and given a first-pass definition.
  Mirrored live in `preview.html` as a card grid (logo, element tag,
  name, definition, "Download" button) placed right after the existing
  Element/Usage/Department table in the Logo area. Flagged as a first
  pass — the four definitions are synthesized from a one-line brief per
  department, not sourced from a deck or product spec, and don't cover
  a Water/Data-Logistics department product (none exists yet). Polish
  pass same day: removed a redundant "use these on department-specific
  surfaces instead of the default Gold mark" line from the section
  intro (already covered by the Default-logo rule table above it),
  reworded all four department definitions to drop the em dash in
  favor of plain prose, simplified each card's download button label
  from "Download .svg" to "Download", and added a matching "Download"
  button to the default Collabrium lockup card (previously image +
  caption only, no way to grab the file directly from the gallery).

- **v0.9.37 — 2026-08-11** — Reorganized the Components section's
  `###` subsections into strict alphabetical order by component name
  (App Shell → Tooltip), matching the section's own table-of-contents
  list and `preview.html`'s sidebar nav/demo order — no content changed
  within any section, only their sequence. Added a standing rule to
  `SKILL.md` requiring the same alphabetical placement (never appended
  to the end) whenever a new component is added here or to
  `preview.html`.

- **v0.9.36 — 2026-08-10** — Added a new **Chart chrome & marks**
  section, appended after the existing [Chart color
  mapping](#chart-color-mapping) guideline rather than editing it: axis/
  gridline/tooltip/legend chrome, general bar/line/area/radial mark
  rules, a per-chart-type mark table (Bar, Horizontal bar, Line, Area,
  Scatter, Doughnut, Radar, Bubble, Polar area), a Card/KPI/container
  table for chart-card chrome, and a chart-type-selection guide (data
  story → chart type). Reflects Chart.js v4 as this system's adopted
  charting library, stated generically rather than pointing at any
  specific implementation file, since none is guaranteed to still exist
  in this repo. Gridline color follows [Chart color
  mapping](#chart-color-mapping)'s existing "Neutral-3" line exactly —
  an initial draft of this section used Neutral-2 instead, caught and
  corrected before finalizing so the two sections agree; that older
  text itself was left as-is per explicit instruction to append, not
  replace. Also flagged: KPI label/value should use [Stat / KPI
  card](#stat--kpi-card)'s own `caption`/`h1` tokens, not `label1`/`h3`
  — noted as a risk to guard against, not a second valid pattern. This
  is a guideline, not a rendered component, so it doesn't change the
  31-component Scope note count; ToC and Scope note updated to list it
  alongside Chart color mapping.

- **v0.9.35 — 2026-08-10** — **Chip** spec updated from a tested
  reference build (`chip-preview.html`), five changes. (1) Filter
  Chip's container drops `shadow-1` entirely — no shadow at any state.
  (2) Filter Chip's default content is now text-only; a leading
  category icon is documented as an optional secondary variant rather
  than the default. (3) Input Chip's leading icon removed entirely —
  no confirmed use case for one on a user-entered value, so the slot
  doesn't exist for this variant anymore. (4) Added a **Selection
  modes** rule that was missing before: Filter Chip groups are either
  Single-select (`role="radiogroup"`, mutually exclusive, exactly one
  always active, clicking the active chip is a no-op — same contract
  as Segmented Control) or Multi-select (`role="group"`/`checkbox`,
  independent per-chip toggles, any number active including zero, and
  the active state now gets a leading `ph-check` tick reusing
  Checkbox's own glyph, reinforcing the independent-toggle read since
  Single-select's mutual exclusivity already makes its own active chip
  unambiguous without one). (5) Documented the Input Chip overflow
  `+N` control's actual interaction: clicking it expands the hidden
  chips in place, then the control itself becomes a Link-styled "Show
  less" button (Button's Link recipe, verbatim) to re-collapse, rather
  than staying chip-shaped once expanded.

- **v0.9.34 — 2026-08-10** — Added **Chip**, inserted directly after
  Badge & Tag: a new interactive pill component, distinct from Badge
  (status, read-only) and Tag (ownership, read-only) — Chip always
  represents a selection or an input value. Two variants: Input Chip
  (a user-entered/confirmed value, always removable via ×, not
  toggleable) and Filter Chip (a predefined option toggled on/off,
  optionally removable). Built entirely from existing tokens: Badge's
  Neutral-pill recipe for Input Chip's container, Button sm's own
  height/padding for Filter Chip's container, Button Secondary's
  default/hover/pressed states for Filter Chip inactive, Button
  Primary's for Filter Chip active, Button's focus-visible token
  verbatim, and Tag's remove-affordance convention for the ×. Note:
  the brief for this component referenced MultiSelect's older
  chip-based remove pattern as a source — that pattern was already
  superseded by Dropdown's "N selected" trigger (see the v0.8-era
  entries below) and no longer exists in the live spec, so Chip's ×
  traces to Tag's remove button instead, which is still live. Scope
  note's component count updated 30 → 31, designed-from-scratch count
  6 → 7.

**This is where version and date information lives — not in the spec
sections above.** When you change a component or token, update its spec
section to describe the current state only (no "added on [date]" or
"changed in vX.Y" language inline), then add a new entry here, newest
first, in the same `- **vX.Y — YYYY-MM-DD** — ` format as the
entries below: what changed, why, and what it replaces. Version numbers
are plain `vX.Y` (or `vX.Y.Z`) — no `-draft` suffix. This is also
what powers `preview.html`'s Changelog page (the button next to the
version flag in the top bar) — that page renders this section directly,
so an entry added here is the same pass that makes it show up there,
with nothing else to keep in sync.

- **v0.9.33 — 2026-08-10** — **Slider** spec updated from a tested
  reference build. (1) Track and min/max labels run the component's
  full width flush with its edges — an earlier pass inset them to stop
  the thumb overhanging at 0%/100%, but that's not the norm; the thumb
  is now documented as allowed to overhang the ends by half its own
  width, same as native OS sliders. (2) Documented that the thumb must
  be centered on the track's own line, not the top of its taller
  hit-target box — an implementation bug found in testing, now called
  out directly in the Thumb row so it isn't repeated. (3) Added a
  reference-implementation caveat under Sizes: the tested build's real
  hit target is closer to 24px than the documented 44×44, since a true
  44×44 target on a native `<input type="range">` gets impractical
  without extra JS hit-testing — flagged rather than silently shipped
  smaller. (4) Added an implementation note under Variants explaining
  *how* Range's "thumbs may touch but never cross" rule (already
  documented, unchanged) should actually be enforced: clamp the moved
  handle's value directly, never either handle's live `min`/`max`
  attribute — mutating live bounds also corrupts the native thumb's own
  on-screen position, since the browser renders it from that same
  attribute. (5) Documented click-to-jump: Single gets it free from the
  native element; Range resolves which handle a click means by nearest-
  distance, with a direction-based tie-break when the handles are
  touching (picking by distance alone could select the handle that
  immediately gets clamped back, silently undoing the click).

- **v0.9.32 — 2026-08-10** — **Segmented Control**'s Transition rule
  revised: the active fill/`shadow-1`/`radius-sm` now render on a single
  sliding **Pill** element that animates its position and size between
  segments, replacing the original fill-swap-in-place design (which
  explicitly ruled out any sliding indicator). Reason: validated against
  a working preview build first — the fill-swap version read as static
  and the sliding motion communicates the "one selection, moving
  between options" idea more clearly, especially between segments of
  different widths (icon-only vs. text). Also fixed a real
  implementation bug found in that same preview: an absolutely-positioned
  Pill's containing block is its track's padding box, already inset by
  the track's own border, so computing the Pill's `translate()` against
  the track's full border-box rect double-counted that border and
  misaligned the Pill by that many pixels on every axis — now corrected
  by subtracting the track's border width from the calculation. First
  real implementation added to `components.css`/`preview.html`'s
  Components gallery (Icon only and Text only variants) — previously
  spec-text only, not yet built anywhere.

- **v0.9.31 — 2026-08-06** — Fixed **Search input**'s Selected —
  disabled state (User Search and Item Search variants): it rendered
  narrower than Selected and Selected — hover, because the clear (×)
  button was omitted from the markup entirely rather than just hidden.
  `.c-search-input-collapsed` sizes itself to its own content (it isn't
  stretched to a fixed width anywhere), so dropping the button's 24px +
  `spacing-12` footprint shrank the whole row. Fix: the button now
  stays in the markup as a real `disabled` element (already out of the
  tab order on its own) with `visibility:hidden` in `components.css` —
  hidden visually, but its layout space still counts, so all three
  states render at the identical width. Updated the Selected — disabled
  spec row and the Do section to match.

- **v0.9.30 — 2026-08-06** — Two more trims to **Dropdown**. (1)
  Borderless Style, both variants: Open and Filled no longer swap to a
  solid Obsidian border — that swap is Outlined's own signal, and
  Borderless is now guaranteed border-free in every State, not just at
  rest. `components.css` gained one override rule per variant
  (`.style-borderless.open input, .style-borderless.has-value input`
  for Single; the same with `.filled` instead of `.has-value` for
  Multiple) that forces `border-color: transparent`, beating the
  existing State rules on specificity alone rather than relying on
  source order. (2) Removed Multiple select's **Focus** State (main
  trigger) and its Dropdown Option row's **Focused** State — both were
  visually redundant with Open (Focus and Open already shared one
  visual, the panel being the only difference) or not worth a dedicated
  demo card on their own. Real keyboard focus still swaps the trigger's
  border via Input Field's own inherited `:focus` rule, same as always
  — only the separately-documented "Focus" state card, the
  `.c-dropdown-multi-field.focus` demo hook, the Borderless-specific
  `:focus` override that existed only to make that demo card visible,
  and the checkbox row's `:focus-visible`/`.focused` outline rule are
  gone. Style tables, State tables, the Dropdown Option table, and the
  Variants summary line are all updated to match.

- **v0.9.29 — 2026-08-06** — Removed the **Filled** Style variant and
  the **Active** State from **Dropdown**'s Single select and Multiple
  select galleries. Single select loses both its Filled-Style card row
  (Outlined/Borderless are now the only two Style treatments) and its
  Active-State card/row everywhere it appeared (the main trigger's
  Outlined and Borderless rows, and the Dropdown Option row
  sub-component's demo). Multiple select loses only its Filled-Style
  card row — it never had an Active State to begin with (Focus and
  Open already covered its equivalent ground). Style tables, State
  tables, the Dropdown Option table, and the Variants summary line are
  all updated to match; `.style-filled` and the `.active`/`:active`
  rules tied to it are removed from `components.css` for both
  `.c-dropdown-field` and `.c-dropdown-multi-field`, along with
  `.c-dropdown-row`'s own `.active`/`:active` rule.

- **v0.9.28 — 2026-08-06** — Four fixes to **Dropdown**'s Single select
  and Multiple select galleries. (1) Fixed the Error state's `.c-helper`
  text ("Please select a department" / "Select at least one brand")
  rendering in its default Neutral-5 color instead of Red: the markup
  had it as a sibling *after* the closing `.c-field-error` div rather
  than a child *inside* it, so `.c-field-error .c-helper{color:red}`
  never matched — moved it inside, matching Input Field's own correct
  pattern. (2) Removed the `min-width: 240px` panel floor (see the
  Panel row above) that was silently breaking the "panel always
  matches the trigger's width" guarantee for any field narrower than
  240px, including every 220px demo card in this gallery. (3)
  Re-added per-state caption labels above every Style × State card in
  both variants' matrices, and per-row labels in both variants' own
  Dropdown Option demos — reversing an earlier "no per-state labels"
  instruction now that captions are wanted back. (4) Multiple select's
  Behaviour row (Standard / With Select All / Searchable) got a wider
  gap (`--spacing-32` column gap, `--spacing-48` row gap on wrap) so
  its three open panels have visible breathing room — mostly already
  fixed by (2), since the overlap's root cause was the same min-width
  floor pushing 240px-wide panels into 220px-wide, 12px-gapped columns.
  Net component count unchanged (still 28).

- **v0.9.27 — 2026-08-06** — Fixed a font-token mismatch in
  **Dropdown**'s Dropdown Option row sub-component, both variants:
  `.c-dropdown-row-label` (Single select) and `.c-dropdown-option-label`
  (Multiple select) were set to `body1` (16px/500), while the trigger's
  own input text — since both variants' triggers were rebuilt on Input
  Field's container — renders at `body2` (14px/400). Switched both to
  `body2/400` so a panel's option rows and the value the trigger
  displays share one typographic family, per explicit direction to
  match the row label's font token to the input's. Multiple select's
  Select All row keeps its own explicit `font-weight: 700` override on
  top of this token — that's a deliberate emphasis choice, not part of
  the mismatch being fixed. Net component count unchanged (still 28).

- **v0.9.26 — 2026-08-06** — Rebuilt **Dropdown**'s Single select
  trigger the same way Multiple select's was rebuilt one pass earlier:
  replaced its own Button-Secondary-styled, `radius-md` box with [Input
  Field](#input-field)'s own container (`.c-field`/`.input-wrap`/
  `.icon-trailing`, its real `:focus` swap, `.c-field-error`,
  `:disabled`) reused verbatim, per explicit direction not to recreate
  what Input Field already has. Both Dropdown variants are now built on
  the same `radius-sm` container instead of Single select's `radius-md`
  one — a deliberate step back from the "shared anatomy" reasoning
  behind that Button-Secondary recipe in the first place, now that
  Multiple select's own trigger no longer matches it either. Error now
  reuses Input Field's own `.c-field-error` recipe verbatim (2px Red
  border, padding compensated to 11px) rather than the bespoke
  `.c-dropdown-error-text` element from before — the same recipe
  Multiple select's Error already uses. States/Style axes
  (Default/Hover/Active/Open/Filled/Disabled/Read-only/Error ×
  Outlined/Filled/Borderless) are unchanged in shape, only retargeted
  from the old `<button>`-based trigger to the new `.c-field input`;
  Single select's own Dropdown Option row sub-component is untouched.
  Updated the App Shell period-selector "known gap" note's own
  `radius-md` reference to `radius-sm` to match. Net component count
  unchanged (still 28) — this reshapes Single select's own container,
  it doesn't add or remove a component.

- **v0.9.25 — 2026-08-06** — Rebuilt **Dropdown**'s Multiple select
  variant end to end. Replaced the chip-based trigger (Badge chips,
  chip-remove ×, inline clear-all ×, Button-Secondary-styled box) with
  a count-based one ("N selected") built directly on [Input
  Field](#input-field)'s own container (`.c-field`/`.input-wrap`/
  `.icon-trailing`, its real `:focus` swap, `.c-field-error`,
  `:disabled`) rather than a second, bespoke trigger recipe — per
  explicit direction not to recreate what Input Field already has.
  Added a Style axis (Outlined/Filled/Borderless, scoped to this
  component's own class so bare Input Field/Textarea/Password
  field/Search input are unaffected) and grew States from Default/Has
  Selection/Open to Default/Hover/Focus/Open/Filled/Disabled/Read-only/
  Error — Focus is real `:focus` inherited from Input Field, not a new
  recipe. Added a Behaviour axis (Standard/With Select All/Searchable),
  visible only once the panel is Open, since the closed trigger is
  identical across all three; Searchable is the one case where the
  trigger's `readonly` attribute is actually dropped and the box
  becomes a genuine live-filter input. Rebuilt the panel's row as its
  own **Dropdown Option** sub-component reusing this system's own
  Checkbox glyph (`.c-checkbox-box`/`.on` + `ph-check`/`ph-minus`)
  verbatim instead of the old ad-hoc `.c-dropdown-multi-checkbox`, and
  added a pinned **Select All** row (a real checkbox, not a button, so
  it can show Indeterminate) for the With Select All Behaviour. Kept
  the existing Clear/Done footer unchanged — Select All sits above the
  list, not in the footer, after confirming that placement explicitly
  rather than guessing given the ambiguity between the two. Renamed
  Single select's own row sub-component heading to "Single select —
  Dropdown Option" for parity with the new "Multiple select — Dropdown
  Option," now that there are two. Also applied Single select's
  trigger-panel `width: 100%` guarantee to Multiple select's own panel
  (previously a fixed 240px), for the same reason. Net component count
  unchanged (still 28) — this reshapes Multiple select's own surface,
  it doesn't add or remove a component.

- **v0.9.24 — 2026-08-06** — Expanded **Dropdown**'s Single select
  variant: added a Style axis (Outlined/Filled/Borderless — Outlined is
  the existing recipe, Filled/Borderless are new) and grew its States
  from Default/Open/Error/Disabled to Default/Hover/Active/Open/Filled/
  Disabled/Read-only/Error (Hover and Active are real `:hover`/`:active`
  now, not just static demo classes; Read-only is new; the former
  "has-selection" state is renamed **Filled** and its class renamed
  `.has-selection` → `.has-value`, Single select only — Multiple select's
  own `.has-selection` is untouched). Also documented the row inside
  Single select's panel as its own **Dropdown Option** sub-component
  with Default/Hover/Active/Selected/Disabled states (Multiple select
  keeps its separate checkbox row, unchanged). Guaranteed the panel is
  always exactly the trigger's rendered width by keeping both at one
  shared `width: 100%` rule off the same `.c-dropdown` parent, in every
  Style — not just visually close, structurally identical. Added
  `.c-dropdown-value.placeholder` (lighter/lighter-weight text) so
  Default and Filled read as different states without a caption, since
  `components.css`/`preview.html` — including this component's own
  states matrix — deliberately don't caption individual states, only
  the Style row each sits in. Flagged rather than resolved: Filled
  style's Hover and Active render identically, since this system has no
  third, darker fill tier documented; Read-only's `pointer-events: none`
  blocks mouse interaction but not a focused button's keyboard
  activation, so a real implementation still needs its own click-guard.
  Net component count unchanged (still 28) — this reshapes Single
  select's own state/style surface, it doesn't add or remove a
  component.

- **v0.9.23 — 2026-08-06** — Consolidated **Select** and **MultiSelect**
  into a single new **Dropdown** component (Single select / Multiple
  select variants), per explicit user direction to rearrange them as
  variants of one category rather than two separate components. Single
  select is rebuilt as a custom trigger+panel (`.c-dropdown*`,
  `radius-md`, matching Multiple select's own trigger recipe) replacing
  the former native `<select>`, so the two variants now share one
  anatomy family; adds an Open state and keeps the former Select's
  Error/Disabled/Hint rows. Multiple select is a pure rename
  (`.c-ms*` → `.c-dropdown-multi*`) with every property value unchanged.
  Net component count: 29 → 28 (two merged into one, same accounting
  as the earlier Search input consolidation). Updated: `components.css`
  (removed `.c-select*`/`.c-ms*`, added `.c-dropdown*`/
  `.c-dropdown-multi*`), `preview.html` (merged `#comp-select` and
  `#comp-multiselect` into one `#comp-dropdown` block with Single
  select/Multiple select sub-sections, fixed a pre-existing stray `*/`
  in an unrelated CSS comment noticed while editing the same line),
  ToC, Scope note, `SKILL.md`'s component-bucket sentence, and the App
  Shell period-selector "known gap" note's class/anchor references
  (`.c-select-box`/`[Select](#select)` → `.c-dropdown-trigger`/
  `[Dropdown](#dropdown)`) — the gap itself (no pill trigger built yet)
  stays unresolved, per explicit user direction to leave it for now.

- **v0.9.22 — 2026-08-05** — Second-level navigation's parent chevron
  switched from a hand-drawn inline SVG (custom stroke path, `icon-base`
  sized) to the same icon tier as the Department switcher's own
  chevron: Phosphor `ph-caret-down`/`ph-caret-up`, `icon-micro` (14px),
  Neutral-5, class-swapped rather than a rotated/path-swapped SVG — the
  two expand affordances now read as visually consistent within the
  same sidebar. This also fixed a real mismatch the old implementation
  had with this document's own spec: the Parent item row (above) has
  always said the chevron swaps `chevron-down` ↔ `chevron-up`, but the
  inline SVG actually swapped to a right-pointing path when closed, not
  up — the class-swap approach now matches the documented behavior
  exactly. `components.css`/`preview.html` only; no spec-table change.

- **v0.9.21 — 2026-08-05** — Dropdown items switched from centered to
  **left-aligned** logos, matching Nav item's own left-aligned content
  elsewhere in SidebarNav — centering read as inconsistent next to
  every other left-aligned row in the sidebar. `preview.html`'s
  Department switcher demo also simplified: the side-by-side
  no-departments/5-departments comparison is now a single sample (the
  5-department one), and its description text was replaced with one
  line covering the single-department case specifically — "for default
  (single department), the dropdown is hidden," since that's the one
  behavior the removed second sample used to demonstrate and was worth
  keeping documented even without a second live example.

- **v0.9.20 — 2026-08-05** — Fixed the dropdown's logo sizing: scaling
  every lockup to the same bounding-box height wasn't actually enough —
  the default lockup's own SVG canvas (`viewBox` 1062×162) is a
  different aspect ratio from the 4 department lockups (all 1000s×269),
  so at an equal box height, the default's shared "collab" text
  rendered visibly larger than the department ones' — a uniform box
  height isn't the same thing as a uniform rendered text size when the
  source assets aren't proportioned the same way internally. Fixed with
  a per-image `--logo-scale` CSS custom property (`components.css`,
  `.c-dept-option-logo img`), tuned by eye against the shared "collab"
  text rather than derived from a formula — the default lockup's image
  gets `--logo-scale: 0.6` inline in `preview.html`, the 4 department
  ones default to `1` since they already share consistent internal
  proportions with each other. Also brought the Department switcher
  demo's nav content up to parity with the default SidebarNav demo
  (disabled Billing item, Team accordion with Members/Roles & access)
  so it demonstrates the department-dropdown mechanism specifically,
  without omitting the disabled-state and parent/child patterns the
  first demo already covers — a demo-composition change in
  `preview.html` only, not a spec change.

- **v0.9.19 — 2026-08-05** — Refined Department switcher after
  building it out in `components.css`/`preview.html`: (1) trigger hover
  now targets only the logo + chevron pairing, not the full header
  zone — the wider hover target falsely implied the entire header row
  was clickable; (2) dropdown items dropped the department-name text
  entirely — logo-only, each option still carries an `aria-label` for
  screen readers since the visual label is gone — and every lockup now
  renders at a uniform height regardless of its own aspect ratio; (3)
  the Default option's dropdown thumbnail is now the **static** default
  lockup rather than a live `logo.html` embed — a list of thumbnails
  isn't the right place for a live animation; the header trigger itself
  is unaffected and still shows the live mark for the Default context.
  Implemented for real: `components.css` gained `.c-dept-trigger`
  (sized to content, not `width: 100%`), `.c-dept-option`/
  `.c-dept-option-logo` (logo-only, uniform height), and collapsed-mode
  handling (`.c-sidebar.is-collapsed .c-dept-trigger{display:none}`,
  reusing `.c-sidebar-logo-collapsed`'s existing show/hide rule for the
  passive collapsed element icon). `preview.html`'s Department switcher
  demo now also exercises the collapsed rail correctly — its 4
  non-default sample departments (Content/Influencers/Sales/Studio) are
  demo-only mapped to Wood/Earth/Gold/Fire respectively so the collapsed
  icon has something real to show.

- **v0.9.18 — 2026-08-05** — Added **Department switcher** to
  SidebarNav, inserted right after the Header logo rule. Documents that
  this feature is what the Header row's "workspace switcher slot" (in
  the main Part/Spec table) was reserved for all along — a
  2-or-more-`departments[]` prop turns the header logo into a trigger
  that opens a dropdown of department logo variants, switching the
  entire nav and page context on selection. Expanded-mode only; the
  collapsed rail's element icon reflects the active department
  passively but isn't a trigger. No new tokens: the dropdown reuses the
  exact popover convention already established by Search input/
  Filters/Date picker/Select (`radius-md`, Neutral-1/Neutral-3,
  `shadow-3`), item sizing matches Nav item's own 40px/spacing-12,
  animation reuses `duration-fast`/`ease-standard`, and persistence
  reuses the same `localStorage` mechanism as Collapsible state's own
  Persistence row. One resolved conflict: the brief's "body2, weight
  500" isn't an existing token combo (body2 is only 400 or "strong"
  700 — 500 exists solely as body1's own weight) — used the real
  existing weight, 400, instead, same resolution already applied to
  Info Banner's Message text.

- **v0.9.17 — 2026-08-05** — Fixed Info Banner's cross-axis alignment:
  Icon, Message, and the Close button now vertically center against
  each other instead of top-aligning. Root cause: the anatomy was
  carried over from Toast's top-aligned layout, tuned for a Title line
  sitting above Message — but Info Banner has no Title at all (removed
  in the previous pass), so on a single-line banner, top-aligning
  Message against a much taller 32px Close button left Message reading
  as pinned near the top rather than centered on the same line as the
  icon and close affordance. `components.css`'s `.c-banner` switched
  from `align-items: flex-start` to `align-items: center`, and the
  icon's leftover 2px top margin (a Title-era optical-alignment tweak)
  was removed as dead weight now that centering handles it structurally.

- **v0.9.16 — 2026-08-05** — Added **Info Banner**, a new component:
  an inline, persistent notification anchored to its parent section or
  card, distinct from Toast (floating/viewport-level/auto-dismissing)
  on every one of those axes. Spec covers Anatomy (Container/Icon/
  Message/Action slot/Close), Dismissible vs. Persistent variants, a
  5-tone table (Neutral/Info/Success/Danger/Warning) reusing Badge's
  existing fill/border percentages and AA-darkened text plus Toast's
  full-strength icon-color pattern, a Tone-usage guide (when to reach
  for each), Placement (top of section, full width, spacing-8 stack
  gap, max 2 per section), Content length, Action slot rules, Animation
  (`duration-base`/`ease-standard`, the same pair Toast uses), and
  Accessibility. No new tokens were introduced — every value traces to
  an existing color/spacing/typography/radius/motion token. Two rounds
  of refinement after the initial draft: (1) Message is the component's
  only text content — there is no Title part at all, since a single
  required line of body copy covers the "helpful note" use case Banner
  exists for without a second, optional heading competing for the same
  job; (2) actions are always the last element (after Message) and both
  share one style — body2/400/tone-text-at-80%-opacity, underlined —
  rather than a Ghost-button-primary/Link-secondary split, since two
  differently-weighted actions read as a false hierarchy when both are
  equally reachable text links. Implemented for real in `components.css`
  (`.c-banner` + 5 tone modifiers) and demoed with a static, non-interactive
  sample of every tone/variant combination in `preview.html`'s Components
  gallery — this is genuinely new, not sourced from the brand deck or the
  teammate's build (see this component's own ⚠️ flag and the Scope note
  above).

- **v0.9.15 — 2026-08-05** — Reverted PageHeader's **With actions**
  variant, added in the previous pass — explicit user direction: the
  standalone component ships only Default and With subtitle, per its
  original two-variant scope. The actions row itself wasn't removed,
  since App Shell's demo still needs it (period selector + Export
  button) — `.c-pageheader-row`/`.c-pageheader-actions` stay in
  `components.css` and App Shell still renders them, but that row is
  now documented as specific to App Shell's own subsection rather than
  as a PageHeader variant; the "Select trigger styled as a pill"
  known-gap note moved there with it. Removed the "With actions" demo
  from `preview.html`'s PageHeader gallery block (App Shell's own demo
  is unchanged).

- **v0.9.14 — 2026-08-05** — Fixed **PageHeader**: App Shell had
  been keeping its own parallel copy (`.c-shell-page-header`/
  `.c-shell-actions` in `components.css`) instead of composing the
  actual `PageHeader` component, so the two had drifted apart —
  App Shell's copy was missing `font-family`/`line-height`/
  `letter-spacing` tokens on both the title and subtitle (invisible
  only because this page happens to set `font-family` globally on
  `body`; would silently break in a project that doesn't), used a
  title→subtitle gap of `spacing-4` (4px) instead of PageHeader's own
  documented `spacing-8` (8px), and the two sections' spec text
  disagreed on the subtitle token (App Shell said body2, the
  standalone PageHeader spec said body1) with neither implementation
  aware of the other. Standardized on **body2** (explicit user
  decision) and removed the duplicate: App Shell now renders
  `.c-pageheader`/`.c-pageheader-row`/`.c-pageheader-text`/
  `.c-pageheader-actions` directly, and `.c-shell-page-header`/
  `.c-shell-actions` are gone from `components.css`. Also added the
  Actions row PageHeader's own spec never documented, even though
  App Shell's subsection always described one — new **With actions**
  variant, demoed as a third state in `preview.html`'s PageHeader
  gallery block. App Shell's own subsection now points at
  [PageHeader](#pageheader) for the shared anatomy instead of
  restating it, keeping only what's specific to that placement
  (full-bleed width, gap to content below) — the drift happened
  in the first place because the same spec was written out twice.
  Added the missing [PageHeader](#pageheader) ToC entry (it had its
  own section and gallery block but was never linked from the ToC).
  ⚠️ **Not fixed, flagged instead:** the period-selector requirement
  ("This month ▾" as a Select trigger styled as a pill) still has no
  built variant — `.c-select-box` is `radius-sm`, not pill — so the
  one live example still substitutes Filters' `.c-filter-trigger`.
  Noted as a known gap directly in PageHeader's spec rather than
  silently left inconsistent; needs a follow-up decision (build the
  pill trigger, or revise the spec to match what's actually reusable).

- **v0.9.13 — 2026-08-05** — Consolidated **UserPicker** and
  **Search input clear button** into a single new **Search input**
  component (three variants: Default — the old clear-button pattern;
  User Search — UserPicker, unchanged in substance; Item Search — new,
  same dropdown mechanics without an avatar), plus two real fixes found
  in the process: the old UserPicker's Active state toggled a JS-driven
  `.focused` class on a wrapper `<div>` that owned the border, instead
  of Input field's own genuine `:focus` on the `<input>` itself — Search
  input's box now puts the border/radius/fill on the real `<input>`
  (icon and clear button absolutely positioned over it, the same
  technique as `.c-field .input-wrap.has-leading-icon.has-icon-btn`),
  so Active needs no JS at all; and UserPicker's Selected-state clear
  button used a Neutral-2 fill-hover it invented for itself instead of
  Input field's own `.icon-btn:hover` color-swap convention, which
  Search input's Selected — hover state now uses instead. Also adds a
  new Loading state (no spinner existed anywhere in this system before
  this — Button's own "Loading" row was spec-text-only) and a new
  Selected — disabled state, neither of which UserPicker or Search
  input clear button had. Built per the user's own 3-step process:
  component first (`components/forms/SearchInput.tsx`, superseding
  `components/forms/UserPicker.tsx`), then a live preview in
  `preview.html`'s Components gallery for approval, then this spec,
  added only after that preview was explicitly approved. Removed the
  standalone UserPicker and Search input clear button sections (and
  their ToC entries) rather than leaving redirects — a standing note
  under Search input points here instead. Net component count: 29 → 28
  (two removed, one added). Updated the ToC and Scope note to match.

- **v0.9.12 — 2026-08-05** — Toast gained six new subsections:
  Positioning, Auto-dismiss timing, Animation, Stacking behaviour,
  Layout variants, and Content length. Rationale: the prior spec
  covered anatomy and tone but left placement, timing, and interaction
  behavior unspecced, which meant every implementation would have
  guessed independently. All new values reuse existing tokens only —
  spacing-8/12/24 for gaps and offsets, `duration-base` +
  `ease-standard` for motion (see the Animation subsection for why
  those two specifically), Neutral-9/Green/Red/Amber for tone, already
  established in the tone table above. One gap surfaced in the
  process: this document has no numeric z-index token scale, so
  Positioning's stacking-layer rule is stated structurally (relative
  to the Modal's `shadow-overlay`) rather than as a value — flagged
  here rather than inventing one. Verified first in a standalone test
  preview outside `preview.html`, then implemented for real:
  `components.css` gained `.c-toast-host` (the fixed bottom-right
  stacking container, with its own mobile breakpoint), the
  entrance/exit transition (`duration-base`/`ease-standard`, disabled
  under `prefers-reduced-motion`), and the message-only layout
  variant's type override. `preview.html`'s Toast gallery entry gained
  a live interaction demo — trigger buttons that fire real toasts into
  `.c-toast-host`, exercising auto-dismiss timing (including Danger's
  no-auto-dismiss and the 2000ms minimum display time), hover-to-pause,
  and the 3-visible stacking cap with FIFO queueing — inside a bounded
  `.c-toast-stage` demo container (gallery-only CSS, same containment
  pattern as `.c-modal-stage`) so it doesn't cover the whole gallery
  page the way the real fixed positioning would.

- **v0.9.11 — 2026-08-05** — Tag's fill switched from a generic
  Neutral-2 background to the owning element's `-bg` tint (8%) —
  Fire's tag is now `--color-fire-bg` behind orange text/dot, Water's
  is `--color-water-bg` behind navy, and so on for Wood/Earth/Gold.
  Rationale: Tag exists to signal element/department ownership, and
  every other ownership surface in this system (Card's element-tinted
  variant, Chart's sequential ramps, ElementBadge) already colors its
  background with the owning element's tint rather than a neutral one
  — Tag's generic gray fill was the one inconsistent case, undermining
  its own "labels which element owns this" purpose at a glance. Text
  and dot stay full-strength element color, unchanged. `components.css`
  gained `.c-tag-earth` and `.c-tag-gold` variants that didn't exist
  before this pass (previously only Fire/Wood/Water had dedicated
  classes — Gold's Table row demo in `preview.html` was rendering as a
  plain undyed tag as a result); all five elements are now covered.

- **v0.9.10 — 2026-08-05** — SidebarNav's expanded default header logo
  switched from the static `logo-lockups/collabrium-default-logo.svg`
  lockup to the live animated mark, embedded via `<iframe src="logo.html">`.
  Rationale: [SKILL.md](SKILL.md) already says to use `logo.html`
  "wherever the mark can animate," and a 240px-wide header has plenty
  of room — the static lockup was the un-argued exception, not a
  deliberate choice. Scope is deliberately narrow: an expanded
  department-specific header still uses its static element-colored
  lockup (`logo.html`'s animation cycles through all 5 elements, so it
  can't freeze on one department's color), and the collapsed 72px rail
  still uses the static element icon/`coin.svg` (no room to run the
  animation there either). Implementation: the iframe renders inside
  its own 16px top/bottom padding, so `.c-sidebar-logo-live-wrap` crops
  that out via `overflow: hidden` plus an absolutely-positioned iframe
  offset up by the same 16px, rather than growing the header to fit
  the padded embed at full size. The old single-`<img>` src-swap
  technique (`data-expanded-src`/`data-collapsed-src`) no longer covers
  the default case now that expanding restores an iframe rather than
  an image, so the toggle's JS was simplified instead: the live embed
  and the static collapsed icon are both always present in the markup,
  and CSS alone shows/hides each off `.c-sidebar.is-collapsed`.
  `components.css` and both `preview.html` demos (the standalone
  SidebarNav gallery block and App Shell's own nav instance) updated
  together.

- **v0.9.9 — 2026-08-05** — Reserved "Level 2" as a named,
  documented placeholder for a future drill-down/detail-screen layout
  (Back control + breadcrumb), added to Page header's subsection.
  Explicitly NOT specced yet — deliberately deferred until a real
  detail-view build exists to design against, rather than guessed at
  cold (App Shell's own first-draft flush-rail nav variant is the
  cautionary example for guessing composition rules with nothing real
  to react against). Documents the trigger for actually writing it —
  before the first real drill-down screen ships, not after divergent
  builds show up — and the intended relationship to this section
  (extends App Shell, doesn't replace it, same pattern as Main nav's
  relationship to SidebarNav). No CSS/markup changes — `components.css`
  and `preview.html`'s embedded copies are unaffected, so their own
  version stamps aren't bumped this round (same precedent as
  `tokens.css` lagging behind when its actual content hasn't changed).

- **v0.9.8 — 2026-08-05** — New App Shell / Content region layout
  rule: a formal box grid, requested directly rather than reverse-
  engineered from a build. Three decisions confirmed before writing
  anything (all three went with the recommended option):

  1. **Column model** — 4-column spannable grid, not fixed N-up rows.
     A box's width is always a whole span of 1, 2, 3, or 4 columns, and
     boxes of different spans can share a row (a 1-col box next to a
     3-col box), rather than every box in a row being forced equal
     width.
  2. **Row height** — equal-height stretch (every box in a row grows to
     match the row's tallest box), not a hardcoded max-height cap. Free
     from CSS Grid's own `align-items: stretch` default.
  3. **New 24px spacing** — vertical-only, between stacked rows of
     boxes. The existing horizontal Column gap rule (spacing-16–20,
     product's choice) is unchanged and untouched.

  Implemented as `.c-shell-grid` + `.c-shell-span-1`/`-2`/`-3`/`-4` in
  `components.css`. One real bug caught during live verification, not
  just assumed correct: `grid-template-columns: repeat(4, 1fr)` doesn't
  actually produce 4 equal columns when the boxes inside contain text —
  a plain `1fr` track's implicit `min-width: auto` lets a box's own
  text content inflate its column past its fair 1/4 share (measured
  columns of 37/37/37/124px instead of four equal ~59px tracks before
  the fix). Corrected to `repeat(4, minmax(0, 1fr))`, re-verified via
  computed styles: four genuinely equal columns, a 3-col box measuring
  exactly 3× a 1-col box's width plus its internal gaps, both boxes in
  the row the same height despite very different amounts of text.

  Flagged, not silently fixed: Stat/KPI card's own `.c-stats` predates
  this rule and uses its own `auto-fit` column count rather than a
  fixed 4-column span — that's Stat/KPI card's own component spec, not
  something App Shell overrides, same principle as not touching
  SidebarNav's internals. Left as an open, documented inconsistency.

- **v0.9.7 — 2026-08-05** — "Canvas warm as the default page
  background everywhere" — documented since v0.6.0/the 2026-08-03 rule
  change — was prose only: nothing in `components.css` actually applied
  it, so a screen only got it if whoever built it remembered to set
  `background: var(--color-canvas-warm)` by hand. Same class of gap as
  the icon/pill integration failure v0.9.4 fixed, just for a
  background color instead of a whole stylesheet. Fixed by adding
  `background: var(--color-canvas-warm)` directly to `.c-shell` in
  `components.css` — App Shell's own full-viewport container — so every
  screen built on this pattern gets the canvas automatically, nothing
  to remember. Still references the token, never the hex, so no scope
  violation of App Shell's "structure and layout only" rule. Verified
  live: `.c-shell`'s computed background resolves to `#FCFAF5` with no
  page-level CSS added by the consuming page. Added a property table
  and an explicit "enforced in code, not just documented" note to the
  Page canvas paragraph so this stays checkable going forward.

- **v0.9.6 — 2026-08-05** — App Shell's Main nav re-synced to
  SidebarNav after SidebarNav gained a collapsible rail, logo swap, and
  second-level accordion (a teammate's `component-sidenav` PR, merged
  outside this working session). Two problems, same root cause:

  1. **The portability gap from v0.9.4 regressed.** The new
     SidebarNav CSS (`.c-sidebar-shell`, `.c-sidebar-toggle`,
     `.c-sidebar-logo`, `.c-sidebar-divider`, the second-level
     `.c-nav-parent-toggle`/`.c-nav-children` accordion, the collapsed
     hover-label) had been added only to `preview.html`'s inline
     `<style>`, never ported to `components.css` — the exact class of
     gap v0.9.4 existed to close, reopened by a change that
     didn't go through this file. Ported in full; `components.css` now
     carries every rule `preview.html` does for this component again.
  2. **App Shell's own nav demo had drifted stale**, still showing
     SidebarNav's pre-collapsible markup (plain text header, no
     toggle) — a direct violation of [Main nav](#main-nav--a-direct-instance-of-sidebarnav-not-a-variant)'s
     own "no properties overridden, follows SidebarNav exactly" rule
     from v0.9.2, just via staleness rather than a deliberate
     override. Rebuilt to the current SidebarNav markup (logo header,
     divider, hover-text spans, collapse toggle) with App Shell's own
     content (Astro Growth branding, the Locked/"Soon" Data example).
     Placement CSS also needed a small adjustment: `.c-shell
     .c-sidebar` used to hardcode `flex: 0 0 240px`, which silently
     fought the component's own `.is-collapsed{width:72px}` rule when
     collapsed inside the shell. Changed to target the `.c-sidebar-shell`
     wrapper with `flex: 0 0 auto`, so the nav's own width rules — 240px
     expanded, 72px collapsed — resolve the same way inside App Shell
     as they do in SidebarNav's standalone demo. Verified live: toggling
     collapse inside the App Shell gallery block now matches the
     standalone SidebarNav block pixel-for-pixel, full height
     (`calc(100dvh − 32px)`, still achieved via stretch + margin, no
     literal `calc()`) maintained in both states.

  Also removed, as directly-related cleanup found while fixing the
  above: a duplicate, stale `comp-sidebarnav` gallery block (a merge
  leftover, same invalid duplicate-`id` pattern as a `comp-tabs`
  duplicate that's flagged but *not* fixed here — out of scope for this
  pass) and a code comment in `preview.html` still describing the
  "flush rail" nav variant dropped back in v0.9.2.

  ⚠️ **Not done in this pass:** `DESIGN-SYSTEM.md` and `preview.html`'s
  embedded `src-md-extended`/`src-md-compact` blocks drifted out of
  sync during the same external merge (847/2001 lines changed
  respectively, five new components added, none of it going through
  this file's own doc-sync discipline) — that's a separate, larger
  re-sync this changelog entry doesn't attempt.

- **v0.9.5 — 2026-08-04** — Added **SidebarNav's collapsible
  state, second-level navigation, and overflow behavior** — the
  largest single update to an existing component in this system.
  Collapsible state: the rail toggles between 240px expanded and 72px
  collapsed (icon-only), with a floating overlay toggle button, an
  independently-centered header logo/element icon, an 8px dot badge
  standing in for the trailing count, a logo asset swap (wordmark ↔
  element icon, not just a resize) on toggle, a SidebarNav-owned hover
  label for collapsed icons (not a reused Tooltip instance, since
  Tooltip's plain-wrapper model doesn't survive SidebarNav's scrolling
  item list), and collapsed/expanded persistence to `localStorage`.
  Container gained a hard max-width in both states (`overflow-x:
  hidden`, no horizontal scroll ever), equal padding on all four sides,
  and labels now wrap instead of truncating with an ellipsis. New Nav
  item states: locked/soon (a Badge "Soon" label for un-built IA
  sections), hover, focus-visible, active-pressed, and disabled — all
  reusing existing Table row/Button Ghost tokens rather than inventing
  nav-specific ones. Second-level navigation: a nav item can now expand
  to show child items, one level deep — independent per-parent
  open/closed state, a height-based expand transition, full-width
  (not inset) children, and sidebar-wide exclusivity so only one
  destination is ever the active selection; a collapsed parent routes
  straight to its first child on click, since there's no room to reveal
  children at 72px. Overflow behavior: vertical scroll once items
  exceed the container's height, a thin overlay scrollbar that never
  reserves layout space, and the footer stays pinned outside the
  scrolling region. The collapse-icon and second-level chevron were
  both reclassified **Tier 1, Regular** — "expand, collapse" and
  "chevron up/down" are both listed Tier 1 examples in
  [Iconography](#iconography), not judgment calls. Still open: mobile/
  responsive behavior and full keyboard navigation (arrow keys, `Enter`,
  `Escape` on the accordion). `preview.html`'s gallery and
  `components.css` updated to match.
- **v0.8.4 — 2026-08-04** — Added **PageHeader**, a page-level
  title block (title + optional subtitle), no background/border/padding
  of its own — flush in the surrounding layout. Designed from scratch,
  no source in either the brand deck or the teammate's build, by
  reusing the existing Typescale's h1/body1 tokens. Also live-rendered
  in `preview.html`'s Components gallery.
- **v0.6.2 — 2026-07-31** — Two unrelated fixes shipped this day.
  Reclassified icon weights (resolves [Needs Input #11](#needs-input-read-this-first)):
  moved from "Fill exclusively" to the two-tier Regular/Fill split
  documented in [Iconography](#iconography) — [Component Rules](#component-rules)
  #6, the Guidelines Do/Don't list, the stylesheet `<link>`s (now
  loading both Regular and Fill), and every icon instance in
  `preview.html`'s live gallery were reclassified per-tier. Four
  judgment calls, none brand-team-confirmed: the Tabs "Settings" tab
  icon treated Tier 2 like SidebarNav rather than Tier 1 like a generic
  nav control; the Stat/KPI card's trend indicators (caret-up/down,
  flat minus) treated Tier 2 since they're not clickable, despite
  "arrow up/down" appearing in the Tier 1 example list; Date picker's
  trigger-button calendar icon kept Tier 2 per the explicit "Card /
  section header: Calendar... Fill" example despite sitting inside a
  button; and the "Copied" confirmation checkmark treated as a Tier 2
  status confirmation rather than inheriting the Copy button's own Tier
  1 weight. Also finalized the logo assets (further resolves [Needs
  Input #8](#needs-input-read-this-first)): added the default static
  lockup (`logo-lockups/collabrium-default-logo.svg`, a Gold ring "O",
  for contexts that can't run the animation); trimmed `logo.html` from
  9 frames to the 5 documented elements (Gold → Water → Wood → Fire →
  Earth), dropping the decorative-only sun/moon/cloud/mountain frames;
  rebuilt the wordmark on a new font (new path data per letter, ink
  color `#2F2F2F` → `#2B2B2C` to match the default lockup, resolving a
  prior mismatch between the two assets); corrected the two off-palette
  element frame colors (Wood `#FFA6A8` → `#FF7A90`, Earth `#00D97B` →
  `#00C26E`) before the trim; and moved the Gold frame's artwork to
  `coin.svg`, leaving `gold.svg` as the Gold element icon used
  elsewhere in the system (Color Palette, ElementBadge, sidebar dots,
  Chart color mapping) — deliberately two different assets now.
  Confirmed the `SVG/` vector source library (letters + 5 core-element
  icons) is byte-identical to `logo.html`'s embedded path data. Known
  gap: `wood.svg`/`earth.svg`/`mountain.svg`'s raw exports still carry
  the off-palette colors (left untouched, since they may be externally
  managed master exports) — `logo.html`'s corrected values remain
  canonical. Still open: 4 of 5 department-colored lockup variants, a
  clear-space rule, minimum size, and monochrome/reverse versions.
- **v0.6.1.1 — 2026-08-03** — Filled gaps in Input field that the
  deck and the teammate's build never covered (designed, not sourced):
  placeholder text styling (Neutral-5, same body2/weight 400 as entered
  text — not italic or a separate lighter weight); a required-field
  marker (a single Red asterisk after the label, with no "(optional)"
  text on non-required fields); a Success/valid state (1px Green
  border, trailing check-circle icon, fires after validation on blur or
  submit, not every keystroke); autofill styling so a browser's
  autofill doesn't override the field's fill color; plain `:focus` (not
  `:focus-visible`) so mouse and keyboard users see the same treatment;
  prefix/suffix text adornments; a character/word counter that turns
  Red at/over the limit; and ARIA wiring (`aria-describedby` to helper
  text, swapping to `aria-invalid` plus the error text's `id` on
  Error). Also clarified that the sm/md/lg sizes are a density choice
  per context, not tied to a viewport breakpoint. Treat as a first pass
  needing real design/brand review.
- **v0.9.4 — 2026-08-04** — Added **`components.css`**, the actual
  portable copy of every component's CSS (Button, Input field, Card,
  Badge & Tag, Table row, Modal, Empty state, SidebarNav, App Shell
  layout, Tabs, Select, Checkbox/Radio/Switch, Toast, Tooltip,
  DataTable, ElementBadge, Stat/KPI card, Filters, Pagination, Date
  picker, Chart color mapping) — extracted from `preview.html`'s own
  inline `<style>`, where it had lived with no separate, importable
  copy since v0.5.0. Root cause of a real integration failure: a
  teammate applied this system to an existing project and copying
  markup out of "Copy markup" buttons produced class names with no CSS
  behind them anywhere else, so colors/pills/spacing/icons didn't
  render at all outside `preview.html` itself. `preview.html` now links
  `components.css` (`<link rel="stylesheet">`) instead of duplicating a
  private copy, so the gallery and the shipped file can't drift apart —
  same fix pattern as the `tokens.css`/`src-css-vars` alignment from
  v0.9.1. Verified byte-for-byte: every one of 22 `.c-*` component
  selector groups present in exactly one file, zero duplicated, zero
  dropped, and every demo-page-only rule (`.comp-block`, `.c-modal-stage`,
  `.comp-demo.shell-demo`, etc. — gallery chrome, not real component
  CSS) correctly stayed out of `components.css`.

  Also fixed a real bug caught during the extraction, unrelated to the
  packaging itself: the 36×36 icon-chip pattern — documented as shared
  by Card's header **and** Stat/KPI card's icon slot — was scoped to
  `.c-card .icon-chip` only, so every Stat card's icon in the gallery
  (and App Shell's demo, which reuses Stat card) had rendered completely
  unstyled since v0.8.0. Unscoped to plain `.icon-chip` so it works
  wherever the spec says it should.

  Resolved the file-formats/token-format half of long-open **Needs
  Input #10** with a real answer instead of a placeholder: [Technical
  Implementation](#technical-implementation) now states the 5 files an
  existing project needs and the order to load them in (Google Fonts →
  Phosphor Regular → Phosphor Fill → `tokens.css` → `components.css`),
  and why each one's absence produces exactly the symptom that was
  reported. Loading strategy and `font-display` remain open — genuinely
  need engineering input, not a design guess.
- **v0.9.3 — 2026-08-04** — Added an explicit scope rule to App
  Shell: it governs **structure and layout only** (placement, size,
  spacing, which region a component occupies) and never defines or
  restates a component's own style (fill, border, radius, typography,
  state colors) — that stays the owning component's job. Prompted by a
  direct question about whether this was actually being held to.
  Auditing the section against its own new rule found one real
  violation and two smaller ones. The violation: the Locked/"Soon"
  nav-item state (fill, text color, icon opacity, cursor, a Badge) was
  defined inside App Shell's Main nav subsection — that's a SidebarNav
  component state, not a layout fact, so it moved to
  [SidebarNav](#sidebarnav)'s own table as a third `Nav item` row
  alongside active/inactive. The smaller ones: the "Page canvas"
  paragraph and Content region's table both restated `Canvas warm`'s
  hex value (`#FCFAF5`) redundantly with [Color Palette](#color-palette)
  — reworded to reference the token rather than repeat its value, and
  to state the structural fact (one continuous background region, not
  per-section fills) that's actually App Shell's to own. `preview.html`
  updated to match — the `.c-sidebar-item.soon` CSS rules moved out of
  the App Shell code comment block into the SidebarNav one, no visual
  or behavioral change.
- **v0.9.2 — 2026-08-04** — App Shell's main nav tweak: dropped the
  separate "flush rail" placement variant (no radius, right-edge border
  only) introduced in v0.9.0. That variant existed to solve a real
  problem — SidebarNav's own spec (`radius-lg`, border on all four
  sides) would show canvas colour bleeding through its rounded corners
  if stretched flush against the browser edge — but the fix duplicated
  the component into two specs that could drift apart. Replaced with
  **inset spacing**: the main nav is now SidebarNav, completely
  unmodified (same width/radius/border/fill/anatomy), placed
  `spacing-16` (16px) in from the viewport's top, left, and bottom edges
  instead of flush, with height `calc(100dvh - 32px)`. One component,
  one spec, used in two placement contexts (inset-as-main-nav,
  floating-panel-as-inset-or-drawer) rather than two components pretending
  to be one. SidebarNav's own section now points to App Shell for the
  placement rule instead of describing a second variant inline.
- **v0.9.1 — 2026-08-04** — Cross-checked all 5 places this system's
  content gets duplicated — `SKILL.md`, `DESIGN-SYSTEM.md`, and the three
  embedded copies inside `preview.html` (the DESIGN.md tab's compact/
  extended text, the CSS Variables tab, the Tailwind v4 tab, and the
  Design Tokens JSON tab) — against their real source files, rather than
  assuming the doc-sync rule had been holding. Found: the two markdown
  copies and the CSS Variables copy were exactly in sync (byte-identical);
  `tokens.css` and its embedded copy both carried a stale `v0.6.0`
  header comment despite the system being 3 minor versions ahead (values
  were still correct — only the stamp was stale); the Design Tokens JSON
  export's own metadata carried the same stale `0.6.0` stamp
  (values also still correct); and the Tailwind v4 theme mapping had a
  real, substantial gap — only 59 of tokens.css's 162 actual tokens were
  mapped into `@theme`, missing the entire typography scale (every
  `text-*`/`weight-*`/`tracking-*` token), all 7 icon-size tokens, 4
  shadow variants, the 5 semantic spacing aliases, and the 5
  `-bg-strong` element tint steps. Root cause of the gap: the token count
  used to judge coverage was itself wrong at first pass — a naive,
  line-start-anchored extraction script undercounted tokens.css as 101
  tokens instead of 162, because several lines pack multiple
  `--token: value;` declarations together and a regex anchored to each
  line's start only ever saw the first one. Rebuilt the Tailwind mapping
  from a corrected, exhaustive token extraction; it now covers all 162
  and was verified programmatically (162 tokens.css tokens ↔ 162 mapped,
  zero missing, zero orphaned) rather than by eye. Fixed both stale
  version stamps to `v0.9.1` / 2026-08-04. This was prompted by a
  teammate report that applying the system to an existing project left
  colors, pills, and icons not rendering correctly — a separate,
  larger problem (the component CSS itself has never been extracted
  into anything portable, and icon/font CDN links are undocumented as a
  requirement) that this pass does not fix, only the token-layer piece
  of it.
- **v0.9.4 — 2026-08-04** — Added **MultiSelect**, a trigger
  button that opens a grouped checkbox list for selecting multiple
  options — the trigger reflects the current selection as
  individually-removable Badge-Neutral chips (capped at 2, then a "+N"
  overflow chip), visible whether the menu is open or closed. Designed
  from scratch, no source in either the brand deck or the teammate's
  build; reuses Button Secondary for the default trigger, Filters'
  trigger/popover conventions, Badge's real box model for the chips, and
  this system's own Checkbox spec for the rows, rather than inventing
  new patterns. Built per the user's own 3-step process: component first
  (`components/forms/DropdownMenuWithSelection.tsx` — file path kept
  from an earlier single-select draft on the same file, replaced per
  explicit user direction; the exported component/types are
  `MultiSelect`/`MultiSelectOption`/`MultiSelectProps`), then a live
  preview in `preview.html`'s Components gallery for approval — through
  several rounds of review (Badge-based selection display instead of a
  plain count, dynamic "{count} selected" trigger copy, removing the
  count badge from the open states, then individually-removable
  per-item chips that stay visible while open, which superseded the
  count-badge/text approach) — then this spec, added only after that
  preview was explicitly approved. Slotted alphabetically into the
  Basics group (between Modal / dialog and Password field) rather than
  a new category, same call as Stepper's/UserPicker's/FileUploader's own
  placements. Updated the ToC and Scope note to match.
- **v0.9.3 — 2026-08-04** — Added **FileUploader**, a
  click-to-browse/drag-and-drop attachment control — attached files list
  as rows below the drop zone with a kind badge, name, size, and a
  remove action. Designed from scratch, no source in either the brand
  deck or the teammate's build; reuses Badge-Neutral's box model for the
  kind badge, Table row's/SidebarNav's Obsidian-border + Neutral-2-fill
  "currently engaged" recipe for the drag-over state, and the
  Filters/Date picker popover convention for file rows, rather than
  inventing new patterns. Built per the user's own 3-step process:
  component first (`components/forms/FileUploader.tsx`), then a live
  preview in `preview.html`'s Components gallery for approval —
  including a mid-review fix (kind badge moved from a literal monospace
  stack to `--font-primary`, same call as UserPicker's avatar-initials
  fix) — then this spec, added only after that preview was explicitly
  approved. Slotted alphabetically into the Basics group (between Empty
  state and Input field) rather than a new category, same call as
  Stepper's and UserPicker's own placements. Updated the ToC and Scope
  note to match.
- **v0.9.2 — 2026-08-04** — Added **UserPicker**, a searchable
  input for finding and selecting a single person (an Account Executive,
  in this app) — collapses to an avatar/name/role summary with a clear
  action once a value is set. Designed from scratch, no source in either
  the brand deck or the teammate's build; reuses Input field's box
  anatomy and focus behavior, Filters'/Date picker's popover convention,
  and Table row's hover treatment rather than inventing new patterns.
  Built per the user's own 3-step process: component first
  (`components/forms/UserPicker.tsx`), then a live preview in
  `preview.html`'s Components gallery for approval — including a
  mid-review fix (avatar initials moved from a literal monospace stack,
  since this system has no `--font-mono` token, to `--font-primary` like
  every other piece of text in the component) — then this spec, added
  only after that preview was explicitly approved. Slotted alphabetically
  into the Basics group (after Textarea) rather than a new category, same
  call as Stepper's v0.7.0-batch placement. Updated the ToC and Scope
  note to match.
- **v0.9.1 — 2026-08-04** — Added **Stepper**, a multi-step
  progress indicator (Horizontal/Vertical orientation × optional
  per-step description, three states — Completed/Active/Upcoming).
  Designed from scratch, no source in either the brand deck or the
  teammate's build. Built per the user's own 3-step process: component
  first (`components/navigation/Stepper.tsx`), then a live preview in
  `preview.html`'s Components gallery for approval — including two
  rounds of visual fixes caught in that preview (equal-length dividers
  in both orientations, a divider touching its neighboring indicator in
  the vertical layout, and the Completed indicator showing a checkmark
  instead of its step number) — then this spec, added only after that
  preview was explicitly approved. Slotted alphabetically into the
  existing v0.7.0 batch (between SidebarNav and Switch) rather than a
  new Navigation category, per explicit user direction — SidebarNav and
  Tabs stay where they are. Updated the ToC and Scope note to match, and
  fixed `preview.html`'s Components lede, which had drifted stale at
  "21 components" since App Shell/Textarea/Password field/Search input
  clear button were added in v0.9.0 without updating it — folded that
  fix into this same pass rather than leaving it for a third drift.
- **v0.9.0 — 2026-08-04** — Added **App Shell**, the page-level
  composition layer this document never had. Prompted by real downstream
  builds: separate teams built dashboards on this system and produced
  three different navigation shells (pure sidebar, top-bar-only, sidebar
  **and** top-bar), plus a Card chrome deviation and a Badge semantics
  miss. The existing component tables weren't wrong — SidebarNav, Card,
  and Badge & Tag already specified their own internals correctly — the
  gap was that nothing said how those pieces combine into an actual
  screen. App Shell defines: a canonical sidebar-only pattern; a flush,
  full-height **placement variant** of SidebarNav for the primary rail
  (240px, no radius, right-edge border only) — SidebarNav's existing
  spec (`radius-lg`, border on all four sides) is now documented as the
  floating-panel/off-canvas variant, not a contradiction; a new Locked/
  "Soon" nav-item state; Content region; and Page header, promoted (in a
  same-day revision, still within this draft) to be the shell's *only*
  top-of-screen chrome, full width, in place of an initially-drafted
  separate Top bar. That first draft's Top bar (notification dot,
  account control depending on the still-unspecced Avatar component) was
  cut before shipping — global-scope controls have nowhere defined to
  live as a result, an acknowledged open gap rather than a silent one.
  Every value reuses existing spacing/radius/elevation/motion tokens —
  no new scale was introduced (sidebar width was already specced at
  240px). Marked ⚠️ **designed, not transcribed**, same provisional
  status as the v0.8.0 batch. Also corrected in this pass: the
  Components section's own scope note had undercounted for a full day
  (see the v0.8.3 entry below) — exactly the kind of drift App Shell
  exists to prevent elsewhere, caught here in the same file that names
  the problem.
- **v0.8.3 — 2026-08-03** — Four changes shipped this day without a
  version bump at the time; reconstructed and folded in here
  retroactively so the changelog matches what the file actually says.
  Warm canvas (`#FCFAF5`) became the default page background **everywhere**,
  reversing the v0.6.0 rule that restricted it to brand/editorial
  surfaces — product UI was pure white before this. Button gained an
  Icon-only variant (square hit area, Tier 1 icon required, mandatory
  `aria-label`). Input field's Focus state was corrected to match what
  `preview.html` actually ships — a plain 2px Obsidian border swap, not
  the Water-ring `shadow-focus` treatment the v0.6.0 "Focus rings are
  Water" policy implied; that policy still holds everywhere else (Card,
  Empty state), Input field (and everything that inherits its States
  table) is now documented as a deliberate exception. Three Input field
  sibling components were specced and live-rendered: Textarea, Password
  field, Search input clear button. None of these four were reflected in
  the Components section's scope note or this changelog until the
  v0.9.0 pass above caught it.
- **v0.8.2 — 2026-07-30** — The Components gallery in
  `preview.html` was static markup — buttons that looked clickable but
  weren't, checkboxes with a hardcoded `.on` class, tabs that never
  switched. Wired real interactivity into every component with genuine
  click/toggle semantics: SidebarNav and Tabs switch active state on
  click; Checkbox, Radio, and Switch sync their visual layer to the
  real (already-native) hidden input via a `change` listener, so
  keyboard toggling works too, not just mouse clicks; Table row and
  DataTable row select on click (matching the Table row spec's existing
  "Row selected" state, now actually reachable); Toast dismisses; Modal
  dismisses on Close/Cancel/Archive and gets a "Reopen modal" trigger so
  it isn't gone for good; Filters' triggers toggle, pills remove
  individually, and Clear all removes everything; Pagination's numeric
  buttons select directly and Prev/Next step by one; Date picker days
  select on click. Everything scoped via event delegation on
  `#components` so it can't collide with the app chrome (right-pane
  tabs, jumpnav, copy-markup buttons) elsewhere on the page. Two things
  stayed deliberately inert — see the new interactivity note above the
  Components spec for why.
- **v0.8.1 — 2026-07-30** — A separate team built a Sales Dashboard
  mockup on top of this system (their own reimplementation, not sourced
  from `preview.html` directly) and it surfaced three real bugs in
  their build: a Switch thumb pinned off-center by a conflicting CSS
  rule, a "Follow-up" Badge that wrapped to two lines and broke its
  pill shape, and a Select with no custom caret (bare native browser
  chrome). Checked all three against this repo's own `preview.html`
  reference implementation before touching anything here — Switch and
  Select were already correct (the mockup's bugs were unique to its own
  from-scratch CSS, nothing to fix). Badge, though, was missing
  `white-space: nowrap` here too — added it, since nothing was actually
  stopping the same wrap from happening in this system's own Badge if a
  label ran long. See the Badge & Tag component section above.
- **v0.8.0 — 2026-07-30** — Designed the last 5 dashboard
  components flagged as a gap in v0.7.0 — Stat/KPI card, Filters,
  Pagination, Date picker, and a Chart color mapping guideline. Unlike
  every component before these, **none of the five has source material
  in either the original brand deck or the teammate's build** — they're
  built entirely from this document's own token system (extending
  Card/Select/Button/Tag/Modal patterns already specced), not
  transcribed from anything. Each is marked ⚠️ "designed, not
  transcribed" in its own section and should be treated as more
  provisional than the rest of the Components list — a first pass that
  still needs real design/brand review, same caveat the original 7
  basics carried before any reconciliation. Chart color mapping is a
  token-mapping guideline, not a rendered component, since no chart
  library has been chosen yet. Stat/KPI card, Filters, Pagination, and
  Date picker are all also live-rendered in `preview.html`'s Components
  section with matching markup and "Copy markup" buttons, per the
  doc-sync standing rule. This closes out the full 15-component request
  from v0.7.0 — Components scope note now covers all 21 (17 built +
  built-but-provisional 4, plus the 1 guideline).
- **v0.7.0 — 2026-07-30** — Wrote specs for 10 more components —
  SidebarNav, Tabs, Select, Checkbox, Radio, Switch, Toast, Tooltip,
  DataTable, ElementBadge — transcribed directly from the teammate's
  real `.jsx` source, same methodology as every prior component. Scoped
  deliberately: these 10 exist as real components in the teammate's
  build, so they could be transcribed rather than designed from scratch;
  the remaining 5 dashboard components (stat/KPI cards, filters,
  pagination, date pickers, chart color mapping) have no source in
  either system and were left out on purpose, flagged for a separate
  design pass. One asset gap surfaced: **ElementBadge** relies on raster
  PNG element glyphs (`assets/elements/*.png`) that this skill doesn't
  have — documented an interim Phosphor-icon substitution. All 10 also
  live-rendered in `preview.html`'s Components section with matching
  markup and "Copy markup" buttons, per the doc-sync standing rule — the
  Components lede, scope note, and Reconciliation section were all
  updated in the same pass, and the top-bar version flag bumped.
- **v0.6.1 — 2026-07-29** — User asked for explicit confirmation
  that components matched the teammate's build and were actually
  projected into `preview.html`. Re-verification against the real
  `.jsx` source (not just the earlier read-through) found two things
  the v0.6.0 pass got wrong: **Button** type size was mapped to the
  `label1/2/3` scale (11/13/14px) when the real component uses 14px
  (sm) and 16px (md/lg, sharing a size) — not a token match at all, a
  component-specific override; live gallery's `lg` padding was also
  `spacing-24` instead of the correct `spacing-20`. **Card**'s icon-chip
  background is a one-off 12% element tint (`color-mix`), not the
  documented 8% `-bg` token used for full-card tinting — conflating the
  two was wrong; the header's icon-to-title gap is `spacing-12`, not
  `spacing-8`; and Card has an optional bordered **Footer** sub-part
  that was missing from the spec entirely. All four fixed in
  `DESIGN-SYSTEM.md`, `tokens.css` usage, and `preview.html`'s live
  Components gallery (icon-chip now sits in a proper header row next to
  the title; added a Footer example card), then re-verified in-browser.
  Everything else cross-checked clean: Badge's tone map, Tag, Input,
  Dialog, and Empty State all match the source exactly.

  Also caught while verifying: `preview.html`'s **Guidelines section had
  its own separate, hardcoded Do/Don't list** (distinct from the
  DESIGN.md tab's copy) that never got updated during the v0.6.0 pass —
  it was still saying "flat by default," 600-weight headings, and a
  4-token radius scale. Rewritten to match. Same for the Typography
  section's lede, which still framed the type scale as an open draft
  gap after Needs Input #3 was resolved. This is exactly the kind of
  drift the doc-sync standing rule exists to catch — a reminder to check
  static prose blocks, not just data-driven tables, when a token value
  changes.
- **v0.6.0 — 2026-07-29** — Reconciled against a teammate's
  independent, more thorough design system built from the same source
  deck (`~/Desktop/Collabrium Design System/`) — see
  [Reconciliation](#reconciliation--teammates-design-system) for the
  full diff. Resolves Needs Input #3/#4/#5 with real sourced values.
  Corrected: radius (4/8/12px guess → real 12/16/20px per-surface
  scale), elevation ("flat by default" → a real Neutral-4 shadow ladder
  used routinely), heading weight/tracking (600 → 800, negative →
  zero), the type scale + a new responsive `-lg` tier, body weight (400
  → 500), the spacing scale (added 20/40px, corrected the 64/96 top
  end), and focus rings (Obsidian → Water). Added: warm canvas surface,
  elemental background tints, the full motion token set (durations +
  6 easing curves), Danger/Link button variants, the card icon-chip
  pattern, and split Badge/Tag into two distinct components. All
  changes applied to `tokens.css` and `preview.html`'s live Components
  gallery in the same pass, per the v0.5.0 standing rule.
- **v0.5.0 — 2026-07-29** — Added a live Components section to
  `preview.html` (7th nav item, after Guidelines): Button, Input field,
  Card, Badge/Tag, Table row, Modal/dialog, and Empty state, each
  rendered per the existing spec with a "Copy markup" button. Further
  resolves Needs Input #7 — the spec now has a working reference
  implementation alongside it, not just tables. Established a standing
  rule (user request): every future build/update to this skill must be
  reflected back into this file in the same pass, not as a follow-up.
- **v0.4.5 — 2026-07-29** — `preview.html`: compacted the Fonts
  tab's install callout — replaced the boxed description + button with
  a single button inline on the section header row, right-aligned next
  to the "Fonts" title.
- **v0.4.4 — 2026-07-29** — Added `fonts/collabrium-fonts.zip`,
  a real desktop font pack (variable-font `.ttf` for Mulish and Source
  Serif 4, both weights/styles, plus OFL licenses), sourced from
  Google's official font repository rather than the web-embed CSS
  subsets. Added a "Download font pack" button to `preview.html`'s
  Fonts tab. True one-click OS-level install isn't possible from a
  browser (no website can write into a system Fonts folder — verified
  and explained inline rather than assumed); this delivers the closest
  feasible thing, a one-click *download* of the real files.
- **v0.4.3 — 2026-07-29** — `logo.html`: removed the visible
  element-name label and play/pause button (dev/debug UI from the
  source asset), so it embeds as a clean, always-animating mark. All 9
  animation frames, including moon, are unchanged. Also dropped
  `logo.html`'s now-unused Google Fonts/Phosphor/`tokens.css`
  dependencies since no text renders in it anymore. `preview.html`'s
  embedded-logo iframe height reduced (240px → 160px) to match.
- **v0.4.2 — 2026-07-29** — Documented `SVG/`, the confirmed true
  vector source library for the logo (8 letter files, 10 element icons
  including an unintegrated `coin.svg`, 5 motive variants — 2 of which
  are duplicates). Further resolves Needs Input #8. Flagged, not fixed:
  `coin.svg`'s role is unconfirmed, and `wood.svg`/`earth.svg`/
  `mountain.svg` still carry the pre-correction off-palette colors in
  their raw form (left untouched, since they may be externally-managed
  master exports).
- **v0.4.1 — 2026-07-29** — Rebuilt `preview.html` into a two-pane
  layout matching the reference the user pointed to
  (styles.refero.design): left pane is the live visual system, right
  pane is a tabbed source viewer (DESIGN.md with Compact/Extended,
  Tailwind v4, CSS Variables, Design Tokens JSON) with Copy/Download.
  All four tabs are embedded inline (not fetched) so the page keeps
  working when opened directly via `file://`.
- **v0.4.0 — 2026-07-29** — Added the real animated logo asset
  (`logo.html`), corrected to this document's canonical colors; resolved
  Needs Input #1 and #2 (Salmon Pink `#FF7A90` and Green `#00C26E` are
  now final, per explicit user decision that this document is the
  source of truth). Rebuilt `preview.html` from a component-states demo
  into a refero.design-style brand microsite (Collabrium overview + logo,
  Color Palette, Typography, Fonts, Spacing & Shape, Guidelines) per the
  user's request — the component-state demos that used to live there now
  only exist as the tables in this document.
- **v0.3.0 — 2026-07-29** — Added an Overview summary paragraph,
  letter-spacing values on the type scale, content max-width and an
  explicit elevation policy in Spacing & Shape, a consolidated top-level
  Guidelines (Do/Don't) section, and `tokens.css` (paste-able CSS custom
  properties, now the single source of values for `preview.html`).
  Brought the doc's comprehensiveness in line with a reference style
  guide the user pointed to. Still unreviewed by brand/design team.
- **v0.2.0 — 2026-07-29** — Added Component Rules and full specs for
  Button, Input field, Card, Badge/Tag, Table row, Modal/Dialog, and Empty
  state (resolves Needs Input #7 with a first draft). Still unreviewed by
  brand/design team.
- **v0.1.0 — 2026-07-29** — Initial DLS drafted from the Collabrium
  brand deck (Google Slides). 10 gaps flagged under Needs Input; see table
  at top. Not yet reviewed by brand team.
