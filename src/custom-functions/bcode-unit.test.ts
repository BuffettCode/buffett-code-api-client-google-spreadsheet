import { bcodeUnit } from './bcode-unit'

jest.mock('../api/indicator-property', () =>
  jest.requireActual('../__mocks__/api/indicator-property')
)
jest.mock('../api/quarter-property', () =>
  jest.requireActual('../__mocks__/api/quarter-property')
)

test('bcodeUnit', () => {
  expect(bcodeUnit('net_sales')).toBe('百万円')
  expect(bcodeUnit('roa')).toBe('%')
  expect(() => bcodeUnit('foo')).toThrow(Error)
  expect(() => bcodeUnit('')).toThrow(Error)
})
