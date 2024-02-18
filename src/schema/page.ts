import { z } from 'zod'

export const page = z.object({
  start_tick: z.number()
    .int()
    .gte(0)
    .describe('The time in ticks of the page change'),

  end_tick: z.number()
    .int()
    .gt(0)
    .describe('The time in ticks of the page change'),

  scan_line_direction: z.union([z.literal(-1), z.literal(1)])
    .describe('The direction of the scan line, -1 is down, 1 is up'),
})
  .describe('The page of the chart')
