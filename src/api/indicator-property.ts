export class IndicatorProperty {
  static readonly url = 'http://docs.buffett-code.com/v2-indicator.json'

  private constructor() {
    //
  }

  protected static fetch(): object {
    const res = UrlFetchApp.fetch(IndicatorProperty.url)
    return JSON.parse(res.getContentText())
  }

  static names(): string[] {
    const properties = IndicatorProperty.fetch()
    return Object.keys(properties)
  }

  static isIndicatorProperty(name: string): boolean {
    return IndicatorProperty.names().indexOf(name) >= 0
  }

  static unitOf(name: string): string | null {
    const properties = IndicatorProperty.fetch()
    const property = properties[name]
    if (!property) {
      return null
    }

    return property.unit
  }

  static labelOf(name: string): string | null {
    const properties = IndicatorProperty.fetch()
    const property = properties[name]
    if (!property) {
      return null
    }

    return property.name_jp
  }
}
