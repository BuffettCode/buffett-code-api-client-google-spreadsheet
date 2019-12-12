import { YearQuarter } from './year-quarter'

// 3年間分(=12四半期分)の範囲を取得する
export function yearQuarterRangeOf(
  yearQuarter: YearQuarter
): [YearQuarter, YearQuarter] {
  return [yearQuarter.shift(-10), yearQuarter.shift(1)]
}
