import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSystem } from '../api/_prompt.mjs';
import { ACTION_OPS, ENVELOPE_JSON_SCHEMA } from '../api/_schema.mjs';

/* The prompt is prose, and prose gets rewrapped. Search it with the
   whitespace flattened so a cosmetic line break can never fail a test
   that is really asking whether the rule is stated at all. */
const says = (s, phrase) => s.toLowerCase().replace(/\s+/g, ' ').includes(phrase);

const catalogue = {
  channels: ['Video', 'Audio', 'OTT', 'Web', 'Social'],
  formats: [{ id: 'isv', name: 'In-stream Video', ch: 'Web', cpm: 25, video: true }],
  personas: [{ id: 'cl', name: 'Comedy lover', cat: 'Entertainment', users: 204600 }],
  sites: [{ id: 'awani', name: 'Awani', ch: 'Web', cpm: 10, inv: 18400000 }],
};

test('carries every catalogue row into the prompt', () => {
  const s = buildSystem(catalogue);
  assert.ok(s.includes('In-stream Video'));
  assert.ok(s.includes('204,600') || s.includes('204600'));
  assert.ok(s.includes('Awani'));
});

test('states both standing rules', () => {
  const s = buildSystem(catalogue);
  assert.ok(says(s, 'never invent'), 'facts must be caged');
  assert.ok(says(s, 'media plan'), 'thinking must be invited');
});

test('fences the scope and protects booking', () => {
  const s = buildSystem(catalogue);
  assert.ok(says(s, 'out of scope'), 'the scope fence must be stated');
  assert.ok(says(s, 'confirm_booking'), 'booking must be named');
  assert.ok(says(s, 'never books'), 'booking must be described as opening the dialog only');
});

test('the prompt practises the style it preaches', () => {
  /* It tells the model never to use an em dash, so it must not use one. */
  const s = buildSystem(catalogue);
  assert.equal(s.includes('\u2014'), false, 'the prompt contains an em dash');
});

test('is stable for the same catalogue, so it caches', () => {
  assert.equal(buildSystem(catalogue), buildSystem(catalogue));
});

test('survives a catalogue with missing optional fields', () => {
  const s = buildSystem({ channels: [], formats: [], personas: [], sites: [] });
  assert.ok(s.length > 200);
});

test('does not vary with key order in the catalogue', () => {
  const a = buildSystem({ channels: ['Web'], formats: [], personas: [], sites: [] });
  const b = buildSystem({ sites: [], personas: [], formats: [], channels: ['Web'] });
  assert.equal(a, b);
});

test('every action op is named in the prompt', () => {
  const s = buildSystem(catalogue).toLowerCase();
  for (const op of ACTION_OPS) {
    assert.ok(s.includes(op), `the model was never taught the ${op} action`);
  }
});

test('the four-way routing is stated', () => {
  const s = buildSystem(catalogue);
  assert.ok(says(s, 'return no actions'), 'a plain question must not return actions');
  assert.ok(says(s, 'never describe a change you did not make'), 'the no-fake-change rule is gone');
});

test('the what-if rule protects the plan', () => {
  const s = buildSystem(catalogue);
  assert.ok(says(s, 'still a question'), 'the what-if protection is gone');
  assert.ok(says(s, 'costs them their afternoon'), 'the stakes of a wrong apply are gone');
});

test('the acting rules are present', () => {
  const s = buildSystem(catalogue);
  assert.ok(says(s, 'the leaderboard'), 'the names-versus-ids rule lost its example');
  assert.ok(says(s, 'never percentages'), 'the absolute-amounts rule is gone');
  assert.ok(says(s, 'cannot save a plan'), 'the honest no-save admission is gone');
});

test('humour is guided and capped', () => {
  const s = buildSystem(catalogue);
  assert.ok(says(s, 'light touch'), 'the tone guidance for declines is gone');
  assert.ok(says(s, 'never more than one line'), 'the cap on the decline length is gone');
  assert.ok(says(s, 'vary it'), 'the instruction against repeating the same quip is gone');
});

test('the examples are marked as register, not as lines to reuse', () => {
  const s = buildSystem(catalogue);
  assert.ok(says(s, 'not lines to reuse'), 'the examples now read as scripted lines to parrot');
});

/* The prompt teaches the model a vocabulary; the schema decides what the
   API will actually accept. Written by hand these drifted at once, and a
   closed schema turns that drift into fields the model is told to use and
   physically cannot. The prompt reads them from the schema now, and this
   proves it keeps doing so. */
test('the field names taught are the field names the API accepts', () => {
  const s = buildSystem(catalogue);
  const items = ENVELOPE_JSON_SCHEMA.properties.actions.items.properties;

  for (const group of ['fields', 'refiners']) {
    const accepted = Object.keys(items[group].properties);
    for (const key of accepted) {
      assert.ok(says(s, key), `the prompt never names "${key}", which ${group} accepts`);
    }
  }

  /* And the reverse: nothing taught that the API would refuse. */
  const taught = (s.match(/^set_(?:fields|refiners) +(.+)$/gm) || [])
    .flatMap((line) => line.replace(/^set_\w+ +/, '').split(',').map((k) => k.trim()));
  const accepted = [
    ...Object.keys(items.fields.properties),
    ...Object.keys(items.refiners.properties),
  ];
  for (const key of taught) {
    assert.ok(accepted.includes(key), `the prompt teaches "${key}", which the API would refuse`);
  }
});
