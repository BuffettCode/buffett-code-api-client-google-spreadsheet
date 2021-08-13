import { YearQuarter } from '~/fiscal-periods/year-quarter'

export class YearQuarterRange {
  constructor(readonly from: YearQuarter, readonly to: YearQuarter) {
    //
  }

  diff(): number {
    return (
      (this.to.year - this.from.year) * 4 +
      (this.to.quarter - this.from.quarter)
    )
  }

  range(): YearQuarter[] {
    const diff = this.diff()
    const abs = Math.abs(diff)
    const sign = diff >= 0 ? 1 : -1
    const yearQuarters = []
    for (let i = 0; i < abs + 1; i++) {
      yearQuarters.push(this.from.shift(sign * i))
    }
    return yearQuarters
  }

  // 3年間分(=12四半期分)の範囲を取得する
  static defaultRangeOf(yearQuarter: YearQuarter): YearQuarterRange {
    return new YearQuarterRange(yearQuarter.shift(-10), yearQuarter.shift(1))
  }
}
