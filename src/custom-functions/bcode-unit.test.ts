import { bcodeUnit } from './bcode-unit'
import { IndicatorPropertyCache } from '../services/indicator-property-cache'

jest.mock('../api/indicator-property', () =>
  jest.requireActual('../__mocks__/api/indicator-property')
)
jest.mock('../api/quarter-property', () =>
  jest.requireActual('../__mocks__/api/quarter-property')
)
jest.mock('../services/indicator-property-cache', () =>
  jest.requireActual('../__mocks__/services/indicator-property-cache')
)

test('bcodeUnit', () => {
  expect(IndicatorPropertyCache.get()).toBeNull()

  expect(bcodeUnit('net_sales')).toBe('百万円')
  expect(bcodeUnit('stockprice')).toBe('円')
  expect(() => bcodeUnit('foo')).toThrow(Error)
  expect(() => bcodeUnit('')).toThrow(Error)

  expect(IndicatorPropertyCache.get()).not.toBeNull()
})
