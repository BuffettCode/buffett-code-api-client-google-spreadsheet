export class CompanyCache {
  private static cache = {}

  static get(ticker: string): object | null {
    const cached = CompanyCache.cache[ticker]
    return cached === undefined ? null : cached
  }

  static put(ticker: string, company: object): void {
    CompanyCache.cache[ticker] = company
  }

  // for testing
  static clearAll(): void {
    CompanyCache.cache = {}
  }
}
