# Collab:Media planner — interaction and animation spec

This is the implementation spec for every micro-animation in the planner
prototype, written so an engineer can reproduce each one exactly. All values
below are lifted from the working build (`pages/planner.html` and the DLS
tokens), not approximated. Where a snippet appears, it is the shipped code.

The reference build is the source of truth. When this document and the build
disagree, the build wins; update this file.

---

## 0. Foundations everything else relies on

### Motion tokens (from `collabrium-dls/tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 140ms | hovers, small state flips |
| `--duration-base` | 220ms | reveals, row entrances |
| `--ease-standard` | `cubic-bezier(.2, .6, .2, 1)` | default UI easing |
| `--ease-settle` | `cubic-bezier(.16, .84, .24, 1)` | anchored arrivals: folds, FLIP landings |

### The one pastel gradient

Every "AI did this" surface uses the same five-stop sweep, always animated
left to right at `background-size: 200% 100%`:

```css
linear-gradient(90deg,
  var(--color-fire-pastel)  0%,
  var(--color-wood-pastel)  20%,
  var(--color-earth-pastel) 40%,
  var(--color-water-pastel) 60%,
  var(--color-gold-pastel)  80%,
  var(--color-fire-pastel)  100%)
```

The first and last stops match so the loop never jumps. Do not invent new
gradients; the whole "AI provenance" language is this one recipe at
different opacities and speeds.

### Two rules that make or break everything

1. **Reduced motion is a first-class path, not an afterthought.** Every
   sequence checks `prefers-reduced-motion` up front and applies the final
   state instantly. CSS animations get `animation: none` in a media query;
   JS sequences take an early return that calls every `apply()` and the
   `onDone` synchronously.

2. **Timers, not requestAnimationFrame, for logic.** rAF never fires in a
   hidden or backgrounded tab, so any choreography driven by it freezes.
   All sequencing uses `setTimeout`/`setInterval`; rAF is only used for
   "add a class on the next frame" tricks, and even then paired with the
   `document.hidden` early-out. Sequences also skip themselves entirely
   when `document.hidden` is true and just apply final state.

3. **Run tokens cancel stale sequences.** Every restartable animation keeps
   a module-level counter (`checkRun`, `sweepRun`, `run`). Starting a new
   run increments it; every async callback compares its captured value and
   silently stands down if superseded. Without this, two overlapping runs
   fight over the same DOM.

---

## 1. The AI auto-fill choreography

**What the user sees:** fields fill one at a time, top to bottom. The field
being written wears an animated rainbow ring; text types in character by
character; numbers count up; when a field lands it flashes a soft blue wash
that fades, and the next field starts.

### 1a. The gradient ring (field being written)

Class `p-ai-active` goes on the field's `.c-field` wrapper. The ring is a
border-box gradient trick: two stacked backgrounds, a solid fill clipped to
the padding box and the pastel sweep clipped to the border box, so the
gradient only shows through the 1px border. A soft halo sits underneath.

```css
@keyframes p-ai-ring{ from{background-position:0 0, 0% 0;} to{background-position:0 0, 200% 0;} }
.p-ai-active input, .p-ai-active textarea,
.p-ai-active .c-dropdown-input, .p-ai-active .c-dp-trigger{
  border-color:transparent !important;
  background-image:
    linear-gradient(var(--color-neutral-1), var(--color-neutral-1)),
    /* the pastel sweep, see section 0 */;
  background-origin:border-box;
  background-clip:padding-box, border-box;
  background-size:auto, 200% 100%;
  animation:p-ai-ring 1.1s linear infinite;
  box-shadow:0 0 0 3px rgba(140, 170, 255, .14);
}
```

The selector list must cover every control shape a fill can touch: inputs,
textareas, the dropdown trigger, the date-picker trigger.

### 1b. The landing flash (the "auto fill up flash")

When a field finishes, the ring comes off and a water-pastel wash fades out
over 1.4 seconds. The class is removed by JS after 1200ms so a later fill
can flash the same field again.

```css
@keyframes p-ai-fill{
  0%{background-color:var(--color-water-pastel);}
  100%{background-color:transparent;}
}
.p-ai-flash input, .p-ai-flash textarea,
.p-ai-flash .c-dropdown-input{ animation:p-ai-fill 1.4s var(--ease-standard); }
.p-ai-flash-row{ animation:p-ai-fill 1.4s var(--ease-standard); }
```

