/* eslint-disable no-console */

import { createChart, parseChart, useChartUtils, verifyChart } from '../src'

import chart from '../test/data/teages.chino.shinsakunoshiawasewakochira.json'

console.log(verifyChart(parseChart({
  format_version: 1,
  time_base: 480,
  start_offset_time: 0,
  tempo_list: [{
    tick: 0,
    value: 60_000_000 / 180,
  }],
  page_list: [],
  event_order_list: [],
  note_list: [],
}), {
  throwOnError: true,
}))

const { tickToTime, timeToTick } = useChartUtils(verifyChart(chart, { throwOnError: true }))
console.log(tickToTime(3840))
console.log(timeToTick(2742.8559999999998))

console.log(createChart({
  bpmList: [{
    time: 0,
    value: 180,
  }],
  length: 10,
}))
