import { DateParam } from '~/fiscal-periods/date-param'
import { ParseError } from '~/fiscal-periods/error'
import { PeriodParser } from '~/fiscal-periods/period-parser'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

test('parse', () => {
  expect(PeriodParser.parse('2020Q3')).toEqual(new YearQuarterParam(2020, 3))
  expect(PeriodParser.parse('2020LQ')).toEqual(new YearQuarterParam(2020, 'LQ'))
  expect(PeriodParser.parse('LYQ3')).toEqual(new YearQuarterParam('LY', 3))
  expect(PeriodParser.parse('LYLQ')).toEqual(new YearQuarterParam('LY', 'LQ'))
  expect(PeriodParser.parse('2020-09-06')).toEqual(
    new DateParam(new Date(2020, 9, 6))
  )
  expect(() => PeriodParser.parse('foo')).toThrow(ParseError)
  expect(() => PeriodParser.parse('2020/09/06')).toThrow(ParseError)
  expect(() => PeriodParser.parse('latest')).toThrow(ParseError)
})
