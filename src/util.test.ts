import { yearQuarterRangeOf } from './util'
import { YearQuarter } from './year-quarter'

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
