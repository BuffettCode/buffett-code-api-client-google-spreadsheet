import { Monthly } from '~/entities/v3/monthly'
import { YearMonth } from '~/fiscal-periods/year-month'

export class MonthlyCache {
  static readonly prefix = 'monthly'

  private constructor() {
    //
  }

  static key(ticker: string, yearMonth: YearMonth): string {
    return `${this.prefix}-${ticker}-${yearMonth}`
  }

  static columnDescriptionKey(): string {
    return `${this.prefix}-column-description`
  }

  private static getData(ticker: string, yearMonth: YearMonth): object | null {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker, yearMonth)
    const cached = cache.get(key)
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  private static getColumnDescription(): object | null {
    const cache = CacheService.getUserCache()
    const cached = cache.get(this.columnDescriptionKey())
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static get(ticker: string, yearMonth: YearMonth): Monthly | null {
    const cachedData = this.getData(ticker, yearMonth)
    const cachedColumnDescription = this.getColumnDescription()
    if (!cachedData || !cachedColumnDescription) {
      return null
    }

    return new Monthly(cachedData, cachedColumnDescription)
  }

  private static putData(ticker: string, monthly: Monthly, expirationInSeconds = 21600): void {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker, monthly.period())
    cache.put(key, JSON.stringify(monthly.data), expirationInSeconds)
  }

  private static putColumnDescription(columnDescription: object, expirationInSeconds = 21600): void {
    const cache = CacheService.getUserCache()
    cache.put(this.columnDescriptionKey(), JSON.stringify(columnDescription), expirationInSeconds)
  }

  static put(ticker: string, monthly: Monthly, expirationInSeconds = 21600): void {
    this.putData(ticker, monthly, expirationInSeconds)
    this.putColumnDescription(monthly.columnDescription, expirationInSeconds)
  }
}
