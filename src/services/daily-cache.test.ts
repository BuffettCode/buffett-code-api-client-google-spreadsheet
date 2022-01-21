import * as dailyFixture from '~/__mocks__/fixtures/v3/daily'
import { DateParam } from '~/fiscal-periods/date-param'
import { getMock, putMock } from '~/services/cache-test-helper'
import { DailyCache } from '~/services/daily-cache'

test('key', () => {
  expect(DailyCache.key('6501', DateParam.from('latest'))).toBe(
    `daily-6501-${new Date().toISOString().substring(0, 10)}`
  )
  expect(DailyCache.key('6501', new Date())).toBe(`daily-6501-${new Date().toISOString().substring(0, 10)}`)
  expect(DailyCache.key('6501', DateParam.from(new Date('2020-09-06')))).toBe(`daily-6501-2020-09-06`)
  expect(DailyCache.key('6501', new Date('2020-09-06'))).toBe(`daily-6501-2020-09-06`)
})

test('columnDescriptionKey', () => {
  expect(DailyCache.columnDescriptionKey()).toBe('daily-column-description')
})

const date = new Date('2020-09-06')

beforeEach(() => {
  jest.clearAllMocks()
})

test('getData', () => {
  getMock.mockReturnValueOnce(JSON.stringify(dailyFixture['data']))
  expect(DailyCache.getData('2371', date)).toEqual(dailyFixture['data'])
  expect(DailyCache.getData('9999', date)).toBeNull()

  expect(getMock).toBeCalledTimes(2)
  expect(getMock).nthCalledWith(1, 'daily-2371-2020-09-06')
  expect(getMock).nthCalledWith(2, 'daily-9999-2020-09-06')
})

test('getColumnDescription', () => {
  getMock.mockReturnValueOnce(JSON.stringify(dailyFixture['column_description']))

  expect(DailyCache.getColumnDescription()).toEqual(dailyFixture['column_description'])

  expect(getMock).toBeCalledTimes(1)
  expect(getMock).toBeCalledWith('daily-column-description')
})

test('putData', () => {
  DailyCache.putData('2371', dailyFixture['data'])

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith('daily-2371-2020-09-06', JSON.stringify(dailyFixture['data']), 21600)
})

test('putColumnDescription', () => {
  DailyCache.putColumnDescription(dailyFixture['column_description'])

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith('daily-column-description', JSON.stringify(dailyFixture['column_description']), 21600)
})
