import { YearQuarter } from '../year-quarter'

export class QuarterCache {
  static readonly cache = {}

  static get(ticker: string, yearQuarter: YearQuarter): object[] | null {
    const cached = QuarterCache.cache[`${ticker}-${yearQuarter}`]
    return cached === undefined ? null : cached
  }

  static put(
    ticker: string,
    yearQuarter: YearQuarter,
    indicator: object[]
  ): void {
    QuarterCache.cache[`${ticker}-${yearQuarter}`] = indicator
  }
}
