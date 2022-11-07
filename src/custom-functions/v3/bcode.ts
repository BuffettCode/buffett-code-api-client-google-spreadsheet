import { bcodeCompany } from './bcode-company'
import { CachingBuffettCodeApiClientV3 } from '~/api/v3/caching-client'
import { bcodeDaily } from '~/custom-functions/v3/bcode-daily'
import { bcodeQuarter } from '~/custom-functions/v3/bcode-quarter'
import { BcodeResult } from '~/custom-functions/v3/bcode-result'
import { PeriodParser } from '~/fiscal-periods/period-parser'
import { ErrorHandler } from '~/services/error-handler'
import { Setting } from '~/setting'

export function bcode(
  ticker: string,
  intent: string | Date,
  propertyName: string,
  isRawValue = false,
  isWithUnits = false
): number | string {
  if (!ticker) {
    throw new Error('<<tickerが有効ではありません>>')
  }

  if (!intent) {
    throw new Error('<<periodが有効ではありません>>')
  }

  if (!propertyName) {
    throw new Error('<<propertyNameが有効ではありません>>')
  }

  const setting = Setting.load()
  if (!setting.token) {
    throw new Error('<<APIキーが有効ではありません>>')
  }

  if (intent === 'COMPANY') {
    try {
      const client = new CachingBuffettCodeApiClientV3(setting.token)
      const result = bcodeCompany(client, ticker, propertyName)
      return result.format(isRawValue, isWithUnits)
    } catch (e) {
      ErrorHandler.handle(e)
    }
  }

  if (intent instanceof Date) {
    intent = intent.toISOString().substring(0, 10)
  }

  try {
    const client = new CachingBuffettCodeApiClientV3(setting.token)
    const parsedPeriod = PeriodParser.parse(intent)
    let result: BcodeResult
    if (PeriodParser.isDateParam(parsedPeriod)) {
      result = bcodeDaily(
        client,
        ticker,
        parsedPeriod,
        propertyName,
        setting.ondemandApiEnabled,
        setting.isOndemandApiCallModeForce()
      )
    } else {
      result = bcodeQuarter(
        client,
        ticker,
        parsedPeriod,
        propertyName,
        setting.ondemandApiEnabled,
        setting.isOndemandApiCallModeForce()
      )
    }

    return result.format(isRawValue, isWithUnits)
  } catch (e) {
    ErrorHandler.handle(e)
  }
}
