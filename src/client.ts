import { YearQuarter } from './year-quarter'
import { UrlBuilder } from './url-builder'
import v2quarter from './data/v2-quarter.js'
import v2indicator from './data/v2-indicator.js'

export class HttpError implements Error {
  public name = 'HttpError'
  public message: string

  // eslint-disable-next-line @typescript-eslint/camelcase
  constructor(public response: GoogleAppsScript.URL_Fetch.HTTPResponse) {
    this.message = `${response.getResponseCode()}: ${response.getContentText()}`
  }

  public isInvalidTestingRequest(): boolean {
    const content = this.response.getContentText()
    return (
      content ===
      '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}'
    )
  }

  public toString(): string {
    return this.message
  }
}

export class BuffettCodeApiClientV2 {
  static readonly baseUrl = 'https://api.buffett-code.com/api/v2'

  static readonly quarterPropertyNames = Object.keys(v2quarter)
  static readonly indicatorPropertyNames = Object.keys(v2indicator)

  constructor(private _token: string) {}

  static isQuarterProperty(name: string): boolean {
    return BuffettCodeApiClientV2.quarterPropertyNames.indexOf(name) >= 0
  }

  static isIndicatorProperty(name: string): boolean {
    return BuffettCodeApiClientV2.indicatorPropertyNames.indexOf(name) >= 0
  }

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
