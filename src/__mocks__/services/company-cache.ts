export class CompanyCache {
  private static cache = {}

  static get(ticker: string): object | null {
    const cached = CompanyCache.cache[ticker]
    return cached === undefined ? null : cached
  }

  static put(ticker: string, company: object): void {
    CompanyCache.cache[ticker] = company
  }

  static putAll(companies: object): void {
    Object.keys(companies).forEach(ticker => CompanyCache.put(ticker, companies[ticker][0]))
  }

  // for testing
  static clearAll(): void {
    CompanyCache.cache = {}
  }
}
