import { InvalidYearError, InvalidMonthError, ParseError } from '~/fiscal-periods/error'

export class YearMonth {
  constructor(public year: number, public month: number) {
    if (year < 1) {
      throw new InvalidYearError(`Invalid year value: ${year}`)
    }

    if (month < 1 || month > 12) {
      throw new InvalidMonthError(`Invalid month value: ${month}`)
    }
  }

  public toString(): string {
    return this.year + '-' + this.month.toString().padStart(2, '0')
  }

  static parse(str: string): YearMonth {
    const matches = str.match(/^\d{4}-\d{2}$/)
    if (matches == undefined) {
      throw new ParseError(`Invalid year-month format: ${str}`)
    }

    const [yearString, monthString] = str.split('-')
    const year = parseInt(yearString, 10)
    const month = parseInt(monthString, 10)
    return new YearMonth(year, month)
  }
}
