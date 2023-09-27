import { HasColumnDescription, HasData, HasPeriod } from '~/entities/v3/interface'
import { YearMonth } from '~/fiscal-periods/year-month'
import { PropertyPathResolver } from '~/services/property-path-resolver'
import { isObject, isColumnDescription } from '~/services/type-helper'

export class Monthly implements HasData, HasColumnDescription, HasPeriod<YearMonth> {
  constructor(readonly data: object, readonly columnDescription: object) {
    // noop
  }

  period(): YearMonth {
    return new YearMonth(this.data['year'], this.data['month'])
  }

  propertyNames(): string[] {
    return PropertyPathResolver.listPathsOf(this.data)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueOf(propertyName: string): string | number | null {
    const value = PropertyPathResolver.getPropertyOf(this.data, propertyName)
    if (isObject(value) || Array.isArray(value)) {
      throw new TypeError(`Can't access to a non-primitive type`)
    }

    return value
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

  private columnDescriptionOf(propertyName: string): object | null {
    const desc = PropertyPathResolver.getPropertyOf(this.columnDescription, propertyName)
    if (isObject(desc) && isColumnDescription(desc)) {
      return desc
    }

    throw new TypeError(`Can't access to non-column-description object`)
  }

  static fromResponse(response: object): Monthly {
    return new Monthly(response['data'], response['column_description'])
  }
}
