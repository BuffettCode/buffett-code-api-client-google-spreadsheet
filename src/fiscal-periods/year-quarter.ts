export class YearQuarter {
  constructor(public year: number, public quarter: number) {
    if (year < 1) {
      throw new Error('Invalid year: ' + year)
    }

    if (quarter < 1 || quarter > 4) {
      throw new Error('Invalid quarter: ' + quarter)
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

  static parse(str: string): YearQuarter {
    const [yearString, quarterString] = str.split('Q')
    const year = parseInt(yearString, 10)
    const quarter = parseInt(quarterString, 10)
    return new YearQuarter(year, quarter)
  }
}
