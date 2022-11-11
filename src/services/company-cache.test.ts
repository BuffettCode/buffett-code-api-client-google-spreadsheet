import * as companyFixture from '~/__mocks__/fixtures/v3/company'
import { getMock, putMock } from '~/services/cache-test-helper'
import { CompanyCache } from '~/services/company-cache'

test('key', () => {
  expect(CompanyCache.key('2371')).toBe('company-2371')
})

test('columnDescriptionKey', () => {
  expect(CompanyCache.columnDescriptionKey()).toBe('company-column-description')
})

beforeEach(() => {
  jest.clearAllMocks()
})

test('getData', () => {
  getMock.mockReturnValueOnce(JSON.stringify(companyFixture['data']))
  expect(CompanyCache.getData('2371')).toEqual(companyFixture['data'])
  expect(CompanyCache.getData('2371')).toBeNull()

  expect(getMock).toBeCalledTimes(2)
  expect(getMock).nthCalledWith(1, 'company-2371')
  expect(getMock).nthCalledWith(2, 'company-2371')
})

test('getColumnDescription', () => {
  getMock.mockReturnValueOnce(JSON.stringify(companyFixture['column_description']))
  expect(CompanyCache.getColumnDescription()).toEqual(companyFixture['column_description'])

  expect(getMock).toBeCalledTimes(1)
  expect(getMock).nthCalledWith(1, 'company-column-description')
})

test('putData', () => {
  CompanyCache.putData('2371', companyFixture['data'])

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith('company-2371', JSON.stringify(companyFixture['data']), 21600)
})

test('putColumnDescription', () => {
  CompanyCache.putColumnDescription(companyFixture['column_description'])

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith(
    'company-column-description',
    JSON.stringify(companyFixture['column_description']),
    21600
  )
})
