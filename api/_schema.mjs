// api/_schema.mjs — the shape of every answer, and of every action the
// page will consider. Shared by the endpoint and its tests so there is
// one definition, not two.
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
  set_split: z.union([
    z.object({ op: z.literal('set_split'), split: z.record(id, money) }),
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
