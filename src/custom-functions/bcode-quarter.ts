import { ApiResponseError } from './error'
import { BuffettCodeApiClientV2 } from '../client'
import { QuarterCache } from '../quarter-cache'
import { QuarterProperty } from '../quarter-property'
import { Result } from '../result'
import { yearQuarterRangeOf } from '../util'
import { YearQuarter } from '../year-quarter'

export function bcodeQuarter(
  client: BuffettCodeApiClientV2,
  ticker: string,
  fiscalYear: number,
  fiscalQuarter: number,
  propertyName: string
): Result {
  let quarters
  const yearQuarter = new YearQuarter(fiscalYear, fiscalQuarter)
  const cached = QuarterCache.get(ticker, yearQuarter)
  if (cached) {
    quarters = cached
  } else {
    const [from, to] = yearQuarterRangeOf(yearQuarter)
    const quarterResponse = client.quarter(ticker, from, to)
    if (!quarterResponse[ticker]) {
      throw new ApiResponseError()
    }
    quarters = quarterResponse[ticker]
    QuarterCache.put(ticker, yearQuarter, quarters)
  }

  const targetQuarter = quarters.filter(q => {
    return (
      q['fiscal_year'] === fiscalYear && q['fiscal_quarter'] === fiscalQuarter
    )
  })
  if (!targetQuarter.length) {
    throw new ApiResponseError()
  }

  const value = targetQuarter[0][propertyName]
  const unit = QuarterProperty.unitOf(propertyName)

  return new Result(value, unit)
}
