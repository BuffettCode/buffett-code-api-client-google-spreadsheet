import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { CachingIndicatorProperty } from '~/api/v2/caching-indicator-property'
import { BcodeResult } from '~/custom-functions/bcode-result'
import { ApiResponseError } from '~/custom-functions/error'

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
