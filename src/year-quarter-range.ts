import { YearQuarter } from './year-quarter'

export class YearQuarterRange {
  private constructor() {
    //
  }

  static diff(from: YearQuarter, to: YearQuarter): number {
    return (to.year - from.year) * 4 + (to.quarter - from.quarter)
  }

  static range(from, to): YearQuarter[] {
    const diff = YearQuarterRange.diff(from, to)
    const abs = Math.abs(diff)
    const sign = diff >= 0 ? 1 : -1
    const yearQuarters = []
    for (let i = 0; i < abs + 1; i++) {
      yearQuarters.push(from.shift(sign * i))
    }
    return yearQuarters
  }
}
