import { QuarterCache } from './quarter-cache'
import { YearQuarter } from '../fiscal-periods/year-quarter'
import * as quarterFixture from '../__mocks__/fixtures/quarter'
import { getMock, putMock } from './cache-test-helper'

test('key', () => {
  expect(QuarterCache.key('6501', new YearQuarter(2019, 4))).toBe(
    'quarter-6501-2019Q4'
  )
})

const quarter = quarterFixture['2371'][0]
const yearQuarter = new YearQuarter(2018, 1)

beforeEach(() => {
  jest.clearAllMocks()
})

test('get', () => {
  getMock.mockReturnValueOnce(JSON.stringify(quarter))
  expect(QuarterCache.get('2371', yearQuarter)).toEqual(quarter)
  expect(QuarterCache.get('9999', yearQuarter)).toBeNull()

  expect(getMock).toBeCalledTimes(2)
  expect(getMock).nthCalledWith(1, 'quarter-2371-2018Q1')
  expect(getMock).nthCalledWith(2, 'quarter-9999-2018Q1')
})

test('put', () => {
  QuarterCache.put('2371', quarter)

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith(
    'quarter-2371-2018Q1',
    JSON.stringify(quarter),
    21600
  )
})

test('putAll', () => {
  const quarters = [quarter, quarter, quarter]
  QuarterCache.putAll('2371', quarters)

  expect(putMock).toBeCalledTimes(3)
  expect(putMock).toBeCalledWith(
    'quarter-2371-2018Q1',
    JSON.stringify(quarter),
    21600
  )
})
