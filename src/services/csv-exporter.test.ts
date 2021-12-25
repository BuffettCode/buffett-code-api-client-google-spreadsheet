import { default as quarter } from '~/__mocks__/fixtures/v3/quarter'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { CsvExporter } from '~/services/csv-exporter'
import { QuarterCache } from '~/services/quarter-cache'

jest.mock('~/setting', () => jest.requireActual('~/__mocks__/setting'))
jest.mock('~/api/v3/client', () => jest.requireActual('~/__mocks__/api/v3/client'))
jest.mock('~/services/quarter-property-cache', () => jest.requireActual('~/__mocks__/services/quarter-property-cache'))
jest.mock('~/services/company-cache', () => jest.requireActual('~/__mocks__/services/company-cache'))
jest.mock('~/services/quarter-cache', () => jest.requireActual('~/__mocks__/services/quarter-cache'))

const columnDescription = quarter['column_description']
const propertyNames = Object.keys(columnDescription)
const fiscalYearIndex = propertyNames.indexOf('fiscal_year')
const fiscalQuarterIndex = propertyNames.indexOf('fiscal_quarter')
const segmentMemberIndex = propertyNames.indexOf('segment_member')

test('format', () => {
  expect(CsvExporter.format(null)).toEqual('')
  expect(CsvExporter.format('')).toEqual('')
  expect(CsvExporter.format('foo')).toEqual('foo')
  expect(CsvExporter.format(0)).toBe(0)
  expect(CsvExporter.format(123456789)).toBe(123456789)
  expect(CsvExporter.format(0.0)).toBe(0.0)
  expect(CsvExporter.format(123456789.0)).toBe(123456789.0)
  expect(CsvExporter.format({ foo: 'bar' })).toBe('{"foo":"bar"}')
})

describe('generateData', () => {
  test('uncached', () => {
    const ticker = '2371'
    const from = '2018Q1'
    const to = '2018Q1'
    const today = new Date('2020-09-23')
    expect(QuarterCache.getData(ticker, new YearQuarter(2018, 1))).toBeNull()

    const data = CsvExporter.generateData(ticker, from, to, today)

    expect(data.length).toBe(propertyNames.length + 1)
    expect(data[0].length).toBe(3 + 1)
    expect(data[0]).toEqual(['キー', '項目名', '単位', from])
    expect(data[fiscalYearIndex + 1]).toEqual(['fiscal_year', '会計年度', 'なし', 2018.0])
    expect(data[fiscalQuarterIndex + 1]).toEqual(['fiscal_quarter', '四半期', 'なし', 1.0])
    expect(data[segmentMemberIndex + 1]).toEqual([
      'segment_member',
      'セグメント情報',
      'なし',
      JSON.stringify(quarter['data']['segment_member'])
    ])
    expect(QuarterCache.getData(ticker, new YearQuarter(2018, 1))['net_sales']).toBe(12513000000.0)
  })

  test('cached', () => {
    const ticker = '2371'
    const from = '2018Q1'
    const to = '2018Q1'
    const today = new Date('2020-09-23')
    expect(QuarterCache.getData(ticker, new YearQuarter(2018, 1))).not.toBeNull()

    const data = CsvExporter.generateData(ticker, from, to, today)

    expect(data.length).toBe(propertyNames.length + 1)
    expect(data[0].length).toBe(3 + 1)
    expect(data[0]).toEqual(['キー', '項目名', '単位', from])
    expect(data[fiscalYearIndex + 1]).toEqual(['fiscal_year', '会計年度', 'なし', 2018.0])
    expect(data[fiscalQuarterIndex + 1]).toEqual(['fiscal_quarter', '四半期', 'なし', 1.0])
    expect(data[segmentMemberIndex + 1]).toEqual([
      'segment_member',
      'セグメント情報',
      'なし',
      JSON.stringify(quarter['data']['segment_member'])
    ])
    expect(QuarterCache.getData(ticker, new YearQuarter(2018, 1))['net_sales']).toBe(12513000000.0)
  })
})
