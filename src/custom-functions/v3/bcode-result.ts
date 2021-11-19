import * as unitConversion from '~/custom-functions/v3/unit-conversion.js'
import { Formatter } from '~/services/formatter'

export class BcodeResult {
  constructor(
    public name: string,
    public value: number | string | null,
    public unit: string
  ) {}

  private isMillionYenProperty(): boolean {
    return unitConversion.millionYen.includes(this.name)
  }

  public format(isRawValue: boolean, isWithUnits: boolean): number | string {
    let value = this.value
    let unit = this.unit

    if (value === null) {
      return ''
    }

    if (!isRawValue && typeof value === 'number') {
      if (unit === '円' && this.isMillionYenProperty()) {
        value = Formatter.round(value / 1000000, 0) // 整数に丸める
        unit = '百万円'
      } else {
        value = Formatter.round(value, 1) // 小数点第1位までに丸める
      }
    }

    if (isWithUnits) {
      if (typeof value == 'number') {
        return Formatter.commaStyled(value) + unit
      } else {
        return value + unit
      }
    } else {
      return value
    }
  }
}
