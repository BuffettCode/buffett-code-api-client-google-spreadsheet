import { BuffettCodeApiClientV2, HttpError } from './client'
import { YearQuarter } from './year-quarter'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

// FIXME: Mockの型がみつからない
/* eslint @typescript-eslint/no-explicit-any: 0 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useMockFetchApp(responseCode: number, contentText: string) {
  const mockGetResponseCode = jest.fn()
  mockGetResponseCode.mockReturnValue(responseCode)

  const mockGetContentText = jest.fn()
  mockGetContentText.mockReturnValue(contentText)

  const mockFetch = jest.fn()
  mockFetch.mockReturnValue({
    getResponseCode: mockGetResponseCode,
    getContentText: mockGetContentText
  })

  global.UrlFetchApp = {
    fetch: mockFetch
  }

  return mockFetch
}

test('HttpError', () => {
  const res = useMockFetchApp(403, '{"message": "Forbidden"}')()
  const error = new HttpError(res)
  expect(error instanceof HttpError).toBeTruthy()
})

test('isQuarterProperty', () => {
  expect(BuffettCodeApiClientV2.isQuarterProperty('company_name')).toBeTruthy()
  expect(BuffettCodeApiClientV2.isQuarterProperty('edinet_title')).toBeTruthy()

  expect(BuffettCodeApiClientV2.isQuarterProperty('stockprice')).toBeFalsy()
  expect(BuffettCodeApiClientV2.isQuarterProperty('accrual')).toBeFalsy()
})

test('isIndicatorProperty', () => {
  expect(BuffettCodeApiClientV2.isIndicatorProperty('company_name')).toBeFalsy()
  expect(BuffettCodeApiClientV2.isIndicatorProperty('edinet_title')).toBeFalsy()

  expect(BuffettCodeApiClientV2.isIndicatorProperty('stockprice')).toBeTruthy()
  expect(BuffettCodeApiClientV2.isIndicatorProperty('accrual')).toBeTruthy()
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

test('request when error', () => {
  const mockGetResponseCode = jest.fn()
  mockGetResponseCode.mockReturnValueOnce(403).mockReturnValue(503)

  const mockGetContentText = jest.fn()
  mockGetContentText
    .mockReturnValueOnce('{"message": "Forbidden"}')
    .mockReturnValue('{"message": "Service Unavailable"}')

  global.UrlFetchApp = {
    fetch: (): object => {
      return {
        getResponseCode: mockGetResponseCode,
        getContentText: mockGetContentText
      }
    }
  }

  const request = BuffettCodeApiClientV2['request']
  expect(() => request('http://example.com')).toThrow(HttpError)
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
  const mockFetch = useMockFetchApp(200, '{"message": "this is a message"}')

  const client = new BuffettCodeApiClientV2('foo')
  const tickers = '6501,6502'
  const from = new YearQuarter(2017, 3)
  const to = new YearQuarter(2019, 1)
  expect(client.quarter(tickers, from, to)).toEqual({
    message: 'this is a message'
  })
  expect(mockFetch.mock.calls.length).toBe(1)
  expect(mockFetch.mock.calls[0].length).toBe(2)
  expect(mockFetch.mock.calls[0][0]).toBe(
    'https://api.buffett-code.com/api/v2/quarter?tickers=6501%2C6502&from=2017Q3&to=2019Q1'
  )
  expect(mockFetch.mock.calls[0][1]).toEqual({
    headers: { 'x-api-key': 'foo' },
    muteHttpExceptions: true
  })
})

test('indicator', () => {
  const mockFetch = useMockFetchApp(200, '{"message": "this is a message"}')

  const client = new BuffettCodeApiClientV2('foo')
  const tickers = '6501,6502'
  expect(client.indicator(tickers)).toEqual({
    message: 'this is a message'
  })
  expect(mockFetch.mock.calls.length).toBe(1)
  expect(mockFetch.mock.calls[0].length).toBe(2)
  expect(mockFetch.mock.calls[0][0]).toBe(
    'https://api.buffett-code.com/api/v2/indicator?tickers=6501%2C6502'
  )
  expect(mockFetch.mock.calls[0][1]).toEqual({
    headers: { 'x-api-key': 'foo' },
    muteHttpExceptions: true
  })
})