`p-ai-flash` targets the control inside a `.c-field`; `p-ai-flash-row` is
the same wash on a whole row (used for the language checkboxes and the
split rows, which have no single input to tint).

### 1c. The sequencer

`aiFillSequence(steps, onDone)` takes an ordered array of steps, each
`{el, apply}` plus optionally `typeText` (a string) or `countTo` (a number),
and plays them strictly one at a time.

Timing table:

| Phase | Value |
|---|---|
| Typing speed | 1 character per 18ms interval |
| Pause after typing completes | 90ms, then flash |
| Count-up | 16 ticks at 30ms (about 480ms total) |
| Count-up easing | cubic ease-out: `1 - (1 - k/ticks)^3` |
| Count-up rounding | to the nearest 500 each tick |
| Non-typed step (dropdowns, dates, rows) | ring shows for 240ms, then flash |
| Flash class removal | after 1200ms (animation itself is 1.4s) |
| Gap before the next field starts | 120ms |

Behavioral details that are easy to miss:

- The host for ring and flash is `el.closest('.c-field') || el`, so a step
  can point at a raw element (a row) and still get the treatment.
- `renderBrief()` runs on every typing/count tick so the live rail and step
  summaries update in sync with the letters. This is what makes the fill
  feel alive rather than replayed.
- `renderAll()` runs after each field lands and once more at the end.
- The reduced-motion and hidden-tab path applies every step instantly and
  still calls `onDone`.

The shipped sequencer, whole:

```js
function aiFillSequence(steps, onDone){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || document.hidden){
    steps.forEach(function(st){ st.apply(); });
    renderAll();
    if (onDone) onDone();
    return;
  }
  var i = 0;
  function next(){
    if (i >= steps.length){ renderAll(); if (onDone) onDone(); return; }
    var st = steps[i++];
    var host = st.el ? (st.el.closest('.c-field') || st.el) : null;
    if (host) host.classList.add('p-ai-active');
    function finish(){
      if (host){
        host.classList.remove('p-ai-active');
        var cls = host.classList.contains('c-field') ? 'p-ai-flash' : 'p-ai-flash-row';
        host.classList.add(cls);
        setTimeout(function(){ host.classList.remove(cls); }, 1200);
      }
      renderAll();
      setTimeout(next, 120);
    }
    if (st.typeText && st.el && 'value' in st.el){
      var full = String(st.typeText), pos = 0;
      st.el.value = '';
      var tick = setInterval(function(){
        pos += 1;
        st.el.value = full.slice(0, pos);
        renderBrief();
        if (pos >= full.length){
          clearInterval(tick);
          st.apply();
          setTimeout(finish, 90);
        }
      }, 18);
    } else if (st.countTo != null && st.el){
      var target = st.countTo, k = 0, ticks = 16;
      var count = setInterval(function(){
        k += 1;
        var eased = 1 - Math.pow(1 - k / ticks, 3);
        var v = Math.round(target * eased / 500) * 500;
        st.el.value = v;
        renderBrief();
        if (k >= ticks){
          clearInterval(count);
          st.apply();
          setTimeout(finish, 90);
        }
      }, 30);
    } else {
      st.apply();
      setTimeout(finish, 240);
    }
  }
  next();
}
```

---

## 2. The system checker

**What the user sees:** pressing Next inserts a strip under the step. A
spinner and title appear, then each check lands as a row, spins for a
moment, and resolves to its verdict icon. All clear waves the user through;
a blocker names itself and offers "Take me there".

### Timing table

| Phase | Value |
|---|---|
| Row cadence | one new row every 340ms |
| Row entrance | opacity 0, translateY(4px) to settled, 220ms `--ease-standard` (class `is-in` added on the next frame) |
| Spinner | `ph-circle-notch` rotating 360° per 700ms, linear, infinite |
| Row verdict resolves | 240ms after the row appears |
| Title verdict | at `rows × 340ms + 640ms` |
| Auto-dismiss on pass | title shows "All clear" for 550ms, then the strip hides and navigation runs |
| Reduced motion | every one of those values becomes 0 (60ms for the title) |

