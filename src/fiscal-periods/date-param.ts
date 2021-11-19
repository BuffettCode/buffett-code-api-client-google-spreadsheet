import { ParseError } from '~/fiscal-periods/error'

export class DateParam {
  constructor(public date: Date | 'latest') {}

  public toString(): string {
    if (this.date instanceof Date) {
      return this.date.toISOString().substring(0, 10)
    } else {
      return this.date
    }
  }

  public toDate(): Date {
    if (this.date === 'latest') {
      throw new Error('This cannot convert to Date')
    } else {
      return this.date
    }
  }

  public isLatest(): boolean {
    return this.date === 'latest'
  }

  static parse(str: string): DateParam {
    str = str.toLowerCase()
    if (str == 'latest') {
      return new DateParam(str)
    }

    const matches = str.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (matches == undefined) {
      throw new ParseError(`Invalid date format: ${str}`)
    }

    const year = parseInt(matches[1], 10)
    const month = parseInt(matches[2], 10)
    const day = parseInt(matches[3], 10)
    return new DateParam(new Date(year, month, day))
  }
}
