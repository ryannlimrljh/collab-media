/* Collab:Media — audience marks.

   Two drawings the audience catalogue makes over and over, kept apart
   from the page so the planner's audience step can draw them too:

   AudienceMarks.arc(el, seg, opts)
     The consumption arc: up to five concentric rings (video, audio, TV,
     podcast, social), each drawn to its percentage. Rings draw in when
     an ancestor carries .is-live, or at once when opts.still is true.

   AudienceMarks.pack(items, pad)
     Deterministic circle packing in unit space: items are placed in the
     order given, each at the first spot on a spiral from the centre
     where it touches nothing. Pure — no DOM, no randomness.

   AudienceMarks.jar
     The universe as a jar of discs: build() sizes and lines them up
     to pour, step() advances the physics a frame (gravity, walls,
     contact, and the pointer as a stirring hand), settle() runs the
     pour to rest. All pure; the page draws.                            */
(function () {
  'use strict';

  var CHANNELS = [
    { key: 'video',   label: 'Video streaming' },
    { key: 'audio',   label: 'Audio streaming' },
    { key: 'tv',      label: 'Television' },
    { key: 'podcast', label: 'Podcast' },
    { key: 'social',  label: 'Social media' },
    { key: 'games',   label: 'Video games' },
    { key: 'communities', label: 'Online communities' }
  ];
  var ARC_SLOTS = ['video', 'audio', 'tv', 'podcast', 'social'];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function channelLabel(key) {
    for (var i = 0; i < CHANNELS.length; i++) if (CHANNELS[i].key === key) return CHANNELS[i].label;
    return key;
  }

  /* ── The consumption arc ─────────────────────────────────────────── */
  function arc(el, seg, opts) {
    opts = opts || {};
    var cons = seg.consumption || {};
    /* The five standard slots keep their ring so the same channel sits
       on the same ring on every card; a segment that reports games or
       communities instead of a standard channel takes the free slot. */
    var keys = ARC_SLOTS.slice();
    var extras = Object.keys(cons).filter(function (k) { return ARC_SLOTS.indexOf(k) < 0; });
    keys = keys.map(function (k) { return cons[k] != null ? k : (extras.length ? extras.shift() : null); });
    var rings = [], summary = [];
    keys.forEach(function (k, i) {
      if (!k || cons[k] == null) return;
      var r = 44 - i * 8, c = 2 * Math.PI * r, pct = Math.max(0, Math.min(100, cons[k]));
      summary.push(channelLabel(k) + ' ' + pct + '%');
      rings.push(
        '<circle class="am-track" cx="50" cy="50" r="' + r + '"></circle>' +
        '<circle class="am-val" cx="50" cy="50" r="' + r + '" style="--am-i:' + i + '; --c:' + c.toFixed(2) + '; --o:' + (c * (1 - pct / 100)).toFixed(2) + '">' +
          '<title>' + esc(channelLabel(k)) + ' ' + pct + '%</title></circle>'
      );
    });
    el.classList.add('am-arc');
    if (opts.still) el.classList.add('is-still');
    el.innerHTML = '<svg viewBox="0 0 100 100" role="img" aria-label="' + esc('Media consumption: ' + summary.join(', ')) + '">' + rings.join('') + '</svg>';
    return el;
  }

  /* ── Circle packing ──────────────────────────────────────────────── */
  function pack(items, pad) {
    pad = pad == null ? 1.5 : pad;
    var placed = [];
    items.forEach(function (it) {
      if (!placed.length) { placed.push({ id: it.id, x: 0, y: 0, r: it.r, ref: it }); return; }
      /* Archimedean spiral out from the centre; the first free spot wins.
         Step is scaled to the item so small circles do not crawl. */
      var a = Math.max(0.6, it.r * 0.25), t = 0, tries = 0, best = null;
      while (tries < 4000) {
        var x = a * t * Math.cos(t), y = a * t * Math.sin(t), ok = true;
        for (var i = 0; i < placed.length; i++) {
          var p = placed[i], dx = p.x - x, dy = p.y - y, min = p.r + it.r + pad;
          if (dx * dx + dy * dy < min * min) { ok = false; break; }
        }
        if (ok) { best = { x: x, y: y }; break; }
        t += 0.12; tries++;
      }
      if (!best) best = { x: a * t, y: 0 };
      placed.push({ id: it.id, x: best.x, y: best.y, r: it.r, ref: it });
    });
    /* Re-centre on the bounding box, and report the bounding radius. */
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    placed.forEach(function (p) {
      minX = Math.min(minX, p.x - p.r); maxX = Math.max(maxX, p.x + p.r);
      minY = Math.min(minY, p.y - p.r); maxY = Math.max(maxY, p.y + p.r);
    });
    var cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, R = 0;
    placed.forEach(function (p) { p.x -= cx; p.y -= cy; R = Math.max(R, Math.sqrt(p.x * p.x + p.y * p.y) + p.r); });
    return { items: placed, R: R, w: maxX - minX, h: maxY - minY };
  }

  /* ── The doodle ──────────────────────────────────────────────────
     A drawn scene for each segment: a line-art person in a pose and
     the props that tell the segment's story — a football and a scarf
     for EPL fans, a bowl and chopsticks for foodies, a house and a key
     for home buyers. The people are built from parts (hair and top by
     hash, so a segment keeps its face); the props come from a small
     library below, placed per segment in SCENES. Ink only, on the
     card's own tint. Returns an SVG string, viewBox 0 0 160 120.     */
  var INK = 'var(--color-neutral-9)', SW = 2;
  function P(d, fill) { return '<path d="' + d + '" fill="' + (fill || '#fff') + '" stroke="' + INK + '" stroke-width="' + SW + '" stroke-linejoin="round" stroke-linecap="round"/>'; }
  function L(d) { return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + SW + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  /* A thinner pen for the details inside a shape, so the drawing has
     two weights the way a hand does. */
  function LT(d, w) { return '<path d="' + d + '" fill="none" stroke="' + INK + '" stroke-width="' + (w || SW) + '" stroke-linecap="round" stroke-linejoin="round"/>'; }
  function C(cx, cy, r, fill) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (fill || '#fff') + '" stroke="' + INK + '" stroke-width="' + SW + '"/>'; }
  function D(cx, cy, r) { return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + INK + '"/>'; }
  function T(x, y, str) { return '<text x="' + x + '" y="' + y + '" font-size="8" font-weight="800" fill="' + INK + '" text-anchor="middle" font-family="inherit">' + str + '</text>'; }
  function G(x, y, sc, inner) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + (sc || 1) + ')">' + inner + '</g>'; }

  /* ── Hand-drawn geometry ─────────────────────────────────────────
     A seeded generator, so a segment's wobble is the same on every
     visit while no two segments wobble alike. Everything organic on
     the card — the shape behind, the ground, the accents — is drawn
     through these, which is what keeps the scenes from looking
     machined.                                                        */
  function rnd(seed) {
    var s = Math.floor(seed) % 2147483647; if (s <= 0) s += 2147483646;
    return function () { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; };
  }
  function n1(v) { return Math.round(v * 10) / 10; }
  /* A closed smooth curve through points on a circle, each pushed in
     or out a little: the soft shape that sits behind every scene. */
  function blobPath(cx, cy, rx, ry, sides, wob, R) {
    var pts = [], i;
    for (i = 0; i < sides; i++) {
      var a = i / sides * Math.PI * 2, k = 1 + (R() - 0.5) * wob;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    var d = 'M' + n1(pts[0][0]) + ' ' + n1(pts[0][1]);
    for (i = 0; i < sides; i++) {
      var p0 = pts[(i - 1 + sides) % sides], p1 = pts[i], p2 = pts[(i + 1) % sides], p3 = pts[(i + 2) % sides];
      d += ' C' + n1(p1[0] + (p2[0] - p0[0]) / 6) + ' ' + n1(p1[1] + (p2[1] - p0[1]) / 6) +
           ' ' + n1(p2[0] - (p3[0] - p1[0]) / 6) + ' ' + n1(p2[1] - (p3[1] - p1[1]) / 6) +
           ' ' + n1(p2[0]) + ' ' + n1(p2[1]);
    }
    return d + 'Z';
  }
  /* A line that bows a little off true, the way a drawn one does. */
  function wline(x1, y1, x2, y2, R, amp) {
    var dx = x2 - x1, dy = y2 - y1, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var o = (R() - 0.5) * (amp == null ? len * 0.05 : amp);
    return 'M' + n1(x1) + ' ' + n1(y1) + ' Q' + n1((x1 + x2) / 2 - dy / len * o) + ' ' + n1((y1 + y2) / 2 + dx / len * o) + ' ' + n1(x2) + ' ' + n1(y2);
  }

  /* The props, each drawn around its own origin at about 30px tall. */
  var MOTIF = {
    football: function () { return C(0, 0, 11) + P('M0 -5 L5 -1 L3 5 L-3 5 L-5 -1 Z') + LT('M0 -5 L0 -11 M5 -1 L10 -4 M3 5 L6 10 M-3 5 L-6 10 M-5 -1 L-10 -4'); },
    scarf: function () { return P('M-14 -4 L14 -4 L14 4 L-14 4 Z') + P('M8 4 L14 4 L16 18 L10 18 Z') + LT('M-8 -4 L-8 4 M-2 -4 L-2 4 M4 -4 L4 4 M11 6 L11 16'); },
    trophy: function () { return P('M-8 -14 L8 -14 L6 0 Q0 6 -6 0 Z') + L('M-8 -12 Q-16 -10 -8 -4 M8 -12 Q16 -10 8 -4') + P('M-3 4 L3 4 L5 10 L-5 10 Z') + LT('M-3 -10 L0 -6 L3 -10'); },
    golf: function () { return L('M10 -22 L10 8') + P('M10 -22 L26 -16 L10 -10 Z') + P('M-2 8 Q10 12 22 8 Q10 4 -2 8 Z') + C(-14, 6, 3) + LT('M-14 3 L-14 9 M-17 6 L-11 6'); },
    club: function () { return L('M-6 -20 L6 2') + P('M6 2 L14 6 L12 10 L4 6 Z') + LT('M-6 -20 L-9 -23'); },
    racket: function () { return '<ellipse cx="0" cy="-8" rx="8" ry="11" fill="#fff" stroke="' + INK + '" stroke-width="' + SW + '"/>' + LT('M-4 -14 L-4 -2 M0 -18 L0 2 M4 -14 L4 -2 M-7 -8 L7 -8 M-6 -3 L6 -3') + L('M0 3 L0 16') + LT('M-2 16 L2 16'); },
    shuttle: function () { return P('M0 6 L-7 -8 L7 -8 Z') + C(0, 8, 3) + LT('M-4 -8 L-2 -2 M4 -8 L2 -2 M0 -8 L0 -2'); },
    takraw: function () { return C(0, 0, 11) + LT('M-11 0 Q0 -8 11 0 M-11 0 Q0 8 11 0 M0 -11 Q-8 0 0 11 M0 -11 Q8 0 0 11'); },
    controller: function () { return P('M-14 -4 Q-14 -10 -6 -10 L6 -10 Q14 -10 14 -4 L16 6 Q14 12 8 8 L4 4 L-4 4 L-8 8 Q-14 12 -16 6 Z') + LT('M-9 -2 L-9 2 M-11 0 L-7 0') + D(7, -3, 1.8) + D(10, 1, 1.8); },
    headset: function () { return L('M-12 2 C-12 -14 12 -14 12 2') + P('M-14 0 L-8 0 L-8 10 L-14 10 Z') + P('M8 0 L14 0 L14 10 L8 10 Z') + LT('M8 10 Q6 16 -2 16'); },
    phone: function () { return P('M-6 -14 L6 -14 L6 14 L-6 14 Z') + LT('M-2 11 L2 11') + LT('M-3 -9 L3 -9 M-3 -5 L1 -5 M-3 -1 L3 -1'); },
    laptop: function () { return P('M-14 -10 L14 -10 L14 6 L-14 6 Z') + P('M-18 6 L18 6 L16 10 L-16 10 Z') + LT('M-10 -6 L4 -6 M-10 -2 L8 -2 M-10 2 L0 2'); },
    books: function () { return P('M-12 8 L12 8 L12 14 L-12 14 Z') + P('M-10 2 L10 2 L10 8 L-10 8 Z') + P('M-12 -4 L8 -4 L8 2 L-12 2 Z') + LT('M-6 5 L6 5'); },
    briefcase: function () { return P('M-14 -6 L14 -6 L14 10 L-14 10 Z') + L('M-5 -6 L-5 -11 L5 -11 L5 -6') + LT('M-14 0 L14 0') + D(0, 1, 1.8); },
    shop: function () { return P('M-16 -6 L16 -6 L16 12 L-16 12 Z') + P('M-18 -6 L18 -6 L16 -14 L-16 -14 Z') + P('M-4 12 L4 12 L4 0 L-4 0 Z') + LT('M-12 -2 L-8 -2 M8 -2 L12 -2 M-12 4 L-8 4 M8 4 L12 4'); },
    rocket: function () { return P('M0 -18 Q10 -6 8 10 L-8 10 Q-10 -6 0 -18 Z') + C(0, -4, 3) + P('M-8 4 L-14 12 L-6 10 Z') + P('M8 4 L14 12 L6 10 Z') + L('M-3 12 L0 18 L3 12') + LT('M-4 0 L4 0'); },
    coins: function (n) { var o = '', k; for (k = 0; k < (n || 3); k++) o += '<ellipse cx="0" cy="' + (8 - k * 5) + '" rx="10" ry="3.5" fill="#fff" stroke="' + INK + '" stroke-width="' + SW + '"/>'; return o + T(0, 4 - (n || 3) * 5 + 1, '$'); },
    chart: function () { return P('M-14 12 L-14 2 L-8 2 L-8 12 Z') + P('M-5 12 L-5 -4 L1 -4 L1 12 Z') + P('M4 12 L4 -12 L10 -12 L10 12 Z') + L('M-16 -10 L-6 -6 L2 -12 L12 -16') + D(12, -16, 2); },
    house: function () { return P('M-16 0 L0 -16 L16 0 L16 14 L-16 14 Z') + P('M-4 14 L4 14 L4 4 L-4 4 Z') + LT('M-14 0 L14 0') + P('M-12 -4 L-6 -4 L-6 -9 L-12 -9 Z') + LT('M-9 -9 L-9 -4 M-12 -6.5 L-6 -6.5'); },
    key: function () { return C(-6, 0, 5) + L('M-1 0 L14 0 M10 0 L10 5 M6 0 L6 4') + D(-6, 0, 1.4); },
    car: function () { return P('M-18 6 L-14 -4 L-6 -10 L8 -10 L16 -4 L18 6 Z') + C(-10, 8, 4) + C(10, 8, 4) + LT('M-8 -4 L8 -4 M-2 -10 L-2 -4') + LT('M14 0 L17 0'); },
    bag: function () { return P('M-10 -4 L10 -4 L12 14 L-12 14 Z') + L('M-5 -4 C-5 -14 5 -14 5 -4') + LT('M-4 4 L4 4'); },
    diamond: function () { return P('M-10 -4 L-5 -10 L5 -10 L10 -4 L0 10 Z') + LT('M-10 -4 L10 -4 M-5 -10 L0 -4 M5 -10 L0 -4 M0 -4 L0 10'); },
    watch: function () { return P('M-4 -14 L4 -14 L4 14 L-4 14 Z') + P('M-7 -6 L7 -6 L7 6 L-7 6 Z') + LT('M0 0 L3 0 M0 -3 L0 0'); },
    dumbbell: function () { return L('M-8 0 L8 0') + P('M-14 -6 L-8 -6 L-8 6 L-14 6 Z') + P('M8 -6 L14 -6 L14 6 L8 6 Z'); },
    mountain: function () { return P('M-22 14 L-6 -12 L4 4 L10 -4 L22 14 Z') + P('M-6 -12 L-2 -6 L-10 -6 Z') + LT('M6 0 L10 -4 L14 2'); },
    tent: function () { return P('M-16 12 L0 -12 L16 12 Z') + P('M-5 12 L0 4 L5 12 Z') + LT('M0 -12 L0 -17'); },
    bowl: function () { return P('M-14 0 Q-14 12 0 12 Q14 12 14 0 Z') + L('M-16 0 L16 0') + LT('M4 -2 L14 -18 M8 -2 L18 -16') + LT('M-8 5 Q0 8 8 5'); },
    plate: function () { return '<ellipse cx="0" cy="4" rx="16" ry="6" fill="#fff" stroke="' + INK + '" stroke-width="' + SW + '"/>' + P('M-8 2 Q0 -8 8 2 Z') + LT('M-22 -6 L-22 8 M22 -6 L22 8'); },
    leaf: function () { return P('M0 14 Q-16 0 0 -14 Q16 0 0 14 Z') + LT('M0 12 L0 -8 M0 4 L-6 0 M0 -2 L6 -6'); },
    hanger: function () { return L('M0 -14 Q6 -14 4 -9 L0 -6 L-18 6 L18 6 Z'); },
    popcorn: function () { return P('M-10 -2 L10 -2 L8 14 L-8 14 Z') + LT('M-4 -2 L-3 14 M4 -2 L3 14') + C(-6, -6, 4) + C(0, -8, 4) + C(6, -6, 4); },
    heart: function () { return P('M0 12 C-16 0 -8 -14 0 -6 C8 -14 16 0 0 12 Z'); },
    tv: function () { return P('M-16 -10 L16 -10 L16 10 L-16 10 Z') + L('M-6 10 L-8 16 M6 10 L8 16 M-8 -16 L0 -10 L8 -16') + P('M-2 -4 L2 0 L-2 4 Z'); },
    planet: function () { return C(0, 0, 9) + '<ellipse cx="0" cy="0" rx="16" ry="5" fill="none" stroke="' + INK + '" stroke-width="' + SW + '" transform="rotate(-20)"/>' + LT('M-4 -3 Q0 0 4 -4'); },
    star: function () { return P('M0 -8 L2 -2 L8 -2 L3 2 L5 8 L0 4 L-5 8 L-3 2 L-8 -2 L-2 -2 Z'); },
    ghost: function () { return P('M-10 12 L-10 -2 Q-10 -14 0 -14 Q10 -14 10 -2 L10 12 L6 8 L2 12 L-2 8 L-6 12 Z') + D(-4, -4, 1.8) + D(4, -4, 1.8) + LT('M-2 2 Q0 4 2 2'); },
    mic: function () { return P('M-5 -16 L5 -16 L5 -2 Q0 4 -5 -2 Z') + L('M-9 -4 Q0 8 9 -4 M0 6 L0 12 M-6 12 L6 12'); },
    notes: function () { return L('M0 8 L0 -12 L12 -16 L12 4') + C(-4, 8, 4) + C(8, 4, 4) + LT('M0 -8 L12 -12'); },
    cart: function () { return L('M-18 -12 L-12 -12 L-6 8 L12 8 L16 -4 L-10 -4') + C(-4, 14, 3) + C(10, 14, 3) + LT('M-8 0 L14 0'); },
    suitcase: function () { return P('M-12 -6 L12 -6 L12 14 L-12 14 Z') + L('M-5 -6 L-5 -12 L5 -12 L5 -6') + LT('M-8 -6 L-8 14 M8 -6 L8 14'); },
    plane: function () { return P('M-16 2 L16 -4 L12 0 L-4 8 Z') + LT('M-6 6 L-10 12 M2 -2 L-8 -12'); },
    apple: function () { return P('M0 -6 Q-12 -10 -10 4 Q-6 14 0 12 Q6 14 10 4 Q12 -10 0 -6 Z') + L('M0 -6 L2 -14') + LT('M2 -12 Q8 -14 8 -9'); },
    stroller: function () { return P('M-14 -6 L6 -6 Q8 6 -4 6 L-14 6 Z') + L('M6 -6 L14 -16 M-14 6 L-14 12 M6 6 L6 12') + C(-12, 14, 3) + C(6, 14, 3) + LT('M-8 -6 L-8 6'); },
    coffee: function () { return P('M-8 -6 L8 -6 L6 10 L-6 10 Z') + L('M8 -3 Q16 -2 8 6') + LT('M-3 -14 Q-1 -10 -3 -8 M3 -14 Q5 -10 3 -8'); },
    newspaper: function () { return P('M-14 -10 L14 -10 L14 10 L-14 10 Z') + LT('M-10 -4 L-2 -4 M-10 0 L-2 0 M-10 4 L-2 4 M2 -4 L10 -4 M2 0 L10 0 M2 4 L10 4') + LT('M-10 -7 L10 -7'); },
    lantern: function () { return L('M0 -18 L0 -12') + P('M-8 -12 L8 -12 L8 -8 L-8 -8 Z') + P('M-12 -8 Q-12 10 0 10 Q12 10 12 -8 Z') + LT('M-4 -8 L-4 10 M4 -8 L4 10') + P('M-8 10 L8 10 L8 14 L-8 14 Z') + L('M0 14 L0 20'); },
    ketupat: function () { return P('M0 -14 L14 0 L0 14 L-14 0 Z') + LT('M-7 -7 L7 7 M7 -7 L-7 7 M-10 -4 L4 10 M-4 -10 L10 4 M-10 4 L4 -10 M-4 10 L10 -4') + L('M0 -14 L0 -22'); },
    diya: function () { return P('M-14 2 Q0 12 14 2 L12 8 Q0 14 -12 8 Z') + P('M0 -12 Q6 -4 0 2 Q-6 -4 0 -12 Z') + LT('M-6 -6 Q-9 -10 -7 -13 M6 -6 Q9 -10 7 -13'); },
    ticket: function () { return P('M-14 -8 L14 -8 Q10 0 14 8 L-14 8 Q-10 0 -14 -8 Z') + LT('M-2 -8 L-2 8') + LT('M4 -2 L10 -2 M4 2 L8 2'); },
    clapper: function () { return P('M-14 -4 L14 -4 L14 12 L-14 12 Z') + P('M-14 -4 L12 -12 L14 -6 L-12 2 Z') + LT('M-8 -6 L-4 -10 M0 -8 L4 -12 M8 -10 L12 -13'); },
    lipstick: function () { return P('M-4 -2 L4 -2 L4 14 L-4 14 Z') + P('M-3 -2 L3 -2 L3 -12 L-3 -8 Z'); },
    baby: function () { return '<path d="M-6 -13 C-9 -13 -10 -10 -10 -6 C-10 -2 -8 0 -5 0 L5 0 C8 0 10 -2 10 -6 C10 -10 9 -13 6 -13 C3 -15 -3 -15 -6 -13 Z" fill="var(--au-color)" fill-opacity=".9"/>' + D(-3, -8, 1.4) + D(3, -8, 1.4) + LT('M-1.5 -4 Q0 -2.4 1.5 -4') + L('M-4 0 l0 5 l-3 0 M4 0 l0 5 l3 0'); },
    kid: function () { return '<path d="M-8 -19 C-12 -19 -13 -15 -13 -9 C-13 -4 -11 -1 -7 -1 L7 -1 C11 -1 13 -4 13 -9 C13 -15 12 -19 8 -19 C4 -21 -4 -21 -8 -19 Z" fill="var(--au-color)" fill-opacity=".9"/>' + D(-4, -12, 1.5) + D(4, -12, 1.5) + LT('M-2 -7 Q0 -5 2 -7') + L('M-5 -1 l-1 10 l-4 0 M5 -1 l1 10 l4 0') + L('M-12 -8 C-16 -5 -17 -2 -16 1 M12 -8 C16 -5 17 -2 16 1'); },
    pen: function () { return P('M-12 10 L8 -10 L12 -6 L-8 14 Z') + P('M-12 10 L-8 14 L-14 16 Z') + LT('M4 -6 L8 -2'); },
    graduation: function () { return P('M-14 -4 L0 -10 L14 -4 L0 2 Z') + L('M8 -1 L8 6 M-8 -2 Q0 6 8 -2') + D(8, 7, 2); },
    ring: function () { return C(0, 4, 8) + P('M-4 -4 L0 -12 L4 -4 Z') + LT('M-3 2 Q0 0 3 2'); },
    gift: function () { return P('M-12 -4 L12 -4 L12 12 L-12 12 Z') + LT('M0 -4 L0 12 M-12 2 L12 2') + L('M-6 -4 Q-10 -14 0 -8 Q10 -14 6 -4'); },
    spark: function () { return L('M0 -12 L0 12 M-12 0 L12 0') + LT('M-8 -8 L8 8 M8 -8 L-8 8'); }
  };

  /* Accents: the little marks in the margins that make a drawing feel
     drawn — sparkles, squiggles, motion lines, a stray dot or two. */
  var ACCENT = {
    sparkle: function (R) { return LT('M0 -7 L0 7 M-7 0 L7 0 M-4 -4 L4 4 M4 -4 L-4 4', 1.5); },
    twinkle: function (R) { return LT('M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6', 1.5); },
    squiggle: function (R) { return LT(wline(-9, 0, -3, 0, R, 4) + ' ' + wline(-3, 0, 3, 0, R, 4) + ' ' + wline(3, 0, 9, 0, R, 4), 1.5); },
    dots: function (R) { return D(-5, 0, 1.5) + D(0, -3, 1.5) + D(5, 1, 1.5); },
    arcs: function (R) { return LT('M-6 -6 Q0 0 -6 6 M0 -8 Q7 0 0 8', 1.5); },
    plus: function (R) { return LT('M0 -5 L0 5 M-5 0 L5 0', 1.5); },
    tinyleaf: function (R) { return LT('M0 6 Q-7 0 0 -6 Q7 0 0 6 Z M0 5 L0 -3', 1.4); },
    tinyheart: function (R) { return LT('M0 6 C-8 0 -4 -7 0 -3 C4 -7 8 0 0 6 Z', 1.4); },
    note: function (R) { return LT('M0 4 L0 -7 L6 -9 L6 2', 1.4) + D(-2, 4, 2.2) + D(4, 2, 2.2); },
    coin: function (R) { return LT('M0 -5 A5 5 0 1 1 0 5 A5 5 0 1 1 0 -5 M0 -3 L0 3', 1.4); }
  };
  var ACCENTS_BY_LENS = {
    who: ['tinyleaf', 'dots', 'plus', 'tinyheart', 'squiggle'],
    love: ['sparkle', 'twinkle', 'note', 'arcs', 'dots'],
    buying: ['sparkle', 'coin', 'plus', 'squiggle', 'twinkle']
  };
  /* Where an accent may sit without landing on the scene. */
  var ANCHORS = [[20, 26], [38, 16], [16, 52], [128, 20], [146, 40], [150, 72], [112, 14], [64, 12]];

  /* A backdrop per group: the faint drawing behind the scene that says
     where we are before the props do. */
  var BACKDROP = {
    sports: function (R) { return LT('M8 74 Q80 26 152 74', 1.1) + LT('M20 74 Q80 42 140 74', 1.1) + LT('M6 62 L6 74 M154 62 L154 74', 1.1); },
    entertainment: function (R) { return LT('M4 8 Q22 30 4 44 M28 8 Q46 30 28 44 M52 8 Q70 30 52 44', 1.1) + LT('M108 8 Q126 30 108 44 M132 8 Q150 30 132 44', 1.1) + LT('M0 8 L160 8', 1.1); },
    trendsetter: function (R) { return LT('M34 96 L34 46 Q80 8 126 46 L126 96', 1.1); },
    business: function (R) { return LT('M96 96 L96 44 L118 44 L118 96 M122 96 L122 58 L140 58 L140 96 M78 96 L78 62 L92 62 L92 96', 1.1) + LT('M100 50 L114 50 M100 58 L114 58 M126 64 L136 64 M82 68 L88 68', 1.1); },
    shopping: function (R) { return LT('M92 34 L154 34 M92 56 L154 56', 1.1) + LT('M100 34 L100 24 M112 34 L112 26 M126 56 L126 46 M140 56 L140 44', 1.1) + LT('M100 20 L112 20 M126 42 L140 42', 1.1); },
    income: function (R) { return LT('M100 96 L100 82 L118 82 L118 96 M118 82 L118 66 L136 66 L136 96 M136 66 L136 48 L154 48 L154 96', 1.1); },
    'life-stage': function (R) { return LT('M132 30 A14 14 0 1 1 132 29.9', 1.1) + LT('M132 10 L132 4 M132 56 L132 50 M112 30 L106 30 M158 30 L152 30 M118 16 L114 12 M146 44 L150 48', 1.1) + LT('M14 34 Q14 24 24 24 Q28 14 40 18 Q50 16 50 28 Q58 30 54 38 L16 38 Q10 38 14 34 Z', 1.1); },
    ethnicity: function (R) { return LT('M0 10 Q40 26 80 12 Q120 26 160 10', 1.1) + LT('M14 17 L11 26 L20 24 Z M40 22 L38 32 L46 28 Z M66 18 L66 28 L74 24 Z M104 20 L102 30 L110 26 Z M132 15 L131 25 L139 21 Z', 1.1); }
  };

  /* ── People ──────────────────────────────────────────────────────
     One soft blob of colour is the whole body and the head at once,
     with a tiny face drawn on it; the arms and legs are white tubes
     with a thin dark outline, ending in mitten hands and small feet.
     The blob's shape, the face and the tilt all come from the
     segment's own seed, so no two characters stand the same way.
     Local origin is where the character stands: feet at y = 0.      */
  /* A squircle with each corner rounded a little differently: the soft
     mass the whole character hangs off. */
  function squircle(cx, cy, w, h, R) {
    var m = Math.min(w, h) / 2, r = [0, 0, 0, 0], k;
    for (k = 0; k < 4; k++) r[k] = m * (0.72 + R() * 0.24);
    var x0 = cx - w / 2, x1 = cx + w / 2, y0 = cy - h / 2, y1 = cy + h / 2;
    return 'M' + n1(x0 + r[0]) + ' ' + n1(y0) +
      ' L' + n1(x1 - r[1]) + ' ' + n1(y0) + ' Q' + n1(x1) + ' ' + n1(y0) + ' ' + n1(x1) + ' ' + n1(y0 + r[1]) +
      ' L' + n1(x1) + ' ' + n1(y1 - r[2]) + ' Q' + n1(x1) + ' ' + n1(y1) + ' ' + n1(x1 - r[2]) + ' ' + n1(y1) +
      ' L' + n1(x0 + r[3]) + ' ' + n1(y1) + ' Q' + n1(x0) + ' ' + n1(y1) + ' ' + n1(x0) + ' ' + n1(y1 - r[3]) +
      ' L' + n1(x0) + ' ' + n1(y0 + r[0]) + ' Q' + n1(x0) + ' ' + n1(y0) + ' ' + n1(x0 + r[0]) + ' ' + n1(y0) + ' Z';
  }
  function face(fx, fy, h) {
    var eye = h % 4, mouth = Math.floor(h / 5) % 3, tick = Math.floor(h / 11) % 3;
    var e = [
      D(fx - 6, fy, 1.9) + D(fx + 6, fy, 1.9),
      LT('M' + (fx - 6) + ' ' + (fy - 2) + ' L' + (fx - 6) + ' ' + (fy + 2) + ' M' + (fx + 6) + ' ' + (fy - 2) + ' L' + (fx + 6) + ' ' + (fy + 2), 2),
      LT('M' + (fx - 8.5) + ' ' + (fy + 1) + ' Q' + (fx - 6) + ' ' + (fy - 2.5) + ' ' + (fx - 3.5) + ' ' + (fy + 1) + ' M' + (fx + 3.5) + ' ' + (fy + 1) + ' Q' + (fx + 6) + ' ' + (fy - 2.5) + ' ' + (fx + 8.5) + ' ' + (fy + 1), 1.8),
      D(fx - 6, fy, 1.9) + LT('M' + (fx + 3.5) + ' ' + (fy + 1) + ' Q' + (fx + 6) + ' ' + (fy - 2.5) + ' ' + (fx + 8.5) + ' ' + (fy + 1), 1.8)
    ][eye];
    var m = [
      LT('M' + (fx - 3.5) + ' ' + (fy + 6) + ' Q' + fx + ' ' + (fy + 9.5) + ' ' + (fx + 3.5) + ' ' + (fy + 6), 1.8),
      '<path d="M' + (fx - 4) + ' ' + (fy + 5.5) + ' Q' + fx + ' ' + (fy + 11) + ' ' + (fx + 4) + ' ' + (fy + 5.5) + ' Z" fill="' + INK + '"/>',
      LT('M' + (fx - 3) + ' ' + (fy + 7) + ' L' + (fx + 3) + ' ' + (fy + 7), 1.8)
    ][mouth];
    /* The stray mark beside the face that says a hand drew this. */
    var t = ['', LT('M' + (fx + 11) + ' ' + (fy - 5) + ' l3 -3 M' + (fx + 12.5) + ' ' + (fy - 1) + ' l4 0', 1.3), D(fx - 12, fy + 4, 1.3)][tick];
    return e + m + t;
  }
  function person(seg, pose, x, y, sc) {
    var h = Math.floor(hash(seg.id) * 100000), R = rnd(h + 11);
    var tilt = (R() - 0.5) * 5, w = 46 + R() * 8, bh = 42 + R() * 8;
    var legLen = 28 + R() * 4, sit = pose === 'sit', cy = sit ? -bh / 2 - 9 : -legLen - bh / 2 + 2;
    var strength = (0.82 + R() * 0.18).toFixed(2);
    var fx = (R() - 0.5) * 6, fy = cy - bh * 0.1;
    /* Legs first, so they tuck under the body. */
    var lx = w * 0.17, toe = -w / 2 - 11, legs;
    if (sit) {
      legs = L('M' + n1(-lx + 2) + ' -6 C' + n1(-lx - 10) + ' -3 ' + n1(toe + 10) + ' -2 ' + n1(toe) + ' -2 l-5 -3') +
        L('M' + n1(lx + 2) + ' -4 C' + n1(-lx - 6) + ' -1 ' + n1(toe + 14) + ' 1 ' + n1(toe + 6) + ' 1 l-5 -3');
    } else {
      legs = L('M' + n1(-lx) + ' ' + n1(cy + bh / 2 - 4) + ' C' + n1(-lx - 1) + ' ' + n1(-legLen * 0.6) + ' ' + n1(-lx - 1.5) + ' ' + n1(-legLen * 0.25) + ' ' + n1(-lx - 1) + ' 0 l-5 0') +
        L('M' + n1(lx) + ' ' + n1(cy + bh / 2 - 4) + ' C' + n1(lx + 1) + ' ' + n1(-legLen * 0.6) + ' ' + n1(lx + 1.5) + ' ' + n1(-legLen * 0.25) + ' ' + n1(lx + 1) + ' 0 l5 0');
    }
    var body = '<path d="' + squircle(0, cy, w, bh, R) + '" fill="var(--au-color)" fill-opacity="' + strength + '"/>';
    /* Arms are lines too; the hand is three short strokes at the end,
       the way a stick figure's is. */
    var sy = cy + bh * 0.12, ax = w / 2 - 3, arms;
    function hand(hx, hy, rot) {
      return '<g transform="translate(' + n1(hx) + ' ' + n1(hy) + ') rotate(' + n1(rot || 0) + ')">' +
        L('M0 0 l0 4 M0 0 l-3.4 2.4 M0 0 l3.4 2.4') + '</g>';
    }
    function arm(d, hx, hy, rot) { return L(d) + hand(hx, hy, rot); }
    if (pose === 'cheer') {
      arms = arm('M' + n1(-ax) + ' ' + n1(sy) + ' C' + n1(-ax - 12) + ' ' + n1(sy - 8) + ' ' + n1(-ax - 14) + ' ' + n1(sy - 22) + ' ' + n1(-ax - 11) + ' ' + n1(sy - 31), -ax - 11, sy - 31, 160) +
        arm('M' + n1(ax) + ' ' + n1(sy) + ' C' + n1(ax + 12) + ' ' + n1(sy - 8) + ' ' + n1(ax + 14) + ' ' + n1(sy - 22) + ' ' + n1(ax + 11) + ' ' + n1(sy - 31), ax + 11, sy - 31, 200);
    } else if (pose === 'wave') {
      arms = arm('M' + n1(-ax) + ' ' + n1(sy) + ' C' + n1(-ax - 9) + ' ' + n1(sy + 8) + ' ' + n1(-ax - 8) + ' ' + n1(sy + 18) + ' ' + n1(-ax - 3) + ' ' + n1(sy + 23), -ax - 3, sy + 23, 10) +
        arm('M' + n1(ax) + ' ' + n1(sy) + ' C' + n1(ax + 13) + ' ' + n1(sy - 4) + ' ' + n1(ax + 15) + ' ' + n1(sy - 18) + ' ' + n1(ax + 12) + ' ' + n1(sy - 27), ax + 12, sy - 27, 190);
    } else if (pose === 'hold') {
      arms = arm('M' + n1(-ax) + ' ' + n1(sy) + ' C' + n1(-ax - 9) + ' ' + n1(sy + 8) + ' ' + n1(-ax - 8) + ' ' + n1(sy + 18) + ' ' + n1(-ax - 3) + ' ' + n1(sy + 23), -ax - 3, sy + 23, 10) +
        arm('M' + n1(ax) + ' ' + n1(sy) + ' C' + n1(ax + 12) + ' ' + n1(sy + 2) + ' ' + n1(ax + 20) + ' ' + n1(sy + 4) + ' ' + n1(ax + 27) + ' ' + n1(sy + 2), ax + 27, sy + 2, 265);
    } else if (sit) {
      arms = arm('M' + n1(-ax) + ' ' + n1(sy) + ' C' + n1(-ax - 9) + ' ' + n1(sy + 8) + ' ' + n1(-ax - 8) + ' ' + n1(sy + 15) + ' ' + n1(-ax - 3) + ' ' + n1(sy + 19), -ax - 3, sy + 19, 10) +
        arm('M' + n1(ax) + ' ' + n1(sy) + ' C' + n1(ax + 11) + ' ' + n1(sy + 4) + ' ' + n1(ax + 16) + ' ' + n1(sy + 10) + ' ' + n1(ax + 18) + ' ' + n1(sy + 17), ax + 18, sy + 17, -20);
    } else {
      arms = arm('M' + n1(-ax) + ' ' + n1(sy) + ' C' + n1(-ax - 10) + ' ' + n1(sy + 8) + ' ' + n1(-ax - 9) + ' ' + n1(sy + 18) + ' ' + n1(-ax - 4) + ' ' + n1(sy + 23), -ax - 4, sy + 23, 8) +
        arm('M' + n1(ax) + ' ' + n1(sy) + ' C' + n1(ax + 10) + ' ' + n1(sy + 8) + ' ' + n1(ax + 9) + ' ' + n1(sy + 18) + ' ' + n1(ax + 4) + ' ' + n1(sy + 23), ax + 4, sy + 23, -8);
    }
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + n1(tilt) + ') scale(' + (sc || 1) + ')">' +
      legs + body + face(fx, fy, h) + arms + '</g>';
  }
  function scene(seg, pose, personX, props) {
    var out = person(seg, pose, personX == null ? 52 : personX, 112, 1);
    (props || []).forEach(function (p) { out += G(p[1], p[2], p[3] || 1, MOTIF[p[0]](p[4])); });
    return out;
  }
  /* Each segment's scene: pose, where the person stands, and props as
     [motif, x, y, scale]. */
  var SCENES = {
    'malay': function (s) { return scene(s, 'wave', 50, [['ketupat', 108, 78, 1.1], ['lantern', 132, 60, .8]]); },
    'chinese': function (s) { return scene(s, 'wave', 50, [['lantern', 104, 60, 1.1], ['lantern', 130, 74, .8]]); },
    'indian': function (s) { return scene(s, 'wave', 50, [['diya', 106, 96, 1.2], ['diya', 132, 96, .9]]); },
    't15': function (s) { return scene(s, 'stand', 46, [['coins', 104, 96, 1, 6], ['diamond', 134, 70, .9]]); },
    't20': function (s) { return scene(s, 'stand', 46, [['coins', 104, 96, 1, 5], ['chart', 134, 84, .9]]); },
    'm40': function (s) { return scene(s, 'stand', 46, [['coins', 104, 96, 1, 3], ['house', 134, 92, .8]]); },
    'b40': function (s) { return scene(s, 'stand', 46, [['coins', 104, 96, 1, 1], ['bag', 132, 96, .9]]); },
    'gen-z': function (s) { return scene(s, 'hold', 48, [['phone', 84, 74, 1], ['spark', 120, 56, .8], ['headset', 132, 88, .9]]); },
    'millennials': function (s) { return scene(s, 'sit', 44, [['laptop', 96, 92, 1], ['coffee', 132, 92, .9]]); },
    'gen-x': function (s) { return scene(s, 'hold', 46, [['briefcase', 92, 96, 1], ['coffee', 130, 92, .9], ['house', 130, 60, .6]]); },
    'baby-boomers': function (s) { return scene(s, 'sit', 44, [['newspaper', 98, 84, 1], ['coffee', 134, 94, .9]]); },
    'young-working-adult': function (s) { return scene(s, 'hold', 46, [['laptop', 96, 96, .9], ['coffee', 128, 94, .8], ['chart', 130, 62, .7]]); },
    'student': function (s) { return scene(s, 'hold', 46, [['books', 92, 96, 1], ['graduation', 128, 66, 1], ['pen', 134, 96, .8]]); },
    'solo-lifestylers': function (s) { return scene(s, 'stand', 60, [['coffee', 108, 94, 1], ['plane', 130, 56, .9], ['suitcase', 134, 96, .8]]); },
    'the-dynamic-duo': function (s) { return scene(s, 'wave', 44, [['ring', 100, 92, 1], ['house', 132, 92, .8]]); },
    'young-families': function (s) { return scene(s, 'hold', 42, [['stroller', 96, 94, 1], ['kid', 132, 100, 1]]); },
    'new-mothers': function (s) { return scene(s, 'hold', 46, [['baby', 82, 76, 1], ['stroller', 124, 94, 1]]); },
    'family-dynamic': function (s) { return scene(s, 'stand', 40, [['kid', 76, 100, 1], ['kid', 96, 100, .8], ['house', 134, 88, .9]]); },
    'experienced-mothers': function (s) { return scene(s, 'hold', 42, [['kid', 84, 100, 1], ['books', 118, 96, .9], ['apple', 140, 94, .8]]); },
    'epl-fans': function (s) { return scene(s, 'cheer', 48, [['football', 100, 92, 1.1], ['scarf', 130, 74, 1], ['trophy', 134, 100, .8]]); },
    'mfl-fans': function (s) { return scene(s, 'cheer', 48, [['football', 98, 94, 1], ['scarf', 130, 78, 1]]); },
    'golf-fans': function (s) { return scene(s, 'hold', 42, [['club', 78, 90, 1], ['golf', 116, 92, 1.1]]); },
    'badminton-fans': function (s) { return scene(s, 'hold', 42, [['racket', 82, 76, 1], ['shuttle', 118, 64, 1], ['trophy', 134, 100, .8]]); },
    'sepak-takraw-fans': function (s) { return scene(s, 'cheer', 48, [['takraw', 100, 70, 1.1], ['trophy', 134, 100, .8]]); },
    'e-sports-fans': function (s) { return scene(s, 'sit', 42, [['controller', 98, 88, 1], ['headset', 134, 76, 1], ['trophy', 136, 104, .6]]); },
    'gadget-gurus': function (s) { return scene(s, 'hold', 44, [['phone', 82, 74, 1], ['watch', 112, 94, 1], ['headset', 140, 90, .9]]); },
    'automotive-fans': function (s) { return scene(s, 'wave', 40, [['car', 112, 92, 1.2]]); },
    'wellness-explorers': function (s) { return scene(s, 'cheer', 48, [['dumbbell', 104, 96, 1], ['apple', 134, 92, .9], ['leaf', 132, 60, .8]]); },
    'adventure-seekers': function (s) { return scene(s, 'wave', 44, [['mountain', 112, 90, 1.1], ['tent', 138, 100, .7]]); },
    'foodies': function (s) { return scene(s, 'sit', 44, [['bowl', 100, 92, 1], ['plate', 136, 94, .8]]); },
    'environmentalist': function (s) { return scene(s, 'hold', 46, [['leaf', 86, 70, 1], ['leaf', 116, 92, 1.2], ['mountain', 136, 100, .6]]); },
    'luxury-seekers': function (s) { return scene(s, 'stand', 46, [['diamond', 100, 82, 1], ['bag', 130, 96, 1], ['watch', 138, 66, .8]]); },
    'fashion-icons': function (s) { return scene(s, 'wave', 44, [['hanger', 100, 86, 1.1], ['lipstick', 130, 96, .9], ['bag', 144, 92, .7]]); },
    'corporate-leaders': function (s) { return scene(s, 'hold', 44, [['briefcase', 92, 96, 1], ['chart', 130, 88, 1]]); },
    'smes': function (s) { return scene(s, 'wave', 40, [['shop', 112, 92, 1.1]]); },
    'emerging-affluents': function (s) { return scene(s, 'stand', 46, [['chart', 100, 88, 1], ['watch', 130, 92, .9], ['coins', 140, 66, .6, 3]]); },
    'start-up-entrepreneurs': function (s) { return scene(s, 'cheer', 46, [['rocket', 104, 84, 1.1], ['laptop', 138, 100, .7]]); },
    'comedy-fans': function (s) { return scene(s, 'sit', 44, [['popcorn', 98, 88, 1], ['tv', 134, 88, .9]]); },
    'rom-com-fans': function (s) { return scene(s, 'sit', 44, [['heart', 92, 72, 1], ['popcorn', 118, 90, .9], ['tv', 146, 92, .7]]); },
    'animation-fans': function (s) { return scene(s, 'sit', 44, [['tv', 104, 86, 1], ['star', 134, 66, 1], ['star', 142, 92, .7]]); },
    'sci-fi-fantasy-fans': function (s) { return scene(s, 'stand', 42, [['planet', 100, 70, 1], ['rocket', 132, 88, 1], ['star', 90, 44, .7]]); },
    'horror-fans': function (s) { return scene(s, 'sit', 44, [['ghost', 100, 82, 1], ['popcorn', 134, 92, .9]]); },
    'action-adventure-fans': function (s) { return scene(s, 'cheer', 46, [['clapper', 104, 92, 1], ['star', 134, 64, .8], ['ticket', 136, 96, .8]]); },
    'music-concert-goers': function (s) { return scene(s, 'cheer', 46, [['mic', 100, 90, 1], ['notes', 130, 70, 1], ['ticket', 136, 100, .7]]); },
    'online-shoppers': function (s) { return scene(s, 'hold', 42, [['phone', 82, 74, .9], ['cart', 116, 90, 1], ['gift', 144, 96, .7]]); },
    'automotive-buyers': function (s) { return scene(s, 'hold', 40, [['key', 80, 76, 1], ['car', 116, 92, 1.1]]); },
    'home-buyers': function (s) { return scene(s, 'hold', 42, [['key', 82, 78, 1], ['house', 118, 90, 1.2]]); },
    'luxury-buyers': function (s) { return scene(s, 'hold', 44, [['bag', 86, 94, 1], ['diamond', 118, 78, 1], ['gift', 142, 96, .8]]); },
    'tech-gadget-buyers': function (s) { return scene(s, 'hold', 42, [['phone', 82, 74, .9], ['laptop', 118, 96, .9], ['headset', 144, 76, .8]]); },
    'health-wellness-buyers': function (s) { return scene(s, 'stand', 46, [['apple', 100, 92, 1], ['dumbbell', 130, 96, .9], ['leaf', 134, 64, .8]]); },
    'travel-experience-seekers': function (s) { return scene(s, 'hold', 42, [['suitcase', 92, 96, 1], ['plane', 124, 60, 1], ['mountain', 136, 100, .6]]); }
  };
  function doodle(seg) {
    var draw = SCENES[seg.id] || function (x) { return scene(x, 'stand', 60, []); };
    var seed = Math.floor(hash(seg.id + ':art') * 1e6) + 7, R = rnd(seed);
    var g = (window.AUDIENCE_GROUPS || []).filter(function (x) { return x.key === seg.group; })[0];
    /* 1. A pale shape behind, off-centre and never twice the same, so
       the character has something to stand against. */
    var bx = 88 + (R() - 0.5) * 24, by = 58 + (R() - 0.5) * 14;
    var back = '<path d="' + blobPath(bx, by, 48 + R() * 10, 34 + R() * 8, 8, 0.26, R) + '" fill="var(--au-strong)" opacity=".42"/>';
    /* 2. Where we are, drawn faintly behind the scene. */
    var bd = BACKDROP[seg.group];
    back += bd ? '<g opacity=".22">' + bd(R) + '</g>' : '';
    /* 3. The ground: a drawn line, a shadow under the figure, and a
       few marks so it reads as somewhere rather than nowhere. */
    var ink = '<g opacity=".38">' + LT(wline(10, 112, 150, 112, R, 3), 1.2) + '</g>';
    ink += '<ellipse cx="52" cy="113.5" rx="24" ry="3" fill="' + INK + '" opacity=".13"/>';
    var marks = '', k, mx;
    for (k = 0; k < 4; k++) {
      mx = 18 + k * 36 + R() * 14;
      marks += LT('M' + n1(mx) + ' 116 l' + n1(3 + R() * 5) + ' 0', 1.1);
    }
    ink += '<g opacity=".22">' + marks + '</g>';
    /* 4. The scene itself, then the marks in the margins. */
    var pool = ACCENTS_BY_LENS[seg.lens] || ACCENTS_BY_LENS.who, spots = ANCHORS.slice(), acc = '';
    var count = 2 + Math.floor(R() * 2);
    for (k = 0; k < count; k++) {
      var at = spots.splice(Math.floor(R() * spots.length), 1)[0];
      acc += G(at[0], at[1], 0.7 + R() * 0.5, ACCENT[pool[Math.floor(R() * pool.length)]](R));
    }
    return '<svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(seg.name + ', ' + (g ? g.label : '')) + '">' +
      back + ink + draw(seg) + '<g opacity=".55">' + acc + '</g></svg>';
  }

  /* ── The jar ─────────────────────────────────────────────────────
     The universe is a jar of discs. AudienceMarks.jar.build() sizes one
     disc per segment so together they fill the stage, and lines them
     up above it in lens-and-group order, ready to pour. jar.step()
     advances the physics one frame: gravity, walls, disc-on-disc
     contact, and a hand — the pointer — that stirs whatever it moves
     through. jar.settle() runs the pour to rest without drawing, for
     reduced motion and for tests. All pure; the page draws.           */
  var MAX_SIZE = 17000000;
  /* Size to radius, in layout units. A power curve above one spreads
     the top of the range so 9M and 17M read apart; a floor keeps the
     smallest fan bases big enough to carry their name. Monotonic. */
  function unitR(s) { return 40 + 100 * Math.pow(Math.min(1, s.size / MAX_SIZE), 1.3); }
  function hash(str) { var h = 0; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 9973; return h / 9973; }

  var jar = {
    build: function (segments, lens, stage) {
      var W = stage.w, H = stage.h, top = stage.padTop || 0, bottom = stage.padBottom || 0, padX = stage.padX || 0;
      var groups = window.AUDIENCE_GROUPS || [], lensOrder = ['who', 'love', 'buying'];
      var list = segments.slice();
      /* Pour order: lens by lens, group by group, so like sits near
         like without anyone being given a room of their own. Within a
         group the order is shuffled by hash. */
      var gIndex = {}; groups.forEach(function (g, i) { gIndex[g.key] = i; });
      list.sort(function (a, b) {
        return lensOrder.indexOf(a.lens) - lensOrder.indexOf(b.lens) || gIndex[a.group] - gIndex[b.group] || hash(a.id) - hash(b.id);
      });
      /* One scale for every disc: together they cover most of the jar,
         the way poured marbles do, capped so the largest never dwarfs
         a small canvas. */
      var J = { balls: [], W: W, H: H, top: top, bottom: bottom, padX: padX, time: 0, lens: 'all' };
      var scale = jar.scaleFor(J, list.length, list.reduce(function (t, s) { var r = unitR(s); return t + Math.PI * r * r; }, 0));
      J.balls = list.map(function (s, i) {
        var u = unitR(s), r = u * scale, h = hash(s.id + ':pour');
        return { id: s.id, seg: s, lens: s.lens, group: s.group, u: u, r: r, rt: r, dim: false, t: Math.pow(Math.min(1, s.size / MAX_SIZE), 0.9),
          x: padX + r + 8 + h * (W - 2 * padX - 2 * r - 16), y: top - r - 10 - i * 22, release: i * 0.02, inside: false, out: false };
      });
      J.scale = scale;
      if (lens && lens !== 'all') jar.setLens(J, lens, true);
      return J;
    },
    /* One scale for the discs that matter: together they cover a share
       of the jar that shrinks a little as they get fewer and larger,
       since big discs pack less tightly, capped so the largest never
       dwarfs a small canvas. */
    scaleFor: function (J, n, sum) {
      var area = (J.W - 2 * (J.padX || 0)) * (J.H - J.top - J.bottom), fill = 0.32 + 0.2 * Math.min(1, n / 51);
      var scale = Math.sqrt(area * fill / Math.max(1, sum));
      return Math.min(scale, Math.min(J.W - 2 * (J.padX || 0), J.H - J.top - J.bottom) * 0.19 / unitR({ size: MAX_SIZE }));
    },
    /* A lens picks the discs that matter. They grow to the size the
       jar would give them on their own and shove the others aside; the
       others shrink to marbles and fade. Nothing pours again — the
       growth happens in the physics, frame by frame, unless `now`. */
    setLens: function (J, lens, now) {
      J.lens = lens;
      var rel = J.balls.filter(function (b) { return !b.out && (lens === 'all' || b.lens === lens); });
      var scale = jar.scaleFor(J, rel.length, rel.reduce(function (t, b) { return t + Math.PI * b.u * b.u; }, 0));
      J.scale = scale;
      J.balls.forEach(function (b) {
        b.dim = lens !== 'all' && b.lens !== lens;
        b.rt = b.dim ? Math.max(7, b.u * scale * 0.22) : b.u * scale;
        if (now) b.r = b.rt;
      });
      J.energy = 1;
      return J;
    },
    /* The jar changed size — the rail folded, the window grew. The discs
       stay where they are, scaled with the jar so they still fill it,
       and the physics moves them into whatever room appeared. Nothing
       pours again. */
    resize: function (J, stage) {
      var W = stage.w, H = stage.h, top = stage.padTop || 0, bottom = stage.padBottom || 0, padX = stage.padX || 0, oldH = J.H, oldB = J.bottom, oldP = J.padX || 0;
      var kx = (W - 2 * padX) / (J.W - 2 * oldP);
      J.W = W; J.H = H; J.top = top; J.bottom = bottom; J.padX = padX;
      var rel = J.balls.filter(function (b) { return !b.out && !b.dim; });
      var scale = jar.scaleFor(J, rel.length, rel.reduce(function (t, b) { return t + Math.PI * b.u * b.u; }, 0)), k = scale / J.scale;
      J.balls.forEach(function (b) {
        b.rt *= k; b.r *= k; b.x = padX + (b.x - oldP) * kx; b.y = H - bottom - (oldH - oldB - b.y) * k;
        b.px = b.x; b.py = b.y;
      });
      J.scale = scale; J.energy = 1;
      return J;
    },
    /* Which discs are in the jar. Filtered-out discs leave the physics
       and hide; a disc coming back pours in from the top again. */
    setActive: function (J, activeIds) {
      var on = {}; activeIds.forEach(function (id) { on[id] = true; });
      J.balls.forEach(function (b, i) {
        var was = !b.out, is = !!on[b.id];
        if (was && !is) { b.out = true; }
        else if (!was && is) {
          b.out = false; b.inside = false; b.release = J.time + (i % 7) * 0.05;
          b.x = (J.padX || 0) + b.r + 8 + hash(b.id + J.time) * (J.W - 2 * (J.padX || 0) - 2 * b.r - 16); b.y = J.top - b.r - 10; b.px = b.x; b.py = b.y;
        }
      });
      J.energy = 1;
      return J;
    },
    /* One frame. hand: {x, y, vx, vy, r, on} in world units, or null.
       Position-based: each disc steps by its last displacement plus
       gravity (Verlet), then contacts, walls and the hand are resolved
       by moving discs directly, a few passes each substep. Velocity is
       whatever the positions imply, which is what makes a pile of this
       kind go still instead of humming. */
    step: function (J, dt, hand) {
      dt = Math.min(dt || 1 / 60, 1 / 30);
      J.time += dt;
      /* Real gravity: the jar is taken to stand about 1.5 m tall, so
         9.81 m/s² becomes pixels per second squared at its height. */
      var balls = J.balls, W = J.W, L = J.padX || 0, R = J.W - (J.padX || 0), floor = J.H - J.bottom, ceil = J.top, G = 9.81 * ((J.H - J.top - J.bottom) / 1.5), sub = 3, h = dt / sub, DAMP = 0.992;
      /* Discs growing or shrinking toward a new size do it here, a
         little each frame, and the contacts below do the shoving. */
      var growing = false;
      for (var g = 0; g < balls.length; g++) {
        var gb = balls[g];
        if (gb.rt != null && Math.abs(gb.r - gb.rt) > 0.05) { gb.r += (gb.rt - gb.r) * 0.09; growing = true; }
        else if (gb.rt != null) gb.r = gb.rt;
      }
      J.growing = growing;
      for (var st = 0; st < sub; st++) {
        for (var i = 0; i < balls.length; i++) {
          var b = balls[i];
          if (b.out || J.time < b.release) { b.px = b.x; b.py = b.y; continue; }
          if (b.px == null) { b.px = b.x; b.py = b.y; }
          var vx = (b.x - b.px) * DAMP, vy = (b.y - b.py) * DAMP + G * h * h;
          /* A disc that has all but stopped is stopped: no creep. */
          /* A disc that has all but stopped is stopped: no creep. The
             threshold is tiny on purpose — anything nudged onto a slope
             must still roll down it, or the jar stops feeling like one. */
          if (vx * vx + vy * vy < 0.03 && b.inside) { vx = 0; vy = G * h * h; }
          b.px = b.x; b.py = b.y; b.x += vx; b.y += vy;
          if (!b.inside && b.y > ceil + b.r) b.inside = true;
        }
        for (var pass = 0; pass < 3; pass++) {
          for (var i = 0; i < balls.length; i++) for (var j = i + 1; j < balls.length; j++) {
            var a = balls[i], c = balls[j];
            if (a.out || c.out || J.time < a.release || J.time < c.release) continue;
            var dx = c.x - a.x, dy = c.y - a.y, min = a.r + c.r + 2, d2 = dx * dx + dy * dy;
            if (d2 >= min * min) continue;
            var d = Math.sqrt(d2) || 0.01, nx = dx / d, ny = dy / d, over = (min - d) * 0.55;
            var ma = a.r * a.r, mc = c.r * c.r, tot = ma + mc;
            a.x -= nx * over * (mc / tot); a.y -= ny * over * (mc / tot);
            c.x += nx * over * (ma / tot); c.y += ny * over * (ma / tot);
          }
          for (var i = 0; i < balls.length; i++) {
            var b = balls[i]; if (b.out || J.time < b.release) continue;
            if (b.x < L + b.r) b.x = L + b.r;
            if (b.x > R - b.r) b.x = R - b.r;
            if (b.y > floor - b.r) b.y = floor - b.r;
            if (b.inside && b.y < ceil + b.r) b.y = ceil + b.r;
          }
        }
        /* The hand, once per substep, after the contacts have settled. */
        if (hand && hand.on) {
          for (var i = 0; i < balls.length; i++) {
            var b = balls[i]; if (b.out || J.time < b.release) continue;
            var dx = b.x - hand.x, dy = b.y - hand.y, min = hand.r + b.r, d2 = dx * dx + dy * dy;
            if (d2 >= min * min) { b.touch = false; continue; }
            if (hand.skip && b.id === hand.skip) continue;
            var d = Math.sqrt(d2) || 0.01, nx = dx / d, ny = dy / d, over = min - d, w = Math.min(1.5, 55 / b.r);
            if (hand.soft) {
              /* A pointer merely passing: each disc it brushes gets one
                 small nudge as its rim is crossed, then nothing more
                 until the pointer has left it — marbles ticked by a
                 fingertip, not swept. */
              if (!b.touch) {
                b.touch = true;
                var nud = (0.8 + Math.min(1.4, Math.sqrt(hand.vx * hand.vx + hand.vy * hand.vy) * 0.003)) * w;
                b.x += nx * nud; b.y += ny * nud;
              }
              continue;
            }
            b.touch = true;
            /* Out of the hand's way, and carried a little with it — a
               stir, not a shove. Lighter discs give more. */
            b.x += (nx * over * 0.5 + hand.vx * h * 0.3) * w; b.y += (ny * over * 0.5 + hand.vy * h * 0.3) * w;
            if (b.x < L + b.r) b.x = L + b.r; if (b.x > R - b.r) b.x = R - b.r; if (b.y > floor - b.r) b.y = floor - b.r;
          }
        }
      }
      var energy = 0, maxV = 0;
      balls.forEach(function (b) { if (b.out) return; var vx = (b.x - b.px) / h, vy = (b.y - b.py) / h, v2 = vx * vx + vy * vy; energy += v2; if (v2 > maxV) maxV = v2; });
      J.energy = energy / Math.max(1, balls.length);
      J.maxSpeed = Math.sqrt(maxV);
      return J;
    },
    settle: function (J, steps) {
      for (var i = 0; i < (steps || 700); i++) jar.step(J, 1 / 60, null);
      return J;
    }
  };

  window.AudienceMarks = { arc: arc, doodle: doodle, pack: pack, jar: jar, CHANNELS: CHANNELS, channelLabel: channelLabel };
})();
