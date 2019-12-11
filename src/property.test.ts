import { Property } from './property'

test('format', () => {
  expect(new Property(1234.56, '日').format(false, false)).toBe(1234.6)
  expect(new Property(1234.56, '日').format(true, false)).toBe(1234.56)
  expect(new Property(1234.56, '日').format(false, true)).toBe('1234.6日')
  expect(new Property(1234.56, '日').format(true, true)).toBe('1234.56日')

  expect(new Property(430602000000, '百万円').format(false, false)).toBe(430602)
  expect(new Property(430602000000, '百万円').format(true, false)).toBe(430602)
  expect(new Property(430602000000, '百万円').format(false, true)).toBe(
    '430602百万円'
  )
  expect(new Property(430602000000, '百万円').format(true, true)).toBe(
    '430602百万円'
  )
})
