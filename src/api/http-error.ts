export class HttpError implements Error {
  public name = 'HttpError'
  public message: string

  constructor(
    public url: string,
    public response: GoogleAppsScript.URL_Fetch.HTTPResponse // eslint-disable-line @typescript-eslint/camelcase
  ) {
    this.message = `${url} - ${response.getResponseCode()}: ${response.getContentText()}`
  }

  public isInvalidTestingRequest(): boolean {
    const content = this.response.getContentText()
    return (
      content ===
        '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}' ||
      content === '{"message":"Testing apikey is not allowed"}' ||
      content ===
        '{"message":"Trial request only supports ticker ending \'01\'"}'
    )
  }

  public isInvalidTokenRequest(): boolean {
    const content = this.response.getContentText()
    return content === '{"message":"Forbidden"}'
  }

  public toString(): string {
    return this.message
  }
}
