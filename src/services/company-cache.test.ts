import * as companyFixture from '~/__mocks__/fixtures/v3/company'
import { Company } from '~/entities/v3/company'
import { getMock, putMock } from '~/services/cache-test-helper'
import { CompanyCache } from '~/services/company-cache'

const company = Company.fromResponse(companyFixture)

test('key', () => {
  expect(CompanyCache.key('2371')).toBe('company-2371')
})

test('columnDescriptionKey', () => {
  expect(CompanyCache.columnDescriptionKey()).toBe('company-column-description')
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('get', () => {
  test('returns data if cache exists', () => {
    getMock.mockReturnValueOnce(JSON.stringify(company.data))
    getMock.mockReturnValueOnce(JSON.stringify(company.columnDescription))
    expect(CompanyCache.get('2371')).toEqual(company)

    expect(getMock).toBeCalledTimes(2)
    expect(getMock).nthCalledWith(1, 'company-2371')
    expect(getMock).nthCalledWith(2, 'company-column-description')
  })

  test('returns null if cache does not exist', () => {
    getMock.mockReturnValue(null)
    expect(CompanyCache.get('2371')).toBeNull()

    expect(getMock).toBeCalledTimes(2)
    expect(getMock).nthCalledWith(1, 'company-2371')
    expect(getMock).nthCalledWith(2, 'company-column-description')
  })
})

test('put', () => {
  CompanyCache.put('2371', company)

  expect(putMock).toBeCalledTimes(2)
  expect(putMock).toBeCalledWith('company-2371', JSON.stringify(company.data), 21600)
  expect(putMock).toBeCalledWith('company-column-description', JSON.stringify(company.columnDescription), 21600)
})
