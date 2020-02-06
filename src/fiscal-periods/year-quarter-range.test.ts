import { YearQuarter } from './year-quarter'
import { YearQuarterRange } from './year-quarter-range'

test('diff', () => {
  expect(
    new YearQuarterRange(
      new YearQuarter(2018, 1),
      new YearQuarter(2018, 1)
    ).diff()
  ).toBe(0)

  expect(
    new YearQuarterRange(
      new YearQuarter(2018, 1),
      new YearQuarter(2018, 2)
    ).diff()
  ).toBe(1)
  expect(
    new YearQuarterRange(
      new YearQuarter(2018, 1),
      new YearQuarter(2019, 2)
    ).diff()
  ).toBe(5)
  expect(
    new YearQuarterRange(
      new YearQuarter(2016, 3),
      new YearQuarter(2019, 2)
    ).diff()
  ).toBe(11)

  expect(
    new YearQuarterRange(
      new YearQuarter(2018, 2),
      new YearQuarter(2018, 1)
    ).diff()
  ).toBe(-1)
  expect(
    new YearQuarterRange(
      new YearQuarter(2019, 2),
      new YearQuarter(2018, 1)
    ).diff()
  ).toBe(-5)
  expect(
    new YearQuarterRange(
      new YearQuarter(2019, 2),
      new YearQuarter(2016, 3)
    ).diff()
  ).toBe(-11)
})

test('range', () => {
  expect(
    new YearQuarterRange(
      new YearQuarter(2018, 1),
      new YearQuarter(2018, 1)
    ).range()
  ).toEqual([new YearQuarter(2018, 1)])

  expect(
    new YearQuarterRange(
      new YearQuarter(2018, 1),
      new YearQuarter(2018, 2)
    ).range()
  ).toEqual([new YearQuarter(2018, 1), new YearQuarter(2018, 2)])
  expect(
    new YearQuarterRange(
      new YearQuarter(2018, 1),
      new YearQuarter(2019, 2)
    ).range()
  ).toEqual([
    new YearQuarter(2018, 1),
    new YearQuarter(2018, 2),
    new YearQuarter(2018, 3),
    new YearQuarter(2018, 4),
    new YearQuarter(2019, 1),
    new YearQuarter(2019, 2)
  ])
  expect(
    new YearQuarterRange(
      new YearQuarter(2016, 3),
      new YearQuarter(2019, 2)
    ).range()
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
    new YearQuarterRange(
      new YearQuarter(2018, 2),
      new YearQuarter(2018, 1)
    ).range()
  ).toEqual([new YearQuarter(2018, 2), new YearQuarter(2018, 1)])
  expect(
    new YearQuarterRange(
      new YearQuarter(2019, 2),
      new YearQuarter(2018, 1)
    ).range()
  ).toEqual([
    new YearQuarter(2019, 2),
    new YearQuarter(2019, 1),
    new YearQuarter(2018, 4),
    new YearQuarter(2018, 3),
    new YearQuarter(2018, 2),
    new YearQuarter(2018, 1)
  ])
  expect(
    new YearQuarterRange(
      new YearQuarter(2019, 2),
      new YearQuarter(2016, 3)
    ).range()
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

test('defaultRangeOf', () => {
  expect(YearQuarterRange.defaultRangeOf(new YearQuarter(2018, 1))).toEqual(
    new YearQuarterRange(new YearQuarter(2015, 3), new YearQuarter(2018, 2))
  )

  expect(YearQuarterRange.defaultRangeOf(new YearQuarter(2018, 2))).toEqual(
    new YearQuarterRange(new YearQuarter(2015, 4), new YearQuarter(2018, 3))
  )

  expect(YearQuarterRange.defaultRangeOf(new YearQuarter(2018, 3))).toEqual(
    new YearQuarterRange(new YearQuarter(2016, 1), new YearQuarter(2018, 4))
  )

  expect(YearQuarterRange.defaultRangeOf(new YearQuarter(2018, 4))).toEqual(
    new YearQuarterRange(new YearQuarter(2016, 2), new YearQuarter(2019, 1))
  )
})
