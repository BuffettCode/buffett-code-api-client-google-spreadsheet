export class IndicatorPropertyCache {
  static cache = null

  static get(): object | null {
    return this.cache
  }

  static put(indicator: object): void {
    this.cache = indicator
  }
}
