import { ParseError } from '~/fiscal-periods/error'

export class DateParamDate {
  constructor(readonly date: Date) {}

  public toString(): string {
    return this.date.toISOString().substring(0, 10)
  }

  public isLatest(): this is DateParamLatest {
    return false
  }

  public toDate(): Date {
    return this.date
  }
}

export class DateParamLatest {
  constructor(readonly date: 'latest') {}

  public toString(): string {
    return this.date
  }

  public isLatest(): this is DateParamLatest {
    return true
  }
}

export type DateParam = DateParamDate | DateParamLatest

export const DateParam = {
  from(date: Date | 'latest'): DateParam {
    if (date === 'latest') {
      return new DateParamLatest(date)
    } else {
      return new DateParamDate(date)
    }
  },
  parse(str: string): DateParam {
    str = str.toLowerCase()
    if (str == 'latest') {
      return new DateParamLatest(str)
    }

    const matches = str.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (matches == undefined) {
      throw new ParseError(`Invalid date format: ${str}`)
    }

    return new DateParamDate(new Date(str))
  }
}
