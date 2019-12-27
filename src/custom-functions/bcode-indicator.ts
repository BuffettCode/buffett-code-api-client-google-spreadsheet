import { ApiResponseError } from './error'
import { BuffettCodeApiClientV2 } from '../api/client'
import { IndicatorCache } from '../services/indicator-cache'
import { IndicatorProperty } from '../api/indicator-property'
import { Result } from '../result'

export function bcodeIndicator(
  client: BuffettCodeApiClientV2,
  ticker: string,
  propertyName: string
): Result {
  let indicator
  const cached = IndicatorCache.get(ticker)
  if (cached) {
    indicator = cached
  } else {
    const indicatorResponse = client.indicator(ticker)

    if (!indicatorResponse[ticker] || !indicatorResponse[ticker][0]) {
      throw new ApiResponseError()
    }

    indicator = indicatorResponse[ticker]
    IndicatorCache.put(ticker, indicator)
  }

  const value = indicator[0][propertyName] // NOTE: indicatorは常に1つ
  const unit = IndicatorProperty.unitOf(propertyName)
  return new Result(value, unit)
}
