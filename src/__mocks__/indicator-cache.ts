export class IndicatorCache {
  static readonly cache = {}

  static get(ticker: string): object[] | null {
    const cached = IndicatorCache.cache[ticker]
    return cached === undefined ? null : cached
  }

  static put(ticker: string, indicator: object[]): void {
    IndicatorCache.cache[ticker] = indicator
  }
}
