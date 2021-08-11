import { bcodeQuarter } from './bcode-quarter'
import { CachingBuffettCodeApiClientV2 } from '../api/v2/caching-client'
import { QuarterCache } from '../__mocks__/services/quarter-cache'
import { QuarterPropertyCache } from '../services/quarter-property-cache'
import { BcodeResult } from './bcode-result'
import { YearQuarter } from '../fiscal-periods/year-quarter'

jest.mock('../api/v2/client', () =>
  jest.requireActual('../__mocks__/api/v2/client')
)
jest.mock('../api/v2/quarter-property', () =>
  jest.requireActual('../__mocks__/api/v2/quarter-property')
)
jest.mock('../services/company-cache', () =>
  jest.requireActual('../__mocks__/services/company-cache')
)
jest.mock('../services/quarter-cache', () =>
  jest.requireActual('../__mocks__/services/quarter-cache')
)
jest.mock('../services/quarter-property-cache', () =>
  jest.requireActual('../__mocks__/services/quarter-property-cache')
)

// TODO: ondemand apiのテスト
describe('bcodeQuarter', () => {
  beforeEach(() => {
    QuarterCache.clearAll()
    QuarterPropertyCache.put(null)
  })

  test('(quarter, FY, FQ)', () => {
    const ticker = '2371'
    const yearQuarter = new YearQuarter(2018, 1)
    expect(QuarterCache.get(ticker, yearQuarter)).toBeNull()
    expect(QuarterPropertyCache.get()).toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const result = bcodeQuarter(client, ticker, 2018, 1, 'net_sales', false)

    expect(result).toEqual(new BcodeResult(12513000000.0, '百万円'))
    expect(QuarterCache.get(ticker, yearQuarter)['net_sales']).toBe(
      12513000000.0
    )
    expect(QuarterPropertyCache.get()).not.toBeNull()
  })

  test('(quarter, LY, LQ)', () => {
    const ticker = '2371'
    const period = new YearQuarter(2018, 1)
    expect(QuarterCache.get(ticker, period)).toBeNull()
    expect(QuarterPropertyCache.get()).toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const result = bcodeQuarter(client, ticker, 'LY', 'LQ', 'net_sales', false)

    expect(result).toEqual(new BcodeResult(12513000000.0, '百万円'))
    expect(QuarterCache.get(ticker, period)['net_sales']).toBe(12513000000.0)
    expect(QuarterPropertyCache.get()).not.toBeNull()
  })
})
