export class InvalidYearError implements Error {
  public name = 'InvalidYearError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}

export class InvalidQuarterError implements Error {
  public name = 'InvalidQuarterError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}

export class InvalidLYLQError implements Error {
  public name = 'InvalidLYLQError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}
