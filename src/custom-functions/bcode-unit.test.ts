import { bcodeUnit } from './bcode-unit'

test('bcodeUnit', () => {
  expect(bcodeUnit('net_sales')).toBe('百万円')
  expect(bcodeUnit('roa')).toBe('%')
  expect(() => bcodeUnit('foo')).toThrow(Error)
  expect(() => bcodeUnit('')).toThrow(Error)
})
