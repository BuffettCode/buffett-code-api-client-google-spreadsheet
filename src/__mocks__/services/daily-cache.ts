import { DateParam } from '~/fiscal-periods/date-param'

export class DailyCache {
  static readonly cache = {}

  static get(ticker: string, date: Date | DateParam): object | null {
    if (date instanceof Date) {
      date = new DateParam(date)
    }

    const cached = DailyCache.cache[`${ticker}-${date}`]
    return cached === undefined ? null : cached
  }

  static put(ticker: string, daily: object): void {
    DailyCache.cache[`${ticker}-${daily['day']}`] = daily
  }

  // for testing
  static clearAll(): void {
    Object.keys(this.cache).forEach(key => delete this.cache[key])
  }
}
