import { CompanyService } from '~/api/company-service'
import { OndemandApiPeriodRange } from '~/api/ondemand-api-period-range'
import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { CachingQuarterProperty } from '~/api/v2/caching-quarter-property'
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
    const client = new CachingBuffettCodeApiClientV2(setting.token)
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
    const values = CachingQuarterProperty.names().map(name => {
      const data = sortedQuarters.map(quarter => quarter[name])
      return [
        name,
        CachingQuarterProperty.labelOf(name),
        CachingQuarterProperty.unitOf(name),
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

    const data = this.generateData(ticker, from, to)

    const numRows = data.length
    const numColumns = data[0].length

    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = ss.insertSheet()
    const range = sheet.getRange(1, 1, numRows, numColumns) // starts from A1

    range.setValues(data)
  }
}
