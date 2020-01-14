import { YearQuarter } from '../fiscal-periods/year-quarter'

export class QuarterCache {
  static readonly prefix = 'quarter'

  private constructor() {
    //
  }

  static key(ticker: string, yearQuarter: YearQuarter): string {
    return `${this.prefix}-${ticker}-${yearQuarter}`
  }

  static get(ticker: string, yearQuarter: YearQuarter): object[] | null {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker, yearQuarter)
    const cached = cache.get(key)
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static put(
    ticker: string,
    quarter: object,
    expirationInSeconds = 21600
  ): void {
    const cache = CacheService.getUserCache()
    const yearQuarter = new YearQuarter(
      quarter['fiscal_year'],
      quarter['fiscal_quarter']
    )
    const key = this.key(ticker, yearQuarter)
    cache.put(key, JSON.stringify(quarter), expirationInSeconds)
  }

  static putAll(
    ticker: string,
    quarters: object[],
    expirationInSeconds = 21600
  ): void {
    quarters.forEach(quarter => this.put(ticker, quarter, expirationInSeconds))
  }
}
