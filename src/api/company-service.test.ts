import { CompanyService } from '~/api/company-service'
import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

jest.mock('~/api/v2/client', () =>
  jest.requireActual('~/__mocks__/api/v2/client')
)
jest.mock('~/services/company-cache', () =>
  jest.requireActual('~/__mocks__/services/company-cache')
)

test('isSupportedTicker', () => {
  const client = new CachingBuffettCodeApiClientV2('token')
  expect(new CompanyService('2371', client).isSupportedTicker()).toBe(true)
  expect(new CompanyService('9999', client).isSupportedTicker()).toBe(false)
})

test('isOndemandQuarterApiPeriod', () => {
  const client = new CachingBuffettCodeApiClientV2('token')
  const service = new CompanyService('2371', client)

  expect(service.isOndemandQuarterApiPeriod(new YearQuarter(2001, 4))).toBe(
    true
  )
  expect(service.isOndemandQuarterApiPeriod(new YearQuarter(2016, 2))).toBe(
    true
  )
  expect(service.isOndemandQuarterApiPeriod(new YearQuarter(2016, 3))).toBe(
    false
  )
  expect(
    service.isOndemandQuarterApiPeriod(new YearQuarterParam('LY', 'LQ'))
  ).toBe(false)
})
