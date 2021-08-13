import { BuffettCodeApiClientV2 } from '~/api/v2/client'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import { CompanyCache } from '~/services/company-cache'
import { IndicatorCache } from '~/services/indicator-cache'
import { QuarterCache } from '~/services/quarter-cache'

export class CachingBuffettCodeApiClientV2 extends BuffettCodeApiClientV2 {
  constructor(token: string) {
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

  indicator(ticker: string): object | null {
    const cached = IndicatorCache.get(ticker)
    if (cached) {
      return cached
    }

    const indicator = super.indicator(ticker)
    if (!indicator) {
      return null
    }

    IndicatorCache.put(ticker, indicator)

    return indicator
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
}
