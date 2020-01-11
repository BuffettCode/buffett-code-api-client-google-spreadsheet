import { ApiResponseError } from './error'
import { CachingBuffettCodeApiClientV2 } from '../api/caching-client'
import { CachingQuarterProperty } from '../api/caching-quarter-property'
import { Result } from '../result'
import { YearQuarter } from '../year-quarter'

export function bcodeQuarter(
  client: CachingBuffettCodeApiClientV2,
  ticker: string,
  fiscalYear: number,
  fiscalQuarter: number,
  propertyName: string
): Result {
  const yearQuarter = new YearQuarter(fiscalYear, fiscalQuarter)
  const quarter = client.quarterAt(ticker, yearQuarter)
  if (!quarter) {
    throw new ApiResponseError()
  }

  const value = quarter[propertyName]
  const unit = CachingQuarterProperty.unitOf(propertyName)

  return new Result(value, unit)
}
