import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { CompanyService } from '~/api/company-service'
import { OndemandApiPeriodRange } from '~/api/ondemand-api-period-range'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterRange } from '~/fiscal-periods/year-quarter-range'

jest.mock('~/api/v2/client', () =>
  jest.requireActual('~/__mocks__/api/v2/client')
)
jest.mock('~/services/company-cache', () =>
  jest.requireActual('~/__mocks__/services/company-cache')
)

test('selectOndemandQuarterApiPeriod', () => {
  const ticker = '2371'
  const client = new CachingBuffettCodeApiClientV2('token')
  const companyService = new CompanyService(ticker, client)
  const ondemandQuarterApiPeriodRange = new OndemandApiPeriodRange(
    companyService
  )

  const from = new YearQuarter(2013, 1)
  const to = new YearQuarter(2016, 4)
  const range = new YearQuarterRange(from, to)
  expect(
    ondemandQuarterApiPeriodRange.selectOndemandQuarterApiPeriod(ticker, range)
  ).toEqual([
    new YearQuarter(2013, 1),
    new YearQuarter(2013, 2),
    new YearQuarter(2013, 3),
    new YearQuarter(2013, 4),
    new YearQuarter(2014, 1),
    new YearQuarter(2014, 2),
    new YearQuarter(2014, 3),
    new YearQuarter(2014, 4)
  ])
})

test('filterOndemandQuarterApiPeriod', () => {
  const ticker = '2371'
  const client = new CachingBuffettCodeApiClientV2('token')
  const companyService = new CompanyService(ticker, client)
  const ondemandQuarterApiPeriodRange = new OndemandApiPeriodRange(
    companyService
  )

  const from = new YearQuarter(2013, 1)
  const to = new YearQuarter(2016, 4)
  const range = new YearQuarterRange(from, to)
  expect(
    ondemandQuarterApiPeriodRange.filterOndemandQuarterApiPeriod(ticker, range)
  ).toEqual([
    new YearQuarter(2015, 1),
    new YearQuarter(2015, 2),
    new YearQuarter(2015, 3),
    new YearQuarter(2015, 4),
    new YearQuarter(2016, 1),
    new YearQuarter(2016, 2),
    new YearQuarter(2016, 3),
    new YearQuarter(2016, 4)
  ])
})
