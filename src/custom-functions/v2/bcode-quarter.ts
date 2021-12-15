import { CompanyService } from '~/api/company-service'
import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { CachingQuarterProperty } from '~/api/v2/caching-quarter-property'
import {
  ApiResponseError,
  OndemandApiNotEnabledError,
  UnsupportedTickerError
} from '~/custom-functions/error'
import { BcodeResult } from '~/custom-functions/v2/bcode-result'
import { LqWithOffset } from '~/fiscal-periods/lq-with-offset'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

export function bcodeQuarter(
  client: CachingBuffettCodeApiClientV2,
  ticker: string,
  fiscalYear: number | LyWithOffset,
  fiscalQuarter: number | LqWithOffset,
  propertyName: string,
  ondemandApiEnabled: boolean
): BcodeResult {
  const period = new YearQuarterParam(fiscalYear, fiscalQuarter)
  const companyService = new CompanyService(ticker, client)
  if (!companyService.isSupportedTicker()) {
    throw new UnsupportedTickerError()
  }

  let quarter
  if (
    (period.isLatestYear() && period.isLatestQuarter()) ||
    !companyService.isOndemandQuarterApiPeriod(period)
  ) {
    quarter = client.quarter(ticker, period)
  } else {
    if (!ondemandApiEnabled) {
      throw new OndemandApiNotEnabledError()
    }

    quarter = client.ondemandQuarter(ticker, period)
  }

  if (!quarter) {
    throw new ApiResponseError()
  }

  const value = quarter[propertyName]
  const unit = CachingQuarterProperty.unitOf(propertyName)

  return new BcodeResult(value, unit)
}
