import { HttpError } from '~/api/http-error'
import { ApiResponseError, OndemandApiNotEnabledError, UnsupportedTickerError } from '~/custom-functions/error'
import { InvalidLYLQError, InvalidYearError, InvalidQuarterError } from '~/fiscal-periods/error'

export class ErrorHandler {
  static handle(e: Error): void {
    if (e instanceof ApiResponseError) {
      throw new Error('<<指定されたデータを取得できませんでした>>')
    } else if (e instanceof OndemandApiNotEnabledError) {
      throw new Error('<<従量課金APIが有効になっていません>>')
    } else if (e instanceof UnsupportedTickerError) {
      throw new Error('<<サポートされていないtickerです>>')
    } else if (e instanceof HttpError) {
      ErrorHandler.handleHttpError(e)
    } else if (e instanceof InvalidLYLQError) {
      throw new Error('<<無効なLY・LQが指定されています>>')
    } else if (e instanceof InvalidYearError) {
      throw new Error(`<<無効な決算年度が指定されています>>`)
    } else if (e instanceof InvalidQuarterError) {
      throw new Error(`<<無効な四半期が指定されています>>`)
    } else {
      console.error('未定義のエラー', e.name, e.message)
      throw new Error(
        `<<未定義のエラーが発生しました (${e.name}: ${e.message})。改善しない場合はGoogleアカウントのログアウトおよび再ログインをお試しください>>`
      )
    }
  }

  static handleHttpError(e: HttpError): void {
    if (e.isInvalidTestingRequest()) {
      throw new Error('<<テスト用のAPIキーでは取得できないデータです>>')
    } else if (e.isInvalidTokenRequest()) {
      throw new Error('<<APIキーが有効ではありません>>')
    } else if (e.isMonthlyLimitExceeded()) {
      throw new Error('<<月間リクエスト制限に達しています>>')
    } else if (e.isResourceNotFound()) {
      throw new Error('<<データが見つかりません。tickerや期間に間違いがないかご確認ください>>')
    } else if (e.isApiQuotaExceeded()) {
      throw new Error('<<APIの実行回数が上限に達しました>>')
    } else if (e.isBadRequest()) {
      throw new Error(`<<無効なリクエストです (${e.name}: ${e.message})>>`)
    } else {
      console.error('システムエラー', e.name, e.message)
      throw new Error(`<<システムエラーが発生しました (${e.name}: ${e.message})>>`)
    }
  }
}
