import { HttpError } from '~/api/http-error'
import { useMockedUrlFetchApp } from '~/api/test-helper'

describe('HttpError', () => {
  test('#isInvalidTestingRequest', () => {
    const res = useMockedUrlFetchApp(400, '{"message":"Testing apikey is not allowed"}')()
    const error = new HttpError('https://example.com', res)
    expect(error.isInvalidTestingRequest()).toBeTruthy()
  })

  test('#isInvalidTokenRequest (true)', () => {
    const res = useMockedUrlFetchApp(403, '{"message":"Forbidden"}')()
    const error = new HttpError('https://example.com', res)
    expect(error.isInvalidTokenRequest()).toBeTruthy()
  })

  test('#isInvalidTokenRequest (false)', () => {
    const res = useMockedUrlFetchApp(403, '{"message":"Some message"}')()
    const error = new HttpError('https://example.com', res)
    expect(error.isInvalidTokenRequest()).toBeFalsy()
  })

  test('#isMonthlyLimitExceeded (true)', () => {
    const res = useMockedUrlFetchApp(403, '{"message":"Some message"}')()
    const error = new HttpError('https://example.com', res)
    expect(error.isMonthlyLimitExceeded()).toBeTruthy()
  })

  test('#isMonthlyLimitExceeded (false)', () => {
    const res = useMockedUrlFetchApp(403, '{"message":"Forbidden"}')()
    const error = new HttpError('https://example.com', res)
    expect(error.isMonthlyLimitExceeded()).toBeFalsy()
  })

  test('#isApiQuotaExceeded', () => {
    const res = useMockedUrlFetchApp(404, '{"message":"Not found"}')()
    const error = new HttpError('https://example.com', res)
    expect(error.isResourceNotFound()).toBeTruthy()
  })

  test('#isApiQuotaExceeded', () => {
    const res = useMockedUrlFetchApp(429, '{"message":"Rate Limitted"}')()
    const error = new HttpError('https://example.com', res)
    expect(error.isApiQuotaExceeded()).toBeTruthy()
  })

  test('#is4xxError', () => {
    const res = useMockedUrlFetchApp(403, '{"message":"Forbidden"}')()
    const error = new HttpError('https://example.com', res)
    expect(error.is4xxError()).toBeTruthy()
  })

  test('#is5xxError', () => {
    const res = useMockedUrlFetchApp(500, '{"message":"Internal server error"}')()
    const error = new HttpError('https://example.com', res)
    expect(error.is5xxError()).toBeTruthy()
  })
})
