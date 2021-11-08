import { bcode as bcodeV2 } from '~/custom-functions/v2/bcode'

export function castStringAsBoolean(bool: string | boolean): boolean {
  return typeof bool === 'string' ? bool.toLowerCase() === 'true' : bool
}

export function isV3Call(
  param1: string | number,
  param2: string | number
): boolean {
  if (typeof param1 === 'number' || typeof param2 === 'number') {
    return false
  } else if (param1 === '' || param2 === '') {
    return false
  } else if (param1.toUpperCase() === 'LY' || param2.toUpperCase() === 'LQ') {
    return false
  } else if (param1.match(/^\d+$/) || param1.match(/^\d+$/)) {
    return false
  } else {
    return true
  }
}

export function bcode(
  ticker: string,
  param1: string | number | Date,
  param2: string | number,
  param3: string | boolean = false,
  param4: string | boolean = false,
  param5: string | boolean = false
): number | string {
  if (param1 instanceof Date || isV3Call(param1, param2)) {
    throw new Error(
      `<<引数が不正な形式です。param1: ${param1} (${typeof param1}), param2: ${param2} (${typeof param2})>>`
    )
  } else {
    return bcodeV2(
      ticker,
      param1,
      param2,
      param3.toString(),
      castStringAsBoolean(param4),
      castStringAsBoolean(param5)
    )
  }
}
