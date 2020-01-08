import { HttpError } from './http-error'
import { useMockFetchApp } from './test-helper'

test('HttpError', () => {
  const res = useMockFetchApp(403, '{"message": "Forbidden"}')()
  const error = new HttpError(res)
  expect(error instanceof HttpError).toBeTruthy()
})
