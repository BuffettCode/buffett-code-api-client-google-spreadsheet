jest.mock('./client')
jest.mock('./setting')
jest.mock('./quarter-cache')

import { CsvExporter } from './csv-exporter'
import { QuarterCache } from './quarter-cache'
import { QuarterProperty } from './quarter-property'
import { YearQuarter } from './year-quarter'

test('generateData (uncached)', () => {
  const ticker = '2371'
  const from = '2018Q1'
  const to = '2018Q1'
  expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toBeNull()

  const data = CsvExporter.generateData(ticker, from, to)

  expect(data.length).toBe(QuarterProperty.names.length + 1)
  expect(data[0].length).toBe(3 + 1)
  expect(data[0]).toEqual(['キー', '項目名', '単位', from])
  expect(data[1]).toEqual(['fiscal_year', '会計年度', 'なし', 2018.0])
  expect(data[2]).toEqual(['fiscal_quarter', '四半期', 'なし', 1.0])
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

  expect(data.length).toBe(QuarterProperty.names.length + 1)
  expect(data[0].length).toBe(3 + 1)
  expect(data[0]).toEqual(['キー', '項目名', '単位', from])
  expect(data[1]).toEqual(['fiscal_year', '会計年度', 'なし', 2018.0])
  expect(data[2]).toEqual(['fiscal_quarter', '四半期', 'なし', 1.0])
  expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))['net_sales']).toBe(
    12513000000.0
  )
})
