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
                var nud = (1.5 + Math.min(2.5, Math.sqrt(hand.vx * hand.vx + hand.vy * hand.vy) * 0.005)) * w;
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
      var energy = 0;
      balls.forEach(function (b) { if (b.out) return; var vx = (b.x - b.px) / h, vy = (b.y - b.py) / h; energy += vx * vx + vy * vy; });
      J.energy = energy / Math.max(1, balls.length);
      return J;
    },
    settle: function (J, steps) {
      for (var i = 0; i < (steps || 700); i++) jar.step(J, 1 / 60, null);
      return J;
    }
  };

  window.AudienceMarks = { arc: arc, pack: pack, jar: jar, CHANNELS: CHANNELS, channelLabel: channelLabel };
})();
