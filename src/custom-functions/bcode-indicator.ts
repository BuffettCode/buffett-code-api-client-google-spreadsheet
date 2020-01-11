import { ApiResponseError } from './error'
import { CachingBuffettCodeApiClientV2 } from '../api/caching-client'
import { CachingIndicatorProperty } from '../api/caching-indicator-property'
import { Result } from '../result'

export function bcodeIndicator(
  client: CachingBuffettCodeApiClientV2,
  ticker: string,
  propertyName: string
): Result {
  const indicator = client.indicator(ticker)
  if (!indicator) {
    throw new ApiResponseError()
  }

  const value = indicator[propertyName]
  const unit = CachingIndicatorProperty.unitOf(propertyName)
  return new Result(value, unit)
}
