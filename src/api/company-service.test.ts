import { CompanyService } from '~/api/company-service'
import { CachingBuffettCodeApiClientV2 } from '~/api/v2/caching-client'
import { CachingBuffettCodeApiClientV3 } from '~/api/v3/caching-client'
import { DateParam } from '~/fiscal-periods/date-param'
import { LqWithOffset } from '~/fiscal-periods/lq-with-offset'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'

const LY = new LyWithOffset()
const LQ = new LqWithOffset()

jest.mock('~/api/v2/client', () =>
  jest.requireActual('~/__mocks__/api/v2/client')
)
jest.mock('~/api/v3/client', () =>
  jest.requireActual('~/__mocks__/api/v3/client')
)
jest.mock('~/services/company-cache', () =>
  jest.requireActual('~/__mocks__/services/company-cache')
)

test('isSupportedTicker', () => {
  const client = new CachingBuffettCodeApiClientV2('token')
  expect(new CompanyService('2371', client).isSupportedTicker()).toBe(true)
  expect(new CompanyService('9999', client).isSupportedTicker()).toBe(false)
})

test('convertYearQuarterParamToYearQuarter', () => {
  const client = new CachingBuffettCodeApiClientV2('token')
  const service = new CompanyService('2371', client)
  expect(
    service.convertYearQuarterParamToYearQuarter(new YearQuarterParam(LY, 3))
  ).toEqual(new YearQuarter(2021, 3))
  expect(
    service.convertYearQuarterParamToYearQuarter(new YearQuarterParam(2016, LQ))
  ).toEqual(new YearQuarter(2016, 2))
  expect(
    service.convertYearQuarterParamToYearQuarter(new YearQuarterParam(LY, LQ))
  ).toEqual(new YearQuarter(2021, 2))
  expect(
    service.convertYearQuarterParamToYearQuarter(
      new YearQuarterParam(new LyWithOffset(-5), LQ)
    )
  ).toEqual(new YearQuarter(2016, 2))
  expect(
    service.convertYearQuarterParamToYearQuarter(
      new YearQuarterParam(LY, new LqWithOffset(-1))
    )
  ).toEqual(new YearQuarter(2021, 1))
  expect(
    service.convertYearQuarterParamToYearQuarter(
      new YearQuarterParam(LY, new LqWithOffset(-2))
    )
  ).toEqual(new YearQuarter(2020, 4))
  expect(
    service.convertYearQuarterParamToYearQuarter(
      new YearQuarterParam(LY, new LqWithOffset(-3))
    )
  ).toEqual(new YearQuarter(2020, 3))
  expect(
    service.convertYearQuarterParamToYearQuarter(
      new YearQuarterParam(LY, new LqWithOffset(-4))
    )
  ).toEqual(new YearQuarter(2020, 2))
  expect(
    service.convertYearQuarterParamToYearQuarter(
      new YearQuarterParam(LY, new LqWithOffset(-5))
    )
  ).toEqual(new YearQuarter(2020, 1))
  expect(
    service.convertYearQuarterParamToYearQuarter(
      new YearQuarterParam(new LyWithOffset(-5), new LqWithOffset(-5))
    )
  ).toEqual(new YearQuarter(2015, 1))
})

test('isOndemandQuarterApiPeriod', () => {
  const client = new CachingBuffettCodeApiClientV2('token')
  const service = new CompanyService('2371', client)

  expect(service.isOndemandQuarterApiPeriod(new YearQuarter(2001, 4))).toBe(
    true
  )
  expect(service.isOndemandQuarterApiPeriod(new YearQuarter(2016, 2))).toBe(
    true
  )
  expect(service.isOndemandQuarterApiPeriod(new YearQuarter(2016, 3))).toBe(
    false
  )
  expect(service.isOndemandQuarterApiPeriod(new YearQuarterParam(LY, 3))).toBe(
    false
  )
  expect(
    service.isOndemandQuarterApiPeriod(new YearQuarterParam(2016, LQ))
  ).toBe(true)
  expect(service.isOndemandQuarterApiPeriod(new YearQuarterParam(LY, LQ))).toBe(
    false
  )
  expect(
    service.isOndemandQuarterApiPeriod(
      new YearQuarterParam(new LyWithOffset(-4), new LqWithOffset(-3))
    )
  ).toBe(false)
  expect(
    service.isOndemandQuarterApiPeriod(
      new YearQuarterParam(new LyWithOffset(-4), new LqWithOffset(-4))
    )
  ).toBe(true)
  expect(
    service.isOndemandQuarterApiPeriod(
      new YearQuarterParam(new LyWithOffset(-5), LQ)
    )
  ).toBe(true)
})

test('isOndemandDailyApiPeriod', () => {
  const client = new CachingBuffettCodeApiClientV3('token')
  const service = new CompanyService('2371', client)

  expect(
    service.isOndemandDailyApiPeriod(new DateParam(new Date('2003-10-10')))
  ).toBe(true)
  expect(
    service.isOndemandDailyApiPeriod(new DateParam(new Date('2016-11-12')))
  ).toBe(true)
  expect(
    service.isOndemandDailyApiPeriod(new DateParam(new Date('2016-11-13')))
  ).toBe(false)
  expect(service.isOndemandDailyApiPeriod(new DateParam(new Date()))).toBe(
    false
  )
  expect(service.isOndemandDailyApiPeriod(new DateParam('latest'))).toBe(false)
})
