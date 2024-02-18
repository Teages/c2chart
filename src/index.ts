import { type ZodIssue, number } from 'zod'
import type { C2Chart } from './type.d'
import c2ChartSchema from './schema'

export * from './type.d'

export * from './schema'
export * from './utils'

export function parseChart(chart: C2Chart): C2Chart {
  return chart
}

export function verifyChart(
  maybeChart: any,
  config?: {
    throwOnError: false
  },
): C2Chart | null
export function verifyChart(
  maybeChart: any,
  config: {
    throwOnError: true
  },
): C2Chart
export function verifyChart(
  maybeChart: any,
  config = {
    throwOnError: false,
  },
) {
  const chart = c2ChartSchema.safeParse(maybeChart)
  if (!chart.success) {
    if (config.throwOnError) {
      throw new C2ChartVerifyError(chart.error.issues)
    }
    return null
  }

  return chart.data as C2Chart
}

export class C2ChartVerifyError extends Error {
  #issues: ZodIssue[]
  constructor(issues: ZodIssue[]) {
    super(`Found ${issues.length} issues at ${
      issues.map(issue => `${issue.path.join('.')} (${issue.code})`).join(', ')
    }`)
    this.#issues = issues
  }

  get issues(): ZodIssue[] {
    return this.#issues
  }
}
