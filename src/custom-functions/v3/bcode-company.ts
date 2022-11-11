import { BuffettCodeApiClientV3 } from '~/api/v3/client'
import { PropertyNotFoundError } from '~/custom-functions/error'
import { BcodeResult } from '~/custom-functions/v3/bcode-result'

export function bcodeCompany(client: BuffettCodeApiClientV3, ticker: string, propertyName: string): BcodeResult {
  const company = client.company(ticker)

  const property = company.columnDescription[propertyName]
  if (property == undefined) {
    throw new PropertyNotFoundError(`propetyName '${propertyName}' is not found.`)
  }

  const value = company.data[propertyName]
  const unit = company.unitOf(propertyName)

  return new BcodeResult(propertyName, value, unit)
}
