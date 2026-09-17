import { test } from 'node:test';
import assert from 'node:assert/strict';
import { z } from 'zod';
import { Envelope, ACTION_OPS, Action, ENVELOPE_JSON_SCHEMA } from '../api/_schema.mjs';

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
      { op: 'set_split', split: [{ id: 'isv', amount: 100000 }, { id: 'sva', amount: 100000 }] },
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

// The hand-written ENVELOPE_JSON_SCHEMA duplicates zod's constraints on
// purpose (see the comment above its definition): it is what the API
// actually enforces, since zodOutputFormat cannot turn a z.literal or a
// z.enum into a real JSON Schema enum. Everything below this point is a
// drift guard between the two representations, not a shape check on
// either one alone.

function opEnumNode(schema) {
  return schema.properties.actions.items.properties.op;
}

test('the JSON Schema op enum matches ACTION_OPS exactly, as a set', () => {
  const enumOps = opEnumNode(ENVELOPE_JSON_SCHEMA).enum;
  assert.deepEqual(new Set(enumOps), new Set(ACTION_OPS));
  assert.equal(enumOps.length, ACTION_OPS.length);
});

// walkObjects visits every node typed 'object', including one with no
// 'properties' of its own. That second case is exactly the free-form
// map shape the API rejects (see the split rationale below), so a node
// like that must never appear, and the additionalProperties check right
// after this can only catch it if the walk actually looks.
function walkObjects(node, visit) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'object') visit(node);
  for (const value of Object.values(node)) {
    if (value && typeof value === 'object') walkObjects(value, visit);
  }
}

test('every object in the JSON Schema declares its properties and closes them off', () => {
  const objectNodes = [];
  walkObjects(ENVELOPE_JSON_SCHEMA, (node) => objectNodes.push(node));
  assert.ok(objectNodes.length > 0);
  for (const node of objectNodes) {
    assert.ok(node.properties, 'a bare {type: "object"} with no properties is a free-form map, which the API rejects');
    assert.equal(node.additionalProperties, false);
  }
});

// actionKeys walks the zod side of the contract (Action is a union of
// per-op objects, and set_split is itself a nested union) and collects
// every top-level key any op's payload can carry. ENVELOPE_JSON_SCHEMA
// is deliberately flat, one action shape with every op's keys folded
// into optional properties, so this is the right shape to compare
// against: derived from zod rather than hand-listed, so a fourteenth op
// or a renamed payload key fails this test even if someone remembers to
// update the op name in both places but not the new key here.
function actionKeys(schema, keys = new Set()) {
  if (schema instanceof z.ZodUnion) {
    for (const option of schema.options) actionKeys(option, keys);
  } else if (schema instanceof z.ZodObject) {
    for (const key of Object.keys(schema.shape)) keys.add(key);
  }
  return keys;
}

test('every payload key a zod action can carry has a home in the flat JSON Schema', () => {
  const zodKeys = actionKeys(Action);
  const schemaKeys = new Set(Object.keys(ENVELOPE_JSON_SCHEMA.properties.actions.items.properties));
  assert.ok(zodKeys.size > 0);
  for (const key of zodKeys) {
    assert.ok(schemaKeys.has(key), `zod action key "${key}" has no matching property in ENVELOPE_JSON_SCHEMA`);
  }
});

// enumValuesForKey pulls every legal value a top-level action key can
// take according to zod (a plain enum, or a literal on a union branch
// like set_split's recommended-reset), so the JSON Schema's hand-written
// enum can be checked against it instead of just against itself.
function enumValuesForKey(schema, key, values = new Set()) {
  if (schema instanceof z.ZodUnion) {
    for (const option of schema.options) enumValuesForKey(option, key, values);
  } else if (schema instanceof z.ZodObject) {
    const field = schema.shape[key];
    if (field) {
      const unwrapped = field instanceof z.ZodOptional ? field.unwrap() : field;
      if (unwrapped instanceof z.ZodEnum) for (const v of unwrapped.options) values.add(v);
      else if (unwrapped instanceof z.ZodLiteral) values.add(unwrapped.value);
    }
  }
  return values;
}

function findActionByOp(schema, op) {
  if (schema instanceof z.ZodUnion) {
    for (const option of schema.options) {
      const found = findActionByOp(option, op);
      if (found) return found;
    }
    return undefined;
  }
  if (schema instanceof z.ZodObject) {
    const opField = schema.shape.op;
    if (opField instanceof z.ZodLiteral && opField.value === op) return schema;
  }
  return undefined;
}

test('the mode enum in the JSON Schema matches every mode value zod accepts', () => {
  const zodModes = enumValuesForKey(Action, 'mode');
  const schemaModes = new Set(ENVELOPE_JSON_SCHEMA.properties.actions.items.properties.mode.enum);
  assert.ok(zodModes.size > 0);
  assert.deepEqual(schemaModes, zodModes);
});

