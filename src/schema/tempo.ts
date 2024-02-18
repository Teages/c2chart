import { z } from 'zod'

export const tempo = z.object({
  tick: z.number()
    .gte(0)
    .describe('The time in ticks of the tempo change'),

  value: z.number()
    .gt(0)
    .describe('The time of one beat (in μs), with time base 480 it same to 60,000,000 / BPM'),
})
  .describe('The tempo of the chart')
