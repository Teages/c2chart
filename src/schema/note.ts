import { z } from 'zod'

export const note = z.object({
  page_index: z.number()
    .int()
    .gt(0)
    .describe('The page index of the note'),

  type: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7)])
    .describe('The type of the note. 0: Click, 1: Hold, 2: Long hold, 3: Drag, 4: Drag child, 5: Flick, 6: Click drag, 7: Click drag child'),

  id: z.number()
    .int()
    .gte(0)
    .describe('The id of the note'),

  tick: z.number()
    .int()
    .gt(0)
    .describe('The time in ticks of the note'),

  x: z.number()
    .gte(0)
    .lte(1)
    .describe('The x position of the note'),

  has_sibling: z.boolean()
    .describe('Is there are a note at the same tick')
    .default(false),

  hold_tick: z.number()
    .int()
    .gte(0)
    .describe('The length in ticks of the hold note'),

  next_id: z.number()
    .int()
    .gte(-1)
    .describe('The id of the next note')
    .default(0),

  is_forward: z.boolean()
    .describe('Is the note in the forward page')
    .default(false),
})
  .describe('The note of the chart')
