import { ApiResponseError, OndemandApiNotEnabledError } from './error'

test('ApiResponseError', () => {
  const error = new ApiResponseError()
  expect(error instanceof ApiResponseError).toBeTruthy()
})

test('OndemandApiNotEnabledError', () => {
  const error = new OndemandApiNotEnabledError()
  expect(error instanceof OndemandApiNotEnabledError).toBeTruthy()
})