Verdict icons and colors: `ok` gets a green `ph-fill ph-check-circle`,
`warn` an amber `ph-fill ph-warning-circle`, `block` a red
`ph-fill ph-x-circle` and bold text.

### Behavioral details

- **The strip is one reusable node** (`#checkFlow`) that gets re-parented
  into whichever step is running, then filled fresh each run.
- **Run token:** `var run = ++checkRun;` at the top; every timeout checks
  `run !== checkRun` and bails. `closeChecker()` just increments the
  counter and hides the strip, which cancels everything in flight.
- **The scroll anchor is computed, not `scrollIntoView`.** Appending rows
  mid-scroll makes browsers abandon a smooth `scrollIntoView`, so the
  target offset is computed against the shell scroller directly and driven
  with `scroller.scrollTo({behavior:'smooth'})`, 60ms after the strip
  mounts. Hidden tabs and reduced motion use `behavior:'auto'`.
- **Pass memory:** the checker only replays when it must. A signature of
  the check labels and levels is stored per step on a pass; pressing Next
  with the same signature and no blockers walks straight through with no
  animation. Any edit changes the signature and brings the run back.
- On a blocker, "Take me there" hides the strip and calls the shared
  `jumpToTarget()` (section 10).

---

## 3. Load entrance choreography

**What the user sees:** the page arrives with all four steps collapsed. The
heads cascade in, the connector lines draw downward between them, step 1's
indicator pulses once, then step 1 folds open over a skeleton that resolves
into the real form.

Everything is driven by one class on the journey list, `is-arriving`, plus
two timed calls. The exact schedule:

| t (ms) | What happens |
|---|---|
| 0 | `is-arriving` added (only if `!document.hidden`) |
| 80 / 170 / 260 / 350 | step heads 1 to 4 animate in: `p-step-arrive`, 420ms, `--ease-settle`, from `translateY(12px)` + opacity 0 |
| 500 / 640 / 780 | connector lines 1 to 3 draw: `p-conn-draw`, `scaleY(0)` to 1, 360ms, `transform-origin: top` |
| 1100 | step 1 indicator pulses once: `p-ind-pulse`, 650ms, a box-shadow ring expanding to 10px and fading |
| 2200 | step 1 gets `is-loading` (skeleton shows) and `go(1)` folds it open |
| 2700 | `is-arriving` removed (cleanup) |
| 3150 | `is-loading` removed; skeleton yields to the real content (950ms of skeleton) |

The pulse keyframes:

```css
@keyframes p-ind-pulse{
  0%{box-shadow:0 0 0 0 rgba(8, 8, 8, .28);}
  75%{box-shadow:0 0 0 10px rgba(8, 8, 8, 0);}
  100%{box-shadow:0 0 0 0 rgba(8, 8, 8, 0);}
}
```

Deep links (`?step=N`), reduced motion, and hidden tabs skip the whole hold
and open the step immediately. The entrance runs once; the class removal at
2700ms guarantees later re-renders never replay it.

### The skeleton

Skeleton bars overlay the step's real content (`visibility:hidden` on the
content, absolute skeleton on top), so the fold-open animates to the true
final height and nothing jumps when the skeleton lifts.

```css
@keyframes p-skel-wave{ from{background-position:100% 0;} to{background-position:0 0;} }
.p-skel-bar{
  background:linear-gradient(90deg,
    var(--color-neutral-2) 25%, var(--color-neutral-3) 37%, var(--color-neutral-2) 63%);
  background-size:400% 100%;
  animation:p-skel-wave 1.1s linear infinite;
}
```

---

## 4. Step fold open and close

Accordion steps animate height with the grid-rows trick, which needs no
measured heights:

```css
.p-step-body{display:grid; grid-template-rows:0fr;
  transition:grid-template-rows 480ms var(--ease-settle);}
.p-step-inner{overflow:hidden; min-width:0;}
.p-step.is-open .p-step-body{grid-template-rows:1fr;}
.p-step.is-open.is-settled .p-step-inner{overflow:visible;}
```

The two-class dance matters: `overflow:hidden` is required during the fold
so content clips, but permanently hidden overflow would clip dropdown
panels and the AI reply. So `go()` removes `is-settled` from every step,
toggles `is-open`, and adds `is-settled` back to the open step after the
480ms transition ends, releasing the overflow.

