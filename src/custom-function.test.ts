import { ApiResponseError } from './custom-function'

test('ApiResponseError', () => {
  const error = new ApiResponseError()
  expect(error instanceof ApiResponseError).toBeTruthy()
})
