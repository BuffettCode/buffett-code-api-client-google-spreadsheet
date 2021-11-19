import { CachingBuffettCodeApiClientV3 } from '~/api/v3/caching-client'
import { bcodeDaily } from '~/custom-functions/v3/bcode-daily'
import { BcodeResult } from '~/custom-functions/v3/bcode-result'
import { DateParam } from '~/fiscal-periods/date-param'
import { DailyCache } from '~/services/daily-cache'

jest.mock('~/api/v3/client', () =>
  jest.requireActual('~/__mocks__/api/v3/client')
)
jest.mock('~/services/company-cache', () =>
  jest.requireActual('~/__mocks__/services/company-cache')
)
jest.mock('~/services/daily-cache', () =>
  jest.requireActual('~/__mocks__/services/daily-cache')
)

test('bcodeDaily', () => {
  const ticker = '2371'
  const date = new DateParam(new Date('2020-09-06'))
  const propertyName = 'market_capital'

  expect(DailyCache.get(ticker, date)).toBeNull()

  const client = new CachingBuffettCodeApiClientV3('token')
  const result = bcodeDaily(client, ticker, date, propertyName, false)

  expect(result).toEqual(new BcodeResult(propertyName, 550294097166, '円'))
  expect(DailyCache.get(ticker, date)).not.toBeNull()
})
