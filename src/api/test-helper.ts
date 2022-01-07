// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

// FIXME: Mockの型がみつからない
/* eslint @typescript-eslint/no-explicit-any: 0 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useMockedUrlFetchApp(responseCode: number, contentText: string) {
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
