import { InvalidLYLQError, ParseError } from '~/fiscal-periods/error'

export class LqWithOffset {
  constructor(public offset: number = 0) {
    if (offset > 0) {
      throw new InvalidLYLQError(
        `LQ offset must be negative but ${offset} given.`
      )
    }
  }

  static parse(str: string): LqWithOffset {
    str = str.toUpperCase()
    const matches = str.match(/^LQ(-[1-9]\d*)?$/)
    if (matches == undefined) {
      throw new ParseError(`Invalid LQ format: ${str}`)
    }

    const offset = str === 'LQ' ? 0 : parseInt(matches[1], 10)
    return new LqWithOffset(offset)
  }
}
