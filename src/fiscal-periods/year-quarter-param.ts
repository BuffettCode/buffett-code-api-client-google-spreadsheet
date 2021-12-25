import { InvalidYearError, InvalidQuarterError, ParseError } from '~/fiscal-periods/error'
import { LqWithOffset } from '~/fiscal-periods/lq-with-offset'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'
import { YearQuarter } from '~/fiscal-periods/year-quarter'

export class YearQuarterParam {
  constructor(public year: number | LyWithOffset, public quarter: number | LqWithOffset) {
    if (typeof year === 'number' && year < 1) {
      throw new InvalidYearError(`Invalid year value: ${year}`)
    }

    if (typeof quarter === 'number' && (quarter < 1 || quarter > 4)) {
      throw new InvalidQuarterError(`Invalid quarter value: ${quarter}`)
    }
  }

  public convertibleToYearQuarter(): boolean {
    return !this.isLatestYear() && !this.isLatestQuarter()
  }

  public toYearQuarter(): YearQuarter {
    if (this.year instanceof LyWithOffset || this.quarter instanceof LqWithOffset) {
      throw new Error('This cannot convert to YearQuarter')
    } else {
      return new YearQuarter(this.year, this.quarter)
    }
  }

  public isLatestYear(): boolean {
    return this.year instanceof LyWithOffset
  }

  public isLatestQuarter(): boolean {
    return this.quarter instanceof LqWithOffset
  }

  static parse(str: string): YearQuarterParam {
    str = str.toUpperCase()
    const matches = str.match(/^(\d{4}|LY(-[1-9]\d*)?)(Q\d|LQ(-[1-9]\d*)?)$/)
    if (matches == undefined) {
      throw new ParseError(`Invalid year-quarter format: ${str}`)
    }

    const year = matches[1].substring(0, 2) === 'LY' ? LyWithOffset.parse(matches[1]) : parseInt(matches[1], 10)
    const quarter =
      matches[3].substring(0, 2) === 'LQ' ? LqWithOffset.parse(matches[3]) : parseInt(matches[3].substring(1), 10)
    return new YearQuarterParam(year, quarter)
  }

  static fromYearQuarter(period: YearQuarter): YearQuarterParam {
    return new YearQuarterParam(period.year, period.quarter)
  }
}
