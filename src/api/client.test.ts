import { BuffettCodeApiClientV2 } from './client'
import { HttpError } from './http-error'
import { YearQuarter } from '../year-quarter'
import { useMockFetchApp } from './test-helper'
import * as indicator from '../__mocks__/fixtures/indicator'
import * as quarter from '../__mocks__/fixtures/quarter'

test('HttpError#isInvalidTestingRequest', () => {
  const res1 = useMockFetchApp(
    200,
    '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}'
  )()
  const error1 = new HttpError(res1)
  expect(error1.isInvalidTestingRequest()).toBeTruthy()

  const res2 = useMockFetchApp(403, '{"message": "Forbidden"}')()
  const error2 = new HttpError(res2)
  expect(error2.isInvalidTestingRequest()).toBeFalsy()
})

test('request', () => {
  const mockFetch = useMockFetchApp(200, '{"message": "this is a message"}')

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
  useMockFetchApp(
    200,
    '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}'
  )

  const request = BuffettCodeApiClientV2['request']
  expect(() => request('http://example.com')).toThrow(HttpError)
})

test('request when 403 error', () => {
  useMockFetchApp(403, '{"message": "Forbidden"}')

  const request = BuffettCodeApiClientV2['request']
  expect(() => request('http://example.com')).toThrow(HttpError)
})

test('request when 503 error', () => {
  useMockFetchApp(503, '{"message": "Service Unavailable"}')

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

test('quarter', () => {
  const mockFetch = useMockFetchApp(200, JSON.stringify(quarter))

  const client = new BuffettCodeApiClientV2('foo')
  const ticker = '2371'
  const from = new YearQuarter(2017, 3)
  const to = new YearQuarter(2019, 1)
  expect(client.quarter(ticker, from, to)).toEqual(quarter[ticker])
  expect(mockFetch.mock.calls.length).toBe(1)
  expect(mockFetch.mock.calls[0].length).toBe(2)
  expect(mockFetch.mock.calls[0][0]).toBe(
    'https://api.buffett-code.com/api/v2/quarter?tickers=2371&from=2017Q3&to=2019Q1'
  )
  expect(mockFetch.mock.calls[0][1]).toEqual({
    headers: { 'x-api-key': 'foo' },
    muteHttpExceptions: true
  })
})

test('indicator', () => {
  const mockFetch = useMockFetchApp(200, JSON.stringify(indicator))

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
