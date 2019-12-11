import { YearQuarter } from './year-quarter'

// 任意の桁数で丸める
// TODO: この方法だと精度に問題がある
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/round#PHP-Like_rounding_Method
export function round(num: number, precision: number): number {
  const shift = Math.pow(10, precision)
  return Math.round(num * shift) / shift
}

// 3年間分(=12四半期分)の範囲を取得する
export function yearQuarterRangeOf(
  yearQuarter: YearQuarter
): [YearQuarter, YearQuarter] {
  return [yearQuarter.shift(-10), yearQuarter.shift(1)]
}
