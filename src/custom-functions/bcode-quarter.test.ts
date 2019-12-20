jest.mock('../client')
jest.mock('../quarter-cache')

import { bcodeQuarter } from './bcode-quarter'
import { BuffettCodeApiClientV2 } from '../client'
import { QuarterCache } from '../quarter-cache'
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
