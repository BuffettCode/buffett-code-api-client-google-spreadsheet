import { ApiResponseError } from './error'
import { CachingBuffettCodeApiClientV2 } from '../api/v2/caching-client'
import { CachingIndicatorProperty } from '../api/v2/caching-indicator-property'
import { BcodeResult } from './bcode-result'

export function bcodeIndicator(
  client: CachingBuffettCodeApiClientV2,
  ticker: string,
  propertyName: string
): BcodeResult {
  const indicator = client.indicator(ticker)
  if (!indicator) {
    throw new ApiResponseError()
  }

  const value = indicator[propertyName]
  const unit = CachingIndicatorProperty.unitOf(propertyName)
  return new BcodeResult(value, unit)
}
