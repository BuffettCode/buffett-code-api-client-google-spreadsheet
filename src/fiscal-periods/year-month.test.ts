import { InvalidYearError, InvalidMonthError, ParseError } from '~/fiscal-periods/error'
import { YearMonth } from '~/fiscal-periods/year-month'

test.each([
  { year: 1, month: 12 },
  { year: 2018, month: 1 },
  { year: 2018, month: 12 }
])('constructor($year, $month) (valid)', ({ year, month }) => {
  expect(() => new YearMonth(year, month)).not.toThrow(Error)
})

test.each([
  { year: -1, month: -1, expected: InvalidYearError },
  { year: 0, month: 12, expected: InvalidYearError },
  { year: 2018, month: 0, expect: InvalidMonthError },
  { year: 2018, month: 13, expect: InvalidMonthError }
])('constructor($year, $month) (error)', ({ year, month, expected }) => {
  expect(() => new YearMonth(year, month)).toThrow(expected)
})

test('toString', () => {
  expect(new YearMonth(2018, 3).toString()).toBe('2018-03')
})

test('parse (valid)', () => {
  expect(YearMonth.parse('2018-03')).toEqual(new YearMonth(2018, 3))
})

test('parse (error)', () => {
  expect(() => YearMonth.parse('foobar')).toThrow(ParseError)
})
