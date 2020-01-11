import { CsvExporter } from './csv-exporter'
import { QuarterCache } from './quarter-cache'
import { QuarterProperty } from '../api/quarter-property'
import { YearQuarter } from '../time/year-quarter'

import { default as quarter } from '../__mocks__/fixtures/quarter-property'

jest.mock('../setting')
jest.mock('../api/client', () => jest.requireActual('../__mocks__/api/client'))
jest.mock('../api/quarter-property', () =>
  jest.requireActual('../__mocks__/api/quarter-property')
)
jest.mock('./quarter-cache', () =>
  jest.requireActual('../__mocks__/services/quarter-cache')
)

const fiscalYearIndex = Object.keys(quarter).indexOf('fiscal_year')
const fiscalQuarterIndex = Object.keys(quarter).indexOf('fiscal_quarter')

test('generateData (uncached)', () => {
  const ticker = '2371'
  const from = '2018Q1'
  const to = '2018Q1'
  expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toBeNull()

  const data = CsvExporter.generateData(ticker, from, to)

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
  expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))['net_sales']).toBe(
    12513000000.0
  )
})

test('generateData (cached)', () => {
  const ticker = '2371'
  const from = '2018Q1'
  const to = '2018Q1'
  expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).not.toBeNull()

  const data = CsvExporter.generateData(ticker, from, to)

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
  expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))['net_sales']).toBe(
    12513000000.0
  )
})
