import { Quarter } from '~/entities/v3/quarter'
import { YearQuarter } from '~/fiscal-periods/year-quarter'

export class QuarterCache {
  static readonly prefix = 'quarter'

  private constructor() {
    //
  }

  static key(ticker: string, yearQuarter: YearQuarter): string {
    return `${this.prefix}-${ticker}-${yearQuarter}`
  }

  static columnDescriptionKey(): string {
    return `${this.prefix}-column-description`
  }

  static getData(ticker: string, yearQuarter: YearQuarter): object | null {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker, yearQuarter)
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

  static get(ticker: string, yearQuarter: YearQuarter): Quarter | null {
    const cachedData = this.getData(ticker, yearQuarter)
    const cachedColumnDescription = this.getColumnDescription()
    if (!cachedData || !cachedColumnDescription) {
      return null
    }

    return new Quarter(cachedData, cachedColumnDescription)
  }

  static putData(
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

  static putColumnDescription(
    columnDescription: object,
    expirationInSeconds = 21600
  ): void {
    const cache = CacheService.getUserCache()
    cache.put(
      this.columnDescriptionKey(),
      JSON.stringify(columnDescription),
      expirationInSeconds
    )
  }

  static put(
    ticker: string,
    quarter: Quarter,
    expirationInSeconds = 21600
  ): void {
    this.putData(ticker, quarter.data, expirationInSeconds)
    this.putColumnDescription(quarter.columnDescription, expirationInSeconds)
  }
}
