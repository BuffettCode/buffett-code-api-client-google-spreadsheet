export class ApiResponseError implements Error {
  public name = 'ApiResponseError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}
