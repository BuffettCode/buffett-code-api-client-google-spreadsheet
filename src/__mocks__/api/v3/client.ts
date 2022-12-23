import { HTTPResnpose } from '~/__mocks__/api/v3/http-response'
import { default as company } from '~/__mocks__/fixtures/v3/company.js'
import { default as daily } from '~/__mocks__/fixtures/v3/daily.js'
import { default as monthly } from '~/__mocks__/fixtures/v3/monthly.js'
import { default as quarter } from '~/__mocks__/fixtures/v3/quarter.js'
import { HttpError } from '~/api/http-error'
import { Company } from '~/entities/v3/company'
import { Daily } from '~/entities/v3/daily'
import { Monthly } from '~/entities/v3/monthly'
import { Quarter } from '~/entities/v3/quarter'

export class BuffettCodeApiClientV3 {
  public mockCompany = jest.fn()
  public mockDaily = jest.fn()
  public mockMonthly = jest.fn()
  public mockQuarter = jest.fn()

  constructor(readonly token: string) {
    this.mockCompany.mockReturnValue(company)
    this.mockDaily.mockReturnValue(daily)
    this.mockMonthly.mockReturnValue(monthly)
    this.mockQuarter.mockReturnValue(quarter)
  }

  company(ticker: string): Company {
    if (ticker !== '2371') {
      const res = new HTTPResnpose()
      throw new HttpError('/v3/company', res)
    }

    return Company.fromResponse(this.mockCompany())
  }

  quarter(ticker: string): Quarter {
    if (ticker !== '2371') {
      const res = new HTTPResnpose()
      throw new HttpError('/v3/company', res)
    }

    return Quarter.fromResponse(this.mockQuarter())
  }

  daily(ticker: string): Daily {
    if (ticker !== '2371') {
      const res = new HTTPResnpose()
      throw new HttpError('/v3/company', res)
    }

    return Daily.fromResponse(this.mockDaily())
  }

  ondemandDaily(ticker: string): Daily {
    if (ticker !== '2371') {
      const res = new HTTPResnpose()
      throw new HttpError('/v3/company', res)
    }

    return Daily.fromResponse(this.mockDaily())
  }

  ondemandQuarter(ticker: string): Quarter {
    if (ticker !== '2371') {
      const res = new HTTPResnpose()
      throw new HttpError('/v3/company', res)
    }

    return Quarter.fromResponse(this.mockQuarter())
  }

  monthly(ticker: string): Monthly {
    if (ticker !== '2371') {
      const res = new HTTPResnpose()
      throw new HttpError('/v3/company', res)
    }

    return Monthly.fromResponse(this.mockMonthly())
  }
}
