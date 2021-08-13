import {
  InvalidLYLQError,
  InvalidYearError,
  InvalidQuarterError
} from '~/fiscal-periods/error'
import { YearQuarter } from '~/fiscal-periods/year-quarter'

export class YearQuarterParam {
  constructor(public year: number | 'LY', public quarter: number | 'LQ') {
    if (
      (!this.isLatestYear() && this.isLatestQuarter()) ||
      (this.isLatestYear() && !this.isLatestQuarter())
    ) {
      // NOTE: 現状ではLY/LQの同時指定しかサポートしない
      throw new InvalidLYLQError()
    }

    if (!this.isLatestYear() && year < 1) {
      throw new InvalidYearError()
    }

    if (!this.isLatestQuarter() && (quarter < 1 || quarter > 4)) {
      throw new InvalidQuarterError()
    }
  }

  public convertibleToYearQuarter(): boolean {
    return !this.isLatestYear() && !this.isLatestQuarter()
  }

  public toYearQuarter(): YearQuarter {
    if (this.year === 'LY' || this.quarter === 'LQ') {
      throw new Error('This cannot convert to YearQuarter')
    } else {
      return new YearQuarter(this.year, this.quarter)
    }
  }

  public isLatestYear(): boolean {
    return this.year === 'LY'
  }

  public isLatestQuarter(): boolean {
    return this.quarter === 'LQ'
  }

  static fromYearQuarter(period: YearQuarter): YearQuarterParam {
    return new YearQuarterParam(period.year, period.quarter)
  }
}
