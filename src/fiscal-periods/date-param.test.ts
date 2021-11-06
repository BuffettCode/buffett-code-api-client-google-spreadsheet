import { DateParam } from '~/fiscal-periods/date-param'
import { ParseError } from '~/fiscal-periods/error'

test('toString', () => {
  expect(new DateParam('latest').toString()).toEqual('latest')
  expect(new DateParam(new Date('2020-09-06')).toString()).toEqual('2020-09-06')
})

test('toDate', () => {
  expect(() => new DateParam('latest').toDate()).toThrow(Error)
  expect(new DateParam(new Date('2020-09-06')).toDate()).toEqual(
    new Date('2020-09-06')
  )
})

test('isLatest', () => {
  expect(new DateParam('latest').isLatest()).toBeTruthy()
  expect(new DateParam(new Date('2020-09-06')).isLatest()).toBeFalsy()
})

test('parse', () => {
  expect(DateParam.parse('2020-09-06')).toEqual(
    new DateParam(new Date(2020, 9, 6))
  )
  expect(DateParam.parse('latest')).toEqual(new DateParam('latest'))
  expect(DateParam.parse('Latest')).toEqual(new DateParam('latest'))
  expect(() => DateParam.parse('foo')).toThrow(ParseError)
  expect(() => DateParam.parse('2020-9-6')).toThrow(ParseError)
  expect(() => DateParam.parse('2020/09/06')).toThrow(ParseError)
})
