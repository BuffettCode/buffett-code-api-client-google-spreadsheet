import { default as quarter } from '../fixtures/quarter-property'

export class QuarterProperty {
  static isQuarterProperty(name: string): boolean {
    return Object.keys(quarter).indexOf(name) >= 0
  }

  static labelOf(name: string): string | null {
    const property = quarter[name]
    if (!property) {
      return null
    }

    return property.name_jp
  }

  static unitOf(name: string): string | null {
    const property = quarter[name]
    if (!property) {
      return null
    }

    return property.unit
  }

  static names(): string[] {
    return Object.keys(quarter)
  }
}
