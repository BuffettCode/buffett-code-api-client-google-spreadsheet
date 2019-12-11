import { round } from './util'

export class Property {
  constructor(public value: number | string, public unit: string) {}

  public format(isRawValue: boolean, isWithUnits: boolean): number | string {
    let value = this.value

    if (typeof value === 'number' && this.unit === '百万円') {
      value /= 1000000
    }

    if (!isRawValue && typeof value === 'number') {
      value = round(value, 1) // 小数点第1位までに丸める
    }

    if (isWithUnits) {
      return value + this.unit
    } else {
      return value
    }
  }
}
