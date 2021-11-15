import * as quarterFixture from '~/__mocks__/fixtures/v2/quarter'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { getMock, putMock } from '~/services/cache-test-helper'
import { QuarterCache } from '~/services/quarter-cache'

test('key', () => {
  expect(QuarterCache.key('6501', new YearQuarter(2019, 4))).toBe(
    'quarter-6501-2019Q4'
  )
})

const quarter = quarterFixture['2371'][0]
const columnDescription = quarterFixture['column_description']
const yearQuarter = new YearQuarter(2018, 1)

beforeEach(() => {
  jest.clearAllMocks()
})

test('getData', () => {
  getMock.mockReturnValueOnce(JSON.stringify(quarter))
  expect(QuarterCache.getData('2371', yearQuarter)).toEqual(quarter)
  expect(QuarterCache.getData('9999', yearQuarter)).toBeNull()

  expect(getMock).toBeCalledTimes(2)
  expect(getMock).nthCalledWith(1, 'quarter-2371-2018Q1')
  expect(getMock).nthCalledWith(2, 'quarter-9999-2018Q1')
})

test('getColumnDescription', () => {
  getMock.mockReturnValueOnce(JSON.stringify(columnDescription))
  expect(QuarterCache.getColumnDescription()).toEqual(columnDescription)

  expect(getMock).toBeCalledTimes(1)
  expect(getMock).toBeCalledWith('quarter-column-description')
})

test('putData', () => {
  QuarterCache.putData('2371', quarter)

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith(
    'quarter-2371-2018Q1',
    JSON.stringify(quarter),
    21600
  )
})

test('putColumnDescription', () => {
  QuarterCache.putColumnDescription(columnDescription)

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith(
    'quarter-column-description',
    JSON.stringify(columnDescription),
    21600
  )
})
