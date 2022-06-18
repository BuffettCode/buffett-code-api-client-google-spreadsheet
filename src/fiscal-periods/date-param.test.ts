import { DateParam, DateParamDate, DateParamLatest } from '~/fiscal-periods/date-param'
import { ParseError } from '~/fiscal-periods/error'

test('toString', () => {
  expect(DateParam.from('latest').toString()).toEqual('latest')
  expect(DateParam.from(new Date('2020-09-06')).toString()).toEqual('2020-09-06')
})

test('toDate', () => {
  expect(new DateParamDate(new Date('2020-09-06')).toDate()).toEqual(new Date('2020-09-06'))
})

test('isLatest', () => {
  expect(DateParam.from('latest').isLatest()).toBeTruthy()
  expect(DateParam.from(new Date('2020-09-06')).isLatest()).toBeFalsy()
})

test('DateParam.from', () => {
  expect(DateParam.from(new Date('2020-09-06'))).toEqual(new DateParamDate(new Date('2020-09-06')))
  expect(DateParam.from('latest')).toEqual(new DateParamLatest('latest'))
})

test('DateParam.parse', () => {
  expect(DateParam.parse('2020-09-06')).toEqual(new DateParamDate(new Date('2020-09-06')))
  expect(DateParam.parse('latest')).toEqual(new DateParamLatest('latest'))
  expect(DateParam.parse('Latest')).toEqual(new DateParamLatest('latest'))
  expect(() => DateParam.parse('foo')).toThrow(ParseError)
  expect(() => DateParam.parse('2020-9-6')).toThrow(ParseError)
  expect(() => DateParam.parse('2020/09/06')).toThrow(ParseError)
})
