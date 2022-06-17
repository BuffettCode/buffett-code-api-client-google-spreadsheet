import * as companyFixture from '~/__mocks__/fixtures/v3/company'
import { getMock, putMock } from '~/services/cache-test-helper'
import { CompanyCache } from '~/services/company-cache'

const company = companyFixture['data']

test('key', () => {
  expect(CompanyCache.key('2371')).toBe('company-2371')
})

beforeEach(() => {
  jest.clearAllMocks()
})

test('get', () => {
  getMock.mockReturnValueOnce(JSON.stringify(company))
  expect(CompanyCache.get('2371')).toEqual(company)
  expect(CompanyCache.get('2371')).toBeNull()

  expect(getMock).toBeCalledTimes(2)
  expect(getMock).nthCalledWith(1, 'company-2371')
  expect(getMock).nthCalledWith(2, 'company-2371')
})

test('put', () => {
  CompanyCache.put('2371', company)

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith('company-2371', JSON.stringify(company), 21600)
})
