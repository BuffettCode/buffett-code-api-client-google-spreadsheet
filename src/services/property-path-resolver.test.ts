import * as monthly from '~/__mocks__/fixtures/v3/monthly'
import { KeyNotFoundError } from '~/services/error'
import { PropertyPathResolver } from '~/services/property-path-resolver'

test('listPathsOf', () => {
  expect(PropertyPathResolver.listPathsOf(monthly.data)).toEqual([
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
  { name: 'ticker', expected: monthly.data.ticker },
  { name: 'year', expected: monthly.data.year },
  { name: 'month', expected: monthly.data.month },
  { name: 'beta', expected: monthly.data.beta },
  { name: 'beta.years_2', expected: monthly.data.beta.years_2 },
  { name: 'beta.years_2.beta', expected: monthly.data.beta.years_2.beta },
  { name: 'kpi', expected: monthly.data.kpi }
])('getPropertyOf($name) (valid)', ({ name, expected }) => {
  expect(PropertyPathResolver.getPropertyOf(monthly.data, name)).toEqual(expected)
})

test.each([
  { name: 'foo', expected: KeyNotFoundError },
  { name: 'ticker.foo', expected: TypeError },
  { name: 'beta.foo', expected: KeyNotFoundError },
  { name: 'beta.years_2.foo', expected: KeyNotFoundError },
  { name: 'kpi.0', expected: TypeError }
])('getPropertyOf($name) (error)', ({ name, expected }) => {
  expect(() => PropertyPathResolver.getPropertyOf(monthly.data, name)).toThrow(expected)
})
