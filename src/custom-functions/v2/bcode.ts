import { HttpError } from '~/api/http-error'
import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { CachingIndicatorProperty } from '~/api/v2/caching-indicator-property'
import { QuarterProperty } from '~/api/v2/quarter-property'
import {
  ApiResponseError,
  OndemandApiNotEnabledError,
  UnsupportedTickerError
} from '~/custom-functions/error'
import { bcodeIndicator } from '~/custom-functions/v2/bcode-indicator'
import { bcodeQuarter } from '~/custom-functions/v2/bcode-quarter'
import { BcodeResult } from '~/custom-functions/v2/bcode-result'
import {
  InvalidLYLQError,
  InvalidYearError,
  InvalidQuarterError
} from '~/fiscal-periods/error'
import { Setting } from '~/setting'

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
// TODO: fiscalYearとfiscalQuarterの型をstringではなく'LY'と'LQ'に変更する
export function bcode(
  ticker: string,
  fiscalYear: string | number,
  fiscalQuarter: string | number,
  propertyName: string,
  isRawValue = false,
  isWithUnits = false
): number | string {
  validate(
    ticker,
    fiscalYear.toString(),
    fiscalQuarter.toString(),
    propertyName
  )

  const setting = Setting.load()
  if (!setting.token) {
    throw new Error('<<APIキーが有効ではありません>>')
  }

  const client = new CachingBuffettCodeApiClientV2(setting.token)

  try {
    let result: BcodeResult
    if (fiscalYear && fiscalQuarter) {
      result = bcodeQuarter(
        client,
        ticker,
        fiscalYear === 'LY' ? fiscalYear : parseInt(fiscalYear.toString(), 10),
        fiscalQuarter === 'LQ'
          ? fiscalQuarter
          : parseInt(fiscalQuarter.toString(), 10),
        propertyName,
        setting.ondemandApiEnabled
      )
    } else {
      result = bcodeIndicator(client, ticker, propertyName)
    }

    return result.format(isRawValue, isWithUnits)
  } catch (e) {
    if (e instanceof ApiResponseError) {
      throw new Error('<<指定されたデータを取得できませんでした>>')
    } else if (e instanceof OndemandApiNotEnabledError) {
      throw new Error('<<従量課金APIが有効になっていません>>')
    } else if (e instanceof UnsupportedTickerError) {
      throw new Error('<<サポートされていないtickerです>>')
    } else if (e instanceof HttpError) {
      const code = e.response.getResponseCode()

      if (e.isInvalidTestingRequest()) {
        throw new Error('<<テスト用のAPIキーでは取得できないデータです>>')
      } else if (e.isInvalidTokenRequest()) {
        throw new Error('<<APIキーが有効ではありません>>')
      } else if (code === 403) {
        throw new Error('<<月間リクエスト制限に達しています>>')
      } else if (code === 429) {
        throw new Error('<<APIの実行回数が上限に達しました>>')
      } else if (Math.floor(code / 100) === 4) {
        throw new Error(`<<無効なリクエストです。${e.name}: ${e.message}>>`)
      } else {
        console.error('システムエラー', e.name, e.message)
        throw new Error(
          `<<システムエラーが発生しました。${e.name}: ${e.message}>>`
        )
      }
    } else if (e instanceof InvalidLYLQError) {
      throw new Error('<<LYとLQは同時に指定する必要があります>>')
    } else if (e instanceof InvalidYearError) {
      throw new Error(`<<無効な決算年度が指定されています: ${fiscalYear}>>`)
    } else if (e instanceof InvalidQuarterError) {
      throw new Error(`<<無効な四半期が指定されています: ${fiscalQuarter}>>`)
    } else {
      console.error('未定義のエラー', e.name, e.message)
      throw new Error(
        `<<未定義のエラーが発生しました。${e.name}: ${e.message}>>`
      )
    }
  }
}
