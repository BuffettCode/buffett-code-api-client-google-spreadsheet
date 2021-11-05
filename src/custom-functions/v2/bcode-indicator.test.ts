import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { BcodeResult } from '~/custom-functions/bcode-result'
import { bcodeIndicator } from '~/custom-functions/v2/bcode-indicator'
import { IndicatorCache } from '~/services/indicator-cache'
import { IndicatorPropertyCache } from '~/services/indicator-property-cache'

jest.mock('~/api/v2/client', () =>
  jest.requireActual('~/__mocks__/api/v2/client')
)
jest.mock('~/api/v2/indicator-property', () =>
  jest.requireActual('~/__mocks__/api/v2/indicator-property')
)
jest.mock('~/services/indicator-cache', () =>
  jest.requireActual('~/__mocks__/services/indicator-cache')
)
jest.mock('~/services/indicator-property-cache', () =>
  jest.requireActual('~/__mocks__/services/indicator-property-cache')
)

test('bcodeIndicator (uncached)', () => {
  const ticker = '2371'
  expect(IndicatorCache.get(ticker)).toBeNull()
  expect(IndicatorPropertyCache.get()).toBeNull()

  const client = new CachingBuffettCodeApiClientV2('token')
  const result = bcodeIndicator(client, ticker, 'roa')

  expect(result).toEqual(new BcodeResult(35.53659143898409, '%'))
  expect(IndicatorCache.get(ticker)['roa']).toBe(35.53659143898409)
  expect(IndicatorPropertyCache.get()).not.toBeNull()
})

test('bcodeIndicator (cached)', () => {
  const ticker = '2371'
  expect(IndicatorCache.get(ticker)['roa']).not.toBeNull()
  expect(IndicatorPropertyCache.get()).not.toBeNull()

  const client = new CachingBuffettCodeApiClientV2('token')
  const result = bcodeIndicator(client, ticker, 'roa')

  expect(result).toEqual(new BcodeResult(35.53659143898409, '%'))
  expect(IndicatorCache.get(ticker)['roa']).toBe(35.53659143898409)
  expect(IndicatorPropertyCache.get()).not.toBeNull()
})
