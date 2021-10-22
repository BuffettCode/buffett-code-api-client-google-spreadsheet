import { DateRange } from '~/fiscal-periods/date-range'

test('diff', () => {
  expect(
    new DateRange(new Date(2020, 9, 6), new Date(2021, 9, 6)).diff()
  ).toEqual(365)
  expect(
    new DateRange(new Date(2020, 9, 6), new Date(2020, 9, 7)).diff()
  ).toEqual(1)
  expect(
    new DateRange(new Date(2020, 9, 6), new Date(2020, 9, 6)).diff()
  ).toEqual(0)
  expect(
    new DateRange(new Date(2020, 9, 6), new Date(2020, 9, 5)).diff()
  ).toEqual(-1)
  expect(
    new DateRange(new Date(2020, 9, 6), new Date(2019, 9, 6)).diff()
  ).toEqual(-366)
})
