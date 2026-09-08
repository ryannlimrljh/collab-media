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

   AudienceMarks.layoutSpace(segments, lens, stage, style)
     The universe: every segment a bubble sized by audience, filling
     the stage by group ('groups') or by size alone ('size'), with a
     depth per group and per bubble. Returns plain numbers; the page
     draws them.                                                        */
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

  /* ── The universe ────────────────────────────────────────────────
     One layout, pure: it takes the segments, a lens, a stage {w, h,
     padTop, padBottom} in pixels and an arrangement ('groups' or
     'size'), and returns {nodes, groups}. A node is {id, x, y, r, z,
     lens, group, seg}; a group is {key, label, lens, x, y, top, z}.
     The bubbles fill the whole stage — overlapping a little, the way
     glass does — rather than sitting in a band across the middle.
     Nothing here touches the DOM.                                    */
  var MAX_SIZE = 17000000;
  /* Size to radius, in layout units. A power curve above one spreads
     the top of the range so 9M and 17M read apart; a floor keeps the
     smallest fan bases big enough to carry their name. Monotonic. */
  function unitR(s) { return 52 + 88 * Math.pow(Math.min(1, s.size / MAX_SIZE), 1.3); }
  function hash(str) { var h = 0; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 9973; return h / 9973; }

  function layoutSpace(segments, lens, stage, style) {
    var W = stage.w, H = stage.h, top = stage.padTop || 0, bottom = stage.padBottom || 0;
    var groupsDef = window.AUDIENCE_GROUPS || [];
    var list = segments.filter(function (s) { return lens === 'all' || s.lens === lens; });
    if (!list.length) return { nodes: [], groups: [] };
    var groups;
    if (style === 'size') {
      groups = [{ key: 'all', label: '', lens: 'all', members: list.slice().sort(function (a, b) { return b.size - a.size; }) }];
    } else {
      groups = groupsDef.filter(function (g) { return lens === 'all' || g.lens === lens; }).map(function (g) {
        return { key: g.key, label: g.label, lens: g.lens, members: list.filter(function (s) { return s.group === g.key; }).sort(function (a, b) { return b.size - a.size; }) };
      }).filter(function (g) { return g.members.length; });
    }
    /* One scale for every bubble: the bubbles together cover a set
       share of the stage, overlaps included, capped so the largest
       never dominates a small canvas. */
    var area = W * (H - top - bottom), sum = 0;
    list.forEach(function (s) { var r = unitR(s); sum += Math.PI * r * r; });
    var scale = Math.sqrt(area * (style === 'size' ? 0.5 : 0.7) / sum);
    var maxR = Math.min(W, H - top - bottom) * 0.23;
    scale = Math.min(scale, maxR / unitR({ size: MAX_SIZE }));
    /* Group centres: a grid across the stage in lens order, then
       relaxed apart so each group has room for its own area. */
    var n = groups.length, cols = Math.max(1, Math.round(Math.sqrt(n * W / Math.max(1, H - top - bottom)))), rows = Math.ceil(n / cols);
    groups.forEach(function (g, i) {
      var c = i % cols, r = Math.floor(i / cols), rowCount = (r === rows - 1) ? (n - r * cols) : cols;
      g.x = W * (c + 0.5) / rowCount; g.y = top + (H - top - bottom) * (r + 0.5) / rows;
      var a = 0; g.members.forEach(function (s) { var rr = unitR(s) * scale; a += Math.PI * rr * rr; });
      g.R = Math.sqrt(a / Math.PI) * 1.12;
      g.z = n === 1 ? 0 : Math.sin(i * 2.1 + 0.7) * 0.85;
    });
    for (var it = 0; it < 80; it++) {
      groups.forEach(function (a) {
        groups.forEach(function (b) {
          if (a === b) return;
          var dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1, min = (a.R + b.R) * 0.92;
          if (d < min) { var f = (min - d) / d * 0.5; a.x -= dx * f * 0.5; a.y -= dy * f * 0.5; b.x += dx * f * 0.5; b.y += dy * f * 0.5; }
        });
        a.x = Math.max(a.R * 0.6, Math.min(W - a.R * 0.6, a.x));
        a.y = Math.max(top + a.R * 0.6, Math.min(H - bottom - a.R * 0.6, a.y));
      });
    }
    /* Bubbles: each group packs around its centre, then everything
       relaxes together — pushed apart where the overlap is more than
       glass can carry, kept inside the stage, drawn gently home. */
    var nodes = [];
    groups.forEach(function (g) {
      var items = g.members.map(function (s) { return { id: s.id, r: unitR(s) * scale, seg: s }; });
      var p = pack(items, -Math.min(8, scale * 6));
      p.items.forEach(function (m, k) {
        var s = m.ref.seg;
        nodes.push({ id: m.id, x: g.x + m.x, y: g.y + m.y, r: m.r, lens: s.lens, group: g.key, gref: g, seg: s,
          z: g.z * 0.7 + (m.r / (unitR({ size: MAX_SIZE }) * scale) - 0.5) * 0.6 + (hash(s.id) - 0.5) * 0.2 });
      });
    });
    for (var iter = 0; iter < 200; iter++) {
      var t = 1 - iter / 200;
      for (var i = 0; i < nodes.length; i++) for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j], dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
        var allow = (a.group === b.group ? 0.3 : 0.1) * Math.min(a.r, b.r), min = a.r + b.r - allow;
        if (d < min) { var f = (min - d) / d * 0.9 * (0.4 + 0.6 * t); a.x -= dx * f * 0.5; a.y -= dy * f * 0.5; b.x += dx * f * 0.5; b.y += dy * f * 0.5; }
      }
      nodes.forEach(function (nd) {
        nd.x += (nd.gref.x - nd.x) * 0.004; nd.y += (nd.gref.y - nd.y) * 0.004;
        nd.x = Math.max(nd.r * 0.9, Math.min(W - nd.r * 0.9, nd.x));
        nd.y = Math.max(top + nd.r * 0.9, Math.min(H - bottom - nd.r * 0.9, nd.y));
      });
    }
    var out = groups.map(function (g) {
      var mine = nodes.filter(function (nd) { return nd.group === g.key; }), sx = 0, sy = 0, topY = Infinity;
      mine.forEach(function (nd) { sx += nd.x; sy += nd.y; topY = Math.min(topY, nd.y - nd.r); });
      return { key: g.key, label: g.label, lens: g.lens, x: sx / mine.length, y: sy / mine.length, top: topY, z: g.z, count: mine.length,
        total: mine.reduce(function (t, nd) { return t + nd.seg.size; }, 0) };
    });
    nodes.forEach(function (nd) { delete nd.gref; });
    return { nodes: nodes, groups: out, scale: scale };
  }

  window.AudienceMarks = { arc: arc, pack: pack, layoutSpace: layoutSpace, CHANNELS: CHANNELS, channelLabel: channelLabel };
})();
