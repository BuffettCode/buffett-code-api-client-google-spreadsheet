import { DateParam } from '~/fiscal-periods/date-param'
import { ParseError } from '~/fiscal-periods/error'
import { LqWithOffset } from '~/fiscal-periods/lq-with-offset'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'
import { PeriodParser } from '~/fiscal-periods/period-parser'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

const LY = new LyWithOffset()
const LQ = new LqWithOffset()

test('PeriodParser.parse', () => {
  expect(PeriodParser.parse('2020Q3')).toEqual(new YearQuarterParam(2020, 3))
  expect(PeriodParser.parse('2020LQ')).toEqual(new YearQuarterParam(2020, LQ))
  expect(PeriodParser.parse('LYQ3')).toEqual(new YearQuarterParam(LY, 3))
  expect(PeriodParser.parse('LYLQ')).toEqual(new YearQuarterParam(LY, LQ))
  expect(PeriodParser.parse('lylq')).toEqual(new YearQuarterParam(LY, LQ))
  expect(PeriodParser.parse('LY-1Q4')).toEqual(new YearQuarterParam(new LyWithOffset(-1), 4))
  expect(PeriodParser.parse('2020LQ-1')).toEqual(new YearQuarterParam(2020, new LqWithOffset(-1)))
  expect(PeriodParser.parse('LY-1LQ-1')).toEqual(new YearQuarterParam(new LyWithOffset(-1), new LqWithOffset(-1)))
  expect(PeriodParser.parse('ly-1lq-1')).toEqual(new YearQuarterParam(new LyWithOffset(-1), new LqWithOffset(-1)))
  expect(PeriodParser.parse('2020-09-06')).toEqual(DateParam.from(new Date('2020-09-06')))
  expect(PeriodParser.parse('latest')).toEqual(DateParam.from('latest'))
  expect(PeriodParser.parse('Latest')).toEqual(DateParam.from('latest'))
  expect(() => PeriodParser.parse('foo')).toThrow(ParseError)
  expect(() => PeriodParser.parse('2020/09/06')).toThrow(ParseError)
  expect(() => PeriodParser.parse('0Q1')).toThrow(ParseError)
})

test('PeriodParser.isDateParam', () => {
  expect(PeriodParser.isDateParam(DateParam.from('latest'))).toBeTruthy()
  expect(PeriodParser.isDateParam(DateParam.from(new Date()))).toBeTruthy()
  expect(PeriodParser.isDateParam(new YearQuarterParam(2020, 3))).toBeFalsy()
  expect(PeriodParser.isDateParam(new YearQuarterParam(2020, LQ))).toBeFalsy()
  expect(PeriodParser.isDateParam(new YearQuarterParam(LY, 3))).toBeFalsy()
  expect(PeriodParser.isDateParam(new YearQuarterParam(LY, LQ))).toBeFalsy()
})
