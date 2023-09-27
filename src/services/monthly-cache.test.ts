import * as monthlyFixture from '~/__mocks__/fixtures/v3/monthly'
import { Monthly } from '~/entities/v3/monthly'
import { YearMonth } from '~/fiscal-periods/year-month'
import { getMock, putMock } from '~/services/cache-test-helper'
import { MonthlyCache } from '~/services/monthly-cache'

test('key', () => {
  expect(MonthlyCache.key('6501', new YearMonth(2019, 4))).toBe('monthly-6501-2019-04')
})

const monthly = Monthly.fromResponse(monthlyFixture)
const yearMonth = new YearMonth(2022, 5)

beforeEach(() => {
  jest.clearAllMocks()
})

test('get', () => {
  getMock.mockReturnValueOnce(JSON.stringify(monthly.data))
  getMock.mockReturnValueOnce(JSON.stringify(monthly.columnDescription))
  expect(MonthlyCache.get('2371', yearMonth)).toEqual(monthly)

  expect(getMock).toBeCalledTimes(2)
  expect(getMock).nthCalledWith(1, 'monthly-2371-2022-05')
  expect(getMock).nthCalledWith(2, 'monthly-column-description')
})

test('put', () => {
  MonthlyCache.put('2371', monthly)

  expect(putMock).toBeCalledTimes(2)
  expect(putMock).nthCalledWith(1, 'monthly-2371-2022-05', JSON.stringify(monthly.data), 21600)
  expect(putMock).nthCalledWith(2, 'monthly-column-description', JSON.stringify(monthly.columnDescription), 21600)
})