---

## 5. The Collab AI pill

### 5a. The dock move (FLIP)

From step 2 onward the pill leaves the step-1 banner and parks bottom-right
under the rail. The move is a classic FLIP:

1. Measure the pill's rect (First).
2. Re-parent it into the destination slot and let layout happen (Last).
3. Set `transform: translate(dx, dy) scale(firstWidth / lastWidth)` with
   `transition: none`, `transform-origin: top left` (Invert).
4. 20ms later, enable `transition: transform 480ms var(--ease-settle)` and
   clear the transform (Play).
5. 560ms later, clear the inline transition and origin.

Reduced motion skips the measure and just re-parents.

### 5b. The running ghost line (marquee)

The hint, the docked hold message, and a seeded example all render in an
absolutely positioned ghost layer over the input, masked so text fades at
both edges, sliding only when it overflows:

```css
.p-ask-ghost{ /* absolute over the input, pointer-events:none */
  -webkit-mask-image:linear-gradient(90deg,
    transparent 0, #000 10px, #000 calc(100% - 10px), transparent 100%);
}
@keyframes p-ask-marquee{
  0%, 16%  { transform:translateX(0); }
  50%, 66% { transform:translateX(var(--ask-dx, 0px)); }
  100%     { transform:translateX(0); }
}
.p-ask-ghost.is-running .p-ask-ghost-t{
  animation:p-ask-marquee var(--ask-dur, 9s) var(--ease-standard) infinite;
}
```

The holds at 0 to 16% and 50 to 66% are what make it read as "reading
pace" rather than a ticker. JS measures on every relevant change:

```js
var overflow = ghost.clientWidth - ghostT.scrollWidth;
if (overflow < -8 && !reduced){
  ghost.style.setProperty('--ask-dx', overflow + 'px');
  ghost.style.setProperty('--ask-dur', Math.max(6, Math.abs(overflow) / 12) + 's');
  ghost.classList.add('is-running');
} else {
  ghost.classList.remove('is-running');
}
```

Duration scales with distance (12px per second, floor of 6s) so long lines
do not whip. On step 1 the ghost's `left` is set past the Try it chip's
right edge plus 8px so the line starts after the CTA.

### 5c. The seeded example (blue wash)

Clicking Try it puts the example into the input's value but shows it as a
running ghost wearing a selection-blue wash, so it reads as dealt text:

```css
.p-ask-pill.is-ghosting .p-ask-ghost{display:flex !important;}
.p-ask-pill.is-ghosting .p-ask-ghost-t{
  background:rgba(20,115,230,.18); border-radius:2px;
  box-shadow:0 0 0 2px rgba(20,115,230,.18); color:var(--color-neutral-9);}
.p-ask-pill.is-ghosting input{color:transparent;}
```

The input's own text is transparent underneath so the two never double.
Focus, pointerdown, or a first keystroke removes `is-ghosting`, restores
the hint to the ghost, focuses the input and calls `select()`, so typing
replaces the seed. Pointerdown calls `preventDefault()` first, otherwise
the mouseup would collapse the selection to a caret.

### 5d. The pill glow

Two absolutely positioned gradient layers behind the pill (`inset:-4px`
blurred 16px at 0.7 opacity, and `inset:-1px` blurred 1px), both running
the same `background-position` slide over 4s linear infinite with
`mix-blend-mode: plus-lighter`.

---

## 6. The split sweep (step 3 dials, AI involved)

**What the user sees:** whenever the AI writes the budget split (a draft,
a restore, a rebalance), all dials snap to zero, then each row sweeps up to
its amount in turn while flashing the pastel wash, with the ringgit,
percent and impressions counting alongside.

| Phase | Value |
|---|---|
| Initial hold at zero | 550ms before the first row moves |
| Per-row count | 14 ticks at 28ms (about 390ms), cubic ease-out |
| Rounding | to the nearest RM 100 each tick |
| Row wash | `p-ai-flash-row` added at start, removed 900ms after the row lands |
| Gap between rows | 90ms |

