import { DateParam } from '~/fiscal-periods/date-param'
import { ParseError } from '~/fiscal-periods/error'
import { LqWithOffset } from '~/fiscal-periods/lq-with-offset'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'
import { PeriodParser } from '~/fiscal-periods/period-parser'
import { YearMonth } from '~/fiscal-periods/year-month'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

const LY = new LyWithOffset()
const LQ = new LqWithOffset()

test.each([
  { period: '2020Q3', expected: new YearQuarterParam(2020, 3) },
  { period: '2020LQ', expected: new YearQuarterParam(2020, LQ) },
  { period: 'LYQ3', expected: new YearQuarterParam(LY, 3) },
  { period: 'LYLQ', expected: new YearQuarterParam(LY, LQ) },
  { period: 'lylq', expected: new YearQuarterParam(LY, LQ) },
  { period: 'LY-1Q4', expected: new YearQuarterParam(new LyWithOffset(-1), 4) },
  { period: '2020LQ-1', expected: new YearQuarterParam(2020, new LqWithOffset(-1)) },
  { period: 'LY-1LQ-1', expected: new YearQuarterParam(new LyWithOffset(-1), new LqWithOffset(-1)) },
  { period: 'ly-1lq-1', expected: new YearQuarterParam(new LyWithOffset(-1), new LqWithOffset(-1)) },
  { period: '2020-09-06', expected: DateParam.from(new Date('2020-09-06')) },
  { period: 'latest', expected: DateParam.from('latest') },
  { period: 'Latest', expected: DateParam.from('latest') },
  { period: '2022-01', expected: new YearMonth(2022, 1) }
])('PeriodParser.parse($period) (valid)', ({ period, expected }) => {
  expect(PeriodParser.parse(period)).toEqual(expected)
})

test.each([
  { period: 'foo', expected: ParseError },
  { period: '2020/09/06', expected: ParseError },
  { period: '0Q1', expected: ParseError },
  { period: '2022.01', expected: ParseError }
])('PeriodParser.parse($period) (error)', ({ period, expected }) => {
  expect(() => PeriodParser.parse(period)).toThrow(expected)
})

test.each([
  { period: DateParam.from('latest'), expected: true },
  { period: DateParam.from(new Date()), expected: true },
  { period: new YearQuarterParam(2020, 3), expected: false },
  { period: new YearQuarterParam(2020, LQ), expected: false },
  { period: new YearQuarterParam(LY, 3), expected: false },
  { period: new YearQuarterParam(LY, LQ), expected: false },
  { period: new YearMonth(2022, 1), expected: false }
])('PeriodParser.isDateParam($period)', ({ period, expected }) => {
  expect(PeriodParser.isDateParam(period)).toBe(expected)
})
