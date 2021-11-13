import { CompanyService } from '~/api/company-service'
import { BuffettCodeApiClientV3 } from '~/api/v3/client'
import { BcodeResult } from '~/custom-functions/bcode-result'
import {
  ApiResponseError,
  OndemandApiNotEnabledError,
  UnsupportedTickerError
} from '~/custom-functions/error'
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

  const value = daily.data[propertyName]
  const unit = daily.columnDescription[propertyName]['unit']
  return new BcodeResult(value, unit)
}
