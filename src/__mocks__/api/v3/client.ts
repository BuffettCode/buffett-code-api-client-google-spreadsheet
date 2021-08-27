import { default as company } from '~/__mocks__/fixtures/v3/company.js'
import { default as daily } from '~/__mocks__/fixtures/v3/daily.js'
import { default as quarter } from '~/__mocks__/fixtures/v3/quarter.js'

export class BuffettCodeApiClientV2 {
  public mockCompany = jest.fn()
  public mockDaily = jest.fn()
  public mockQuarter = jest.fn()

  constructor(readonly token: string) {
    this.mockCompany.mockReturnValue(company)
    this.mockDaily.mockReturnValue(daily)
    this.mockQuarter.mockReturnValue(quarter)
  }

  company(ticker): object | null {
    const company = this.mockCompany()[ticker]
    return company ? company[0] : null
  }

  quarter(ticker): object | null {
    const quarter = this.mockQuarter()[ticker]
    return quarter ? quarter[0] : null
  }

  daily(ticker): object | null {
    const daily = this.mockDaily()[ticker]
    return daily ? daily[0] : null
  }

  ondemandQuarter(ticker): object | null {
    const quarter = this.mockQuarter()[ticker]
    return quarter ? quarter[0] : null
  }
}
