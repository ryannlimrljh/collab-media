import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSystem } from '../api/_prompt.mjs';

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
