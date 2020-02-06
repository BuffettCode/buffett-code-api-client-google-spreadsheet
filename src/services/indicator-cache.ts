export class IndicatorCache {
  static readonly prefix = 'indicator'

  private constructor() {
    //
  }

  static key(ticker: string): string {
    return `${this.prefix}-${ticker}`
  }

  static get(ticker: string): object | null {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker)
    const cached = cache.get(key)
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static put(
    ticker: string,
    indicator: object,
    expirationInSeconds = 21600
  ): void {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker)
    cache.put(key, JSON.stringify(indicator), expirationInSeconds)
  }
}
