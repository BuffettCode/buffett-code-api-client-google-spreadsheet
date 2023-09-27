export class ApiResponseError implements Error {
  public name = 'ApiResponseError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}

export class OndemandApiNotEnabledError implements Error {
  public name = 'OndemandApiNotEnabledError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}

export class PropertyNotFoundError implements Error {
  public name = 'PropertyNotFoundError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}

export class UnsupportedTickerError implements Error {
  public name = 'UnsupportedTickerError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}

export class UnsupportedRangeError implements Error {
  public name = 'UnsupportedRangeError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}
