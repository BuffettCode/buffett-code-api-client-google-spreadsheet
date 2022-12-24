// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(obj: any): obj is object {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

export function isColumnDescription(obj: object): boolean {
  return obj != undefined && 'name_jp' in obj && 'unit' in obj
}
