import { Company } from '~/entities/v3/company'

export class CompanyCache {
  static readonly prefix = 'company'

  private constructor() {
    //
  }

  static key(ticker: string): string {
    return `${this.prefix}-${ticker}`
  }

  static columnDescriptionKey(): string {
    return `${this.prefix}-column-description`
  }

  static getData(ticker: string): object | null {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker)
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

  static get(ticker: string): Company | null {
    const cachedData = this.getData(ticker)
    const cachedColumnDescription = this.getColumnDescription()
    if (!cachedData || !cachedColumnDescription) {
      return null
    }

    return new Company(cachedData, cachedColumnDescription)
  }

  static putData(ticker: string, company: object, expirationInSeconds = 21600): void {
    const cache = CacheService.getUserCache()
    const key = this.key(ticker)
    cache.put(key, JSON.stringify(company), expirationInSeconds)
  }

  static putColumnDescription(columnDescription: object, expirationInSeconds = 21600): void {
    const cache = CacheService.getUserCache()
    cache.put(this.columnDescriptionKey(), JSON.stringify(columnDescription), expirationInSeconds)
  }

  static put(ticker: string, company: Company, expirationInSeconds = 21600): void {
    this.putData(ticker, company.data, expirationInSeconds)
    this.putColumnDescription(company.columnDescription, expirationInSeconds)
  }
}
