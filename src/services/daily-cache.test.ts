import * as dailyFixture from '~/__mocks__/fixtures/v3/daily'
import { DateParam } from '~/fiscal-periods/date-param'
import { getMock, putMock } from '~/services/cache-test-helper'
import { DailyCache } from '~/services/daily-cache'

test('key', () => {
  expect(DailyCache.key('6501', new DateParam('latest'))).toBe(
    `daily-6501-${new Date().toISOString().substring(0, 10)}`
  )
  expect(DailyCache.key('6501', new Date())).toBe(
    `daily-6501-${new Date().toISOString().substring(0, 10)}`
  )
  expect(DailyCache.key('6501', new DateParam(new Date('2020-09-06')))).toBe(
    `daily-6501-2020-09-06`
  )
  expect(DailyCache.key('6501', new Date('2020-09-06'))).toBe(
    `daily-6501-2020-09-06`
  )
})

const daily = dailyFixture['data']
const date = new Date('2020-09-06')

beforeEach(() => {
  jest.clearAllMocks()
})

test('get', () => {
  getMock.mockReturnValueOnce(JSON.stringify(daily))
  expect(DailyCache.get('2371', date)).toEqual(daily)
  expect(DailyCache.get('9999', date)).toBeNull()

  expect(getMock).toBeCalledTimes(2)
  expect(getMock).nthCalledWith(1, 'daily-2371-2020-09-06')
  expect(getMock).nthCalledWith(2, 'daily-9999-2020-09-06')
})

test('put', () => {
  DailyCache.put('2371', daily)

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith(
    'daily-2371-2020-09-06',
    JSON.stringify(daily),
    21600
  )
})
