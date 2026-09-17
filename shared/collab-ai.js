/* Collab AI, browser side.
   The endpoint is open, so everything that comes back is treated as
   hostile until this file has checked it. An id the page does not know
   is dropped; an action left with nothing to act on is dropped whole; an
   unknown op never reaches the page at all. Every op that carries a
   free-form payload (set_fields, set_mode, set_refiners, set_notes,
   confirm_booking) gets its own shape check here too, not just the ids
   and enums, because a bug in this file is the one that matters: it is
   the last of three layers (API vocabulary, zod payload shapes, this
   file's catalogue and shape checks) and the only one that runs after
   the response is already sitting in the browser. Attaches to window
   like the rest of shared/, and is importable in node for its tests. */
(function () {
  'use strict';

  var OPS = ['set_fields', 'set_mode', 'set_personas', 'set_refiners', 'set_notes',
    'channels_on', 'channels_off', 'add_formats', 'remove_formats',
    'set_split', 'pin_sites', 'go_to_step', 'confirm_booking'];

  var OBJECTIVES = ['awareness', 'consideration', 'conversion', 'footfall', 'leadgen'];

  /* A raw array from the wire, or a safe empty one. Nothing here assumes
     the JSON that arrived actually matches the shape zod would have
     enforced server side; a non-array is treated as absent rather than
     thrown at, and an absurdly long one is cut down before it is even
     filtered, so a single hostile action cannot make this loop do
     unbounded work. */
  function arr(v, capAt) {
    if (!Array.isArray(v)) return [];
    return capAt ? v.slice(0, capAt) : v;
  }

  /* A lookup table built with a null prototype. A plain {} inherits
     Object.prototype, so an id of "__proto__", "constructor", "toString"
     or "hasOwnProperty" would read back a truthy, inherited value even
     though it was never stored here, and would pass a catalogue
     membership check it should fail. Object.create(null) has no
     prototype chain left to leak through. */
  function idSet(list) {
    var out = Object.create(null);
    arr(list).forEach(function (x) { if (x && typeof x.id === 'string') out[x.id] = 1; });
    return out;
  }

  function channelSet(list) {
    var out = Object.create(null);
    arr(list).forEach(function (c) { if (typeof c === 'string') out[c] = 1; });
    return out;
  }

  function dedupe(list) {
    return list.filter(function (x, i, self) { return self.indexOf(x) === i; });
  }

  /* Field-level helpers for the ops whose payload is otherwise free
     form. Each returns undefined for anything that does not match, so a
     bad value is dropped rather than coerced: a numeric field carrying a
     string is not parsed into a number, because silently reinterpreting
     hostile input is its own kind of bug. */
  function str(v, max) {
    if (typeof v !== 'string') return undefined;
    return v.slice(0, max);
  }

  function dateStr(v) {
    if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return undefined;
    return v;
  }

  function numField(v, min, max) {
    if (typeof v !== 'number' || !isFinite(v)) return undefined;
    v = Math.round(v);
    if (v < min || v > max) return undefined;
    return v;
  }

  function enumField(v, allowed) {
    return (typeof v === 'string' && allowed.indexOf(v) > -1) ? v : undefined;
  }

  function strArray(v, maxItems, maxLen) {
    if (!Array.isArray(v)) return undefined;
    var out = v.filter(function (s) { return typeof s === 'string'; })
      .slice(0, maxItems)
      .map(function (s) { return s.slice(0, maxLen); });
    return out.length ? out : undefined;
  }

  function isPlainObject(v) {
    return !!v && typeof v === 'object' && !Array.isArray(v);
  }

  function validate(actions, cat) {
    var ok = [], rejected = [];
    if (!Array.isArray(actions)) return { actions: ok, rejected: rejected };
    cat = cat || {};
    var F = idSet(cat.formats), P = idSet(cat.personas), S = idSet(cat.sites);
    var CH = channelSet(cat.channels);
    /* Counted from the deduped table, not cat.channels.length: a
       catalogue with a duplicated channel name would otherwise
       undercount the real channel set and let channels_off slip an
       all-off request past the guard below. */
    var chTotal = Object.keys(CH).length;

    actions.forEach(function (a) {
      if (!a || typeof a !== 'object' || Array.isArray(a) || OPS.indexOf(a.op) < 0) {
        rejected.push({ a: a, why: 'unknown op' });
        return;
      }
      var keep, fields, refiners, notes, n, v;

      switch (a.op) {
        case 'add_formats':
        case 'remove_formats':
          keep = arr(a.ids, 200).filter(function (x) { return typeof x === 'string' && F[x]; });
          if (!keep.length) { rejected.push({ a: a, why: 'no known format ids' }); return; }
          if (keep.length !== arr(a.ids).length) rejected.push({ a: a, why: 'some format ids unknown' });
          ok.push({ op: a.op, ids: keep });
          return;

        case 'set_personas':
          keep = dedupe(arr(a.ids, 200).filter(function (x) { return typeof x === 'string' && P[x]; }))
            .slice(0, 5);
          if (!keep.length) { rejected.push({ a: a, why: 'no known persona ids' }); return; }
          ok.push({ op: a.op, ids: keep });
          return;

        case 'pin_sites':
          keep = arr(a.ids, 200).filter(function (x) { return typeof x === 'string' && S[x]; });
          if (!keep.length) { rejected.push({ a: a, why: 'no known site ids' }); return; }
          ok.push({ op: a.op, ids: keep, pinned: !!a.pinned });
          return;

        case 'channels_on':
        case 'channels_off':
          keep = dedupe(arr(a.channels, 50).filter(function (c) { return typeof c === 'string' && CH[c]; }));
          if (!keep.length) { rejected.push({ a: a, why: 'no known channels' }); return; }
          /* The page never allows an empty channel list; neither does
             this. */
          if (a.op === 'channels_off' && keep.length >= chTotal) {
            rejected.push({ a: a, why: 'would empty the channel list' });
            return;
          }
          ok.push({ op: a.op, channels: keep });
          return;

        case 'set_split':
          if (a.mode === 'recommended') { ok.push({ op: a.op, mode: 'recommended' }); return; }
          /* A list, not a map: the API cannot express a map of
             arbitrary ids, so the wire shape is a list and nothing
             converts it. */
          keep = arr(a.split, 200).filter(function (e) {
            return isPlainObject(e) && typeof e.id === 'string' && F[e.id] &&
              typeof e.amount === 'number' && isFinite(e.amount) && e.amount >= 0;
          }).map(function (e) { return { id: e.id, amount: Math.round(e.amount) }; });
          if (!keep.length) { rejected.push({ a: a, why: 'no usable split' }); return; }
          ok.push({ op: a.op, split: keep });
          return;

        case 'go_to_step':
          if (typeof a.step !== 'number' || !isFinite(a.step) || !(a.step >= 1 && a.step <= 4)) {
            rejected.push({ a: a, why: 'step out of range' });
            return;
          }
          ok.push({ op: a.op, step: Math.round(a.step) });
          return;

        case 'set_mode':
          if (a.mode !== 'personas' && a.mode !== 'mass') {
            rejected.push({ a: a, why: 'bad mode' });
            return;
          }
          ok.push({ op: a.op, mode: a.mode });
          return;

        case 'set_fields':
          if (!isPlainObject(a.fields)) { rejected.push({ a: a, why: 'fields missing or not an object' }); return; }
          fields = {}; n = 0;
          [
            ['name', str(a.fields.name, 120)],
            ['brand', str(a.fields.brand, 80)],
            ['prod', str(a.fields.prod, 120)],
            ['start', dateStr(a.fields.start)],
            ['end', dateStr(a.fields.end)],
            ['budget', numField(a.fields.budget, 0, 100000000)],
            ['objective', enumField(a.fields.objective, OBJECTIVES)],
            ['kpi', str(a.fields.kpi, 40)],
            ['target', numField(a.fields.target, 0, 100000000)],
            ['unit', str(a.fields.unit, 20)],
            ['langs', strArray(a.fields.langs, 4, 30)],
          ].forEach(function (pair) {
            if (pair[1] !== undefined) { fields[pair[0]] = pair[1]; n++; }
          });
          if (!n) { rejected.push({ a: a, why: 'no usable fields' }); return; }
          ok.push({ op: a.op, fields: fields });
          return;

        case 'set_refiners':
          if (!isPlainObject(a.refiners)) { rejected.push({ a: a, why: 'refiners missing or not an object' }); return; }
          refiners = {}; n = 0;
          ['race', 'gen', 'inc', 'geo'].forEach(function (k) {
            var val = str(a.refiners[k], 10);
            if (val !== undefined) { refiners[k] = val; n++; }
          });
          if (!n) { rejected.push({ a: a, why: 'no usable refiners' }); return; }
          ok.push({ op: a.op, refiners: refiners });
          return;

        case 'set_notes':
          notes = {}; n = 0;
          v = str(a.intent, 400);
          if (v !== undefined) { notes.intent = v; n++; }
          v = str(a.exclude, 400);
          if (v !== undefined) { notes.exclude = v; n++; }
          if (!n) { rejected.push({ a: a, why: 'no usable notes' }); return; }
          ok.push(Object.assign({ op: a.op }, notes));
          return;

        case 'confirm_booking':
          /* No payload of its own; anything else riding along on this
             op is stripped rather than passed through. */
          ok.push({ op: 'confirm_booking' });
          return;

        default:
          /* Every op in OPS has an explicit case above. This only runs
             if OPS and the switch above ever drift apart, and it fails
             closed instead of passing an unvetted payload through. */
          rejected.push({ a: a, why: 'unhandled op' });
          return;
      }
    });

    return { actions: ok, rejected: rejected };
  }

  var api = { validate: validate, OPS: OPS };
  if (typeof window !== 'undefined') window.CollabAI = Object.assign(window.CollabAI || {}, api);
})();
