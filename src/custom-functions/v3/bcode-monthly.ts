import { BuffettCodeApiClientV3 } from '~/api/v3/client'
import { ApiResponseError, PropertyNotFoundError } from '~/custom-functions/error'
import { BcodeResult } from '~/custom-functions/v3/bcode-result'
import { YearMonth } from '~/fiscal-periods/year-month'

export function bcodeMonthly(
  client: BuffettCodeApiClientV3,
  ticker: string,
  period: YearMonth,
  propertyName: string
): BcodeResult {
  const monthly = client.monthly(ticker, period)

  if (monthly == undefined) {
    throw new ApiResponseError()
  }

  let value: string | number | null
  let unit: string
  try {
    value = monthly.valueOf(propertyName)
    unit = monthly.unitOf(propertyName)
  } catch (e) {
    throw new PropertyNotFoundError(`propetyName '${propertyName}' is not found.`)
  }

  return new BcodeResult(propertyName, value, unit)
}
