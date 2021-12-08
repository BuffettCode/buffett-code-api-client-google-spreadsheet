import { CompanyService } from '~/api/company-service'
import { OndemandApiPeriodRange } from '~/api/ondemand-api-period-range'
import { CachingBuffettCodeApiClientV3 } from '~/api/v3/caching-client'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import { YearQuarterRange } from '~/fiscal-periods/year-quarter-range'
import { Setting } from '~/setting'

export class CsvExporter {
  private constructor() {
    //
  }

  static generateData(
    ticker,
    from: string,
    to: string,
    today: Date = new Date()
  ): object[][] {
    const fromYearQuarter = YearQuarter.parse(from)
    const toYearQuarter = YearQuarter.parse(to)
    const range = new YearQuarterRange(fromYearQuarter, toYearQuarter)

    const setting = Setting.load()
    const client = new CachingBuffettCodeApiClientV3(setting.token)
    const companyService = new CompanyService(ticker, client, today)
    if (!companyService.isSupportedTicker()) {
      throw new Error('<<サポートされていないtickerです>>')
    }

    const ondemandQuarterApiPeriodRange = new OndemandApiPeriodRange(
      companyService
    )

    const ondemandQuarterApiPeriods = ondemandQuarterApiPeriodRange.selectOndemandQuarterApiPeriod(
      ticker,
      range
    )
    const quarterApiPeriods = ondemandQuarterApiPeriodRange.filterOndemandQuarterApiPeriod(
      ticker,
      range
    )

    if (ondemandQuarterApiPeriods.length > 0 && !setting.ondemandApiEnabled) {
      throw new Error(
        '<<指定された期間に従量課金APIの対象範囲が含まれています。設定画面から従量課金APIを有効にしてください。>>'
      )
    }

    const quarters = []
    quarterApiPeriods.forEach(period => {
      quarters.push(
        client.quarter(ticker, YearQuarterParam.fromYearQuarter(period))
      )
    })
    ondemandQuarterApiPeriods.forEach(period => {
      quarters.push(
        client.ondemandQuarter(ticker, YearQuarterParam.fromYearQuarter(period))
      )
    })

    if (!quarters.length) {
      throw new Error('<<指定されたデータを取得できませんでした>>')
    }

    const sortedQuarters = quarters.slice().sort((a, b) => {
      const labelA = a.period().toString()
      const labelB = b.period().toString()
      if (labelA > labelB) {
        return 1
      } else if (labelA < labelB) {
        return -1
      } else {
        return 0
      }
    })

    const quarter = quarters[0]
    const quarterLabels = sortedQuarters.map(quarter =>
      quarter.period().toString()
    )
    const header = [['キー', '項目名', '単位', ...quarterLabels]]
    const values = quarter.propertyNames().map(name => {
      const data = sortedQuarters.map(quarter => quarter.data[name])
      return [name, quarter.labelOf(name), quarter.unitOf(name), ...data]
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

    const data = this.generateData(ticker, from, to)

    const numRows = data.length
    const numColumns = data[0].length

    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = ss.insertSheet()
    const range = sheet.getRange(1, 1, numRows, numColumns) // starts from A1

    range.setValues(data)
  }
}
