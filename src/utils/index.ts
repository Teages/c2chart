import type { C2Chart } from '../type'
import { binarySearch } from './internal/binary-search'
import type { Context } from './internal/context'
import { createTemposContext } from './internal/context'

export * from './create'

export function useChartUtils(chart: C2Chart) {
  const context: Context = {
    tempos: createTemposContext(chart),
  }

  const tickToTime = (tick: number) => {
    const timeBase = chart.time_base
    const keys = [...context.tempos.keys()]
    const tempo = context.tempos.get(
      keys[binarySearch(keys, tick)],
    )!
    return tempo.time + (tick - tempo.tick) * tempo.value / 1_000 / timeBase
  }

  const timeToTick = (time: number) => {
    const timeBase = chart.time_base
    const tempos = [...context.tempos.values()]
    const tempo = tempos[binarySearch(tempos.map(tempo => tempo.time), time)]

    return tempo.tick + (time - tempo.time) * 1_000 * timeBase / tempo.value
  }

  return {
    tickToTime,
    timeToTick,
  }
}
