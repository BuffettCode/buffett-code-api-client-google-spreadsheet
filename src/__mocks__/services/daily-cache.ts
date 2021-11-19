import { Daily } from '~/entities/v3/daily'
import { DateParam } from '~/fiscal-periods/date-param'

export class DailyCache {
  static readonly cache = {}

  static get(ticker: string, date: Date | DateParam): Daily | null {
    const cachedData = this.getData(ticker, date)
    const cachedColumnDescription = this.getColumnDescription()
    if (cachedData == undefined || cachedColumnDescription == undefined) {
      return null
    }

    return new Daily(cachedData, cachedColumnDescription)
  }

  static getData(ticker: string, date: Date | DateParam): object | null {
    if (date instanceof Date) {
      date = new DateParam(date)
    }

    const cached = DailyCache.cache[`${ticker}-${date}`]
    return cached === undefined ? null : cached
  }

  static getColumnDescription(): object | null {
    const cached = this.cache['column-description']
    return cached === undefined ? null : cached
  }

  static put(ticker: string, daily: Daily): void {
    this.putData(ticker, daily.data)
    this.putColumnDescription(daily.columnDescription)
  }

  static putData(ticker: string, daily: object): void {
    DailyCache.cache[`${ticker}-${daily['day']}`] = daily
  }

  static putColumnDescription(columnDescription: object): void {
    this.cache['column-description'] = columnDescription
  }

  // for testing
  static clearAll(): void {
    Object.keys(this.cache).forEach(key => delete this.cache[key])
  }
}
