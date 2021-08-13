import { default as indicator } from '../../fixtures/v2/indicator-property'

export class IndicatorProperty {
  static fetch(): object {
    return indicator
  }

  static isIndicatorProperty(name: string): boolean {
    return Object.keys(this.fetch()).indexOf(name) >= 0
  }

  static labelOf(name: string): string | null {
    const property = this.fetch()[name]
    if (!property) {
      return null
    }

    return property.name_jp
  }

  static unitOf(name: string): string | null {
    const property = this.fetch()[name]
    if (!property) {
      return null
    }

    return property.unit
  }

  static names(): string[] {
    return Object.keys(this.fetch())
  }
}
