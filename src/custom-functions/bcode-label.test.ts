import { bcodeLabel } from './bcode-label'

jest.mock('../api/indicator-property', () =>
  jest.requireActual('../__mocks__/api/indicator-property')
)
jest.mock('../api/quarter-property', () =>
  jest.requireActual('../__mocks__/api/quarter-property')
)

test('bcodeLabel', () => {
  expect(bcodeLabel('net_sales')).toBe('売上')
  expect(bcodeLabel('roa')).toBe('ROA')
  expect(() => bcodeLabel('foo')).toThrow(Error)
  expect(() => bcodeLabel('')).toThrow(Error)
})
