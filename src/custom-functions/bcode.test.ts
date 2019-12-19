import { ApiResponseError } from './bcode'

test('ApiResponseError', () => {
  const error = new ApiResponseError()
  expect(error instanceof ApiResponseError).toBeTruthy()
})
