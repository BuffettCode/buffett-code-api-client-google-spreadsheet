import { YearQuarter } from '../../year-quarter'

export class QuarterCache {
  static readonly cache = {}

  static get(ticker: string, yearQuarter: YearQuarter): object[] | null {
    const cached = QuarterCache.cache[`${ticker}-${yearQuarter}`]
    return cached === undefined ? null : cached
  }

  static put(ticker: string, quarter: object): void {
    QuarterCache.cache[
      `${ticker}-${quarter['fiscal_year']}Q${quarter['fiscal_quarter']}`
    ] = quarter
  }

  static putAll(ticker: string, quarters: object[]): void {
    quarters.forEach(quarter => QuarterCache.put(ticker, quarter))
  }
}
