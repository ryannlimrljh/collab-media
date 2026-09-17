// api/_schema.mjs: the shape of every answer, and of every action the
// page will consider, expressed twice on purpose. Envelope (zod) is the
// runtime gate the endpoint validates a response against. The API cannot
// be constrained with Envelope directly, so ENVELOPE_JSON_SCHEMA is a
// second, hand-written schema that goes into the API call itself. See
// the comment above ENVELOPE_JSON_SCHEMA for why the two cannot collapse
// into one definition.
import { z } from 'zod';

const id = z.string().min(1).max(40);
const money = z.number().int().min(0).max(100000000);

const SetFields = z.object({
  op: z.literal('set_fields'),
  fields: z.object({
    name: z.string().max(120).optional(),
    brand: z.string().max(80).optional(),
    prod: z.string().max(120).optional(),
    start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    budget: money.optional(),
    objective: z.enum(['awareness', 'consideration', 'conversion', 'footfall', 'leadgen']).optional(),
    kpi: z.string().max(40).optional(),
    target: money.optional(),
    unit: z.string().max(20).optional(),
    langs: z.array(z.string().max(30)).max(4).optional(),
  }),
});

const A = {
  set_fields: SetFields,
  set_mode: z.object({ op: z.literal('set_mode'), mode: z.enum(['personas', 'mass']) }),
  set_personas: z.object({ op: z.literal('set_personas'), ids: z.array(id).max(5) }),
  set_refiners: z.object({
    op: z.literal('set_refiners'),
    refiners: z.object({
      race: z.string().max(10).optional(),
      gen: z.string().max(10).optional(),
      inc: z.string().max(10).optional(),
      geo: z.string().max(10).optional(),
    }),
  }),
  set_notes: z.object({
    op: z.literal('set_notes'),
    intent: z.string().max(400).optional(),
    exclude: z.string().max(400).optional(),
  }),
  channels_on: z.object({ op: z.literal('channels_on'), channels: z.array(z.string().max(20)).max(5) }),
  channels_off: z.object({ op: z.literal('channels_off'), channels: z.array(z.string().max(20)).max(5) }),
  add_formats: z.object({ op: z.literal('add_formats'), ids: z.array(id).max(40) }),
  remove_formats: z.object({ op: z.literal('remove_formats'), ids: z.array(id).max(40) }),
  // split is a list of {id, amount} pairs, not an id-keyed record: see
  // the fuller rationale in the comment above ENVELOPE_JSON_SCHEMA.
  set_split: z.union([
    z.object({
      op: z.literal('set_split'),
      split: z.array(z.object({ id: id, amount: money })).max(40),
    }),
    z.object({ op: z.literal('set_split'), mode: z.literal('recommended') }),
  ]),
  pin_sites: z.object({ op: z.literal('pin_sites'), ids: z.array(id).max(20), pinned: z.boolean() }),
  go_to_step: z.object({ op: z.literal('go_to_step'), step: z.number().int().min(1).max(4) }),
  confirm_booking: z.object({ op: z.literal('confirm_booking') }),
};

export const ACTION_OPS = Object.keys(A);

export const Action = z.union([
  A.set_fields, A.set_mode, A.set_personas, A.set_refiners, A.set_notes,
  A.channels_on, A.channels_off, A.add_formats, A.remove_formats,
  A.set_split, A.pin_sites, A.go_to_step, A.confirm_booking,
]);

export const Envelope = z.object({
  say: z.string().max(4000),
  actions: z.array(Action).max(24),
  why: z.object({
    brief: z.string().max(1200).optional(),
    personas: z.string().max(1200).optional(),
    mix: z.string().max(1200).optional(),
  }).optional(),
});

