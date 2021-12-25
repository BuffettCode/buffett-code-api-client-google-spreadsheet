import { HasColumnDescription, HasPeriod } from '~/entities/v3/interface'
import { YearQuarter } from '~/fiscal-periods/year-quarter'

export class Quarter implements HasColumnDescription, HasPeriod<YearQuarter> {
  constructor(readonly data: object, readonly columnDescription: object) {
    // noop
  }

  period(): YearQuarter {
    return new YearQuarter(
      this.data['fiscal_year'],
      this.data['fiscal_quarter']
    )
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

  static fromResponse(response: object): Quarter {
    return new Quarter(response['data'], response['column_description'])
  }

  static fromBulkResponse(response: object): Quarter[] {
    return Object.keys(response['data']).map(key => {
      return new Quarter(response['data'][key], response['column_description'])
    })
  }
}
