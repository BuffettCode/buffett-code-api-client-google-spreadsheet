import { BuffettCodeApiClientV2 } from '~/api/v2/client'
import { BuffettCodeApiClientV3 } from '~/api/v3/client'
import { DateParam } from '~/fiscal-periods/date-param'
import { LqWithOffset } from '~/fiscal-periods/lq-with-offset'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

export class CompanyService {
  public company: object

  constructor(
    public ticker: string,
    client: BuffettCodeApiClientV2 | BuffettCodeApiClientV3,
    private today: Date = new Date()
  ) {
    this.company = client.company(ticker)
  }

  public isSupportedTicker(): boolean {
    return !!this.company
  }

  public convertYearQuarterParamToYearQuarter(period: YearQuarterParam): YearQuarter {
    if (period.year instanceof LyWithOffset) {
      period.year = this.company['latest_fiscal_year'] + period.year.offset
    }

    if (period.quarter instanceof LqWithOffset) {
      period.year = (period.year as number) + Math.ceil(period.quarter.offset / 4)
      period.quarter = this.company['latest_fiscal_quarter'] + (period.quarter.offset % 4)

      if (period.quarter <= 0) {
        period.year -= 1
        period.quarter = 4 + (period.quarter as number)
      }
    }

    return period.toYearQuarter()
  }

  public isOndemandQuarterApiPeriod(_period: YearQuarter | YearQuarterParam): boolean {
    if (!this.isSupportedTicker()) {
      throw new Error('unsupported ticker')
    }

    let period: YearQuarter
    if (_period instanceof YearQuarterParam) {
      period = this.convertYearQuarterParamToYearQuarter(_period)
    } else {
      period = _period
    }

    const fixedTierRange = this.company['fixed_tier_range']
    const fixedTierOldestPeriod = new YearQuarter(
      fixedTierRange['oldest_fiscal_year'],
      fixedTierRange['oldest_fiscal_quarter']
    )
    return !period.isAfterOrEqual(fixedTierOldestPeriod)
  }

  public isOndemandDailyApiPeriod(date: DateParam): boolean {
    if (date.isLatest()) {
      return false
    }

    const fixedTierRange = this.company['fixed_tier_range']
    const fixedTierOldestDate = new Date(fixedTierRange['oldest_date'])

    return date.toDate().valueOf() < fixedTierOldestDate.valueOf()
  }
}
