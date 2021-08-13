import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import {
  InvalidLYLQError,
  InvalidYearError,
  InvalidQuarterError
} from '~/fiscal-periods/error'

test('constructor', () => {
  expect(() => new YearQuarterParam(0, 3)).toThrow(InvalidYearError)
  expect(() => new YearQuarterParam(1, 3)).not.toThrow(Error)
  expect(() => new YearQuarterParam('LY', 3)).toThrow(InvalidLYLQError)
  expect(() => new YearQuarterParam(2018, 0)).toThrow(InvalidQuarterError)
  expect(() => new YearQuarterParam(2018, 1)).not.toThrow(Error)
  expect(() => new YearQuarterParam(2018, 4)).not.toThrow(Error)
  expect(() => new YearQuarterParam(2018, 5)).toThrow(InvalidQuarterError)
  expect(() => new YearQuarterParam('LY', 0)).toThrow(InvalidLYLQError)
  expect(() => new YearQuarterParam('LY', 1)).toThrow(InvalidLYLQError)
  expect(() => new YearQuarterParam('LY', 4)).toThrow(InvalidLYLQError)
  expect(() => new YearQuarterParam('LY', 5)).toThrow(InvalidLYLQError)
  expect(() => new YearQuarterParam('LY', 'LQ')).not.toThrow(Error)
})

test('convertibleToYearQuarter', () => {
  expect(
    new YearQuarterParam('LY', 'LQ').convertibleToYearQuarter()
  ).toBeFalsy()
  expect(new YearQuarterParam(2020, 3).convertibleToYearQuarter()).toBeTruthy()
})

test('toYearQuarter', () => {
  expect(() => new YearQuarterParam('LY', 'LQ').toYearQuarter()).toThrow(Error)
  expect(new YearQuarterParam(2020, 3).toYearQuarter()).toEqual(
    new YearQuarter(2020, 3)
  )
})

test('isLatestYear', () => {
  expect(new YearQuarterParam('LY', 'LQ').isLatestYear()).toBeTruthy()
  expect(new YearQuarterParam(2020, 3).isLatestYear()).toBeFalsy()
})

test('isLatestQuarter', () => {
  expect(new YearQuarterParam('LY', 'LQ').isLatestYear()).toBeTruthy()
  expect(new YearQuarterParam(2020, 3).isLatestYear()).toBeFalsy()
})

test('fromYearQuarter', () => {
  expect(YearQuarterParam.fromYearQuarter(new YearQuarter(2018, 1))).toEqual(
    new YearQuarterParam(2018, 1)
  )
})
