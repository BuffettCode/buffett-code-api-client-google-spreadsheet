import { BuffettCodeApiClientV2 as BuffettCodeApiClientV2Mock } from '../__mocks__/api/client'
import { IndicatorCache as IndicatorCacheMock } from '../__mocks__/services/indicator-cache'

jest.mock('../api/client', () => ({
  BuffettCodeApiClientV2: BuffettCodeApiClientV2Mock
}))
jest.mock('../services/indicator-cache', () => ({
  __esModule: true,
  IndicatorCache: IndicatorCacheMock
}))

import { bcodeIndicator } from './bcode-indicator'
import { BuffettCodeApiClientV2 } from '../api/client'
import { IndicatorCache } from '../services/indicator-cache'
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
