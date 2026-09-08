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

   AudienceMarks.layoutUniverse(segments, lens, stage)
     The universe: every segment a circle with r ∝ √size, packed into
     its group, the groups packed into one cluster and fitted to the
     stage. Segments outside the chosen lens come back as dots along the
     bottom edge. Returns plain numbers; the page draws them.           */
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

  /* ── The universe ────────────────────────────────────────────────── */
  function layoutUniverse(segments, lens, stage) {
    var W = stage.w, H = stage.h, margin = stage.margin == null ? 26 : stage.margin, labelH = 16;
    var groups = window.AUDIENCE_GROUPS || [];
    var inLens = function (g) { return lens === 'all' || g.lens === lens; };
    var shown = groups.filter(inLens), hidden = groups.filter(function (g) { return !inLens(g); });
    /* Unit space: r = √(size / 1000), so 17M → 130 units, 54K → 7 units.
       A floor keeps the smallest fan bases visible as more than a speck. */
    var unitR = function (s) { return Math.max(14, Math.sqrt(s.size / 1000)); };
    var clusters = shown.map(function (g) {
      var members = segments.filter(function (s) { return s.group === g.key; })
        .sort(function (a, b) { return b.size - a.size; })
        .map(function (s) { return { id: s.id, r: unitR(s), seg: s }; });
      var p = pack(members, 2.5);
      return { key: g.key, label: g.label, lens: g.lens, pack: p, r: p.R + 10 };
    });
    /* Groups run left to right in lens order — who, love, buying — as a
       chain of touching clusters that zigzag above and below the centre
       line, so the row interlocks instead of stringing out. The stage is
       wide and short; a round packing of the clusters would waste it. */
    var lensOrder = ['who', 'love', 'buying'];
    clusters.sort(function (a, b) { return lensOrder.indexOf(a.lens) - lensOrder.indexOf(b.lens) || b.r - a.r; });
    var chain = [], pad = 4;
    clusters.forEach(function (c, i) {
      if (!i) { chain.push({ c: c, x: 0, y: 0 }); return; }
      var prev = chain[i - 1], dy = (i % 2 ? 1 : -1) * 0.42 * (prev.c.r + c.r);
      var reach = prev.c.r + c.r + pad, x = prev.x + Math.sqrt(Math.max(0, reach * reach - dy * dy)), y = dy;
      /* Slide right until it clears every earlier cluster, not just the last. */
      for (var k = 0; k < chain.length; k++) {
        var q = chain[k], need = q.c.r + c.r + pad, ddy = y - q.y;
        if (Math.abs(ddy) < need) x = Math.max(x, q.x + Math.sqrt(need * need - ddy * ddy));
      }
      chain.push({ c: c, x: x, y: y });
    });
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    chain.forEach(function (n) {
      minX = Math.min(minX, n.x - n.c.r); maxX = Math.max(maxX, n.x + n.c.r);
      minY = Math.min(minY, n.y - n.c.r); maxY = Math.max(maxY, n.y + n.c.r);
    });
    var outer = { w: maxX - minX, h: maxY - minY, items: chain.map(function (n) { return { x: n.x - (minX + maxX) / 2, y: n.y - (minY + maxY) / 2, ref: { c: n.c } }; }) };
    /* Fit the chain to the stage: one scale for every circle, so a 13M
       segment is the same size whichever group it sits in. */
    var dotRow = hidden.length ? 22 : 0;
    var sx = (W - margin * 2) / outer.w, sy = (H - margin * 2 - dotRow - labelH) / outer.h, s = Math.min(sx, sy);
    var cx = W / 2, cy = (H - dotRow - labelH) / 2 + 4;
    var circles = [], labels = [];
    outer.items.forEach(function (o) {
      var c = o.ref.c, gx = cx + o.x * s, gy = cy + o.y * s;
      c.pack.items.forEach(function (m) {
        circles.push({ id: m.id, x: gx + m.x * s, y: gy + m.y * s, r: m.r * s, group: c.key, lens: c.lens, seg: m.ref.seg, out: false });
      });
      labels.push({ text: c.label, x: gx, y: gy + c.pack.R * s + 14, lens: c.lens, group: c.key });
    });
    /* Whatever the lens leaves out sits as a row of dots along the
       bottom edge, in group order, still hoverable. */
    if (hidden.length) {
      var dots = [];
      hidden.forEach(function (g) {
        segments.filter(function (s) { return s.group === g.key; }).sort(function (a, b) { return b.size - a.size; })
          .forEach(function (s) { dots.push({ id: s.id, group: g.key, lens: g.lens, seg: s }); });
      });
      var gap = Math.min(14, (W - margin * 2) / Math.max(1, dots.length)), x0 = W / 2 - gap * (dots.length - 1) / 2;
      dots.forEach(function (d, i) {
        circles.push({ id: d.id, x: x0 + i * gap, y: H - 10, r: 3, group: d.group, lens: d.lens, seg: d.seg, out: true });
      });
    }
    return { circles: circles, labels: labels, scale: s };
  }

  window.AudienceMarks = { arc: arc, pack: pack, layoutUniverse: layoutUniverse, CHANNELS: CHANNELS, channelLabel: channelLabel };
})();
