import { InvalidLYLQError, ParseError } from '~/fiscal-periods/error'

export class LyWithOffset {
  private static pattern = /^LY(-[1-9]\d*)?$/

  constructor(public offset: number = 0) {
    if (offset > 0) {
      throw new InvalidLYLQError(`LY offset must be negative but ${offset} given.`)
    }
  }

  static isValidFormat(str: string): boolean {
    str = str.toUpperCase()
    const matches = str.match(this.pattern)
    return matches != undefined
  }

  static parse(str: string): LyWithOffset {
    str = str.toUpperCase()
    const matches = str.match(this.pattern)
    if (matches == undefined) {
      throw new ParseError(`Invalid LY format: ${str}`)
    }

    const offset = str === 'LY' ? 0 : parseInt(matches[1], 10)
    return new LyWithOffset(offset)
  }

  toString(): string {
    return this.offset === 0 ? 'LY' : `LY${this.offset}`
  }
}
