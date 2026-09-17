import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Envelope, ACTION_OPS } from '../api/_schema.mjs';

test('accepts a chat reply with no actions', () => {
  const r = Envelope.safeParse({ say: 'Web is RM 18 CPM.', actions: [] });
  assert.equal(r.success, true);
});

test('accepts a draft with fields, personas and a split', () => {
  const r = Envelope.safeParse({
    say: 'Drafted it.',
    actions: [
      { op: 'set_fields', fields: { name: 'Raya', budget: 200000, langs: ['English'] } },
      { op: 'set_personas', ids: ['cl', 'al'] },
      { op: 'set_split', split: { isv: 100000, sva: 100000 } },
    ],
    why: { brief: 'Budget from "RM 200k".', personas: 'Broad reach.', mix: 'Video led.' },
  });
  assert.equal(r.success, true);
});

test('rejects an unknown op', () => {
  const r = Envelope.safeParse({ say: 'x', actions: [{ op: 'delete_everything' }] });
  assert.equal(r.success, false);
});

test('rejects more than five personas', () => {
  const r = Envelope.safeParse({
    say: 'x', actions: [{ op: 'set_personas', ids: ['a', 'b', 'c', 'd', 'e', 'f'] }],
  });
  assert.equal(r.success, false);
});

test('set_split accepts the recommended reset', () => {
  const r = Envelope.safeParse({ say: 'x', actions: [{ op: 'set_split', mode: 'recommended' }] });
  assert.equal(r.success, true);
});

test('covers exactly the thirteen ops the spec names', () => {
  assert.equal(ACTION_OPS.length, 13);
  assert.ok(ACTION_OPS.includes('confirm_booking'));
  assert.ok(!ACTION_OPS.includes('delete_plan'));
});
