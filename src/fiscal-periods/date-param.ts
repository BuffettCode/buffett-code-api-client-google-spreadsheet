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
}
