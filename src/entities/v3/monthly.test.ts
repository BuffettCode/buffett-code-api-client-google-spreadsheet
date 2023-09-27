import * as response from '~/__mocks__/fixtures/v3/monthly'
import { Monthly } from '~/entities/v3/monthly'
import { YearMonth } from '~/fiscal-periods/year-month'
import { KeyNotFoundError } from '~/services/error'

const monthly = Monthly.fromResponse(response)

test('period', () => {
  expect(monthly.period()).toEqual(new YearMonth(2022, 5))
})

test('propertyNames', () => {
  expect(monthly.propertyNames()).toEqual([
    'ticker',
    'year',
    'month',
    'beta.years_2.start_date',
    'beta.years_2.end_date',
    'beta.years_2.beta',
    'beta.years_2.alpha',
    'beta.years_2.r',
    'beta.years_2.r_squared',
    'beta.years_2.count',
    'beta.years_3.start_date',
    'beta.years_3.end_date',
    'beta.years_3.beta',
    'beta.years_3.alpha',
    'beta.years_3.r',
    'beta.years_3.r_squared',
    'beta.years_3.count',
    'beta.years_5.start_date',
    'beta.years_5.end_date',
    'beta.years_5.beta',
    'beta.years_5.alpha',
    'beta.years_5.r',
    'beta.years_5.r_squared',
    'beta.years_5.count'
  ])
})

test.each([
  { name: 'ticker', expected: '2371' },
  { name: 'year', expected: 2022 },
  { name: 'beta.years_2.count', expected: 24 }
])('valueOf($name) (normal)', ({ name, expected }) => {
  expect(monthly.valueOf(name)).toEqual(expected)
})

test.each([
  { name: 'foo', expected: KeyNotFoundError },
  { name: 'year.foo', expected: TypeError },
  { name: 'beta', expected: TypeError },
  { name: 'beta.foo', expected: KeyNotFoundError },
  { name: 'beta.years_2', expected: TypeError },
  { name: 'kpi', expected: TypeError }
])('valueOf($name) (error)', ({ name, expected }) => {
  expect(() => monthly.valueOf(name)).toThrow(expected)
})

test.each([
  { name: 'ticker', expected: 'ティッカー' },
  { name: 'year', expected: '年' },
  { name: 'beta.years_2.count', expected: '利用データ数' }
])('labelOf($name) (normal)', ({ name, expected }) => {
  expect(monthly.labelOf(name)).toEqual(expected)
})

test.each([
  { name: 'foo', expected: KeyNotFoundError },
  { name: 'year.foo', expected: KeyNotFoundError },
  { name: 'beta', expected: TypeError },
  { name: 'beta.foo', expected: KeyNotFoundError },
  { name: 'beta.years_2', expected: TypeError },
  { name: 'kpi', expected: TypeError }
])('labelOf($name) (error)', ({ name, expected }) => {
  expect(() => monthly.labelOf(name)).toThrow(expected)
})

test.each([
  { name: 'ticker', expected: 'なし' },
  { name: 'year', expected: 'なし' },
  { name: 'beta.years_2.count', expected: '個' }
])('unitOf($name) (normal)', ({ name, expected }) => {
  expect(monthly.unitOf(name)).toEqual(expected)
})

test.each([
  { name: 'foo', expected: KeyNotFoundError },
  { name: 'year.foo', expected: KeyNotFoundError },
  { name: 'beta', expected: TypeError },
  { name: 'beta.foo', expected: KeyNotFoundError },
  { name: 'beta.years_2', expected: TypeError },
  { name: 'kpi', expected: TypeError }
])('unitOf($name) (error)', ({ name, expected }) => {
  expect(() => monthly.unitOf(name)).toThrow(expected)
})
