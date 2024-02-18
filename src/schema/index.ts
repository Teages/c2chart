import { z as zodSchema } from 'zod'
import { tempo } from './tempo'
import { page } from './page'
import { eventOrder } from './event-order'
import { note } from './note'

export const definitions = {
  tempo,
  page,
  eventOrder,
  note,
}

export const c2ChartSchema = zodSchema.object({
  format_version: zodSchema.literal(1)
    .describe('The version of the format of the chart'),

  time_base: zodSchema.number()
    .int()
    .gt(0)
    .describe('The time base of the chart, ticks per beat, prefer 480'),

  start_offset_time: zodSchema.number()
    .default(0.0)
    .describe('unused'),

  tempo_list: zodSchema.array(tempo)
    .min(1)
    .describe('The list of tempos in the chart'),

  page_list: zodSchema.array(page)
    .describe('The list of pages in the chart'),

  event_order_list: zodSchema.array(eventOrder)
    .describe('The list of event order in the chart'),

  note_list: zodSchema.array(note)
    .describe('The list of notes in the chart'),

}).describe('The schema of a c2 chart')

export default c2ChartSchema
