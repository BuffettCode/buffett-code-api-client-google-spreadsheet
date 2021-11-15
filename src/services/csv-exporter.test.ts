import { default as quarter } from '~/__mocks__/fixtures/v2/quarter-property'
import { QuarterProperty } from '~/api/v2/quarter-property'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { CsvExporter } from '~/services/csv-exporter'
import { QuarterCache } from '~/services/quarter-cache'

jest.mock('~/setting', () => jest.requireActual('~/__mocks__/setting'))
jest.mock('~/api/v2/client', () =>
  jest.requireActual('~/__mocks__/api/v2/client')
)
jest.mock('~/api/v2/quarter-property', () =>
  jest.requireActual('~/__mocks__/api/v2/quarter-property')
)
jest.mock('~/services/quarter-property-cache', () =>
  jest.requireActual('~/__mocks__/services/quarter-property-cache')
)
jest.mock('~/services/company-cache', () =>
  jest.requireActual('~/__mocks__/services/company-cache')
)
jest.mock('~/services/quarter-cache', () =>
  jest.requireActual('~/__mocks__/services/quarter-cache')
)

const fiscalYearIndex = Object.keys(quarter).indexOf('fiscal_year')
const fiscalQuarterIndex = Object.keys(quarter).indexOf('fiscal_quarter')

describe('generateData', () => {
  test('uncached', () => {
    const ticker = '2371'
    const from = '2018Q1'
    const to = '2018Q1'
    const today = new Date('2020-09-23')
    expect(QuarterCache.getData(ticker, new YearQuarter(2018, 1))).toBeNull()

    const data = CsvExporter.generateData(ticker, from, to, today)

    expect(data.length).toBe(QuarterProperty.names().length + 1)
    expect(data[0].length).toBe(3 + 1)
    expect(data[0]).toEqual(['キー', '項目名', '単位', from])
    expect(data[fiscalYearIndex + 1]).toEqual([
      'fiscal_year',
      '会計年度',
      'なし',
      2018.0
    ])
    expect(data[fiscalQuarterIndex + 1]).toEqual([
      'fiscal_quarter',
      '四半期',
      'なし',
      1.0
    ])
    expect(
      QuarterCache.getData(ticker, new YearQuarter(2018, 1))['net_sales']
    ).toBe(12513000000.0)
  })

  test('cached', () => {
    const ticker = '2371'
    const from = '2018Q1'
    const to = '2018Q1'
    const today = new Date('2020-09-23')
    expect(
      QuarterCache.getData(ticker, new YearQuarter(2018, 1))
    ).not.toBeNull()

    const data = CsvExporter.generateData(ticker, from, to, today)

    expect(data.length).toBe(QuarterProperty.names().length + 1)
    expect(data[0].length).toBe(3 + 1)
    expect(data[0]).toEqual(['キー', '項目名', '単位', from])
    expect(data[fiscalYearIndex + 1]).toEqual([
      'fiscal_year',
      '会計年度',
      'なし',
      2018.0
    ])
    expect(data[fiscalQuarterIndex + 1]).toEqual([
      'fiscal_quarter',
      '四半期',
      'なし',
      1.0
    ])
    expect(
      QuarterCache.getData(ticker, new YearQuarter(2018, 1))['net_sales']
    ).toBe(12513000000.0)
  })
})
