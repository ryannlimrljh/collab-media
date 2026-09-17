import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Envelope, ACTION_OPS, ENVELOPE_JSON_SCHEMA } from '../api/_schema.mjs';

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

// The hand-written ENVELOPE_JSON_SCHEMA duplicates ACTION_OPS on purpose
// (see the comment above its definition): it is what the API actually
// enforces, since zodOutputFormat cannot turn a z.literal into a real
// enum. These three tests are the drift guard and regression guard for
// that duplication, not just shape checks.

function opEnumNode(schema) {
  return schema.properties.actions.items.properties.op;
}

test('the JSON Schema op enum matches ACTION_OPS exactly, as a set', () => {
  const enumOps = opEnumNode(ENVELOPE_JSON_SCHEMA).enum;
  assert.deepEqual(new Set(enumOps), new Set(ACTION_OPS));
  assert.equal(enumOps.length, ACTION_OPS.length);
});

function walkObjects(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'object' && node.properties) visit(node);
  for (const value of Object.values(node)) {
    if (value && typeof value === 'object') walkObjects(value, visit);
  }
}

test('every closed object in the JSON Schema sets additionalProperties: false', () => {
  const closedObjects = [];
  walkObjects(ENVELOPE_JSON_SCHEMA, (node) => closedObjects.push(node));
  assert.ok(closedObjects.length > 0);
  for (const node of closedObjects) {
    assert.equal(node.additionalProperties, false);
  }
});

test('the JSON Schema still has a real enum keyword, not just a hint', () => {
  assert.ok(Array.isArray(opEnumNode(ENVELOPE_JSON_SCHEMA).enum));
  assert.ok(opEnumNode(ENVELOPE_JSON_SCHEMA).enum.length > 0);
});
