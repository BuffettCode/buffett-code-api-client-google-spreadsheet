import * as v2indicator from './data/v2-indicator.js'

export class IndicatorProperty {
  static readonly names = Object.keys(v2indicator)

  private constructor() {
    //
  }

  static isIndicatorProperty(name: string): boolean {
    return IndicatorProperty.names.indexOf(name) >= 0
  }

  static unitOf(name: string): string | null {
    const property = v2indicator[name]
    if (!property) {
      return null
    }

    return property.unit
  }

  static labelOf(name: string): string | null {
    const property = v2indicator[name]
    if (!property) {
      return null
    }

    return property.name_jp.trim()
  }
}
