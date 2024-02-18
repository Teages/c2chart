import { describe, expect, it } from 'vitest'

import { parseChart, verifyChart } from '../src'

import { generate } from '../bin/update-schema'

import schema from '../schema.json'
import chart from './data/teages.chino.shinsakunoshiawasewakochira.json'

describe('c2chart', () => {
  it.todo('parse', () => {
    expect(parseChart(chart as any)).toMatchSnapshot()
  })
  it('verify object', () => {
    expect(verifyChart(chart)).toMatchSnapshot()
  })
  it('verify string', () => {
    expect(verifyChart(JSON.stringify(chart))).toMatchSnapshot()
  })
  it('verify invalid', () => {
    expect(verifyChart({})).toBeNull()
    expect(() => verifyChart({}, { throwOnError: true }))
      .toThrowError()
  })
})

describe('c2chart-schema', () => {
  it.todo('latest', () => {
    const latest = generate()
    expect(JSON.parse(latest)).toMatchObject(schema)
  })
})
