import { BuffettCodeApiClientV2 } from '~/api/v2/client'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

export class CompanyService {
  public company: object

  constructor(
    public ticker: string,
    client: BuffettCodeApiClientV2,
    private today: Date = new Date()
  ) {
    this.company = client.company(ticker)
  }

  public isSupportedTicker(): boolean {
    return !!this.company
  }

  public isOndemandQuarterApiPeriod(
    _period: YearQuarter | YearQuarterParam
  ): boolean {
    if (!this.isSupportedTicker()) {
      throw new Error('unsupported ticker')
    }

    let period
    if (_period instanceof YearQuarterParam) {
      if (_period.isLatestYear() && _period.isLatestQuarter()) {
        return false
      }

      period = _period.toYearQuarter()
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
}
