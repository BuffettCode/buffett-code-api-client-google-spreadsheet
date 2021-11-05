import { CompanyCache } from '~/__mocks__/services/company-cache'
import { QuarterCache } from '~/__mocks__/services/quarter-cache'
import { CachingBuffettCodeApiClientV3 } from '~/api/v3/caching-client'
import { DateParam } from '~/fiscal-periods/date-param'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import { DailyCache } from '~/services/daily-cache'

jest.mock('~/api/v3/client', () =>
  jest.requireActual('~/__mocks__/api/v3/client')
)
jest.mock('~/services/company-cache', () =>
  jest.requireActual('~/__mocks__/services/company-cache')
)
jest.mock('~/services/daily-cache', () =>
  jest.requireActual('~/__mocks__/services/daily-cache')
)
jest.mock('~/services/quarter-cache', () =>
  jest.requireActual('~/__mocks__/services/quarter-cache')
)

describe('company', () => {
  const ticker = '2371'

  test('(uncached)', () => {
    expect(CompanyCache.get(ticker)).toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const res = client.company(ticker)
    expect(res).not.toBeNull()

    expect(CompanyCache.get(ticker)).toEqual(res)
  })

  test('(cached)', () => {
    const cached = CompanyCache.get(ticker)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const res = client.company(ticker)
    expect(res).toEqual(cached)

    expect(CompanyCache.get(ticker)).toEqual(cached)
  })
})

describe('daily', () => {
  const ticker = '2371'

  test('(uncached)', () => {
    const date = new DateParam(new Date('2020-09-06'))
    expect(DailyCache.get(ticker, date)).toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const res = client.daily(ticker, date)
    expect(res).not.toBeNull()

    expect(DailyCache.get(ticker, date)).toEqual(res)
  })

  test('(cached)', () => {
    const date = new DateParam(new Date('2020-09-06'))
    const cached = DailyCache.get(ticker, date)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const res = client.daily(ticker, date)
    expect(res).toEqual(cached)

    expect(DailyCache.get(ticker, date)).toEqual(cached)
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

      const client = new CachingBuffettCodeApiClientV3('token')
      const res = client.quarter(ticker, period)
      expect(res).not.toBeNull()
      expect(res['fiscal_year']).toBe(period.year)
      expect(res['fiscal_quarter']).toBe(period.quarter)

      expect(QuarterCache.get(ticker, period.toYearQuarter())).toEqual(res)
    })

    test('(cached)', () => {
      const cached = QuarterCache.get(ticker, period.toYearQuarter())
      expect(cached).not.toBeNull()

      const client = new CachingBuffettCodeApiClientV3('token')
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

      const client = new CachingBuffettCodeApiClientV3('token')
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

      const client = new CachingBuffettCodeApiClientV3('token')
      const res = client.ondemandQuarter(ticker, period)
      expect(res).not.toBeNull()

      expect(QuarterCache.get(ticker, period.toYearQuarter())).toEqual(res)
    })

    test('(cached)', () => {
      const cached = QuarterCache.get(ticker, period.toYearQuarter())
      expect(cached).not.toBeNull()

      const client = new CachingBuffettCodeApiClientV3('token')
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

      const client = new CachingBuffettCodeApiClientV3('token')
      const res = client.ondemandQuarter(ticker, period)
      expect(res).not.toBeNull()
      expect(res['fiscal_year']).toBe(2018)
      expect(res['fiscal_quarter']).toBe(1)

      expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toEqual(res)
    })
  })
})
