import { YearQuarter } from '../year-quarter'
import { UrlBuilder } from './url-builder'
import { HttpError } from './http-error'

export class BuffettCodeApiClientV2 {
  static readonly baseUrl = 'https://api.buffett-code.com/api/v2'

  constructor(private _token: string) {}

  private static request(url: string, options = {}): object {
    const defaultOptions = {
      muteHttpExceptions: true
    }
    const fullOptions = { ...defaultOptions, ...options }
    const res = UrlFetchApp.fetch(url, fullOptions)

    const code = res.getResponseCode()
    const content = res.getContentText()
    if (Math.floor(code / 100) === 4 || Math.floor(code / 100) === 5) {
      throw new HttpError(res)
    } else if (
      content ===
      '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}'
    ) {
      throw new HttpError(res)
    }

    return JSON.parse(content)
  }

  public quarter(tickers: string, from: YearQuarter, to: YearQuarter): object {
    const endpoint = BuffettCodeApiClientV2.baseUrl + '/quarter'
    const builder = new UrlBuilder(endpoint, { tickers, from, to })
    const url = builder.toString()
    const options = {
      headers: {
        'x-api-key': this._token
      }
    }
    return BuffettCodeApiClientV2.request(url, options)
  }

  public indicator(tickers: string): object {
    const endpoint = BuffettCodeApiClientV2.baseUrl + '/indicator'
    const builder = new UrlBuilder(endpoint, { tickers })
    const url = builder.toString()
    const options = {
      headers: {
        'x-api-key': this._token
      }
    }
    return BuffettCodeApiClientV2.request(url, options)
  }
}