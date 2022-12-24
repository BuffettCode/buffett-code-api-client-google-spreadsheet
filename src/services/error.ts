export class KeyNotFoundError implements Error {
  public name = 'KeyNotFoundError'
  public message: string

  constructor(message = '') {
    this.message = message
  }
}
