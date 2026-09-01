/* Saved plans — the prototype's mini database.

   localStorage holds an array of plan records under one key. Each
   record carries the listing fields the campaign pages render, plus a
   full `state` snapshot the planner rehydrates from. Listings merge
   saved plans (newest first) above the seeded sample data; a saved
   row deep-links back into the planner with ?plan=<id>. */

(function () {
  'use strict';

  var KEY = 'collab-plans';
  var HIDE_KEY = 'collab-hidden-seeds';
  var CAP = 50;

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }
  function write(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }
  function hiddenSeeds() {
    try { return JSON.parse(localStorage.getItem(HIDE_KEY)) || []; }
    catch (e) { return []; }
  }

  window.collabPlans = {
    list: read,
    get: function (id) {
      return read().filter(function (p) { return p.id === id; })[0] || null;
    },
    save: function (rec) {
      var list = read();
      var at = -1;
      list.forEach(function (p, i) { if (p.id === rec.id) at = i; });
      if (at > -1) list[at] = rec; else list.unshift(rec);
      list.sort(function (a, b) { return (b.updatedAt || 0) - (a.updatedAt || 0); });
      write(list.slice(0, CAP));
    },
    remove: function (id) {
      write(read().filter(function (p) { return p.id !== id; }));
    },
    /* Seeded demo rows are not records we can remove, so a delete
       there hides the row by name instead, persistently. */
    hideSeed: function (name) {
      var list = hiddenSeeds();
      if (list.indexOf(name) < 0) list.push(name);
      try { localStorage.setItem(HIDE_KEY, JSON.stringify(list)); } catch (e) {}
    },
    /* Listing view: saved plans first, then the seeded sample. */
    merged: function (seed) {
      var hidden = hiddenSeeds();
      /* Older records stored an em dash as the empty marker. */
      var dash = function (v) { return (!v || v === '—') ? '–' : v; };
      var mine = read().map(function (p) {
        return {
          id: p.id,
          name: p.name || 'Untitled plan',
          brand: dash(p.brand),
          status: p.status || 'draft',
          ai: !!p.ai,
          industry: dash(p.industry),
          budget: p.budget || 0,
          duration: dash(p.duration),
          updated: p.updated || '',
          href: 'planner.html?plan=' + encodeURIComponent(p.id),
          saved: true
        };
      });
      var kept = (seed || []).filter(function (s) {
        return hidden.indexOf(s.name) < 0;
      });
      return mine.concat(kept);
    }
  };
})();
