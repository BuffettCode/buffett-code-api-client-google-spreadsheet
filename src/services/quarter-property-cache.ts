export class QuarterPropertyCache {
  static readonly key = 'quarter-property'

  private constructor() {
    //
  }

  static get(): object | null {
    const cache = CacheService.getUserCache()
    const cached = cache.get(this.key)
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static put(indicatorProperty: object, expirationInSeconds = 21600): void {
    const cache = CacheService.getUserCache()
    cache.put(this.key, JSON.stringify(indicatorProperty), expirationInSeconds)
  }
}
