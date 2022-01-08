import { DateParam } from '~/fiscal-periods/date-param'
import { ParseError } from '~/fiscal-periods/error'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

export class PeriodParser {
  constructor() {
    // noop
  }

  static parse(str: string): DateParam | YearQuarterParam {
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

    throw new ParseError(`Invalid period format: ${str}`)
  }
}
