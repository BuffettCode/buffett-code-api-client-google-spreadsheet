jest.mock('../client')
jest.mock('../indicator-cache')

import { bcodeIndicator } from './bcode-indicator'
import { BuffettCodeApiClientV2 } from '../client'
import { IndicatorCache } from '../indicator-cache'
import { Result } from '../result'

test('bcodeIndicator (uncached)', () => {
  const ticker = '2371'
  expect(IndicatorCache.get(ticker)).toBeNull()

  const client = new BuffettCodeApiClientV2('token')
  const result = bcodeIndicator(client, ticker, 'roa')

  expect(result).toEqual(new Result(35.53659143898409, '%'))
  expect(IndicatorCache.get(ticker)[0]['roa']).toBe(35.53659143898409)
})

test('bcodeIndicator (cached)', () => {
  const ticker = '2371'
  expect(IndicatorCache.get(ticker)['roa']).not.toBeNull()

  const client = new BuffettCodeApiClientV2('token')
  const result = bcodeIndicator(client, ticker, 'roa')

  expect(result).toEqual(new Result(35.53659143898409, '%'))
  expect(IndicatorCache.get(ticker)[0]['roa']).toBe(35.53659143898409)
})
