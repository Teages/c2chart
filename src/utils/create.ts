import type { XOR } from 'ts-xor'
import type { C2Chart } from '../type'
import type { TemposContext } from './internal/context'

export function createChart(options: CreateChartOptions): C2Chart {
  const timeBase = options.timeBase ?? 480
  const length = options.length ?? 0
  let minLength = 0

  const tempoListWithTime = options.tempoList
    ? options.tempoList.toSorted((a, b) => a.time - b.time)
    : options.bpmList.map(({ time, value }) => ({ time, value: 60_000_000 / value }))

  const tempoList: TemposContext = new Map()
  const timeToTick = (time: number) => {
    if (time === 0) {
      return 0
    }
    const keys = [...tempoList.keys()]
    const tempo = tempoList.get(keys[keys.length - 1])
    if (!tempo) {
      throw new Error('C2 chart does not support offset, the first tempo must be at time 0')
    }

    return tempo.tick + (time - tempo.time) * 1_000 * timeBase / tempo.value
  }

  tempoListWithTime.forEach(({ time, value }) => {
    const tick = timeToTick(time)
    minLength = time
    tempoList.set(tick, {
      tick,
      value,
      time,
    })
  })

  const lengthInTick = timeToTick(Math.max(length, minLength))

  return {
    format_version: 1,
    time_base: timeBase,
    start_offset_time: 0,
    tempo_list: [...tempoList.values()].map(({ tick, value }) => ({ tick, value })),
    page_list: Array.from({ length: Math.ceil(lengthInTick / (timeBase * 2)) }).fill(0).map((_, i) => ({
      start_tick: i * timeBase * 2,
      end_tick: (i + 1) * timeBase * 2,
      scan_line_direction: i % 2 === 0 ? 1 : -1,
    })),
    event_order_list: [],
    note_list: [],
  }
}

export type CreateChartOptions = {
  /**
   * The time base of the chart, ticks per beat, prefer 480
   */
  timeBase?: number

  /**
   * The length of the chart, in milliseconds
   */
  length?: number
} & XOR<{
  bpmList: Array<{
    /**
     * The time in ticks of the tempo, in milliseconds
     */
    time: number

    /**
     * The value of BPM
     */
    value: number
  }>
}, {
  tempoList: Array<{
    /**
     * The time in ticks of the tempo, in milliseconds
     */
    time: number

    /**
     * The value of tempo
     */
    value: number
  }>
}>
