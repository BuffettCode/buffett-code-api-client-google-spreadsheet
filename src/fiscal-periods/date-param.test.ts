import { DateParam } from '~/fiscal-periods/date-param'

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
