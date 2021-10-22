import { HttpError } from '~/api/http-error'
import { UrlBuilder } from '~/api/url-builder'
import { DateParam } from '~/fiscal-periods/date-param'
import { DateRange } from '~/fiscal-periods/date-range'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import { YearQuarterRange } from '~/fiscal-periods/year-quarter-range'

export class BuffettCodeApiClientV3 {
  static readonly baseUrl = 'https://api.buffett-code.com/api/v3'

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

  public company(ticker: string): object {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/company'
    const builder = new UrlBuilder(endpoint, { ticker: ticker })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return res[ticker]
  }

  public quarter(ticker: string, period: YearQuarterParam): object {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/quarter'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      fy: period.year,
      fq: period.quarter
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return res['data']
  }

  public bulkQuarter(ticker: string, range: YearQuarterRange): object[] {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/bulk/quarter'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      from: range.from.toString(),
      to: range.to.toString()
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return res['data']
  }

  public ondemandQuarter(ticker: string, period: YearQuarterParam): object {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/ondemand/quarter'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      fy: period.year,
      fq: period.quarter
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return res['data']
  }

  public daily(ticker: string, date: DateParam): object {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/daily'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      date: date.toString()
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return res['data']
  }

  public bulkDaily(ticker: string, range: DateRange): object[] {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/bulk/daily'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      from: new DateParam(range.from).toString(),
      to: new DateParam(range.to).toString()
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return res['data']
  }

  public ondemandDaily(ticker: string, date: DateParam): object {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/ondemand/daily'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      date: date.toString()
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return res['data']
  }
}
