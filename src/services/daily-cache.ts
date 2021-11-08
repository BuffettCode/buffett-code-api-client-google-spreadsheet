import { DateParam } from '~/fiscal-periods/date-param'

export class DailyCache {
  static readonly prefix = 'daily'

  private constructor() {
    //
  }

  static key(ticker: string, date: Date | DateParam): string {
    if (date instanceof Date) {
      date = new DateParam(date)
    } else if (date.isLatest()) {
      date = new DateParam(new Date())
    }

    return `${this.prefix}-${ticker}-${date}`
  }

  static get(ticker: string, date: Date | DateParam): object | null {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker, date)
    const cached = cache.get(key)
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static put(ticker: string, daily: object, expirationInSeconds = 21600): void {
    const cache = CacheService.getUserCache()
    const date = new Date(daily['day'])
    const key = this.key(ticker, date)
    cache.put(key, JSON.stringify(daily), expirationInSeconds)
  }
}
