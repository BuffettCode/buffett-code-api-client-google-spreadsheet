import { ApiResponseError } from './error'
import { bcodeIndicator } from './bcode-indicator'
import { bcodeQuarter } from './bcode-quarter'
import { BuffettCodeApiClientV2 } from '../api/client'
import { HttpError } from '../api/http-error'
import { CachingIndicatorProperty } from '../api/caching-indicator-property'
import { QuarterProperty } from '../api/quarter-property'
import { Result } from '../result'
import { Setting } from '../setting'

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
  const isIndicatorProperty = CachingIndicatorProperty.isIndicatorProperty(
    propertyName
  )

  if (!isQuarterProperty && !isIndicatorProperty) {
    throw new Error(`<<指定された項目が見つかりません: ${propertyName}>>`)
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

  try {
    let result: Result
    if (fiscalYear && fiscalQuarter) {
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
