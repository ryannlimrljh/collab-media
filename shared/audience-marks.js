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

   AudienceMarks.layoutUniverse(segments, lens, stage, style)
     The universe: every segment a circle with r ∝ √size, laid out one
     of three ways — 'rings' (each group a hub with its segments around
     it), 'size' (one pack, largest at the centre) or 'network' (the
     Astro properties as hubs, segments pulled to the ones they live
     on). Returns plain numbers; the page draws them.                   */
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
     Three layouts, all pure: they take the segments and a stage
     {w, h} in pixels and return {nodes, links}. A node is
     {id, kind, x, y, r, lens, group, seg|prop|groupDef}; kinds are
     'seg', 'hub' (a group) and 'prop' (an Astro property). A link is
     {from, to} by node id. The page draws them and animates between
     them; nothing here touches the DOM.                              */
  function unitR(s) { return Math.max(14, Math.sqrt(s.size / 1000)); }
  function chainPack(items, pad, zig) {
    /* Clusters run left to right, zigzagging above and below the
       centre line so the row interlocks. items: [{r, ...}], in order.
       zig is the zigzag amplitude as a share of the two radii. */
    var chain = [];
    zig = zig == null ? 0.42 : zig;
    items.forEach(function (c, i) {
      if (!i) { chain.push({ it: c, x: 0, y: 0 }); return; }
      var prev = chain[i - 1], dy = (i % 2 ? 1 : -1) * zig * (prev.it.r + c.r);
      var reach = prev.it.r + c.r + pad, x = prev.x + Math.sqrt(Math.max(0, reach * reach - dy * dy)), y = dy;
      for (var k = 0; k < chain.length; k++) {
        var q = chain[k], need = q.it.r + c.r + pad, ddy = y - q.y;
        if (Math.abs(ddy) < need) x = Math.max(x, q.x + Math.sqrt(need * need - ddy * ddy));
      }
      chain.push({ it: c, x: x, y: y });
    });
    return chain;
  }
  function fitTo(nodes, stage, margin) {
    /* Scale and centre a set of {x, y, r} so it fills the stage. One
       scale for everything, so sizes stay comparable across clusters. */
    var minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(function (n) {
      minX = Math.min(minX, n.x - n.r); maxX = Math.max(maxX, n.x + n.r);
      minY = Math.min(minY, n.y - n.r); maxY = Math.max(maxY, n.y + n.r);
    });
    var s = Math.min((stage.w - margin * 2) / (maxX - minX), (stage.h - margin * 2) / (maxY - minY));
    var cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    nodes.forEach(function (n) { n.x = stage.w / 2 + (n.x - cx) * s; n.y = stage.h / 2 + (n.y - cy) * s; n.r = n.r * s; });
    return s;
  }
  function groupsOf(segments, lens) {
    return (window.AUDIENCE_GROUPS || []).filter(function (g) { return lens === 'all' || g.lens === lens; })
      .map(function (g) {
        var members = segments.filter(function (s) { return s.group === g.key; }).sort(function (a, b) { return b.size - a.size; });
        return { def: g, members: members, total: members.reduce(function (t, s) { return t + s.size; }, 0) };
      });
  }

  /* Rings: each group is a hub with its segments on a ring around it,
     the groups chained across the stage. The reference picture. */
  function layoutRings(segments, lens, stage) {
    var lensOrder = ['who', 'love', 'buying'];
    var clusters = groupsOf(segments, lens).map(function (g) {
      var hubR = 22 + Math.sqrt(g.total / 1e6) * 2.4, gap = 9;
      var sats = g.members.map(function (s) { return { seg: s, r: unitR(s) }; });
      var maxR = sats.reduce(function (m, x) { return Math.max(m, x.r); }, 0);
      var need = sats.reduce(function (t, x) { return t + 2 * x.r + gap; }, 0);
      /* Room inside the ring for the hub and its caption beneath. */
      var R = Math.max(hubR + maxR + 44, need / (2 * Math.PI));
      /* Largest at twelve o'clock, then round the ring by size. */
      var a = -Math.PI / 2, pts = [];
      sats.forEach(function (x, i) {
        var step = (2 * x.r + gap) / need * 2 * Math.PI;
        var mid = a + step / 2;
        pts.push({ seg: x.seg, r: x.r, x: R * Math.cos(mid), y: R * Math.sin(mid) });
        a += step;
      });
      return { g: g, hubR: hubR, R: R, sats: pts, r: R + maxR + 8 };
    });
    clusters.sort(function (a, b) { return lensOrder.indexOf(a.g.def.lens) - lensOrder.indexOf(b.g.def.lens) || b.r - a.r; });
    /* Rings are hollow, so neighbouring rings may tuck into each other
       a little: a negative pad lets the chain sit tighter than the
       bounding circles alone would allow. The zigzag amplitude is
       chosen to suit the stage: a wide stage wants a flat chain, a
       squarer one wants the clusters stacked two deep. */
    var margin = stage.margin == null ? 40 : stage.margin, best = null;
    [0.3, 0.45, 0.6, 0.75, 0.9, 1.05].forEach(function (zig) {
      var ch = chainPack(clusters, -18, zig), minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      ch.forEach(function (n) { minX = Math.min(minX, n.x - n.it.r); maxX = Math.max(maxX, n.x + n.it.r); minY = Math.min(minY, n.y - n.it.r); maxY = Math.max(maxY, n.y + n.it.r); });
      var sc = Math.min((stage.w - margin * 2) / (maxX - minX), (stage.h - margin * 2) / (maxY - minY));
      if (!best || sc > best.sc) best = { chain: ch, sc: sc };
    });
    var chain = best.chain;
    var nodes = [], links = [];
    chain.forEach(function (n) {
      var c = n.it, hubId = 'hub:' + c.g.def.key;
      nodes.push({ id: hubId, kind: 'hub', x: n.x, y: n.y, r: c.hubR, lens: c.g.def.lens, group: c.g.def.key, groupDef: c.g.def, total: c.g.total, count: c.sats.length });
      c.sats.forEach(function (p) {
        nodes.push({ id: p.seg.id, kind: 'seg', x: n.x + p.x, y: n.y + p.y, r: p.r, lens: c.g.def.lens, group: c.g.def.key, seg: p.seg });
        links.push({ from: hubId, to: p.seg.id, kind: 'spoke' });
      });
    });
    var s = fitTo(nodes, stage, margin);
    return { nodes: nodes, links: links, scale: s };
  }

  /* Size: every segment in one pack, largest at the centre, so the
     scale of the catalogue reads at a glance. */
  function layoutSize(segments, lens, stage) {
    var list = segments.filter(function (s) { return lens === 'all' || s.lens === lens; })
      .sort(function (a, b) { return b.size - a.size; })
      .map(function (s) { return { id: s.id, r: unitR(s), seg: s }; });
    var p = pack(list, 3);
    var nodes = p.items.map(function (m) { return { id: m.id, kind: 'seg', x: m.x, y: m.y, r: m.r, lens: m.ref.seg.lens, group: m.ref.seg.group, seg: m.ref.seg }; });
    var s = fitTo(nodes, stage, stage.margin == null ? 40 : stage.margin);
    return { nodes: nodes, links: [], scale: s };
  }

  /* Properties: the nine Astro properties as hubs and every segment
     pulled toward the ones it lives on. A small force simulation, run
     to rest here so the result is the same every time. */
  function layoutNetwork(segments, lens, stage) {
    var props = window.AUDIENCE_PROPERTIES || [];
    var list = segments.filter(function (s) { return lens === 'all' || s.lens === lens; });
    var counts = {}; list.forEach(function (s) { s.properties.forEach(function (p) { counts[p.key] = (counts[p.key] || 0) + 1; }); });
    var nodes = [], byId = {}, links = [];
    props.forEach(function (p, i) {
      var a = -Math.PI / 2 + i / props.length * 2 * Math.PI, R = 260;
      var n = { id: 'prop:' + p.key, kind: 'prop', x: R * Math.cos(a), y: R * Math.sin(a), r: 16 + Math.sqrt(counts[p.key] || 1) * 3.2, prop: p, count: counts[p.key] || 0, vx: 0, vy: 0 };
      nodes.push(n); byId[n.id] = n;
    });
    list.forEach(function (s, i) {
      /* Start near the centroid of its properties, nudged by a hash so
         twins do not start on top of each other. */
      var cx = 0, cy = 0, k = 0;
      s.properties.forEach(function (p) { var h = byId['prop:' + p.key]; if (h) { cx += h.x; cy += h.y; k++; } });
      if (k) { cx /= k; cy /= k; }
      var hash = 0; for (var c = 0; c < s.id.length; c++) hash = (hash * 31 + s.id.charCodeAt(c)) % 1000;
      var ang = hash / 1000 * 2 * Math.PI, d = 40 + (i % 5) * 12;
      var n = { id: s.id, kind: 'seg', x: cx * 0.6 + Math.cos(ang) * d, y: cy * 0.6 + Math.sin(ang) * d, r: unitR(s) * 0.64, lens: s.lens, group: s.group, seg: s, vx: 0, vy: 0 };
      nodes.push(n); byId[n.id] = n;
      s.properties.forEach(function (p) { if (byId['prop:' + p.key]) links.push({ from: n.id, to: 'prop:' + p.key, kind: 'lives' }); });
    });
    for (var iter = 0; iter < 260; iter++) {
      var alpha = 1 - iter / 260, t = 0.08 + 0.4 * alpha;
      links.forEach(function (l) {
        var a = byId[l.from], b = byId[l.to], dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
        var rest = a.r + b.r + 84, f = (d - rest) / d * 0.012 * t;
        a.vx += dx * f; a.vy += dy * f; b.vx -= dx * f * 0.35; b.vy -= dy * f * 0.35;
      });
      for (var i = 0; i < nodes.length; i++) for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j], dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy || 1, d = Math.sqrt(d2);
        var hubs = a.kind !== 'seg' && b.kind !== 'seg';
        var min = a.r + b.r + (hubs ? 110 : 34), f = (d < min ? (min - d) * 0.5 : 0) + (hubs ? 6000 : 2200) / d2 * t;
        var fx = dx / d * f, fy = dy / d * f;
        a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
      }
      nodes.forEach(function (n) {
        n.vx -= n.x * 0.004 * t; n.vy -= n.y * 0.004 * t;   /* gravity to the centre */
        n.x += n.vx; n.y += n.vy; n.vx *= 0.82; n.vy *= 0.82;
      });
    }
    var s = fitTo(nodes, stage, stage.margin == null ? 40 : stage.margin);
    return { nodes: nodes, links: links, scale: s };
  }

  function layoutUniverse(segments, lens, stage, style) {
    if (style === 'size') return layoutSize(segments, lens, stage);
    if (style === 'network') return layoutNetwork(segments, lens, stage);
    return layoutRings(segments, lens, stage);
  }

  window.AudienceMarks = { arc: arc, pack: pack, layoutUniverse: layoutUniverse, CHANNELS: CHANNELS, channelLabel: channelLabel };
})();
