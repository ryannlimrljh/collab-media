/* One conversation store for the whole product.

   The landing's assistant keeps its threads in localStorage as
   [{id, title, at, msgs:[{role, content}]}], newest first, capped. This
   is that store, shared: whatever a page records here — the planner's
   per-plan Collab AI thread, an ask from Home — surfaces in every
   assistant rail, so a conversation started inside a media plan is
   still there when you open the assistant from Home.

   Beyond the landing's schema each thread carries a `source`
   {kind, label}: 'plan' threads name their plan so the rail can say
   where the conversation happened; 'home' threads carry no label. */

(function () {
  'use strict';

  var KEY = 'collab.chats';
  var MAX_THREADS = 50;

  function load() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }
  function persist(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX_THREADS)));
    } catch (e) {}
  }
  function byNewest(a, b) { return (b.at || 0) - (a.at || 0); }

  function title(text) {
    var t = (text || '').trim().replace(/\s+/g, ' ');
    if (!t) return 'New conversation';
    return t.length > 64 ? t.slice(0, 63) + '…' : t;
  }

  window.collabThreads = {
    KEY: KEY,

    /* Every thread, newest first. */
    list: function () { return load().sort(byNewest); },

    get: function (id) {
      var all = load();
      for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
      return null;
    },

    newId: function () {
      return 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    },

    /* Write a thread in place (matched on id) or add it. Returns it. */
    save: function (thread) {
      if (!thread || !thread.id) return thread;
      var all = load(), found = false;
      for (var i = 0; i < all.length; i++) {
        if (all[i].id === thread.id) { all[i] = thread; found = true; break; }
      }
      if (!found) all.push(thread);
      persist(all.sort(byNewest));
      return thread;
    },

    remove: function (id) {
      persist(load().filter(function (t) { return t.id !== id; }).sort(byNewest));
    },

    /* The planner's shape: one running thread per plan, keyed by the
       plan's own name so re-opening the same plan continues it rather
       than starting a second. `msgs` replaces what is stored, since the
       planner owns the whole transcript in memory. */
    savePlanThread: function (planName, msgs) {
      var label = (planName || '').trim() || 'Untitled plan';
      var all = load(), t = null;
      for (var i = 0; i < all.length; i++) {
        if (all[i].source && all[i].source.kind === 'plan' &&
            all[i].source.label === label) { t = all[i]; break; }
      }
      if (!t) {
        t = { id: this.newId(), source: { kind: 'plan', label: label }, msgs: [] };
        all.push(t);
      }
      t.title = label;
      t.msgs = msgs || [];
      t.at = Date.now();
      persist(all.sort(byNewest));
      return t;
    },

    /* "27 Aug" for the rail's per-thread stamp; "Today" is carried by
       the group heading instead, same as the landing. */
    stamp: function (at) {
      var d = new Date(at || Date.now());
      return d.getDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
    },

    titleFrom: title
  };
})();
