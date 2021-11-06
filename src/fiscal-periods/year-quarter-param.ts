import {
  InvalidLYLQError,
  InvalidYearError,
  InvalidQuarterError,
  ParseError
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

  // XXX: LYLQの同時指定や-1などの相対値指定をどうするか確認する
  static parse(str: string): YearQuarterParam {
    str = str.toUpperCase()
    const matches = str.match(/^(?<year>\d{4}|LY)(?<quarter>Q\d|LQ)$/)
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
