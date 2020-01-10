import { bcodeIndicator } from './bcode-indicator'
import { BuffettCodeApiClientV2 } from '../api/client'
import { IndicatorCache } from '../services/indicator-cache'
import { Result } from '../result'

jest.mock('../api/client', () => jest.requireActual('../__mocks__/api/client'))
jest.mock('../api/indicator-property', () =>
  jest.requireActual('../__mocks__/api/indicator-property')
)
jest.mock('../services/indicator-cache', () =>
  jest.requireActual('../__mocks__/services/indicator-cache')
)

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
