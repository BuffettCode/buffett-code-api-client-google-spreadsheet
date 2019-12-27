import { Formatter } from './formatter'

test('round', () => {
  expect(Formatter.round(1234.5678, 1)).toBe(1234.6)
  expect(Formatter.round(1234.5678, -1)).toBe(1230)

  // TODO: 現在の実装だと精度に問題がある
  // expect(Formatter.round(1.05, 1)).toBe(1.1)
  // expect(Formatter.round(1.005, 1)).toBe(1.01)
})

test('commaStyled', () => {
  expect(Formatter.commaStyled(123456789)).toBe('123,456,789')
  expect(Formatter.commaStyled(1234.5678)).toBe('1,234.5678')
})
