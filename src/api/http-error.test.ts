import { HttpError } from '~/api/http-error'
import { useMockedUrlFetchApp } from '~/api/test-helper'

test('HttpError', () => {
  const res = useMockedUrlFetchApp(403, '{"message": "Forbidden"}')()
  const error = new HttpError(res)
  expect(error instanceof HttpError).toBeTruthy()
})
