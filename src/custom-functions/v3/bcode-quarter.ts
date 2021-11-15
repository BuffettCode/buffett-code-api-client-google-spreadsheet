import { CompanyService } from '~/api/company-service'
import { BuffettCodeApiClientV3 } from '~/api/v3/client'
import { BcodeResult } from '~/custom-functions/bcode-result'
import {
  ApiResponseError,
  OndemandApiNotEnabledError,
  PropertyNotFoundError,
  UnsupportedTickerError
} from '~/custom-functions/error'
import { Quarter } from '~/entities/v3/quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

export function bcodeQuarter(
  client: BuffettCodeApiClientV3,
  ticker: string,
  period: YearQuarterParam,
  propertyName: string,
  ondemandApiEnabled: boolean
): BcodeResult {
  const companyService = new CompanyService(ticker, client)
  if (!companyService.isSupportedTicker()) {
    throw new UnsupportedTickerError()
  }

  let quarter: Quarter
  if (companyService.isOndemandQuarterApiPeriod(period)) {
    if (!ondemandApiEnabled) {
      throw new OndemandApiNotEnabledError()
    }

    quarter = client.ondemandQuarter(ticker, period)
  } else {
    quarter = client.quarter(ticker, period)
  }

  if (quarter == undefined) {
    throw new ApiResponseError()
  }

  const property = quarter.columnDescription[propertyName]
  if (property == undefined) {
    throw new PropertyNotFoundError(
      `propetyName '${propertyName}' is not found.`
    )
  }

  const value = quarter.data[propertyName]
  const unit = property['unit']

  return new BcodeResult(value, unit)
}
