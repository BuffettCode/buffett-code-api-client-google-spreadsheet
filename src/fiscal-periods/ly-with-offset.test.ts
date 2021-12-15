import { InvalidLYLQError, ParseError } from '~/fiscal-periods/error'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'

test('constructor', () => {
  expect(() => new LyWithOffset(-1)).not.toThrow(Error)
  expect(() => new LyWithOffset(0)).not.toThrow(Error)
  expect(() => new LyWithOffset(1)).toThrow(InvalidLYLQError)
})

test('isValidFormat', () => {
  expect(LyWithOffset.isValidFormat('ly')).toBeTruthy()
  expect(LyWithOffset.isValidFormat('LY')).toBeTruthy()
  expect(LyWithOffset.isValidFormat('LY-1')).toBeTruthy()
  expect(LyWithOffset.isValidFormat('LY-0')).toBeFalsy()
  expect(LyWithOffset.isValidFormat('LY0')).toBeFalsy()
  expect(LyWithOffset.isValidFormat('LY+0')).toBeFalsy()
  expect(LyWithOffset.isValidFormat('LY+1')).toBeFalsy()
  expect(LyWithOffset.isValidFormat('foo')).toBeFalsy()
})

test('parse', () => {
  expect(() => LyWithOffset.parse('ly')).not.toThrow(Error)
  expect(() => LyWithOffset.parse('LY')).not.toThrow(Error)
  expect(() => LyWithOffset.parse('LY-1')).not.toThrow(Error)
  expect(() => LyWithOffset.parse('LY-0')).toThrow(ParseError)
  expect(() => LyWithOffset.parse('LY0')).toThrow(ParseError)
  expect(() => LyWithOffset.parse('LY+0')).toThrow(ParseError)
  expect(() => LyWithOffset.parse('LY+1')).toThrow(ParseError)
  expect(() => LyWithOffset.parse('foo')).toThrow(ParseError)
})

test('toString', () => {
  expect(new LyWithOffset().toString()).toEqual('LY')
  expect(new LyWithOffset(-1).toString()).toEqual('LY-1')
})
