import { CompanyService } from '~/api/company-service'
import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { CachingQuarterProperty } from '~/api/v2/caching-quarter-property'
import { BcodeResult } from '~/custom-functions/bcode-result'
import {
  ApiResponseError,
  OndemandApiNotEnabledError,
  UnsupportedTickerError
} from '~/custom-functions/error'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

export function bcodeQuarter(
  client: CachingBuffettCodeApiClientV2,
  ticker: string,
  fiscalYear: number | 'LY',
  fiscalQuarter: number | 'LQ',
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