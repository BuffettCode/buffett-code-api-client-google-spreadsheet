import { bcodeLabel } from './bcode-label'

test('bcodeLabel', () => {
  expect(bcodeLabel('net_sales')).toBe('売上')
  expect(bcodeLabel('roa')).toBe('ROA')
  expect(() => bcodeLabel('foo')).toThrow(Error)
  expect(() => bcodeLabel('')).toThrow(Error)
})
