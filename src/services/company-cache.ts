export class CompanyCache {
  static readonly prefix = 'company'

  private constructor() {
    //
  }

  static key(ticker: string): string {
    return `${this.prefix}-${ticker}`
  }

  static get(ticker): object | null {
    const cache = CacheService.getUserCache()
    const cached = cache.get(this.key(ticker))
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static put(
    ticker: string,
    company: object,
    expirationInSeconds = 21600
  ): void {
    const cache = CacheService.getUserCache()
    cache.put(this.key(ticker), JSON.stringify(company), expirationInSeconds)
  }

  static putAll(companies: object, expirationInSeconds = 21600): void {
    Object.keys(companies).forEach(ticker => {
      if (ticker === 'column_description') {
        return
      }

      this.put(ticker, companies[ticker][0], expirationInSeconds)
    })
  }
}
