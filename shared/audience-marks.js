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
     A line-drawn person for each segment, built from a few parts and
     picked by hash so the same segment always gets the same face:
     hair in six cuts, glasses or not, a top in four patterns, and one
     prop for the group — a cap for sports, headphones for
     entertainment, shades for trendsetters, a collar and tie for
     business, a bag for shopping intent. Ink only, on the card's own
     tint. Returns an SVG string.                                     */
  function doodle(seg) {
    var h = Math.floor(hash(seg.id) * 100000), hair = h % 6, glasses = Math.floor(h / 7) % 3 === 0, pat = Math.floor(h / 13) % 4, flip = Math.floor(h / 29) % 2;
    var ink = 'var(--color-neutral-9)', pid = 'dp-' + seg.id;
    var defs = '<defs>' +
      '<pattern id="' + pid + '-dots" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="4" cy="4" r="1.6" fill="' + ink + '"/></pattern>' +
      '<pattern id="' + pid + '-stripes" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)"><rect width="7" height="2.4" fill="' + ink + '"/></pattern>' +
      '<pattern id="' + pid + '-check" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="4.5" height="4.5" fill="' + ink + '" opacity=".85"/><rect x="4.5" y="4.5" width="4.5" height="4.5" fill="' + ink + '" opacity=".85"/></pattern>' +
      '</defs>';
    var topFill = ['#fff', 'url(#' + pid + '-dots)', 'url(#' + pid + '-stripes)', 'url(#' + pid + '-check)'][pat];
    var top = '<path d="M14 122 C16 96 34 84 48 82 L60 92 L72 82 C86 84 104 96 106 122 Z" fill="#fff" stroke="' + ink + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      (pat ? '<path d="M14 122 C16 96 34 84 48 82 L60 92 L72 82 C86 84 104 96 106 122 Z" fill="' + topFill + '" stroke="none"/>' : '');
    var neck = '<path d="M52 68 L52 84 Q60 92 68 84 L68 68" fill="#fff" stroke="' + ink + '" stroke-width="2.4" stroke-linejoin="round"/>';
    var head = '<ellipse cx="60" cy="48" rx="23" ry="26" fill="#fff" stroke="' + ink + '" stroke-width="2.4"/>' +
      '<path d="M37 50 q-5 -2 -4 4 q1 5 5 4" fill="#fff" stroke="' + ink + '" stroke-width="2"/><path d="M83 50 q5 -2 4 4 q-1 5 -5 4" fill="#fff" stroke="' + ink + '" stroke-width="2"/>';
    var hairs = [
      '<path d="M37 46 C36 24 50 18 60 18 C72 18 84 24 83 46 C80 36 72 30 60 30 C48 30 41 36 37 46 Z" fill="' + ink + '"/>',
      '<path d="M36 52 C34 22 52 16 60 16 C70 16 86 22 84 52 L84 70 L76 70 L76 46 C72 34 66 30 60 30 C54 30 46 34 44 46 L44 70 L36 70 Z" fill="' + ink + '"/>',
      '<g fill="' + ink + '"><circle cx="42" cy="30" r="9"/><circle cx="52" cy="22" r="10"/><circle cx="64" cy="19" r="10"/><circle cx="76" cy="25" r="9"/><circle cx="82" cy="36" r="8"/><circle cx="38" cy="40" r="7"/><path d="M38 44 C40 30 50 26 60 26 C70 26 80 30 82 44 Z"/></g>',
      '<path d="M38 44 C40 26 50 20 60 20 C70 20 80 26 82 44 C78 36 70 32 60 32 C50 32 44 36 38 44 Z" fill="' + ink + '"/><circle cx="60" cy="14" r="8" fill="' + ink + '"/>',
      '<path d="M36 50 C34 22 52 14 60 14 C70 14 86 22 84 50 L88 92 L78 92 L76 48 C72 36 66 32 60 32 C54 32 46 36 44 48 L42 92 L32 92 Z" fill="' + ink + '"/>',
      '<path d="M38 46 C38 26 48 20 60 20 C74 20 84 26 82 40 L70 34 C58 32 48 38 38 46 Z" fill="' + ink + '"/>'
    ];
    var eyes = glasses
      ? '<circle cx="51" cy="50" r="6.5" fill="none" stroke="' + ink + '" stroke-width="2.2"/><circle cx="69" cy="50" r="6.5" fill="none" stroke="' + ink + '" stroke-width="2.2"/><path d="M57.5 50 L62.5 50" stroke="' + ink + '" stroke-width="2.2"/><circle cx="51" cy="50" r="2" fill="' + ink + '"/><circle cx="69" cy="50" r="2" fill="' + ink + '"/>'
      : '<circle cx="51" cy="50" r="2.3" fill="' + ink + '"/><circle cx="69" cy="50" r="2.3" fill="' + ink + '"/>';
    var mouth = '<path d="M53 60 Q60 66 67 60" fill="none" stroke="' + ink + '" stroke-width="2.2" stroke-linecap="round"/>';
    var prop = '';
    switch (seg.group) {
      case 'sports': prop = '<path d="M34 40 C36 20 50 14 60 14 C72 14 84 20 86 40 Z" fill="' + ink + '"/><path d="M60 40 L96 44 L96 38 L60 34 Z" fill="' + ink + '"/><path d="M34 40 L86 40" stroke="#fff" stroke-width="2"/>'; break;
      case 'entertainment': prop = '<path d="M34 46 C34 18 86 18 86 46" fill="none" stroke="' + ink + '" stroke-width="3.2"/><rect x="29" y="42" width="10" height="16" rx="4" fill="' + ink + '"/><rect x="81" y="42" width="10" height="16" rx="4" fill="' + ink + '"/>'; break;
      case 'trendsetter': prop = '<rect x="43" y="44" width="16" height="11" rx="4" fill="' + ink + '"/><rect x="61" y="44" width="16" height="11" rx="4" fill="' + ink + '"/><path d="M59 49 L61 49" stroke="' + ink + '" stroke-width="2.2"/>'; break;
      case 'business': prop = '<path d="M50 84 L60 98 L70 84" fill="#fff" stroke="' + ink + '" stroke-width="2.2" stroke-linejoin="round"/><path d="M57 92 L60 122 L63 92 Z" fill="' + ink + '"/>'; break;
      case 'shopping': prop = '<rect x="86" y="94" width="24" height="26" rx="3" fill="#fff" stroke="' + ink + '" stroke-width="2.2"/><path d="M92 94 C92 84 104 84 104 94" fill="none" stroke="' + ink + '" stroke-width="2.2"/>'; break;
      case 'income': prop = '<circle cx="96" cy="104" r="11" fill="#fff" stroke="' + ink + '" stroke-width="2.2"/><path d="M96 98 L96 110 M92 101 L100 101 M92 107 L100 107" stroke="' + ink + '" stroke-width="2"/>'; break;
      case 'life-stage': prop = '<path d="M26 108 C22 100 32 96 34 104 C36 96 46 100 42 108 L34 116 Z" fill="' + ink + '"/>'; break;
      default: prop = '';
    }
    var body = defs + top + neck + head + hairs[hair] + eyes + mouth + prop;
    return '<svg viewBox="0 0 120 122" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(seg.name) + '"' + (flip ? ' style="transform:scaleX(-1)"' : '') + '>' + body + '</svg>';
  }

  /* ── The bars ────────────────────────────────────────────────────
     Media consumption as five small bars with their values, in the
     lens colour, the strongest channel at full strength. Bars grow
     from the baseline when an ancestor gains .is-live.                */
  function bars(el, seg, opts) {
    opts = opts || {};
    var chans = CHANNELS.filter(function (c) { return seg.consumption[c.key] != null; }).slice(0, 5);
    var SHORT = { video: 'Video', audio: 'Audio', tv: 'TV', podcast: 'Podcast', social: 'Social', games: 'Games', communities: 'Forums' };
    var W = 160, H = 96, base = 76, maxH = 54, n = chans.length, gap = 8, bw = (W - 16 - gap * (n - 1)) / n;
    var best = Math.max.apply(null, chans.map(function (c) { return seg.consumption[c.key]; }));
    var out = chans.map(function (c, i) {
      var v = seg.consumption[c.key], bh = maxH * v / 100, x = 8 + i * (bw + gap);
      return '<g class="am-bar" style="--am-i:' + i + '">' +
        '<rect class="am-bar-fill' + (v === best ? ' is-best' : '') + '" x="' + x.toFixed(1) + '" y="' + (base - bh).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="3" style="transform-origin:0 ' + base + 'px"/>' +
        '<text class="am-bar-val" x="' + (x + bw / 2).toFixed(1) + '" y="' + (base - bh - 5).toFixed(1) + '" text-anchor="middle">' + v + '%</text>' +
        '<text class="am-bar-lbl" x="' + (x + bw / 2).toFixed(1) + '" y="' + (base + 13) + '" text-anchor="middle">' + SHORT[c.key] + '</text></g>';
    }).join('');
    el.classList.add('am-bars');
    if (opts.still) el.classList.add('is-still');
    el.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc('Media consumption: ' + chans.map(function (c) { return channelLabel(c.key) + ' ' + seg.consumption[c.key] + '%'; }).join(', ')) + '">' +
      '<line class="am-bar-base" x1="8" y1="' + base + '" x2="' + (W - 8) + '" y2="' + base + '"/>' + out + '</svg>';
    return el;
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

  window.AudienceMarks = { arc: arc, bars: bars, doodle: doodle, pack: pack, jar: jar, CHANNELS: CHANNELS, channelLabel: channelLabel };
})();
