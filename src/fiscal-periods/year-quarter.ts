import { InvalidYearError, InvalidQuarterError } from '~/fiscal-periods/error'

export class YearQuarter {
  constructor(public year: number, public quarter: number) {
    if (year < 1) {
      throw new InvalidYearError()
    }

    if (quarter < 1 || quarter > 4) {
      throw new InvalidQuarterError()
    }
  }

  public shift(amount: number): YearQuarter {
    const shifting = this.quarter + amount - 1
    const year = this.year + Math.floor(shifting / 4)
    let quarter = (shifting % 4) + 1
    if (quarter < 1) {
      quarter = 4 + quarter
    }
    return new YearQuarter(year, quarter)
  }

  public toString(): string {
    return this.year + 'Q' + this.quarter
  }

  public isAfterOrEqual(that: YearQuarter): boolean {
    if (this.year == that.year) {
      return this.quarter >= that.quarter
    }

    return this.year >= that.year
  }

  static parse(str: string): YearQuarter {
    const [yearString, quarterString] = str.split('Q')
    const year = parseInt(yearString, 10)
    const quarter = parseInt(quarterString, 10)
    return new YearQuarter(year, quarter)
  }
}
