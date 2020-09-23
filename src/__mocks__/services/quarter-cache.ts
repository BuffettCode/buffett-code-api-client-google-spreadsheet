import { YearQuarter } from '../../fiscal-periods/year-quarter'

export class QuarterCache {
  static readonly cache = {}

  static get(ticker: string, yearQuarter: YearQuarter): object | null {
    const cached = QuarterCache.cache[`${ticker}-${yearQuarter}`]
    return cached === undefined ? null : cached
  }

  static put(ticker: string, quarter: object): void {
    QuarterCache.cache[
      `${ticker}-${quarter['fiscal_year']}Q${quarter['fiscal_quarter']}`
    ] = quarter
  }

  // for testing
  static clearAll(): void {
    Object.keys(this.cache).forEach(key => delete this.cache[key])
  }
}
