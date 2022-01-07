import * as response from '~/__mocks__/fixtures/v3/quarter'
import { Quarter } from '~/entities/v3/quarter'
import { YearQuarter } from '~/fiscal-periods/year-quarter'

const quarter = Quarter.fromResponse(response)

test('period', () => {
  expect(quarter.period()).toEqual(new YearQuarter(2018, 1))
})

test('propertyNames', () => {
  expect(quarter.propertyNames()).toEqual(Object.keys(response['data']))
  expect(quarter.propertyNames()).not.toContain('desc_business')
})

test('labelOf', () => {
  expect(quarter.labelOf('fiscal_year')).toEqual('会計年度')
  expect(quarter.labelOf('net_sales')).toEqual('売上')
})

test('unitOf', () => {
  expect(quarter.unitOf('fiscal_year')).toEqual('なし')
  expect(quarter.unitOf('net_sales')).toEqual('円')
})
