import { bcodeLabel } from '~/custom-functions/bcode-label'
import { IndicatorPropertyCache } from '~/services/indicator-property-cache'
import { QuarterPropertyCache } from '~/services/quarter-property-cache'

jest.mock('~/api/v2/indicator-property', () =>
  jest.requireActual('~/__mocks__/api/v2/indicator-property')
)
jest.mock('~/api/v2/quarter-property', () =>
  jest.requireActual('~/__mocks__/api/v2/quarter-property')
)
jest.mock('~/services/indicator-property-cache', () =>
  jest.requireActual('~/__mocks__/services/indicator-property-cache')
)
jest.mock('~/services/quarter-property-cache', () =>
  jest.requireActual('~/__mocks__/services/quarter-property-cache')
)

test('bcodeLabel', () => {
  expect(IndicatorPropertyCache.get()).toBeNull()
  expect(QuarterPropertyCache.get()).toBeNull()

  expect(bcodeLabel('net_sales')).toBe('売上')
  expect(bcodeLabel('stockprice')).toBe('株価')
  expect(() => bcodeLabel('foo')).toThrow(Error)
  expect(() => bcodeLabel('')).toThrow(Error)

  expect(IndicatorPropertyCache.get()).not.toBeNull()
  expect(QuarterPropertyCache.get()).not.toBeNull()
})
