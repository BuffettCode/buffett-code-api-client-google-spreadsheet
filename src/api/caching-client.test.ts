import { CachingBuffettCodeApiClientV2 } from './caching-client'
import { YearQuarter } from '../fiscal-periods/year-quarter'
import { IndicatorCache } from '../services/indicator-cache'
import { QuarterCache } from '../__mocks__/services/quarter-cache'

jest.mock('./client', () => jest.requireActual('../__mocks__/api/client'))
jest.mock('../services/indicator-cache', () =>
  jest.requireActual('../__mocks__/services/indicator-cache')
)
jest.mock('../services/quarter-cache', () =>
  jest.requireActual('../__mocks__/services/quarter-cache')
)

describe('indicator', () => {
  const ticker = '2371'

  test('(uncached)', () => {
    expect(IndicatorCache.get(ticker)).toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.indicator(ticker)
    expect(res).not.toBeNull()

    expect(IndicatorCache.get(ticker)).toEqual(res)
  })

  test('(cached)', () => {
    const cached = IndicatorCache.get(ticker)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.indicator(ticker)
    expect(res).toEqual(cached)

    expect(IndicatorCache.get(ticker)).toEqual(cached)
  })
})

describe('quarter', () => {
  const ticker = '2371'
  const from = new YearQuarter(2017, 1)
  const to = new YearQuarter(2019, 1)
  const yearQuarter = new YearQuarter(2018, 1)

  beforeAll(() => {
    QuarterCache.clearAll()
  })

  test('(uncached)', () => {
    expect(QuarterCache.get(ticker, yearQuarter)).toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.quarter(ticker, from, to)
    expect(res).not.toBeNull()
    expect(res.length).toBe(1)
    expect(res[0]['fiscal_year']).toBe(yearQuarter.year)
    expect(res[0]['fiscal_quarter']).toBe(yearQuarter.quarter)

    expect(QuarterCache.get(ticker, yearQuarter)).toEqual(res[0])
  })

  test('(cached)', () => {
    const cached = QuarterCache.get(ticker, yearQuarter)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.quarter(ticker, from, to)
    expect(res).toEqual([cached])
    expect(res.length).toBe(1)
    expect(res[0]['fiscal_year']).toBe(yearQuarter.year)
    expect(res[0]['fiscal_quarter']).toBe(yearQuarter.quarter)

    expect(QuarterCache.get(ticker, yearQuarter)).toEqual(cached)
  })
})

describe('quarterAt', () => {
  const ticker = '2371'
  const yearQuarter = new YearQuarter(2018, 1)

  beforeAll(() => {
    QuarterCache.clearAll()
  })

  test('(uncached)', () => {
    expect(QuarterCache.get(ticker, yearQuarter)).toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.quarterAt(ticker, yearQuarter)
    expect(res).not.toBeNull()
    expect(res['fiscal_year']).toBe(yearQuarter.year)
    expect(res['fiscal_quarter']).toBe(yearQuarter.quarter)

    expect(QuarterCache.get(ticker, yearQuarter)).toEqual(res)
  })

  test('(cached)', () => {
    const cached = QuarterCache.get(ticker, yearQuarter)
    expect(cached).not.toBeNull()

    const client = new CachingBuffettCodeApiClientV2('token')
    const res = client.quarterAt(ticker, yearQuarter)
    expect(res).toEqual(cached)
    expect(res['fiscal_year']).toBe(yearQuarter.year)
    expect(res['fiscal_quarter']).toBe(yearQuarter.quarter)

    expect(QuarterCache.get(ticker, yearQuarter)).toEqual(cached)
  })
})
