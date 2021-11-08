import { castStringAsBoolean, isV3Call } from '~/custom-functions/bcode'

test('castStringAsBoolean', () => {
  expect(castStringAsBoolean(true)).toBeTruthy()
  expect(castStringAsBoolean('true')).toBeTruthy()
  expect(castStringAsBoolean('TRUE')).toBeTruthy()
  expect(castStringAsBoolean('True')).toBeTruthy()
  expect(castStringAsBoolean(false)).toBeFalsy()
  expect(castStringAsBoolean('false')).toBeFalsy()
  expect(castStringAsBoolean('FALSE')).toBeFalsy()
  expect(castStringAsBoolean('False')).toBeFalsy()
  expect(castStringAsBoolean('t')).toBeFalsy()
  expect(castStringAsBoolean('f')).toBeFalsy()
  expect(castStringAsBoolean('')).toBeFalsy()
})

test('isV3Call', () => {
  expect(isV3Call(2020, 1)).toBeFalsy()
  expect(isV3Call(2020, '1')).toBeFalsy()
  expect(isV3Call('2020', 1)).toBeFalsy()
  expect(isV3Call('2020', '1')).toBeFalsy()
  expect(isV3Call('LY', '4')).toBeFalsy()
  expect(isV3Call('ly', '4')).toBeFalsy()
  expect(isV3Call('2020', 'LQ')).toBeFalsy()
  expect(isV3Call('2020', 'lq')).toBeFalsy()
  expect(isV3Call('', '')).toBeFalsy()
  expect(isV3Call('2020Q1', 'net_sales')).toBeTruthy()
})