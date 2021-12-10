import {
  InvalidYearError,
  InvalidQuarterError,
  ParseError
} from '~/fiscal-periods/error'
import { YearQuarter } from '~/fiscal-periods/year-quarter'

export class YearQuarterParam {
  constructor(public year: number | 'LY', public quarter: number | 'LQ') {
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

  static parse(str: string): YearQuarterParam {
    str = str.toUpperCase()
    const matches = str.match(/^(\d{4}|LY)(Q\d|LQ)$/)
    if (matches == undefined) {
      throw new ParseError(`Invalid year-quarter format: ${str}`)
    }

    const year = matches[1] === 'LY' ? 'LY' : parseInt(matches[1], 10)
    const quarter =
      matches[2] === 'LQ' ? 'LQ' : parseInt(matches[2].substring(1), 10)
    return new YearQuarterParam(year, quarter)
  }

  static fromYearQuarter(period: YearQuarter): YearQuarterParam {
    return new YearQuarterParam(period.year, period.quarter)
  }
}
