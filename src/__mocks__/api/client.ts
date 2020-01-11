import { default as indicator } from '../fixtures/indicator.js'
import { default as quarter } from '../fixtures/quarter.js'

export class BuffettCodeApiClientV2 {
  public mockIndicator = jest.fn()
  public mockQuarter = jest.fn()

  constructor(readonly token: string) {
    this.mockIndicator.mockReturnValue(indicator)
    this.mockQuarter.mockReturnValue(quarter)
  }

  quarter(ticker): object[] | null {
    return this.mockQuarter()[ticker] || null
  }

  indicator(): object | null {
    return this.mockIndicator()
  }
}
