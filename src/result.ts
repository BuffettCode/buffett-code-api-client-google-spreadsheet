import { Formatter } from './formatter'

export class Result {
  constructor(public value: number | string | null, public unit: string) {}

  public format(isRawValue: boolean, isWithUnits: boolean): number | string {
    let value = this.value

    if (value === null) {
      return 'N/A'
    }

    if (typeof value === 'number' && this.unit === '百万円') {
      value /= 1000000
    }

    if (!isRawValue && typeof value === 'number') {
      value = Formatter.round(value, 1) // 小数点第1位までに丸める
    }

    if (isWithUnits) {
      if (typeof value == 'number') {
        return Formatter.commaStyled(value) + this.unit
      } else {
        return value + this.unit
      }
    } else {
      return value
    }
  }
}
