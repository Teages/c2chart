import type { C2Chart, TempoListItem } from '../../type'

export type TemposContext = Map<number, TempoListItem & { time: number }>
export function createTemposContext(chart: C2Chart): TemposContext {
  const timeBase = chart.time_base
  const tempos = chart.tempo_list
    .toSorted((a, b) => a.tick - b.tick)

  const relativeTime = (relativeTick: number, tempoValue: number) => {
    return relativeTick * tempoValue / 1_000 / timeBase
  }

  const tempoContext: TemposContext = new Map()
  let lastTempoTick: number | undefined
  for (const tempo of tempos) {
    const lastTempo = lastTempoTick ? tempoContext.get(lastTempoTick) : undefined

    // check the first tempo
    if (lastTempo === undefined) {
      if (tempo.tick !== 0) {
        throw new Error('The first tempo must be at tick 0')
      }
      tempoContext.set(tempo.tick, {
        ...tempo,
        time: 0,
      })
    }

    else {
      tempoContext.set(tempo.tick, {
        ...tempo,
        time: lastTempo.time + relativeTime(
          tempo.tick - lastTempo.tick,
          lastTempo.value,
        ),
      })
    }
  }

  return tempoContext
}

export interface Context {
  tempos: TemposContext
}
