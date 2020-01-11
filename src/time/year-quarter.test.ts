import { YearQuarter } from './year-quarter'

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

test('parse', () => {
  expect(YearQuarter.parse('2018Q3').toString()).toBe('2018Q3')
})
