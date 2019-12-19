import { YearQuarter } from './year-quarter'

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
    const key = QuarterCache.key(ticker, yearQuarter)
    const cached = cache.get(key)
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static put(
    ticker: string,
    yearQuarter: YearQuarter,
    quarters: object[],
    expirationInSeconds = 21600
  ): void {
    const cache = CacheService.getUserCache()
    const key = QuarterCache.key(ticker, yearQuarter)
    cache.put(key, JSON.stringify(quarters), expirationInSeconds)
  }
}
