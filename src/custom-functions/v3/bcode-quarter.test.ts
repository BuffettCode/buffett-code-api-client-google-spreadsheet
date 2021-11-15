import { CachingBuffettCodeApiClientV3 } from '~/api/v3/caching-client'
import { BcodeResult } from '~/custom-functions/bcode-result'
import { bcodeQuarter } from '~/custom-functions/v3/bcode-quarter'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import { QuarterCache } from '~/services/quarter-cache'

jest.mock('~/api/v3/client', () =>
  jest.requireActual('~/__mocks__/api/v3/client')
)
jest.mock('~/services/company-cache', () =>
  jest.requireActual('~/__mocks__/services/company-cache')
)
jest.mock('~/services/quarter-cache', () =>
  jest.requireActual('~/__mocks__/services/quarter-cache')
)

test('bcodeQuarter', () => {
  const ticker = '2371'
  const period = new YearQuarter(2018, 1)
  const propertyName = 'net_sales'

  expect(QuarterCache.get(ticker, period)).toBeNull()

  const client = new CachingBuffettCodeApiClientV3('token')
  const result = bcodeQuarter(
    client,
    ticker,
    YearQuarterParam.fromYearQuarter(period),
    propertyName,
    false
  )

  expect(result).toEqual(new BcodeResult(12513000000, '円'))
  expect(QuarterCache.get(ticker, period)).not.toBeNull()
})
