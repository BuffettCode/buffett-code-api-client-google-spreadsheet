jest.mock('./client')
jest.mock('./setting')

import { CsvExporter } from './csv-exporter'
import { QuarterProperty } from './quarter-property'

test('generateData', () => {
  const ticker = '2371'
  const from = '2018Q1'
  const to = '2018Q1'

  const data = CsvExporter.generateData(ticker, from, to)
  expect(data.length).toBe(QuarterProperty.names.length + 1)
  expect(data[0].length).toBe(3 + 1)
  expect(data[0]).toEqual(['キー', '項目名', '単位', from])
  expect(data[1]).toEqual(['fiscal_year', '会計年度', 'なし', 2018.0])
  expect(data[2]).toEqual(['fiscal_quarter', '四半期', 'なし', 1.0])
})
