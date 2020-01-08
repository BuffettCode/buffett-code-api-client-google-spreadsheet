import { BuffettCodeApiClientV2 as BuffettCodeApiClientV2Mock } from '../__mocks__/api/client'
import { QuarterCache as QuarterCacheMock } from '../__mocks__/services/quarter-cache'
import { QuarterProperty as QuarterPropertyMock } from '../__mocks__/api/quarter-property'

jest.mock('../api/client', () => ({
  BuffettCodeApiClientV2: BuffettCodeApiClientV2Mock
}))
jest.mock('../services/quarter-cache', () => ({
  QuarterCache: QuarterCacheMock
}))
jest.mock('../api/quarter-property', () => ({
  QuarterProperty: QuarterPropertyMock
}))

import { bcodeQuarter } from './bcode-quarter'
import { BuffettCodeApiClientV2 } from '../api/client'
import { QuarterCache } from '../services/quarter-cache'
import { Result } from '../result'
import { YearQuarter } from '../year-quarter'

test('bcodeQuarter (uncached)', () => {
  const ticker = '2371'
  const yearQuarter = new YearQuarter(2018, 1)
  expect(QuarterCache.get(ticker, yearQuarter)).toBeNull()

  const client = new BuffettCodeApiClientV2('token')
  const result = bcodeQuarter(client, ticker, 2018, 1, 'net_sales')

  expect(result).toEqual(new Result(12513000000.0, '百万円'))
  expect(QuarterCache.get(ticker, yearQuarter)['net_sales']).toBe(12513000000.0)
})

test('bcodeQuarter (cached)', () => {
  const ticker = '2371'
  const yearQuarter = new YearQuarter(2018, 1)
  expect(QuarterCache.get(ticker, yearQuarter)['net_sales']).not.toBeNull()

  const client = new BuffettCodeApiClientV2('token')
  const result = bcodeQuarter(client, ticker, 2018, 1, 'net_sales')

  expect(result).toEqual(new Result(12513000000.0, '百万円'))
  expect(QuarterCache.get(ticker, yearQuarter)['net_sales']).toBe(12513000000.0)
})
