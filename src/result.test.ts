import { Result } from './result'

test('format', () => {
  expect(new Result(1234.5678, '日').format(false, false)).toBe(1234.6)
  expect(new Result(1234.5678, '日').format(true, false)).toBe(1234.5678)
  expect(new Result(1234.5678, '日').format(false, true)).toBe('1,234.6日')
  expect(new Result(1234.5678, '日').format(true, true)).toBe('1,234.5678日')

  expect(new Result(430602000000, '百万円').format(false, false)).toBe(430602)
  expect(new Result(430602000000, '百万円').format(true, false)).toBe(430602)
  expect(new Result(430602000000, '百万円').format(false, true)).toBe(
    '430,602百万円'
  )
  expect(new Result(430602000000, '百万円').format(true, true)).toBe(
    '430,602百万円'
  )

  expect(new Result(430602000000, '円').format(false, false)).toBe(430602000000)
  expect(new Result(430602000000, '円').format(true, false)).toBe(430602000000)
  expect(new Result(430602000000, '円').format(false, true)).toBe(
    '430,602,000,000円'
  )
  expect(new Result(430602000000, '円').format(true, true)).toBe(
    '430,602,000,000円'
  )

  expect(new Result(null, '百万円').format(true, false)).toBe('N/A')
  expect(new Result(null, '百万円').format(true, true)).toBe('N/A')
})