Each tick writes the slider value, the fill width, and the label
(`RM x · y% + imps`), so the numbers and the dial move as one. The whole
function is guarded by `sweepRun` (see section 0, rule 3) and returns
immediately under reduced motion or a hidden tab, leaving `syncSplitRows()`
to paint the final state.

---

## 7. Fold-out modals (AI thread, why-these-personas)

**What the user sees:** the modal does not fade in; it folds out of the
element that summoned it, swinging in 3D like a card being opened, and
folds back into it on close.

The shell carries CSS vars measured from the trigger at open time:
`--fold-dx/--fold-dy` (trigger position minus shell position) and
`--fold-sx/--fold-sy` (trigger size over shell size).

```css
.p-fold-shell{transform-origin:0 0;}
.p-fold-shell.is-folding-open{animation:p-fold-open .8s cubic-bezier(.25,.9,.35,1) both;}
.p-fold-shell.is-folding-closed{animation:p-fold-close .55s cubic-bezier(.3,.6,.35,1) both;}
@keyframes p-fold-open{
  0%{transform:translate(var(--fold-dx), var(--fold-dy)) scale(var(--fold-sx), var(--fold-sy)); opacity:.4;}
  45%{transform:translate(calc(var(--fold-dx) * .5), calc(var(--fold-dy) * .5)) scale(.72) rotateY(42deg) rotateZ(-5deg); opacity:1;}
  78%{transform:scale(1) rotateY(-6deg) rotateZ(1deg);}
  100%{transform:none; opacity:1;}
}
```

The close mirrors it faster (0.55s) because dismissal should not be
admired. The parent overlay has `perspective:1600px` so the rotateY reads
as depth. Inner content is faded separately: children start at opacity 0
and transition in over 220ms with a 160ms delay once the overlay has
`is-shown`, so text never smears through the 3D swing. The veil fades on
its own clock.

The tour's coach card uses the same grammar at smaller scale
(`tw-swing-open` 0.6s / `tw-swing-close` 0.45s) and folds, on dismissal,
into the account button that holds "Show me around", so the exit gesture
points at the way back.

---

## 8. Rainbow provenance chips and buttons

`p-ai-badge` (on "Picked by Collab AI", "Drafted by Collab AI", every
"AI draft" pill) renders the pastel sweep twice on one element:

- `::before`, z-index -1, opacity .18: a soft animated fill behind the text.
- `::after`, z-index 1: the same gradient masked down to a 1px rim using
  `padding:1px` plus an XOR mask
  (`-webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;`).

Both layers animate `background-position` over 4s linear infinite (the
shared `c-prompt-bar-glow-move` keyframes). `p-ai-btn` is the same recipe
on a ghost button at opacity .14, rising to .26 on hover.

---

## 9. Small shared moves

- **Attention flash** (`p-flash`): a one-shot box-shadow decay from
  `--shadow-focus` to `--shadow-1`, used when jumping the user to a field.
  Remove and re-add the class with a rAF between, so repeats replay.
- **Toasts** slide up from the host; autosave feedback is throttled so a
  burst of edits reads as one save (5s window).
- **Checker and reply dismissal timers**: the AI reply excuses itself after
  9s unless hovered or focused; engaging clears the timer.
- **Progress fills** (resume card, rail allocation) transition width 650ms
  `cubic-bezier(.22,1,.36,1)` and carry a travelling sheen
  (`background-position` loop, 1.8s) so a static bar still looks alive.

## 10. `jumpToTarget(id)` — the shared "take me there"

1. If the target sits in a collapsed step the user has visited, open it.
2. If it sits in a closed drawer, click the drawer's disclosure.
3. `scrollIntoView({behavior:'smooth', block:'center'})`.
4. Flash the enclosing block (`p-flash`, section 9).

---

## Appendix: review checklist for any new animation

- [ ] Uses the DLS motion tokens, or documents why not.
- [ ] Reduced-motion path applies the final state instantly.
- [ ] Works in a hidden tab (no rAF-driven logic; `document.hidden` guards).
- [ ] Restartable: a run token cancels the previous run's timers.
- [ ] AI provenance uses the shared pastel recipe, never a new gradient.
- [ ] Anything that clips overflow releases it after settling.
- [ ] Anything that scrolls computes against `.c-shell-content`, not the window.
