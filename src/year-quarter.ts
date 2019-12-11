export class YearQuarter {
  constructor(public year: number, public quarter: number) {
    // TODO: Improve validation
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
}
