import { default as indicator } from './fixtures/indicator.js'
import { default as quarter } from './fixtures/quarter.js'

export class BuffettCodeApiClientV2 {
  public mockIndicator = jest.fn()
  public mockQuarter = jest.fn()

  constructor(readonly token: string) {
    // return once for cache testing
    this.mockIndicator.mockReturnValueOnce(indicator)
    this.mockQuarter.mockReturnValueOnce(quarter)
  }

  quarter = this.mockQuarter
  indicator = this.mockIndicator
}
