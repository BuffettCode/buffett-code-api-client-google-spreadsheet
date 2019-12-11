import { round, yearQuarterRangeOf } from './util'
import { YearQuarter } from './year-quarter'

test('round', () => {
  expect(round(1234.5678, 1)).toBe(1234.6)
  expect(round(1234.5678, -1)).toBe(1230)

  // TODO: 現在の実装だと精度に問題がある
  // expect(round(1.05, 1)).toBe(1.1)
  // expect(round(1.005, 1)).toBe(1.01)
})

test('yearQuarterRangeOf', () => {
  expect(yearQuarterRangeOf(new YearQuarter(2018, 1))).toEqual([
    new YearQuarter(2015, 3),
    new YearQuarter(2018, 2)
  ])

  expect(yearQuarterRangeOf(new YearQuarter(2018, 2))).toEqual([
    new YearQuarter(2015, 4),
    new YearQuarter(2018, 3)
  ])

  expect(yearQuarterRangeOf(new YearQuarter(2018, 3))).toEqual([
    new YearQuarter(2016, 1),
    new YearQuarter(2018, 4)
  ])

  expect(yearQuarterRangeOf(new YearQuarter(2018, 4))).toEqual([
    new YearQuarter(2016, 2),
    new YearQuarter(2019, 1)
  ])
})
