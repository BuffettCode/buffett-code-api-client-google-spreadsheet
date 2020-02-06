import { ApiResponseError } from './error'
import { CachingBuffettCodeApiClientV2 } from '../api/caching-client'
import { CachingQuarterProperty } from '../api/caching-quarter-property'
import { BcodeResult } from './bcode-result'
import { YearQuarter } from '../fiscal-periods/year-quarter'

export function bcodeQuarter(
  client: CachingBuffettCodeApiClientV2,
  ticker: string,
  fiscalYear: number,
  fiscalQuarter: number,
  propertyName: string
): BcodeResult {
  const yearQuarter = new YearQuarter(fiscalYear, fiscalQuarter)
  const quarter = client.quarterAt(ticker, yearQuarter)
  if (!quarter) {
    throw new ApiResponseError()
  }

  const value = quarter[propertyName]
  const unit = CachingQuarterProperty.unitOf(propertyName)

  return new BcodeResult(value, unit)
}
