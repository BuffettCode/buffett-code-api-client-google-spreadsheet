import { HttpError } from '~/api/http-error'
import { CachingBuffettCodeApiClientV3 } from '~/api/v3/caching-client'
import {
  ApiResponseError,
  OndemandApiNotEnabledError,
  UnsupportedTickerError
} from '~/custom-functions/error'
import { bcodeDaily } from '~/custom-functions/v3/bcode-daily'
import { bcodeQuarter } from '~/custom-functions/v3/bcode-quarter'
import { BcodeResult } from '~/custom-functions/v3/bcode-result'
import { DateParam } from '~/fiscal-periods/date-param'
import {
  InvalidLYLQError,
  InvalidYearError,
  InvalidQuarterError
} from '~/fiscal-periods/error'
import { PeriodParser } from '~/fiscal-periods/period-parser'
import { Setting } from '~/setting'

function handleError(e): void {
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
    throw new Error('<<無効なLY・LQが指定されています>>')
  } else if (e instanceof InvalidYearError) {
    throw new Error(`<<無効な決算年度が指定されています>>`)
  } else if (e instanceof InvalidQuarterError) {
    throw new Error(`<<無効な四半期が指定されています>>`)
  } else {
    console.error('未定義のエラー', e.name, e.message)
    throw new Error(`<<未定義のエラーが発生しました。${e.name}: ${e.message}>>`)
  }
}

export function bcode(
  ticker: string,
  period: string | Date,
  propertyName: string,
  isRawValue = false,
  isWithUnits = false
): number | string {
  if (!ticker) {
    throw new Error('<<tickerが有効ではありません>>')
  }

  if (!period) {
    throw new Error('<<periodが有効ではありません>>')
  }

  if (!propertyName) {
    throw new Error('<<propertyNameが有効ではありません>>')
  }

  if (period instanceof Date) {
    period = period.toISOString().substring(0, 10)
  }

  const setting = Setting.load()
  if (!setting.token) {
    throw new Error('<<APIキーが有効ではありません>>')
  }

  try {
    const client = new CachingBuffettCodeApiClientV3(setting.token)
    const parsedPeriod = PeriodParser.parse(period)
    let result: BcodeResult
    if (parsedPeriod instanceof DateParam) {
      result = bcodeDaily(
        client,
        ticker,
        parsedPeriod,
        propertyName,
        setting.ondemandApiEnabled
      )
    } else {
      result = bcodeQuarter(
        client,
        ticker,
        parsedPeriod,
        propertyName,
        setting.ondemandApiEnabled
      )
    }

    return result.format(isRawValue, isWithUnits)
  } catch (e) {
    handleError(e)
  }
}
