import { BuffettCodeApiClientV2 } from './client'
import { Property } from './property'
import { Setting } from './setting'
import { yearQuarterRangeOf } from './util'
import { YearQuarter } from './year-quarter'

function bCodeQuarter(
  client: BuffettCodeApiClientV2,
  ticker: string,
  fiscalYear: number,
  fiscalQuarter: number,
  propertyName: string
): Property {
  const yearQuarter = new YearQuarter(fiscalYear, fiscalQuarter)
  const [from, to] = yearQuarterRangeOf(yearQuarter)
  const quarter = client.quarter(ticker, from, to)
  const targetQuarter = quarter[ticker].filter(q => {
    return (
      q['fiscal_year'] === fiscalYear && q['fiscal_quarter'] === fiscalQuarter
    )
  })

  if (!targetQuarter.length) {
    throw new Error('<<指定されたデータを取得できませんでした>>')
  }

  const value = targetQuarter[0][propertyName]
  const unit = quarter['column_description'][propertyName]['unit']

  return new Property(value, unit)
}

function bCodeIndicator(
  client: BuffettCodeApiClientV2,
  ticker: string,
  propertyName: string
): Property {
  const indicator = client.indicator(ticker)
  const value = indicator[ticker][0][propertyName] // TODO
  const unit = indicator['column_description'][propertyName]['unit']
  return new Property(value, unit)
}

// TODO: Improve validation
export function bCode(
  ticker: string,
  fiscalYear: string,
  fiscalQuarter: string,
  propertyName: string,
  isRawValue = false,
  isWithUnits = false
): number | string {
  if (!ticker) {
    throw new Error('<<tickerが有効ではありません>>')
  }

  if (!propertyName) {
    throw new Error('<<propertyNameが有効ではありません>>')
  }

  const isQuarterProperty = BuffettCodeApiClientV2.isQuarterProperty(
    propertyName
  )
  const isIndicatorProperty = BuffettCodeApiClientV2.isIndicatorProperty(
    propertyName
  )

  if (!isQuarterProperty && !isIndicatorProperty) {
    throw new Error(`<<指定された項目が見つかりません: ${propertyName}>>`)
  }

  const setting = Setting.load()
  if (!setting.token) {
    throw new Error('<<APIキーが有効ではありません>>')
  }

  const client = new BuffettCodeApiClientV2(setting.token)

  let property: Property
  if (isQuarterProperty) {
    if (!fiscalYear) {
      throw new Error('<<fiscalYearが有効ではありません>>')
    }

    if (!fiscalQuarter) {
      throw new Error('<<fiscalQuarterが有効ではありません>>')
    }

    property = bCodeQuarter(
      client,
      ticker,
      parseInt(fiscalYear, 10),
      parseInt(fiscalQuarter, 10),
      propertyName
    )
  } else {
    property = bCodeIndicator(client, ticker, propertyName)
  }

  return property.format(isRawValue, isWithUnits)
}
