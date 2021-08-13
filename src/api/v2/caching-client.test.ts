import { CompanyCache } from '~/__mocks__/services/company-cache'
import { QuarterCache } from '~/__mocks__/services/quarter-cache'
import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import { IndicatorCache } from '~/services/indicator-cache'

jest.mock('~/api/v2/client', () =>
  jest.requireActual('~/__mocks__/api/v2/client')
)
jest.mock('~/services/company-cache', () =>
  jest.requireActual('~/__mocks__/services/company-cache')
)
jest.mock('~/services/indicator-cache', () =>
  jest.requireActual('~/__mocks__/services/indicator-cache')
)
jest.mock('~/services/quarter-cache', () =>
  jest.requireActual('~/__mocks__/services/quarter-cache')
)

describe('company', () => {
  const ticker = '2371'

  test('(uncached)', () => {
    expect(CompanyCache.get(ticker)).toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.company(ticker)
    expect(res).not.toBeNull()

    expect(CompanyCache.get(ticker)).toEqual(res)
  })

  test('(cached)', () => {
    const cached = CompanyCache.get(ticker)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.company(ticker)
    expect(res).toEqual(cached)

    expect(CompanyCache.get(ticker)).toEqual(cached)
  })
})

describe('indicator', () => {
  const ticker = '2371'

  test('(uncached)', () => {
    expect(IndicatorCache.get(ticker)).toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.indicator(ticker)
    expect(res).not.toBeNull()

    expect(IndicatorCache.get(ticker)).toEqual(res)
  })

  test('(cached)', () => {
    const cached = IndicatorCache.get(ticker)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.indicator(ticker)
    expect(res).toEqual(cached)

    expect(IndicatorCache.get(ticker)).toEqual(cached)
  })
})

describe('quarter', () => {
  const ticker = '2371'

  describe('(FY, FQ)', () => {
    beforeAll(() => {
      QuarterCache.clearAll()
    })

    const period = new YearQuarterParam(2018, 1)

    test('(uncached)', () => {
      expect(QuarterCache.get(ticker, period.toYearQuarter())).toBeNull()

      const client = new CachingBuffettCodeApiClientV2('token')
      const res = client.quarter(ticker, period)
      expect(res).not.toBeNull()
      expect(res['fiscal_year']).toBe(period.year)
      expect(res['fiscal_quarter']).toBe(period.quarter)

      expect(QuarterCache.get(ticker, period.toYearQuarter())).toEqual(res)
    })

    test('(cached)', () => {
      const cached = QuarterCache.get(ticker, period.toYearQuarter())
      expect(cached).not.toBeNull()

      const client = new CachingBuffettCodeApiClientV2('token')
      const res = client.quarter(ticker, period)
      expect(res).toEqual(cached)
      expect(res['fiscal_year']).toBe(period.year)
      expect(res['fiscal_quarter']).toBe(period.quarter)

      expect(QuarterCache.get(ticker, period.toYearQuarter())).toEqual(cached)
    })
  })

  describe('(LY, LQ)', () => {
    beforeAll(() => {
      QuarterCache.clearAll()
    })

    const period = new YearQuarterParam('LY', 'LQ')

    test('(uncached)', () => {
      expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toBeNull()

      const client = new CachingBuffettCodeApiClientV2('token')
      const res = client.quarter(ticker, period)
      expect(res).not.toBeNull()
      expect(res['fiscal_year']).toBe(2018)
      expect(res['fiscal_quarter']).toBe(1)

      expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toEqual(res)
    })
  })
})

describe('ondemandQuarter', () => {
  const ticker = '2371'

  describe('(FY, FQ)', () => {
    beforeAll(() => {
      QuarterCache.clearAll()
    })

    const period = new YearQuarterParam(2018, 1)

    test('(uncached)', () => {
      expect(QuarterCache.get(ticker, period.toYearQuarter())).toBeNull()

      const client = new CachingBuffettCodeApiClientV2('token')
      const res = client.ondemandQuarter(ticker, period)
      expect(res).not.toBeNull()

      expect(QuarterCache.get(ticker, period.toYearQuarter())).toEqual(res)
    })

    test('(cached)', () => {
      const cached = QuarterCache.get(ticker, period.toYearQuarter())
      expect(cached).not.toBeNull()

      const client = new CachingBuffettCodeApiClientV2('token')
      const res = client.ondemandQuarter(ticker, period)
      expect(res).toEqual(cached)

      expect(QuarterCache.get(ticker, period.toYearQuarter())).toEqual(cached)
    })
  })

  describe('(LY, LQ)', () => {
    beforeAll(() => {
      QuarterCache.clearAll()
    })

    const period = new YearQuarterParam('LY', 'LQ')

    test('(uncached)', () => {
      expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toBeNull()

      const client = new CachingBuffettCodeApiClientV2('token')
      const res = client.ondemandQuarter(ticker, period)
      expect(res).not.toBeNull()
      expect(res['fiscal_year']).toBe(2018)
      expect(res['fiscal_quarter']).toBe(1)

      expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toEqual(res)
    })
  })
})
