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
      this.response.getResponseCode() === 400 &&
      (content === '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}' ||
        content === '{"message":"Testing apikey is not allowed"}' ||
        content === '{"message":"Trial request only supports ticker ending \'01\'"}')
    )
  }

  public isInvalidTokenRequest(): boolean {
    return this.response.getResponseCode() === 403 && this.response.getContentText() === '{"message":"Forbidden"}'
  }

  public isMonthlyLimitExceeded(): boolean {
    return this.response.getResponseCode() === 403 && !this.isInvalidTokenRequest()
  }

  public isResourceNotFound(): boolean {
    return this.response.getResponseCode() === 404
  }

  public isApiQuotaExceeded(): boolean {
    return this.response.getResponseCode() === 429
  }

  public is4xxError(): boolean {
    return Math.floor(this.response.getResponseCode() / 100) === 4
  }

  public is5xxError(): boolean {
    return Math.floor(this.response.getResponseCode() / 100) === 5
  }

  public toString(): string {
    return this.message
  }
}
