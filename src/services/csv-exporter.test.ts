import { BuffettCodeApiClientV2 as BuffettCodeApiClientV2Mock } from '../__mocks__/api/client'
import { QuarterCache as QuarterCacheMock } from '../__mocks__/services/quarter-cache'
import { QuarterProperty as QuarterPropertyMock } from '../__mocks__/api/quarter-property'

jest.mock('../api/client', () => ({
  BuffettCodeApiClientV2: BuffettCodeApiClientV2Mock
}))
jest.mock('../setting')
jest.mock('./quarter-cache', () => ({
  __esModule: true,
  QuarterCache: QuarterCacheMock
}))
jest.mock('../api/quarter-property', () => ({
  QuarterProperty: QuarterPropertyMock
}))

import { CsvExporter } from './csv-exporter'
import { QuarterCache } from './quarter-cache'
import { QuarterProperty } from '../api/quarter-property'
import { YearQuarter } from '../year-quarter'

test('generateData (uncached)', () => {
  const ticker = '2371'
  const from = '2018Q1'
  const to = '2018Q1'
  expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))).toBeNull()

  const data = CsvExporter.generateData(ticker, from, to)

  expect(data.length).toBe(QuarterProperty.names().length + 1)
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

  expect(data.length).toBe(QuarterProperty.names().length + 1)
  expect(data[0].length).toBe(3 + 1)
  expect(data[0]).toEqual(['キー', '項目名', '単位', from])
  expect(data[1]).toEqual(['fiscal_year', '会計年度', 'なし', 2018.0])
  expect(data[2]).toEqual(['fiscal_quarter', '四半期', 'なし', 1.0])
  expect(QuarterCache.get(ticker, new YearQuarter(2018, 1))['net_sales']).toBe(
    12513000000.0
  )
})
