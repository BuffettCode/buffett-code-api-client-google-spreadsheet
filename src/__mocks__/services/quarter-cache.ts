import { Quarter } from '~/entities/v3/quarter'
import { YearQuarter } from '~/fiscal-periods/year-quarter'

export class QuarterCache {
  static readonly cache = {}

  static get(ticker: string, yearQuarter: YearQuarter): Quarter | null {
    const cachedData = this.getData(ticker, yearQuarter)
    const cachedColumnDescription = this.getColumnDescription()
    if (cachedData == undefined || cachedColumnDescription == undefined) {
      return null
    }

    return new Quarter(cachedData, cachedColumnDescription)
  }

  static getData(ticker: string, yearQuarter: YearQuarter): object | null {
    const cached = this.cache[`${ticker}-${yearQuarter}`]
    return cached === undefined ? null : cached
  }

  static getColumnDescription(): object | null {
    const cached = this.cache['column-description']
    return cached === undefined ? null : cached
  }

  static put(ticker: string, quarter: Quarter): void {
    this.putData(ticker, quarter.data)
    this.putColumnDescription(quarter.columnDescription)
  }

  static putData(ticker: string, quarter: object): void {
    this.cache[`${ticker}-${quarter['fiscal_year']}Q${quarter['fiscal_quarter']}`] = quarter
  }

  static putColumnDescription(columnDescription: object): void {
    this.cache['column-description'] = columnDescription
  }

  // for testing
  static clearAll(): void {
    Object.keys(this.cache).forEach(key => delete this.cache[key])
  }
}
