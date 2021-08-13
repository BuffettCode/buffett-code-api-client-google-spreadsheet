import { default as company } from '~/__mocks__/fixtures/v2/company.js'
import { default as indicator } from '~/__mocks__/fixtures/v2/indicator.js'
import { default as quarter } from '~/__mocks__/fixtures/v2/quarter.js'

export class BuffettCodeApiClientV2 {
  public mockCompany = jest.fn()
  public mockIndicator = jest.fn()
  public mockQuarter = jest.fn()

  constructor(readonly token: string) {
    this.mockCompany.mockReturnValue(company)
    this.mockIndicator.mockReturnValue(indicator)
    this.mockQuarter.mockReturnValue(quarter)
  }

  company(ticker): object | null {
    const company = this.mockCompany()[ticker]
    return company ? company[0] : null
  }

  quarter(ticker): object | null {
    const quarter = this.mockQuarter()[ticker] || null
    return quarter ? quarter[0] : null
  }

  indicator(ticker): object | null {
    const indicator = this.mockIndicator()[ticker]
    return indicator ? indicator[0] : null
  }

  ondemandQuarter(ticker): object | null {
    const quarter = this.mockQuarter()[ticker] || null
    return quarter ? quarter[0] : null
  }
}
