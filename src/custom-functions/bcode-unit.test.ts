import { bcodeUnit } from './bcode-unit'
import { IndicatorPropertyCache } from '../services/indicator-property-cache'
import { QuarterPropertyCache } from '../services/quarter-property-cache'

jest.mock('../api/v2/indicator-property', () =>
  jest.requireActual('../__mocks__/api/v2/indicator-property')
)
jest.mock('../api/v2/quarter-property', () =>
  jest.requireActual('../__mocks__/api/v2/quarter-property')
)
jest.mock('../services/indicator-property-cache', () =>
  jest.requireActual('../__mocks__/services/indicator-property-cache')
)
jest.mock('../services/quarter-property-cache', () =>
  jest.requireActual('../__mocks__/services/quarter-property-cache')
)

test('bcodeUnit', () => {
  expect(IndicatorPropertyCache.get()).toBeNull()
  expect(QuarterPropertyCache.get()).toBeNull()

  expect(bcodeUnit('net_sales')).toBe('百万円')
  expect(bcodeUnit('stockprice')).toBe('円')
  expect(() => bcodeUnit('foo')).toThrow(Error)
  expect(() => bcodeUnit('')).toThrow(Error)

  expect(IndicatorPropertyCache.get()).not.toBeNull()
  expect(QuarterPropertyCache.get()).not.toBeNull()
})
