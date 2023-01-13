import { HttpError } from '~/api/http-error'
import { UrlBuilder } from '~/api/url-builder'
import { Company } from '~/entities/v3/company'
import { Daily } from '~/entities/v3/daily'
import { Monthly } from '~/entities/v3/monthly'
import { Quarter } from '~/entities/v3/quarter'
import { DateParam } from '~/fiscal-periods/date-param'
import { DateRange } from '~/fiscal-periods/date-range'
import { YearMonth } from '~/fiscal-periods/year-month'
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

    const error = new HttpError(url, res)
    if (error.is4xxError() || error.is5xxError()) {
      throw error
    }

    const content = res.getContentText()
    const code = res.getResponseCode()
    let json
    try {
      json = JSON.parse(content)
    } catch (e) {
      console.error('JSON parsing error', url, code, content)
      throw new HttpError(url, res)
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

  public company(ticker: string): Company {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/company'
    const builder = new UrlBuilder(endpoint, { ticker: ticker })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return Company.fromResponse(res)
  }

  public quarter(ticker: string, period: YearQuarterParam): Quarter {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/quarter'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      fy: period.year,
      fq: period.quarter
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return Quarter.fromResponse(res)
  }

  public bulkQuarter(ticker: string, range: YearQuarterRange): Quarter[] {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/bulk/quarter'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      from: range.from.toString(),
      to: range.to.toString()
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return Quarter.fromBulkResponse(res)
  }

  public ondemandQuarter(ticker: string, period: YearQuarterParam): Quarter {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/ondemand/quarter'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      fy: period.year,
      fq: period.quarter
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return Quarter.fromResponse(res)
  }

  public daily(ticker: string, date: DateParam): Daily {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/daily'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      date: date.toString()
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return Daily.fromResponse(res)
  }

  public bulkDaily(ticker: string, range: DateRange): Daily[] {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/bulk/daily'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      from: DateParam.from(range.from).toString(),
      to: DateParam.from(range.to).toString()
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return Daily.fromBulkResponse(res)
  }

  public ondemandDaily(ticker: string, date: DateParam): Daily {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/ondemand/daily'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      date: date.toString()
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return Daily.fromResponse(res)
  }

  public monthly(ticker: string, period: YearMonth): Monthly {
    const endpoint = BuffettCodeApiClientV3.baseUrl + '/monthly'
    const builder = new UrlBuilder(endpoint, {
      ticker,
      year: period.year,
      month: period.month
    })
    const url = builder.toString()
    const options = this.defaultOptions()

    const res = BuffettCodeApiClientV3.request(url, options)
    return Monthly.fromResponse(res)
  }
}
