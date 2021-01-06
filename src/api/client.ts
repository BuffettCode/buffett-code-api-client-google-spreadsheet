import { YearQuarterParam } from '../fiscal-periods/year-quarter-param'
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
    const error = new HttpError(res)
    if (
      Math.floor(code / 100) === 4 ||
      Math.floor(code / 100) === 5 ||
      error.isInvalidTestingRequest()
    ) {
      throw error
    }

    let json
    try {
      json = JSON.parse(content)
    } catch (e) {
      console.error('JSON parsing error', code, content)
      throw new HttpError(res)
    }

    return json
  }

  private defaultOptions(): object {
    return {
      headers: {
        'x-api-key': this._token
      }
    }
  }

  public company(ticker: string): object | null {
    const endpoint = BuffettCodeApiClientV2.baseUrl + '/company'
    const builder = new UrlBuilder(endpoint, { ticker: ticker })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV2.request(url, options)
    if (!res[ticker] || !res[ticker].length) {
      return null
    }

    return res[ticker][0]
  }

  public quarter(ticker: string, period: YearQuarterParam): object | null {
    const endpoint = BuffettCodeApiClientV2.baseUrl + '/quarter'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      fy: period.year,
      fq: period.quarter
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV2.request(url, options)
    if (!res[ticker] || !res[ticker].length) {
      return null
    }

    return res[ticker][0]
  }

  // NOTE: 本来はticker単体ではなくtickersを扱うべき
  public indicator(ticker: string): object | null {
    const endpoint = BuffettCodeApiClientV2.baseUrl + '/indicator'
    const builder = new UrlBuilder(endpoint, { tickers: ticker })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV2.request(url, options)
    if (!res[ticker] || !res[ticker].length) {
      return null
    }

    return res[ticker][0] // NOTE: indicatorは常に1つ
  }

  public ondemandQuarter(
    ticker: string,
    period: YearQuarterParam
  ): object | null {
    const endpoint = BuffettCodeApiClientV2.baseUrl + '/ondemand/quarter'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      fy: period.year,
      fq: period.quarter
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV2.request(url, options)
    if (!res[ticker] || !res[ticker].length) {
      return null
    }

    return res[ticker][0] // NOTE: ondemend/quarterは常に1レコード
  }
}
