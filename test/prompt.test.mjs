import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSystem } from '../api/_prompt.mjs';

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
  const s = buildSystem(catalogue).toLowerCase();
  assert.ok(s.includes('never invent'));
  assert.ok(s.includes('media plan'));
});

test('fences the scope and protects booking', () => {
  const s = buildSystem(catalogue).toLowerCase();
  assert.ok(s.includes('out of scope'));
  assert.ok(s.includes('confirm_booking'));
  assert.ok(s.includes('never books'));
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