// ENVELOPE_JSON_SCHEMA: a second, independently hand-written schema for
// output_config.format. zodOutputFormat(Envelope) demotes every z.literal
// and z.enum to a free-text `description` hint (zod 4's JSON Schema
// converter has no `const`/`enum` output for those), so the API sees `op`
// as a bare string and never actually constrains it to our thirteen
// values. A hand-written schema can put `op` in a real `enum`, which the
// API does enforce. This schema is deliberately flat: one action shape
// carrying every op's possible payload keys as optional properties,
// instead of the thirteen-branch anyOf the zod union expresses, because a
// flatter grammar keeps generation quality high and the API only needs to
// gate the op name and the outer shape. zod's Envelope stays the strict
// per-op gate once a response comes back, and the browser still
// re-validates every id against its own catalogue. The op list below is
// written out by hand, not read from ACTION_OPS, so a test can catch the
// two ever drifting apart.
//
// split cannot be a real record here: a live call proved the API rejects
// `additionalProperties` set to anything but the literal `false` ("For
// 'object' type, 'additionalProperties: object' is not supported"), and
// site ids are catalogue-controlled, not a fixed set this file can name.
// So split travels as a list of {id, amount} pairs, and that is the one
// canonical wire shape: zod's set_split validates the same list rather
// than a record, so there is no array-to-record fold anywhere for split
// data to go missing in.
export const ENVELOPE_JSON_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['say', 'actions'],
  properties: {
    say: { type: 'string' },
    actions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['op'],
        properties: {
          op: {
            type: 'string',
            enum: [
              'set_fields', 'set_mode', 'set_personas', 'set_refiners', 'set_notes',
              'channels_on', 'channels_off', 'add_formats', 'remove_formats',
              'set_split', 'pin_sites', 'go_to_step', 'confirm_booking',
            ],
          },
          // fields' own properties are all required-but-nullable rather
          // than left optional: a live call rejected this schema at 29
          // optional parameters total ("Reduce the number of optional
          // parameters in your tool schemas (limit: 24)"). Making this
          // object's 11 slots required+nullable, the standard strict-
          // schema move, drops the count to 18 without losing any slot
          // set_fields can fill.
          fields: {
            type: 'object',
            additionalProperties: false,
            required: ['name', 'brand', 'prod', 'start', 'end', 'budget', 'objective', 'kpi', 'target', 'unit', 'langs'],
            properties: {
              name: { type: ['string', 'null'] },
              brand: { type: ['string', 'null'] },
              prod: { type: ['string', 'null'] },
              start: { type: ['string', 'null'] },
              end: { type: ['string', 'null'] },
              budget: { type: ['integer', 'null'] },
              // a live call rejected `type: ['string', 'null']` combined
              // with `enum` in one node ("Enum value 'awareness' does not
              // match declared type"), so the null branch has to live in
              // its own anyOf arm instead of joining the type array.
              objective: {
                anyOf: [
                  { type: 'string', enum: ['awareness', 'consideration', 'conversion', 'footfall', 'leadgen'] },
                  { type: 'null' },
                ],
              },
              kpi: { type: ['string', 'null'] },
              target: { type: ['integer', 'null'] },
              unit: { type: ['string', 'null'] },
              langs: { type: ['array', 'null'], items: { type: 'string' } },
            },
          },
          // legal across both ops that carry mode: set_mode's own
          // personas/mass, and set_split's recommended-reset variant.
          mode: { type: 'string', enum: ['personas', 'mass', 'recommended'] },
          ids: { type: 'array', items: { type: 'string' } },
          refiners: {
            type: 'object',
            additionalProperties: false,
            properties: {
              race: { type: 'string' },
              gen: { type: 'string' },
              inc: { type: 'string' },
              geo: { type: 'string' },
            },
          },
          intent: { type: 'string' },
          exclude: { type: 'string' },
          channels: {
            type: 'array',
            items: { type: 'string', enum: ['OTT', 'Social', 'Web', 'Video', 'Audio'] },
          },
          split: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['id', 'amount'],
              properties: {
                id: { type: 'string' },
                amount: { type: 'integer' },
              },
            },
          },
          pinned: { type: 'boolean' },
          // tried `minimum: 1, maximum: 4` to match zod's go_to_step
          // bound; a live call rejected it ("For 'integer' type,
          // properties maximum, minimum are not supported"). Do not
          // retry this, the API's strict schema filter has no numeric
          // range keywords.
          step: { type: 'integer' },
        },
      },
    },
    why: {
      type: 'object',
      additionalProperties: false,
      properties: {
        brief: { type: 'string' },
        personas: { type: 'string' },
        mix: { type: 'string' },
      },
    },
  },
};
