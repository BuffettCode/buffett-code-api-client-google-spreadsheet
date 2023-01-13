import { CompanyCache } from '~/__mocks__/services/company-cache'
import { DailyCache } from '~/__mocks__/services/daily-cache'
import { MonthlyCache } from '~/__mocks__/services/monthly-cache'
import { QuarterCache } from '~/__mocks__/services/quarter-cache'
import { CachingBuffettCodeApiClientV3 } from '~/api/v3/caching-client'
import { DateParam } from '~/fiscal-periods/date-param'
import { LqWithOffset } from '~/fiscal-periods/lq-with-offset'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'
import { YearMonth } from '~/fiscal-periods/year-month'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

jest.mock('~/api/v3/client', () => jest.requireActual('~/__mocks__/api/v3/client'))
jest.mock('~/services/company-cache', () => jest.requireActual('~/__mocks__/services/company-cache'))
jest.mock('~/services/daily-cache', () => jest.requireActual('~/__mocks__/services/daily-cache'))
jest.mock('~/services/monthly-cache', () => jest.requireActual('~/__mocks__/services/monthly-cache'))
jest.mock('~/services/quarter-cache', () => jest.requireActual('~/__mocks__/services/quarter-cache'))

const LY = new LyWithOffset()
const LQ = new LqWithOffset()

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
    const date = DateParam.from(new Date('2020-09-06'))
    expect(DailyCache.get(ticker, date)).toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const daily = client.daily(ticker, date)
    expect(daily).not.toBeNull()

    expect(DailyCache.get(ticker, date)).toEqual(daily)
  })

  test('(cached)', () => {
    const date = DateParam.from(new Date('2020-09-06'))
    const cached = DailyCache.get(ticker, date)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const daily = client.daily(ticker, date)
    expect(daily).toEqual(cached)

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
      expect(res.data['fiscal_year']).toBe(period.year)
      expect(res.data['fiscal_quarter']).toBe(period.quarter)

      expect(QuarterCache.get(ticker, period.toYearQuarter())).toEqual(res)
    })

    test('(cached)', () => {
      const cached = QuarterCache.get(ticker, period.toYearQuarter())
      expect(cached).not.toBeNull()

      const client = new CachingBuffettCodeApiClientV3('token')
      const res = client.quarter(ticker, period)
      expect(res).toEqual(cached)
      expect(res.data['fiscal_year']).toBe(period.year)
      expect(res.data['fiscal_quarter']).toBe(period.quarter)

      expect(QuarterCache.get(ticker, period.toYearQuarter())).toEqual(cached)
    })
  })

  describe('(LY, LQ)', () => {
    beforeAll(() => {
      QuarterCache.clearAll()
    })

    const period = new YearQuarterParam(LY, LQ)

    test('(uncached)', () => {
      expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toBeNull()

      const client = new CachingBuffettCodeApiClientV3('token')
      const res = client.quarter(ticker, period)
      expect(res).not.toBeNull()
      expect(res.data['fiscal_year']).toBe(2018)
      expect(res.data['fiscal_quarter']).toBe(1)

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

    const period = new YearQuarterParam(LY, LQ)

    test('(uncached)', () => {
      expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toBeNull()

      const client = new CachingBuffettCodeApiClientV3('token')
      const res = client.ondemandQuarter(ticker, period)
      expect(res).not.toBeNull()
      expect(res.data['fiscal_year']).toBe(2018)
      expect(res.data['fiscal_quarter']).toBe(1)

      expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toEqual(res)
    })
  })
})

describe('ondemandDaily', () => {
  const ticker = '2371'

  beforeAll(() => {
    DailyCache.clearAll()
  })

  const period = DateParam.from(new Date('2020-09-06'))

  test('(uncached)', () => {
    expect(DailyCache.get(ticker, period)).toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const daily = client.ondemandDaily(ticker, period)
    expect(daily).not.toBeNull()

    expect(DailyCache.get(ticker, period)).toEqual(daily)
  })

  test('(cached)', () => {
    const cached = DailyCache.get(ticker, period)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const daily = client.ondemandDaily(ticker, period)
    expect(daily).toEqual(cached)

    expect(DailyCache.get(ticker, period)).toEqual(cached)
  })
})

describe('monthly', () => {
  const ticker = '2371'

  beforeAll(() => {
    MonthlyCache.clearAll()
  })

  const period = new YearMonth(2022, 5)

  test('(uncached)', () => {
    expect(MonthlyCache.get(ticker, period)).toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const res = client.monthly(ticker, period)
    expect(res).not.toBeNull()
    expect(res.period()).toEqual(period)

    expect(MonthlyCache.get(ticker, period)).toEqual(res)
  })

  test('(cached)', () => {
    const cached = MonthlyCache.get(ticker, period)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV3('token')
    const res = client.monthly(ticker, period)
    expect(res).toEqual(cached)
    expect(res.period()).toEqual(period)

    expect(MonthlyCache.get(ticker, period)).toEqual(cached)
  })
})
