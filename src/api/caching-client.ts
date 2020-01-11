import { BuffettCodeApiClientV2 } from './client'
import { YearQuarter } from '../year-quarter'
import { YearQuarterRange } from '../year-quarter-range'
import { IndicatorCache } from '../services/indicator-cache'
import { QuarterCache } from '../services/quarter-cache'

export class CachingBuffettCodeApiClientV2 extends BuffettCodeApiClientV2 {
  constructor(token: string) {
    super(token)
  }

  indicator(ticker: string): object | null {
    const cached = IndicatorCache.get(ticker)
    if (cached) {
      return cached
    }

    const indicator = super.indicator(ticker)
    if (!indicator) {
      return null
    }

    IndicatorCache.put(ticker, indicator)

    return indicator
  }

  quarter(ticker: string, from: YearQuarter, to: YearQuarter): object[] | null {
    const range = new YearQuarterRange(from, to).range()
    const allCached = range.map(q => QuarterCache.get(ticker, q))

    // 範囲内がすべてキャッシュされているときはキャッシュを返す
    if (allCached.every(cached => cached)) {
      return allCached
    }

    const quarters = super.quarter(ticker, from, to)
    if (!quarters.length) {
      return null
    }

    QuarterCache.putAll(ticker, quarters)

    return quarters
  }

  quarterAt(ticker: string, yearQuarter: YearQuarter): object | null {
    const cached = QuarterCache.get(ticker, yearQuarter)
    if (cached) {
      return cached
    }

    const range = YearQuarterRange.defaultRangeOf(yearQuarter)
    const quarters = super.quarter(ticker, range.from, range.to)
    if (!quarters.length) {
      return null
    }

    QuarterCache.putAll(ticker, quarters)

    const filtered = quarters.filter(
      q =>
        q['fiscal_year'] === yearQuarter.year &&
        q['fiscal_quarter'] === yearQuarter.quarter
    )
    if (!filtered.length) {
      return null
    }

    return filtered[0]
  }
}
