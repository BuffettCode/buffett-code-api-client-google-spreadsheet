import { IndicatorProperty as IndicatorPropertyMock } from '../__mocks__/api/indicator-property'
import { QuarterProperty as QuarterPropertyMock } from '../__mocks__/api/quarter-property'

jest.mock('../api/indicator-property', () => ({
  IndicatorProperty: IndicatorPropertyMock
}))
jest.mock('../api/quarter-property', () => ({
  QuarterProperty: QuarterPropertyMock
}))

import { bcodeLabel } from './bcode-label'

test('bcodeLabel', () => {
  expect(bcodeLabel('net_sales')).toBe('売上')
  expect(bcodeLabel('roa')).toBe('ROA')
  expect(() => bcodeLabel('foo')).toThrow(Error)
  expect(() => bcodeLabel('')).toThrow(Error)
})
