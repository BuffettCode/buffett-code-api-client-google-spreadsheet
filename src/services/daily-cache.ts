import { Daily } from '~/entities/v3/daily'
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

  static columnDescriptionKey(): string {
    return `${this.prefix}-column-description`
  }

  static getData(ticker: string, date: Date | DateParam): object | null {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker, date)
    const cached = cache.get(key)
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static getColumnDescription(): object | null {
    const cache = CacheService.getUserCache()
    const cached = cache.get(this.columnDescriptionKey())
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static get(ticker: string, date: Date | DateParam): Daily | null {
    const cachedData = this.getData(ticker, date)
    const cachedColumnDescription = this.getColumnDescription()
    if (!cachedData || !cachedColumnDescription) {
      return null
    }

    return new Daily(cachedData, cachedColumnDescription)
  }

  static putData(ticker: string, data: object, expirationInSeconds = 21600): void {
    const cache = CacheService.getUserCache()
    const date = new Date(data['day'])
    const key = this.key(ticker, date)
    cache.put(key, JSON.stringify(data), expirationInSeconds)
  }

  static putColumnDescription(columnDescription: object, expirationInSeconds = 21600): void {
    const cache = CacheService.getUserCache()
    cache.put(this.columnDescriptionKey(), JSON.stringify(columnDescription), expirationInSeconds)
  }

  static put(ticker: string, daily: Daily, expirationInSeconds = 21600): void {
    this.putData(ticker, daily.data, expirationInSeconds)
    this.putColumnDescription(daily.columnDescription, expirationInSeconds)
  }
}