test('the objective enum in the JSON Schema matches every objective value zod accepts', () => {
  const setFields = findActionByOp(Action, 'set_fields');
  const objectiveField = setFields.shape.fields.shape.objective;
  /* The field is wrapped twice, optional around nullable, so peel until
     the enum appears rather than assuming a fixed depth. Adding another
     wrapper should not break a test about which values are legal. */
  var unwrapped = objectiveField;
  while (unwrapped && !unwrapped.options && typeof unwrapped.unwrap === 'function') {
    unwrapped = unwrapped.unwrap();
  }
  const zodObjectives = new Set(unwrapped.options);
  const schemaObjectives = new Set(
    ENVELOPE_JSON_SCHEMA.properties.actions.items.properties.fields.properties.objective.anyOf[0].enum,
  );
  assert.ok(zodObjectives.size > 0);
  assert.deepEqual(schemaObjectives, zodObjectives);
});

test('the channels enum in the JSON Schema matches the five catalogue channels', () => {
  // channels_on/channels_off validate a channel name as any string up to
  // 20 characters; zod does not know the fixed set of five, the site
  // catalogue does (see the same list in test/prompt.test.mjs's fixture).
  // Hand-maintained on purpose, but it fails loudly the moment the JSON
  // Schema enum and this list disagree.
  const expected = new Set(['OTT', 'Social', 'Web', 'Video', 'Audio']);
  const actual = new Set(ENVELOPE_JSON_SCHEMA.properties.actions.items.properties.channels.items.enum);
  assert.deepEqual(actual, expected);
});

test('an illegal mode is schema-invalid, not just zod-invalid', () => {
  assert.ok(!ENVELOPE_JSON_SCHEMA.properties.actions.items.properties.mode.enum.includes('wat'));
  const r = Envelope.safeParse({ say: 'x', actions: [{ op: 'set_mode', mode: 'wat' }] });
  assert.equal(r.success, false);
});

// The API rejected a schema with 29 optional properties total ("Reduce
// the number of optional parameters in your tool schemas (limit: 24)"),
// discovered by a live call while building this schema (see the comment
// on ENVELOPE_JSON_SCHEMA.properties.actions.items.properties.fields).
// Nothing else pins that ceiling, so a handful of careless additions
// would 400 the endpoint in production with no test failing first.
const OPTIONAL_PROPERTY_LIMIT = 24;

function countOptionalProperties(node) {
  if (!node || typeof node !== 'object') return 0;
  let count = 0;
  if (node.properties) {
    const required = new Set(node.required || []);
    for (const [key, child] of Object.entries(node.properties)) {
      if (!required.has(key)) count += 1;
      count += countOptionalProperties(child);
    }
  }
  if (node.items) count += countOptionalProperties(node.items);
  if (Array.isArray(node.anyOf)) for (const branch of node.anyOf) count += countOptionalProperties(branch);
  return count;
}

test('optional properties across the schema stay at or below the API ceiling', () => {
  const total = countOptionalProperties(ENVELOPE_JSON_SCHEMA);
  assert.ok(
    total <= OPTIONAL_PROPERTY_LIMIT,
    `schema has ${total} optional properties, the API's live ceiling is ${OPTIONAL_PROPERTY_LIMIT}`,
  );
});

test('both schemas agree that a split is a list of id and amount', () => {
  // the wire shape the API can express is the shape zod validates
  const viaZod = Envelope.safeParse({ say: 'x', actions: [
    { op: 'set_split', split: [{ id: 'isv', amount: 1000 }] }] });
  assert.equal(viaZod.success, true);

  const rejectsRecord = Envelope.safeParse({ say: 'x', actions: [
    { op: 'set_split', split: { isv: 1000 } }] });
  assert.equal(rejectsRecord.success, false);

  const jsonSplit = ENVELOPE_JSON_SCHEMA.properties.actions.items.properties.split;
  assert.equal(jsonSplit.type, 'array');
  assert.deepEqual(Object.keys(jsonSplit.items.properties).sort(), ['amount', 'id']);
});

/* The API caps a schema at 24 optional properties, so the eleven campaign
   fields are declared required-and-nullable to fit. A partial change,
   which is most changes, therefore arrives with nulls in every field it
   does not touch. Optional alone rejects null, and that broke every
   partial edit while a full draft kept working, so the happy path hid it.
   These two pin the shape the API actually produces. */
test('a partial set_fields, nulls and all, is accepted', () => {
  const r = Envelope.safeParse({ say: 'x', actions: [{ op: 'set_fields', fields: {
    name: null, brand: null, prod: null, start: '2026-10-01', end: '2026-11-12',
    budget: null, objective: null, kpi: null, target: null, unit: null, langs: null } }] });
  assert.equal(r.success, true, 'a partial edit must validate, it is the commonest action');
});

test('every campaign field the API marks nullable is nullable in zod', () => {
  const props = ENVELOPE_JSON_SCHEMA.properties.actions.items.properties.fields.properties;
  for (const key of Object.keys(props)) {
    const one = Envelope.safeParse({ say: 'x',
      actions: [{ op: 'set_fields', fields: { [key]: null } }] });
    assert.equal(one.success, true, `${key} rejects null, so any edit leaving it out will fail`);
  }
});
