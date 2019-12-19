import * as v2quarter from './data/v2-quarter.js'

export class QuarterProperty {
  static readonly names = Object.keys(v2quarter)

  private constructor() {
    //
  }

  static isQuarterProperty(name: string): boolean {
    return QuarterProperty.names.indexOf(name) >= 0
  }
}
