import { YearQuarter } from '../fiscal-periods/year-quarter'
import { YearQuarterRange } from '../fiscal-periods/year-quarter-range'
import { CompanyService } from './company-service'

export class OndemandApiPeriodRange {
  constructor(public companyService: CompanyService) {}

  public selectOndemandQuarterApiPeriod(
    ticker: string,
    range: YearQuarterRange
  ): YearQuarter[] {
    return range
      .range()
      .filter(period => this.companyService.isOndemandQuarterApiPeriod(period))
  }

  public filterOndemandQuarterApiPeriod(
    ticker: string,
    range: YearQuarterRange
  ): YearQuarter[] {
    return range
      .range()
      .filter(period => !this.companyService.isOndemandQuarterApiPeriod(period))
  }
}
