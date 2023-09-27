import { Monthly } from '~/entities/v3/monthly'
import { YearMonth } from '~/fiscal-periods/year-month'

export class MonthlyCache {
  static readonly cache = {}

  static get(ticker: string, yearMonth: YearMonth): Monthly | null {
    const cachedData = this.getData(ticker, yearMonth)
    const cachedColumnDescription = this.getColumnDescription()
    if (cachedData == undefined || cachedColumnDescription == undefined) {
      return null
    }

    return new Monthly(cachedData, cachedColumnDescription)
  }

  private static getData(ticker: string, yearMonth: YearMonth): object | null {
    const cached = this.cache[`${ticker}-${yearMonth}`]
    return cached === undefined ? null : cached
  }

  private static getColumnDescription(): object | null {
    const cached = this.cache['column-description']
    return cached === undefined ? null : cached
  }

  static put(ticker: string, monthly: Monthly): void {
    this.putData(ticker, monthly)
    this.putColumnDescription(monthly.columnDescription)
  }

  private static putData(ticker: string, monthly: Monthly): void {
    this.cache[`${ticker}-${monthly.period()}`] = monthly.data
  }

  private static putColumnDescription(columnDescription: object): void {
    this.cache['column-description'] = columnDescription
  }

  // for testing
  static clearAll(): void {
    Object.keys(this.cache).forEach(key => delete this.cache[key])
  }
}
