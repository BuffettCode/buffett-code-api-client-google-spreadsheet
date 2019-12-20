import { BuffettCodeApiClientV2 } from './client'
import { Setting } from './setting'
import { YearQuarter } from './year-quarter'
import { YearQuarterRange } from './year-quarter-range'
import { QuarterCache } from './quarter-cache'
import { QuarterProperty } from './quarter-property'

export class CsvExporter {
  private constructor() {
    //
  }

  static generateData(ticker, from: string, to: string): object[][] {
    const fromYearQuarter = YearQuarter.parse(from)
    const toYearQuarter = YearQuarter.parse(to)

    const range = YearQuarterRange.range(fromYearQuarter, toYearQuarter)
    const allCached = range.map(q => QuarterCache.get(ticker, q))

    let quarters
    if (allCached.every(cached => cached)) {
      quarters = allCached
    } else {
      const setting = Setting.load()
      const client = new BuffettCodeApiClientV2(setting.token)
      const res = client.quarter(ticker, fromYearQuarter, toYearQuarter)

      if (!res[ticker] || !res[ticker].length) {
        throw new Error('<<指定されたデータを取得できませんでした>>')
      }

      quarters = res[ticker]
      QuarterCache.putAll(ticker, quarters)
    }

    const sortedQuarters = quarters.slice().sort((a, b) => {
      const labelA = `${a['fiscal_year']}Q${a['fiscal_quarter']}`
      const labelB = `${b['fiscal_year']}Q${b['fiscal_quarter']}`
      if (labelA > labelB) {
        return 1
      } else if (labelA < labelB) {
        return -1
      } else {
        return 0
      }
    })

    const quarterLabels = sortedQuarters.map(
      quarter => `${quarter['fiscal_year']}Q${quarter['fiscal_quarter']}`
    )
    const header = [['キー', '項目名', '単位', ...quarterLabels]]
    const values = QuarterProperty.names.map(name => {
      const data = sortedQuarters.map(quarter => quarter[name])
      return [
        name,
        QuarterProperty.labelOf(name),
        QuarterProperty.unitOf(name),
        ...data
      ]
    })

    return [...header, ...values]
  }

  static exportCsv(ticker: string, from: string, to: string): void {
    if (!ticker) {
      throw new Error('<<tickerが有効ではありません>>')
    }

    if (!from || !to) {
      throw new Error('<<期間が有効ではありません>>')
    }

    const data = CsvExporter.generateData(ticker, from, to)

    const numRows = data.length
    const numColumns = data[0].length

    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = ss.insertSheet()
    const range = sheet.getRange(1, 1, numRows, numColumns) // starts from A1

    range.setValues(data)
  }
}
