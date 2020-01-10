import { ApiResponseError } from './error'
import { BuffettCodeApiClientV2 } from '../api/client'
import { QuarterCache } from '../services/quarter-cache'
import { CachingQuarterProperty } from '../api/caching-quarter-property'
import { Result } from '../result'
import { YearQuarterRange } from '../year-quarter-range'
import { YearQuarter } from '../year-quarter'

export function bcodeQuarter(
  client: BuffettCodeApiClientV2,
  ticker: string,
  fiscalYear: number,
  fiscalQuarter: number,
  propertyName: string
): Result {
  let quarter
  const yearQuarter = new YearQuarter(fiscalYear, fiscalQuarter)
  const cached = QuarterCache.get(ticker, yearQuarter)
  if (cached) {
    quarter = cached
  } else {
    const range = YearQuarterRange.defaultRangeOf(yearQuarter)
    const quarterResponse = client.quarter(ticker, range.from, range.to)
    if (!quarterResponse[ticker]) {
      throw new ApiResponseError()
    }
    const quarters = quarterResponse[ticker]
    QuarterCache.putAll(ticker, quarters)

    const filtered = quarters.filter(q => {
      return (
        q['fiscal_year'] === fiscalYear && q['fiscal_quarter'] === fiscalQuarter
      )
    })
    if (!filtered.length) {
      throw new ApiResponseError()
    }
    quarter = filtered[0]
  }

  const value = quarter[propertyName]
  const unit = CachingQuarterProperty.unitOf(propertyName)

  return new Result(value, unit)
}
