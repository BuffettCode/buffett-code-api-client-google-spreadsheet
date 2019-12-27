import * as v2quarter from '../data/v2-quarter.js'

export class QuarterProperty {
  static readonly names = Object.keys(v2quarter)

  private constructor() {
    //
  }

  static isQuarterProperty(name: string): boolean {
    return QuarterProperty.names.indexOf(name) >= 0
  }

  static unitOf(name: string): string | null {
    const property = v2quarter[name]
    if (!property) {
      return null
    }

    return property.unit
  }

  static labelOf(name: string): string | null {
    const property = v2quarter[name]
    if (!property) {
      return null
    }

    return property.name_jp
  }
}
