import { default as company } from '~/__mocks__/fixtures/v3/company.js'
import { default as daily } from '~/__mocks__/fixtures/v3/daily.js'
import { default as quarter } from '~/__mocks__/fixtures/v3/quarter.js'

export class BuffettCodeApiClientV3 {
  public mockCompany = jest.fn()
  public mockDaily = jest.fn()
  public mockQuarter = jest.fn()

  constructor(readonly token: string) {
    this.mockCompany.mockReturnValue(company)
    this.mockDaily.mockReturnValue(daily)
    this.mockQuarter.mockReturnValue(quarter)
  }

  company(): object | null {
    const company = this.mockCompany()['data']
    return company ? company : null
  }

  quarter(): object | null {
    const quarter = this.mockQuarter()['data']
    return quarter ? quarter : null
  }

  daily(): object | null {
    const daily = this.mockDaily()['data']
    return daily ? daily : null
  }

  ondemandDaily(): object | null {
    const daily = this.mockDaily()['data']
    return daily ? daily : null
  }

  ondemandQuarter(): object | null {
    const quarter = this.mockQuarter()['data']
    return quarter ? quarter : null
  }
}
