import { YearQuarter } from './year-quarter'
import { YearQuarterRange } from './year-quarter-range'

test('diff', () => {
  expect(
    YearQuarterRange.diff(new YearQuarter(2018, 1), new YearQuarter(2018, 1))
  ).toBe(0)

  expect(
    YearQuarterRange.diff(new YearQuarter(2018, 1), new YearQuarter(2018, 2))
  ).toBe(1)
  expect(
    YearQuarterRange.diff(new YearQuarter(2018, 1), new YearQuarter(2019, 2))
  ).toBe(5)
  expect(
    YearQuarterRange.diff(new YearQuarter(2016, 3), new YearQuarter(2019, 2))
  ).toBe(11)

  expect(
    YearQuarterRange.diff(new YearQuarter(2018, 2), new YearQuarter(2018, 1))
  ).toBe(-1)
  expect(
    YearQuarterRange.diff(new YearQuarter(2019, 2), new YearQuarter(2018, 1))
  ).toBe(-5)
  expect(
    YearQuarterRange.diff(new YearQuarter(2019, 2), new YearQuarter(2016, 3))
  ).toBe(-11)
})

test('range', () => {
  expect(
    YearQuarterRange.range(new YearQuarter(2018, 1), new YearQuarter(2018, 1))
  ).toEqual([new YearQuarter(2018, 1)])

  expect(
    YearQuarterRange.range(new YearQuarter(2018, 1), new YearQuarter(2018, 2))
  ).toEqual([new YearQuarter(2018, 1), new YearQuarter(2018, 2)])
  expect(
    YearQuarterRange.range(new YearQuarter(2018, 1), new YearQuarter(2019, 2))
  ).toEqual([
    new YearQuarter(2018, 1),
    new YearQuarter(2018, 2),
    new YearQuarter(2018, 3),
    new YearQuarter(2018, 4),
    new YearQuarter(2019, 1),
    new YearQuarter(2019, 2)
  ])
  expect(
    YearQuarterRange.range(new YearQuarter(2016, 3), new YearQuarter(2019, 2))
  ).toEqual([
    new YearQuarter(2016, 3),
    new YearQuarter(2016, 4),
    new YearQuarter(2017, 1),
    new YearQuarter(2017, 2),
    new YearQuarter(2017, 3),
    new YearQuarter(2017, 4),
    new YearQuarter(2018, 1),
    new YearQuarter(2018, 2),
    new YearQuarter(2018, 3),
    new YearQuarter(2018, 4),
    new YearQuarter(2019, 1),
    new YearQuarter(2019, 2)
  ])

  expect(
    YearQuarterRange.range(new YearQuarter(2018, 2), new YearQuarter(2018, 1))
  ).toEqual([new YearQuarter(2018, 2), new YearQuarter(2018, 1)])
  expect(
    YearQuarterRange.range(new YearQuarter(2019, 2), new YearQuarter(2018, 1))
  ).toEqual([
    new YearQuarter(2019, 2),
    new YearQuarter(2019, 1),
    new YearQuarter(2018, 4),
    new YearQuarter(2018, 3),
    new YearQuarter(2018, 2),
    new YearQuarter(2018, 1)
  ])
  expect(
    YearQuarterRange.range(new YearQuarter(2019, 2), new YearQuarter(2016, 3))
  ).toEqual([
    new YearQuarter(2019, 2),
    new YearQuarter(2019, 1),
    new YearQuarter(2018, 4),
    new YearQuarter(2018, 3),
    new YearQuarter(2018, 2),
    new YearQuarter(2018, 1),
    new YearQuarter(2017, 4),
    new YearQuarter(2017, 3),
    new YearQuarter(2017, 2),
    new YearQuarter(2017, 1),
    new YearQuarter(2016, 4),
    new YearQuarter(2016, 3)
  ])
})
