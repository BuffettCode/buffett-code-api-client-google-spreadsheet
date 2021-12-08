import { HasColumnDescription, HasPeriod } from '~/entities/v3/interface'

export class Daily implements HasColumnDescription, HasPeriod<Date> {
  constructor(readonly data: object, readonly columnDescription: object) {
    // noop
  }

  period(): Date {
    return new Date(this.data['day'])
  }

  propertyNames(): string[] {
    return Object.keys(this.columnDescription)
  }

  labelOf(propertyName: string): string | null {
    const desc = this.columnDescriptionOf(propertyName)
    if (desc) {
      return desc['name_jp']
    } else {
      return null
    }
  }

  unitOf(propertyName: string): string | null {
    const desc = this.columnDescriptionOf(propertyName)
    if (desc) {
      return desc['unit']
    } else {
      return null
    }
  }

  private columnDescriptionOf(propertyName: string): string | null {
    return this.columnDescription[propertyName]
  }

  static fromResponse(response: object): Daily {
    return new Daily(response['data'], response['column_description'])
  }

  static fromBulkResponse(response: object): Daily[] {
    return Object.keys(response['data']).map(key => {
      return new Daily(response['data'][key], response['column_description'])
    })
  }
}
