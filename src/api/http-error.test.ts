import { HttpError } from './http-error'
import { useMockedUrlFetchApp } from './test-helper'

test('HttpError', () => {
  const res = useMockedUrlFetchApp(403, '{"message": "Forbidden"}')()
  const error = new HttpError(res)
  expect(error instanceof HttpError).toBeTruthy()
})
