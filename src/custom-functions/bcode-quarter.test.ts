import { bcodeQuarter } from './bcode-quarter'
import { BuffettCodeApiClientV2 } from '../api/client'
import { QuarterCache } from '../services/quarter-cache'
import { QuarterPropertyCache } from '../services/quarter-property-cache'
import { Result } from '../result'
import { YearQuarter } from '../year-quarter'

jest.mock('../api/client', () => jest.requireActual('../__mocks__/api/client'))
jest.mock('../api/quarter-property', () =>
  jest.requireActual('../__mocks__/api/quarter-property')
)
jest.mock('../services/quarter-cache', () =>
  jest.requireActual('../__mocks__/services/quarter-cache')
)
jest.mock('../services/quarter-property-cache', () =>
  jest.requireActual('../__mocks__/services/quarter-property-cache')
)

test('bcodeQuarter (uncached)', () => {
  const ticker = '2371'
  const yearQuarter = new YearQuarter(2018, 1)
  expect(QuarterCache.get(ticker, yearQuarter)).toBeNull()
  expect(QuarterPropertyCache.get()).toBeNull()

  const client = new BuffettCodeApiClientV2('token')
  const result = bcodeQuarter(client, ticker, 2018, 1, 'net_sales')

  expect(result).toEqual(new Result(12513000000.0, '百万円'))
  expect(QuarterCache.get(ticker, yearQuarter)['net_sales']).toBe(12513000000.0)
  expect(QuarterPropertyCache.get()).not.toBeNull()
})

test('bcodeQuarter (cached)', () => {
  const ticker = '2371'
  const yearQuarter = new YearQuarter(2018, 1)
  expect(QuarterCache.get(ticker, yearQuarter)['net_sales']).not.toBeNull()
  expect(QuarterPropertyCache.get()).not.toBeNull()

  const client = new BuffettCodeApiClientV2('token')
  const result = bcodeQuarter(client, ticker, 2018, 1, 'net_sales')

  expect(result).toEqual(new Result(12513000000.0, '百万円'))
  expect(QuarterCache.get(ticker, yearQuarter)['net_sales']).toBe(12513000000.0)
  expect(QuarterPropertyCache.get()).not.toBeNull()
})
