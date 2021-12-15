import { InvalidLYLQError, ParseError } from '~/fiscal-periods/error'

export class LyWithOffset {
  constructor(public offset: number = 0) {
    if (offset > 0) {
      throw new InvalidLYLQError(
        `LY offset must be negative but ${offset} given.`
      )
    }
  }

  static parse(str: string): LyWithOffset {
    str = str.toUpperCase()
    const matches = str.match(/^LY(-[1-9]\d*)?$/)
    if (matches == undefined) {
      throw new ParseError(`Invalid LY format: ${str}`)
    }

    const offset = str === 'LY' ? 0 : parseInt(matches[1], 10)
    return new LyWithOffset(offset)
  }
}
