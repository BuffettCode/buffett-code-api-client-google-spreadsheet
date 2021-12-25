import { InvalidLYLQError, ParseError } from '~/fiscal-periods/error'

export class LqWithOffset {
  private static pattern = /^LQ(-[1-9]\d*)?$/

  constructor(public offset: number = 0) {
    if (offset > 0) {
      throw new InvalidLYLQError(`LQ offset must be negative but ${offset} given.`)
    }
  }

  static isValidFormat(str: string): boolean {
    str = str.toUpperCase()
    const matches = str.match(this.pattern)
    return matches != undefined
  }

  static parse(str: string): LqWithOffset {
    str = str.toUpperCase()
    const matches = str.match(this.pattern)
    if (matches == undefined) {
      throw new ParseError(`Invalid LQ format: ${str}`)
    }

    const offset = str === 'LQ' ? 0 : parseInt(matches[1], 10)
    return new LqWithOffset(offset)
  }

  toString(): string {
    return this.offset === 0 ? 'LQ' : `LQ${this.offset}`
  }
}
