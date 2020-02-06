export class QuarterProperty {
  static readonly url = 'http://docs.buffett-code.com/v2-quarter.json'

  protected constructor() {
    //
  }

  protected static fetch(): object {
    const res = UrlFetchApp.fetch(this.url)
    return JSON.parse(res.getContentText())
  }

  static names(): string[] {
    const properties = this.fetch()
    return Object.keys(properties)
  }

  static isQuarterProperty(name: string): boolean {
    return this.names().indexOf(name) >= 0
  }

  static unitOf(name: string): string | null {
    const properties = this.fetch()
    const property = properties[name]
    if (!property) {
      return null
    }

    return property.unit
  }

  static labelOf(name: string): string | null {
    const properties = this.fetch()
    const property = properties[name]
    if (!property) {
      return null
    }

    return property.name_jp
  }
}
