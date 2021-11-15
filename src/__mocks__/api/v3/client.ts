import { default as company } from '~/__mocks__/fixtures/v3/company.js'
import { default as daily } from '~/__mocks__/fixtures/v3/daily.js'
import { default as quarter } from '~/__mocks__/fixtures/v3/quarter.js'
import { Daily } from '~/entities/v3/daily'

export class BuffettCodeApiClientV3 {
  public mockCompany = jest.fn()
  public mockDaily = jest.fn()
  public mockQuarter = jest.fn()

  constructor(readonly token: string) {
    this.mockCompany.mockReturnValue(company)
    this.mockDaily.mockReturnValue(daily)
    this.mockQuarter.mockReturnValue(quarter)
  }

  company(): object {
    return this.mockCompany()['data']
  }

  quarter(): object | null {
    const quarter = this.mockQuarter()['data']
    return quarter ? quarter : null
  }

  daily(): Daily {
    return Daily.fromResponse(this.mockDaily())
  }

  ondemandDaily(): Daily {
    return Daily.fromResponse(this.mockDaily())
  }

  ondemandQuarter(): object | null {
    const quarter = this.mockQuarter()['data']
    return quarter ? quarter : null
  }
}
