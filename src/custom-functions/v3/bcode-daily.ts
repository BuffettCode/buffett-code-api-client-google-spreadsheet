import { CompanyService } from '~/api/company-service'
import { BuffettCodeApiClientV3 } from '~/api/v3/client'
import {
  ApiResponseError,
  OndemandApiNotEnabledError,
  PropertyNotFoundError,
  UnsupportedTickerError
} from '~/custom-functions/error'
import { BcodeResult } from '~/custom-functions/v3/bcode-result'
import { Daily } from '~/entities/v3/daily'
import { DateParam } from '~/fiscal-periods/date-param'

export function bcodeDaily(
  client: BuffettCodeApiClientV3,
  ticker: string,
  date: DateParam,
  propertyName: string,
  ondemandApiEnabled: boolean
): BcodeResult {
  const companyService = new CompanyService(ticker, client)
  if (!companyService.isSupportedTicker()) {
    throw new UnsupportedTickerError()
  }

  let daily: Daily
  if (companyService.isOndemandDailyApiPeriod(date)) {
    if (!ondemandApiEnabled) {
      throw new OndemandApiNotEnabledError()
    }

    daily = client.ondemandDaily(ticker, date)
  } else {
    daily = client.daily(ticker, date)
  }

  if (daily == undefined) {
    throw new ApiResponseError()
  }

  const property = daily.columnDescription[propertyName]
  if (property == undefined) {
    throw new PropertyNotFoundError(
      `propetyName '${propertyName}' is not found.`
    )
  }

  const value = daily.data[propertyName]
  const unit = property['unit']

  return new BcodeResult(propertyName, value, unit)
}
