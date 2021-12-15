import { InvalidLYLQError, ParseError } from '~/fiscal-periods/error'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'

test('constructor', () => {
  expect(() => new LyWithOffset(-1)).not.toThrow(Error)
  expect(() => new LyWithOffset(0)).not.toThrow(Error)
  expect(() => new LyWithOffset(1)).toThrow(InvalidLYLQError)
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
