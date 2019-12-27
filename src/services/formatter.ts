export class Formatter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  // 任意の桁数で丸める
  // TODO: この方法だと精度に問題がある
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/round#PHP-Like_rounding_Method
  static round(num: number, precision: number): number {
    const shift = Math.pow(10, precision)
    return Math.round(num * shift) / shift
  }

  // 数値をカンマ区切りの文字列にする
  // NOTE: google apps scriptではIntl.NumberFormatやtoLocaleStringが使えない
  static commaStyled(num: number): string {
    const str = num.toString()
    const [integer, decimal] = str.split('.')
    const formattedInteger = integer.replace(/\d(?=(\d{3})+$)/g, '$&,')
    if (decimal) {
      return formattedInteger + '.' + decimal
    } else {
      return formattedInteger
    }
  }
}
