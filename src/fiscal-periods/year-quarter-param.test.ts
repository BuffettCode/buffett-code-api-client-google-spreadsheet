import {
  InvalidYearError,
  InvalidQuarterError,
  ParseError
} from '~/fiscal-periods/error'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

test('constructor', () => {
  expect(() => new YearQuarterParam(0, 3)).toThrow(InvalidYearError)
  expect(() => new YearQuarterParam(1, 3)).not.toThrow(Error)
  expect(() => new YearQuarterParam(2018, 0)).toThrow(InvalidQuarterError)
  expect(() => new YearQuarterParam(2018, 1)).not.toThrow(Error)
  expect(() => new YearQuarterParam(2018, 4)).not.toThrow(Error)
  expect(() => new YearQuarterParam(2018, 5)).toThrow(InvalidQuarterError)
  expect(() => new YearQuarterParam('LY', 0)).toThrow(InvalidQuarterError)
  expect(() => new YearQuarterParam('LY', 1)).not.toThrow(Error)
  expect(() => new YearQuarterParam('LY', 4)).not.toThrow(Error)
  expect(() => new YearQuarterParam('LY', 5)).toThrow(InvalidQuarterError)
  expect(() => new YearQuarterParam(0, 'LQ')).toThrow(InvalidYearError)
  expect(() => new YearQuarterParam(2018, 'LQ')).not.toThrow(Error)
  expect(() => new YearQuarterParam('LY', 'LQ')).not.toThrow(Error)
})

test('convertibleToYearQuarter', () => {
  expect(
    new YearQuarterParam('LY', 'LQ').convertibleToYearQuarter()
  ).toBeFalsy()
  expect(
    new YearQuarterParam(2020, 'LQ').convertibleToYearQuarter()
  ).toBeFalsy()
  expect(new YearQuarterParam('LY', 3).convertibleToYearQuarter()).toBeFalsy()
  expect(new YearQuarterParam(2020, 3).convertibleToYearQuarter()).toBeTruthy()
})

test('toYearQuarter', () => {
  expect(() => new YearQuarterParam('LY', 'LQ').toYearQuarter()).toThrow(Error)
  expect(new YearQuarterParam(2020, 3).toYearQuarter()).toEqual(
    new YearQuarter(2020, 3)
  )
})

test('isLatestYear', () => {
  expect(new YearQuarterParam('LY', 3).isLatestYear()).toBeTruthy()
  expect(new YearQuarterParam(2020, 3).isLatestYear()).toBeFalsy()
})

test('isLatestQuarter', () => {
  expect(new YearQuarterParam(2020, 'LQ').isLatestQuarter()).toBeTruthy()
  expect(new YearQuarterParam(2020, 3).isLatestQuarter()).toBeFalsy()
})

test('fromYearQuarter', () => {
  expect(YearQuarterParam.fromYearQuarter(new YearQuarter(2018, 1))).toEqual(
    new YearQuarterParam(2018, 1)
  )
})

test('parse', () => {
  expect(YearQuarterParam.parse('2020Q3')).toEqual(
    new YearQuarterParam(2020, 3)
  )
  expect(YearQuarterParam.parse('2020q3')).toEqual(
    new YearQuarterParam(2020, 3)
  )
  expect(YearQuarterParam.parse('2020LQ')).toEqual(
    new YearQuarterParam(2020, 'LQ')
  )
  expect(YearQuarterParam.parse('LYQ3')).toEqual(new YearQuarterParam('LY', 3))
  expect(YearQuarterParam.parse('LYLQ')).toEqual(
    new YearQuarterParam('LY', 'LQ')
  )
  expect(YearQuarterParam.parse('lylq')).toEqual(
    new YearQuarterParam('LY', 'LQ')
  )

  expect(() => YearQuarterParam.parse('20Q3')).toThrow(ParseError)
  expect(() => YearQuarterParam.parse('foo')).toThrow(ParseError)
})
