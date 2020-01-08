import { IndicatorProperty as IndicatorPropertyMock } from '../__mocks__/api/indicator-property'
import { QuarterProperty as QuarterPropertyMock } from '../__mocks__/api/quarter-property'

jest.mock('../api/indicator-property', () => ({
  IndicatorProperty: IndicatorPropertyMock
}))
jest.mock('../api/quarter-property', () => ({
  QuarterProperty: QuarterPropertyMock
}))

import { bcodeUnit } from './bcode-unit'

test('bcodeUnit', () => {
  expect(bcodeUnit('net_sales')).toBe('百万円')
  expect(bcodeUnit('roa')).toBe('%')
  expect(() => bcodeUnit('foo')).toThrow(Error)
  expect(() => bcodeUnit('')).toThrow(Error)
})
