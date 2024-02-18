import { z } from 'zod'

export const event = z.object({
  type: z.union([z.literal(0), z.literal(1)])
    .describe('The type of the event, 0 is speed up, 1 is speed down'),

  args: z.enum(['W', 'R', 'G'])
    .describe([
      `The args of the speed event, it does no effect to playing: `,
      `'W' is speed equals base speed,`,
      `'R' is greater than the base speed,`,
      `'G' is less than the base speed,`,
    ].join(' ')),
})
  .describe('The event of the chart')

export const eventOrder = z.object({
  tick: z.number()
    .gt(0)
    .describe('The time in ticks of the events'),

  event_list: z.array(event)
    .describe('The events need to be executed at the time'),
})
  .describe('The event order of the chart')
