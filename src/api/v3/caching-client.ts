import { BuffettCodeApiClientV3 } from '~/api/v3/client'
import { DateParam } from '~/fiscal-periods/date-param'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import { CompanyCache } from '~/services/company-cache'
import { DailyCache } from '~/services/daily-cache'
import { QuarterCache } from '~/services/quarter-cache'

export class CachingBuffettCodeApiClientV3 extends BuffettCodeApiClientV3 {
  constructor(private token: string) {
    super(token)
  }

  company(ticker: string): object {
    const cached = CompanyCache.get(ticker)
    if (cached) {
      return cached
    }

    const company = super.company(ticker)
    CompanyCache.put(ticker, company)

    return company
  }

  daily(ticker: string, date: DateParam): object | null {
    const cached = DailyCache.get(ticker, date)
    if (cached) {
      return cached
    }

    const daily = super.daily(ticker, date)
    if (!daily) {
      return null
    }

    DailyCache.put(ticker, daily)

    return daily
  }

  quarter(ticker: string, period: YearQuarterParam): object | null {
    if (period.convertibleToYearQuarter()) {
      const cached = QuarterCache.get(ticker, period.toYearQuarter())
      if (cached) {
        return cached
      }
    }

    const quarter = super.quarter(ticker, period)
    if (!quarter) {
      return null
    }

    QuarterCache.put(ticker, quarter)

    return quarter
  }

  ondemandDaily(ticker: string, date: DateParam): object | null {
    const cached = DailyCache.get(ticker, date)
    if (cached) {
      return cached
    }

    const daily = super.ondemandDaily(ticker, date)
    if (!daily) {
      return null
    }

    DailyCache.put(ticker, daily)

    return daily
  }

  ondemandQuarter(ticker: string, period: YearQuarterParam): object | null {
    if (period.convertibleToYearQuarter()) {
      const cached = QuarterCache.get(ticker, period.toYearQuarter())
      if (cached) {
        return cached
      }
    }

    const quarter = super.ondemandQuarter(ticker, period)
    if (!quarter) {
      return null
    }

    QuarterCache.put(ticker, quarter)

    return quarter
  }

  // TODO: Add bulkDaily and bulkQuarter support
}