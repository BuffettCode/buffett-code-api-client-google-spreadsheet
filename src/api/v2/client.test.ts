import { BuffettCodeApiClientV2 } from '~/api/v2/client'
import { HttpError } from '~/api/http-error'
import { YearQuarterParam } from '~/fiscal-periods/year-quarter-param'
import { useMockedUrlFetchApp } from '~/api/test-helper'
import * as company from '~/__mocks__/fixtures/v2/company'
import * as indicator from '~/__mocks__/fixtures/v2/indicator'
import * as quarter from '~/__mocks__/fixtures/v2/quarter'

test('HttpError#isInvalidTestingRequest', () => {
  const res1 = useMockedUrlFetchApp(
    200,
    '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}'
  )()
  const error1 = new HttpError(res1)
  expect(error1.isInvalidTestingRequest()).toBeTruthy()

  const res2 = useMockedUrlFetchApp(403, '{"message": "Forbidden"}')()
  const error2 = new HttpError(res2)
  expect(error2.isInvalidTestingRequest()).toBeFalsy()
})

test('request', () => {
  const mockFetch = useMockedUrlFetchApp(
    200,
    '{"message": "this is a message"}'
  )

  expect(
    BuffettCodeApiClientV2['request']('http://example.com', {
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
  useMockedUrlFetchApp(
    200,
    '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}'
  )

  const request = BuffettCodeApiClientV2['request']
  expect(() => request('http://example.com')).toThrow(HttpError)
})

test('request when 403 error', () => {
  useMockedUrlFetchApp(403, '{"message": "Forbidden"}')

  const request = BuffettCodeApiClientV2['request']
  expect(() => request('http://example.com')).toThrow(HttpError)
})

test('request when 503 error', () => {
  useMockedUrlFetchApp(503, '{"message": "Service Unavailable"}')

  const request = BuffettCodeApiClientV2['request']
  expect(() => request('http://example.com')).toThrow(HttpError)
  try {
    request('http://example.com')
  } catch (e) {
    expect(e.response.getResponseCode()).toBe(503)
    expect(e.response.getContentText()).toBe(
      '{"message": "Service Unavailable"}'
    )
  }
})

test('company', () => {
  const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(company))

  const client = new BuffettCodeApiClientV2('foo')
  const ticker = '2371'
  expect(client.company(ticker)).toEqual(company[ticker][0])
  expect(mockFetch.mock.calls.length).toBe(1)
  expect(mockFetch.mock.calls[0].length).toBe(2)
  expect(mockFetch.mock.calls[0][0]).toBe(
    `https://api.buffett-code.com/api/v2/company?ticker=${ticker}`
  )
  expect(mockFetch.mock.calls[0][1]).toEqual({
    headers: { 'x-api-key': 'foo' },
    muteHttpExceptions: true
  })
})

test('quarter', () => {
  const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(quarter))

  const client = new BuffettCodeApiClientV2('foo')
  const ticker = '2371'
  const period = new YearQuarterParam(2018, 1)
  expect(client.quarter(ticker, period)).toEqual(quarter[ticker][0])
  expect(mockFetch.mock.calls.length).toBe(1)
  expect(mockFetch.mock.calls[0].length).toBe(2)
  expect(mockFetch.mock.calls[0][0]).toBe(
    'https://api.buffett-code.com/api/v2/quarter?ticker=2371&fy=2018&fq=1'
  )
  expect(mockFetch.mock.calls[0][1]).toEqual({
    headers: { 'x-api-key': 'foo' },
    muteHttpExceptions: true
  })
})

test('indicator', () => {
  const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(indicator))

  const client = new BuffettCodeApiClientV2('foo')
  const ticker = '2371'
  expect(client.indicator(ticker)).toEqual(indicator[ticker][0])
  expect(mockFetch.mock.calls.length).toBe(1)
  expect(mockFetch.mock.calls[0].length).toBe(2)
  expect(mockFetch.mock.calls[0][0]).toBe(
    'https://api.buffett-code.com/api/v2/indicator?tickers=2371'
  )
  expect(mockFetch.mock.calls[0][1]).toEqual({
    headers: { 'x-api-key': 'foo' },
    muteHttpExceptions: true
  })
})

test('ondemandQuarter', () => {
  const mockFetch = useMockedUrlFetchApp(200, JSON.stringify(quarter))

  const client = new BuffettCodeApiClientV2('foo')
  const ticker = '2371'
  const period = new YearQuarterParam(2018, 1)
  expect(client.ondemandQuarter(ticker, period)).toEqual(quarter[ticker][0])
  expect(mockFetch.mock.calls.length).toBe(1)
  expect(mockFetch.mock.calls[0].length).toBe(2)
  expect(mockFetch.mock.calls[0][0]).toBe(
    'https://api.buffett-code.com/api/v2/ondemand/quarter?ticker=2371&fy=2018&fq=1'
  )
  expect(mockFetch.mock.calls[0][1]).toEqual({
    headers: { 'x-api-key': 'foo' },
    muteHttpExceptions: true
  })
})
