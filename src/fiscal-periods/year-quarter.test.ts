import { InvalidYearError, InvalidQuarterError } from '~/fiscal-periods/error'
import { YearQuarter } from '~/fiscal-periods/year-quarter'

test('constructor', () => {
  expect(() => new YearQuarter(0, 3)).toThrow(InvalidYearError)
  expect(() => new YearQuarter(1, 3)).not.toThrow(Error)
  expect(() => new YearQuarter(2018, 0)).toThrow(InvalidQuarterError)
  expect(() => new YearQuarter(2018, 1)).not.toThrow(Error)
  expect(() => new YearQuarter(2018, 4)).not.toThrow(Error)
  expect(() => new YearQuarter(2018, 5)).toThrow(InvalidQuarterError)
})

test('shift', () => {
  expect(new YearQuarter(2018, 3).shift(-4)).toEqual(new YearQuarter(2017, 3))
  expect(new YearQuarter(2018, 3).shift(-3)).toEqual(new YearQuarter(2017, 4))
  expect(new YearQuarter(2018, 3).shift(-2)).toEqual(new YearQuarter(2018, 1))
  expect(new YearQuarter(2018, 3).shift(-1)).toEqual(new YearQuarter(2018, 2))
  expect(new YearQuarter(2018, 3).shift(0)).toEqual(new YearQuarter(2018, 3))
  expect(new YearQuarter(2018, 3).shift(1)).toEqual(new YearQuarter(2018, 4))
  expect(new YearQuarter(2018, 3).shift(2)).toEqual(new YearQuarter(2019, 1))
  expect(new YearQuarter(2018, 3).shift(3)).toEqual(new YearQuarter(2019, 2))
  expect(new YearQuarter(2018, 3).shift(4)).toEqual(new YearQuarter(2019, 3))
})

test('toString', () => {
  expect(new YearQuarter(2018, 3).toString()).toBe('2018Q3')
})

test('isAfterOrEqual', () => {
  const period = new YearQuarter(2018, 3)
  expect(period.isAfterOrEqual(new YearQuarter(2017, 4))).toBe(true)
  expect(period.isAfterOrEqual(new YearQuarter(2018, 2))).toBe(true)
  expect(period.isAfterOrEqual(new YearQuarter(2018, 3))).toBe(true)
  expect(period.isAfterOrEqual(new YearQuarter(2018, 4))).toBe(false)
  expect(period.isAfterOrEqual(new YearQuarter(2019, 2))).toBe(false)
})

test('parse', () => {
  expect(YearQuarter.parse('2018Q3').toString()).toBe('2018Q3')
})
