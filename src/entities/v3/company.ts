import { HasColumnDescription } from '~/entities/v3/interface'

export class Company implements HasColumnDescription {
  constructor(readonly data: object, readonly columnDescription: object) {
    // noop
  }

  propertyNames(): string[] {
    return Object.keys(this.data)
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

  static fromResponse(response: object): Company {
    return new Company(response['data'], response['column_description'])
  }
}
