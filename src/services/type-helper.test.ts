import { isObject, isColumnDescription } from '~/services/type-helper'

test.each([
  { obj: {}, expected: true },
  { obj: new Error('foo'), expected: true },
  { obj: 1, expected: false },
  { obj: '', expected: false },
  { obj: null, expected: false },
  { obj: undefined, expected: false },
  { obj: [], expected: false },
  { obj: (): string => 'foo', expected: false }
])('isObject($obj)', ({ obj, expected }) => {
  expect(isObject(obj)).toBe(expected)
})

describe.each([
  // eslint-disable-next-line @typescript-eslint/camelcase
  { obj: { unit: '', name_jp: '' }, expected: true },
  { obj: { foo: '', bar: '' }, expected: false },
  { obj: {}, expected: false },
  { obj: undefined, expected: false },
  { obj: null, expected: false }
])('isObject($obj)', ({ obj, expected }) => {
  expect(isColumnDescription(obj)).toBe(expected)
})
