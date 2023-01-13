import { DateParam, DateParamDate, DateParamLatest } from '~/fiscal-periods/date-param'
import { ParseError } from '~/fiscal-periods/error'
import { YearMonth } from '~/fiscal-periods/year-month'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

export class PeriodParser {
  constructor() {
    // noop
  }

  static parse(str: string): DateParam | YearQuarterParam | YearMonth {
    try {
      return YearQuarterParam.parse(str)
    } catch {
      // noop
    }

    try {
      return DateParam.parse(str)
    } catch {
      // noop
    }

    try {
      return YearMonth.parse(str)
    } catch {
      // noop
    }

    throw new ParseError(`Invalid period format: ${str}`)
  }

  static isDateParam(period: DateParam | YearQuarterParam | YearMonth): period is DateParam {
    return period instanceof DateParamDate || period instanceof DateParamLatest
  }
}
