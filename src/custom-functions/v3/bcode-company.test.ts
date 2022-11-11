import { CachingBuffettCodeApiClientV3 } from '~/api/v3/caching-client'
import { bcodeCompany } from '~/custom-functions/v3/bcode-company'
import { BcodeResult } from '~/custom-functions/v3/bcode-result'

jest.mock('~/api/v3/client', () => jest.requireActual('~/__mocks__/api/v3/client'))
jest.mock('~/services/company-cache', () => jest.requireActual('~/__mocks__/services/company-cache'))

test('bcodeCompany', () => {
  const ticker = '2371'
  const propertyName = 'company_name'

  const client = new CachingBuffettCodeApiClientV3('token')
  const result = bcodeCompany(client, ticker, propertyName)

  expect(result).toEqual(new BcodeResult(propertyName, 'カカクコム', 'なし'))
})
