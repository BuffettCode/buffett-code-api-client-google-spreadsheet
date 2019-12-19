import { bCodeUnit } from './bcode-unit'

test('bCodeUnit', () => {
  expect(bCodeUnit('net_sales')).toBe('百万円')
  expect(bCodeUnit('roa')).toBe('%')
  expect(() => bCodeUnit('foo')).toThrow(Error)
  expect(() => bCodeUnit('')).toThrow(Error)
})
