import { CachingQuarterProperty } from './caching-quarter-property'
import { QuarterPropertyCache } from '../services/quarter-property-cache'

jest.mock('../api/quarter-property', () =>
  jest.requireActual('../__mocks__/api/quarter-property')
)

jest.mock('../services/quarter-property-cache', () =>
  jest.requireActual('../__mocks__/services/quarter-property-cache')
)

describe('fetch', () => {
  test('(uncached)', () => {
    expect(QuarterPropertyCache.get()).toBeNull()

    const fetched = CachingQuarterProperty.fetch()
    expect(fetched).not.toBeNull()

    expect(QuarterPropertyCache.get()).toEqual(fetched)
  })

  test('(cached)', () => {
    const cached = QuarterPropertyCache.get()
    expect(cached).not.toBeNull()

    expect(CachingQuarterProperty.fetch()).toEqual(cached)

    expect(QuarterPropertyCache.get()).toEqual(cached)
  })
})
