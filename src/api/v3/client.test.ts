import * as company from '~/__mocks__/fixtures/v3/company'
import * as daily from '~/__mocks__/fixtures/v3/daily'
import * as monthly from '~/__mocks__/fixtures/v3/monthly'
import * as quarter from '~/__mocks__/fixtures/v3/quarter'
import { HttpError } from '~/api/http-error'
import { useMockedUrlFetchApp } from '~/api/test-helper'
import { BuffettCodeApiClientV3 } from '~/api/v3/client'
import { Company } from '~/entities/v3/company'
import { Daily } from '~/entities/v3/daily'
import { Monthly } from '~/entities/v3/monthly'
import { Quarter } from '~/entities/v3/quarter'
import { DateParam } from '~/fiscal-periods/date-param'
import { DateRange } from '~/fiscal-periods/date-range'
import { LqWithOffset } from '~/fiscal-periods/lq-with-offset'
import { LyWithOffset } from '~/fiscal-periods/ly-with-offset'
import { YearMonth } from '~/fiscal-periods/year-month'
import { YearQuarter } from '~/fiscal-periods/year-quarter'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import { YearQuarterRange } from '~/fiscal-periods/year-quarter-range'

describe('BuffettCodeApiClientV3', () => {
  test('request', () => {
    const mockFetch = useMockedUrlFetchApp(200, '{"message": "this is a message"}')

    expect(
      BuffettCodeApiClientV3['request']('http://example.com', {
        headers: { 'x-api-key': 'foo' }
      })
    ).toEqual({
      message: 'this is a message'
    })
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe('http://example.com')
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })

  test('request when testing apikey error', () => {
    useMockedUrlFetchApp(400, '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}')

    const request = BuffettCodeApiClientV3['request']
    expect(() => request('http://example.com')).toThrow(HttpError)
  })

  test('request when 403 error', () => {
    useMockedUrlFetchApp(403, '{"message": "Forbidden"}')

    const request = BuffettCodeApiClientV3['request']
    expect(() => request('http://example.com')).toThrow(HttpError)
  })

  test('request when 503 error', () => {
    useMockedUrlFetchApp(503, '{"message": "Service Unavailable"}')

    const request = BuffettCodeApiClientV3['request']
    expect(() => request('http://example.com')).toThrow(HttpError)
    try {
      request('http://example.com')
    } catch (e) {
      expect(e.response.getResponseCode()).toBe(503)
      expect(e.response.getContentText()).toBe('{"message": "Service Unavailable"}')
    }
  })

  test('company', () => {
    const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(company))

    const client = new BuffettCodeApiClientV3('foo')
    const ticker = '2371'
    expect(client.company(ticker)).toEqual(Company.fromResponse(company))
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe(`https://api.buffett-code.com/api/v3/company?ticker=${ticker}`)
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })

  test('quarter (FY/FQ)', () => {
    const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(quarter))

    const client = new BuffettCodeApiClientV3('foo')
    const ticker = '2371'
    const period = new YearQuarterParam(2018, 1)
    expect(client.quarter(ticker, period)).toEqual(Quarter.fromResponse(quarter))
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe('https://api.buffett-code.com/api/v3/quarter?ticker=2371&fy=2018&fq=1')
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })

  test('quarter (LY/LQ)', () => {
    const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(quarter))

    const LY = new LyWithOffset()
    const LQ = new LqWithOffset()
    const client = new BuffettCodeApiClientV3('foo')
    const ticker = '2371'
    const period = new YearQuarterParam(LY, LQ)
    expect(client.quarter(ticker, period)).toEqual(Quarter.fromResponse(quarter))
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe('https://api.buffett-code.com/api/v3/quarter?ticker=2371&fy=LY&fq=LQ')
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })

  test('bulkQuarter', () => {
    const bulkQuarter = {
      data: {
        '2020-09-06': quarter['data']
      },
      column_description: quarter['column_description'] // eslint-disable-line @typescript-eslint/camelcase
    }
    const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(bulkQuarter))

    const client = new BuffettCodeApiClientV3('foo')
    const ticker = '2371'
    const range = new YearQuarterRange(new YearQuarter(2018, 1), new YearQuarter(2018, 4))
    expect(client.bulkQuarter(ticker, range)).toEqual(Quarter.fromBulkResponse(bulkQuarter))
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.buffett-code.com/api/v3/bulk/quarter?ticker=2371&from=2018Q1&to=2018Q4'
    )
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })

  test('ondemandQuarter', () => {
    const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(quarter))

    const client = new BuffettCodeApiClientV3('foo')
    const ticker = '2371'
    const period = new YearQuarterParam(2018, 1)
    expect(client.ondemandQuarter(ticker, period)).toEqual(Quarter.fromResponse(quarter))
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.buffett-code.com/api/v3/ondemand/quarter?ticker=2371&fy=2018&fq=1'
    )
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })

  test('daily', () => {
    const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(daily))

    const client = new BuffettCodeApiClientV3('foo')
    const ticker = '2371'
    const date = DateParam.from(new Date('2021-08-11'))
    expect(client.daily(ticker, date)).toEqual(Daily.fromResponse(daily))
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe('https://api.buffett-code.com/api/v3/daily?ticker=2371&date=2021-08-11')
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })

  test('bulkDaily', () => {
    const bulkDaily = {
      data: {
        '2020-09-06': daily['data']
      },
      column_description: daily['column_description'] // eslint-disable-line @typescript-eslint/camelcase
    }
    const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(bulkDaily))

    const client = new BuffettCodeApiClientV3('foo')
    const ticker = '2371'
    const range = new DateRange(new Date('2021-08-11'), new Date('2021-08-17'))
    expect(client.bulkDaily(ticker, range)).toEqual(Daily.fromBulkResponse(bulkDaily))
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.buffett-code.com/api/v3/bulk/daily?ticker=2371&from=2021-08-11&to=2021-08-17'
    )
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })

  test('ondemandDaily', () => {
    const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(daily))

    const client = new BuffettCodeApiClientV3('foo')
    const ticker = '2371'
    const date = DateParam.from(new Date('2021-08-11'))
    expect(client.ondemandDaily(ticker, date)).toEqual(Daily.fromResponse(daily))
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe(
      'https://api.buffett-code.com/api/v3/ondemand/daily?ticker=2371&date=2021-08-11'
    )
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })

  test('monthly', () => {
    const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(monthly))

    const client = new BuffettCodeApiClientV3('foo')
    const ticker = '2371'
    const period = new YearMonth(2018, 1)
    expect(client.monthly(ticker, period)).toEqual(Monthly.fromResponse(monthly))
    expect(mockFetch.mock.calls.length).toBe(1)
    expect(mockFetch.mock.calls[0].length).toBe(2)
    expect(mockFetch.mock.calls[0][0]).toBe('https://api.buffett-code.com/api/v3/monthly?ticker=2371&year=2018&month=1')
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: { 'x-api-key': 'foo' },
      muteHttpExceptions: true
    })
  })
})
