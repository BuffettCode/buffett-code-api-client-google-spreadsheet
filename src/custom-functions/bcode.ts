import { BuffettCodeApiClientV2, HttpError } from '../client'
import { IndicatorCache } from '../indicator-cache'
import { IndicatorProperty } from '../indicator-property'
import { QuarterCache } from '../quarter-cache'
import { QuarterProperty } from '../quarter-property'
import { Result } from '../result'
import { Setting } from '../setting'
import { yearQuarterRangeOf } from '../util'
import { YearQuarter } from '../year-quarter'

export class ApiResponseError implements Error {
  public name = 'ApiResponseError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}

function bcodeQuarter(
  client: BuffettCodeApiClientV2,
  ticker: string,
  fiscalYear: number,
  fiscalQuarter: number,
  propertyName: string
): Result {
  let quarters
  const yearQuarter = new YearQuarter(fiscalYear, fiscalQuarter)
  const cached = QuarterCache.get(ticker, yearQuarter)
  if (cached) {
    quarters = cached
  } else {
    const [from, to] = yearQuarterRangeOf(yearQuarter)
    const quarterResponse = client.quarter(ticker, from, to)
    if (!quarterResponse[ticker]) {
      throw new ApiResponseError()
    }
    quarters = quarterResponse[ticker]
    QuarterCache.put(ticker, yearQuarter, quarters)
  }

  const targetQuarter = quarters.filter(q => {
    return (
      q['fiscal_year'] === fiscalYear && q['fiscal_quarter'] === fiscalQuarter
    )
  })
  if (!targetQuarter.length) {
    throw new ApiResponseError()
  }

  const value = targetQuarter[0][propertyName]
  const unit = QuarterProperty.unitOf(propertyName)

  return new Result(value, unit)
}

function bcodeIndicator(
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

function validate(
  ticker: string,
  fiscalYear: string,
  fiscalQuarter: string,
  propertyName: string
): void {
  if (!ticker) {
    throw new Error('<<tickerが有効ではありません>>')
  }

  if (!propertyName) {
    throw new Error('<<propertyNameが有効ではありません>>')
  }

  const isQuarterProperty = QuarterProperty.isQuarterProperty(propertyName)
  const isIndicatorProperty = IndicatorProperty.isIndicatorProperty(
    propertyName
  )

  if (!isQuarterProperty && !isIndicatorProperty) {
    throw new Error(`<<指定された項目が見つかりません: ${propertyName}>>`)
  }

  if (isQuarterProperty) {
    if (!fiscalYear) {
      throw new Error('<<fiscalYearが有効ではありません>>')
    }

    if (!fiscalQuarter) {
      throw new Error('<<fiscalQuarterが有効ではありません>>')
    }
  }
}

// TODO: エラーハンドリングの改善
export function bcode(
  ticker: string,
  fiscalYear: string,
  fiscalQuarter: string,
  propertyName: string,
  isRawValue = false,
  isWithUnits = false
): number | string {
  validate(ticker, fiscalYear, fiscalQuarter, propertyName)

  const setting = Setting.load()
  if (!setting.token) {
    throw new Error('<<APIキーが有効ではありません>>')
  }

  const client = new BuffettCodeApiClientV2(setting.token)

  const isQuarterProperty = QuarterProperty.isQuarterProperty(propertyName)

  try {
    let result: Result
    if (isQuarterProperty) {
      result = bcodeQuarter(
        client,
        ticker,
        parseInt(fiscalYear, 10),
        parseInt(fiscalQuarter, 10),
        propertyName
      )
    } else {
      result = bcodeIndicator(client, ticker, propertyName)
    }

    return result.format(isRawValue, isWithUnits)
  } catch (e) {
    if (e instanceof ApiResponseError) {
      throw new Error('<<指定されたデータを取得できませんでした>>')
    } else if (e instanceof HttpError) {
      const code = e.response.getResponseCode()

      if (e.isInvalidTestingRequest()) {
        throw new Error('<<テスト用のAPIキーでは取得できないデータです>>')
      } else if (code === 403) {
        throw new Error('<<APIキーが有効ではありません>>')
      } else if (code === 429) {
        throw new Error('<<APIの実行回数が上限に達しました>>')
      } else if (Math.floor(code / 100) === 4) {
        throw new Error('<<無効なリクエストです>>')
      } else {
        throw new Error('<<システムエラーが発生しました>>')
      }
    } else {
      throw new Error(`<<未定義のエラー: ${e.message}>>`)
    }
  }
}
