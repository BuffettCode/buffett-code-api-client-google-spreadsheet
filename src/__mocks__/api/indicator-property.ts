import { default as indicator } from '../fixtures/indicator-property'

export class IndicatorProperty {
  static isIndicatorProperty(name: string): boolean {
    return Object.keys(indicator).indexOf(name) >= 0
  }

  static labelOf(name: string): string | null {
    const property = indicator[name]
    if (!property) {
      return null
    }

    return property.name_jp
  }

  static unitOf(name: string): string | null {
    const property = indicator[name]
    if (!property) {
      return null
    }

    return property.unit
  }

  static names(): string[] {
    return Object.keys(indicator)
  }
}
