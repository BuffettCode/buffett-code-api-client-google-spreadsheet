export class QuarterPropertyCache {
  static cache = null

  static get(): object | null {
    return this.cache
  }

  static put(quarter: object): void {
    this.cache = quarter
  }
}
