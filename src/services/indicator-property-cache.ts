export class IndicatorPropertyCache {
  static readonly key = 'indicator-property'

  private constructor() {
    //
  }

  static get(): object | null {
    const cache = CacheService.getUserCache()
    const cached = cache.get(IndicatorPropertyCache.key)
    if (!cached) {
      return null
    }

    return JSON.parse(cached)
  }

  static put(indicatorProperty: object, expirationInSeconds = 21600): void {
    const cache = CacheService.getUserCache()
    cache.put(
      IndicatorPropertyCache.key,
      JSON.stringify(indicatorProperty),
      expirationInSeconds
    )
  }
}
