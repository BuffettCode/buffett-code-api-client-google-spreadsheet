import { DateRange } from '~/fiscal-periods/date-range'

test('diff', () => {
  expect(new DateRange(new Date('2020-09-06'), new Date('2021-09-06')).diff()).toEqual(365)
  expect(new DateRange(new Date('2020-09-06'), new Date('2020-09-07')).diff()).toEqual(1)
  expect(new DateRange(new Date('2020-09-06'), new Date('2020-09-06')).diff()).toEqual(0)
  expect(new DateRange(new Date('2020-09-06'), new Date('2020-09-05')).diff()).toEqual(-1)
  expect(new DateRange(new Date('2020-09-06'), new Date('2019-09-06')).diff()).toEqual(-366)
})
