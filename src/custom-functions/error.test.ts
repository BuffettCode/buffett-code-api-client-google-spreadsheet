import { ApiResponseError } from './error'

test('ApiResponseError', () => {
  const error = new ApiResponseError()
  expect(error instanceof ApiResponseError).toBeTruthy()
})
