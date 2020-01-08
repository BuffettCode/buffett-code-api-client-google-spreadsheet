export class HttpError implements Error {
  public name = 'HttpError'
  public message: string

  // eslint-disable-next-line @typescript-eslint/camelcase
  constructor(public response: GoogleAppsScript.URL_Fetch.HTTPResponse) {
    this.message = `${response.getResponseCode()}: ${response.getContentText()}`
  }

  public isInvalidTestingRequest(): boolean {
    const content = this.response.getContentText()
    return (
      content ===
      '{"message":"Testing Apikey is only allowed to ticker ending with \\"01\\""}'
    )
  }

  public toString(): string {
    return this.message
  }
}
