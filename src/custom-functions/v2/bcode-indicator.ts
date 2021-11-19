import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { CachingIndicatorProperty } from '~/api/v2/caching-indicator-property'
import { ApiResponseError } from '~/custom-functions/error'
import { BcodeResult } from '~/custom-functions/v2/bcode-result'

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
