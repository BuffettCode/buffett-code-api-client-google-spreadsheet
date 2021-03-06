import { CachingIndicatorProperty } from './caching-indicator-property'
import { IndicatorPropertyCache } from '../services/indicator-property-cache'

jest.mock('../api/indicator-property', () =>
  jest.requireActual('../__mocks__/api/indicator-property')
)

jest.mock('../services/indicator-property-cache', () =>
  jest.requireActual('../__mocks__/services/indicator-property-cache')
)

describe('fetch', () => {
  test('(uncached)', () => {
    expect(IndicatorPropertyCache.get()).toBeNull()

    const fetched = CachingIndicatorProperty.fetch()
    expect(fetched).not.toBeNull()

    expect(IndicatorPropertyCache.get()).toEqual(fetched)
  })

  test('(cached)', () => {
    const cached = IndicatorPropertyCache.get()
    expect(cached).not.toBeNull()

    expect(CachingIndicatorProperty.fetch()).toEqual(cached)

    expect(IndicatorPropertyCache.get()).toEqual(cached)
  })
})
