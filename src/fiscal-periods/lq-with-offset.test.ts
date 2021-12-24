import { InvalidLYLQError, ParseError } from '~/fiscal-periods/error'
import { LqWithOffset } from '~/fiscal-periods/lq-with-offset'

test('constructor', () => {
  expect(() => new LqWithOffset(-1)).not.toThrow(Error)
  expect(() => new LqWithOffset(0)).not.toThrow(Error)
  expect(() => new LqWithOffset(1)).toThrow(InvalidLYLQError)
})

test('isValidFormat', () => {
  expect(LqWithOffset.isValidFormat('lq')).toBeTruthy()
  expect(LqWithOffset.isValidFormat('LQ')).toBeTruthy()
  expect(LqWithOffset.isValidFormat('LQ-1')).toBeTruthy()
  expect(LqWithOffset.isValidFormat('LQ-0')).toBeFalsy()
  expect(LqWithOffset.isValidFormat('LQ0')).toBeFalsy()
  expect(LqWithOffset.isValidFormat('LQ+0')).toBeFalsy()
  expect(LqWithOffset.isValidFormat('LQ+1')).toBeFalsy()
  expect(LqWithOffset.isValidFormat('foo')).toBeFalsy()
})

test('parse', () => {
  expect(() => LqWithOffset.parse('lq')).not.toThrow(Error)
  expect(() => LqWithOffset.parse('LQ')).not.toThrow(Error)
  expect(() => LqWithOffset.parse('LQ-1')).not.toThrow(Error)
  expect(() => LqWithOffset.parse('LQ-0')).toThrow(ParseError)
  expect(() => LqWithOffset.parse('LQ0')).toThrow(ParseError)
  expect(() => LqWithOffset.parse('LQ+0')).toThrow(ParseError)
  expect(() => LqWithOffset.parse('LQ+1')).toThrow(ParseError)
  expect(() => LqWithOffset.parse('foo')).toThrow(ParseError)
})

test('toString', () => {
  expect(new LqWithOffset().toString()).toEqual('LQ')
  expect(new LqWithOffset(-1).toString()).toEqual('LQ-1')
})
