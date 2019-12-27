export class CellRecalculator {
  private constructor() {
    //
  }

  static recalculateCustomFunctions(): void {
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const longUniqueText = Utilities.getUuid()

    // `=`から始まるセルにマッチさせる
    // NOTE: 本来はBCODE関数を含むセルのみ更新したいが、
    //       現在の方法だと元の数式に復元できないので、
    //       単に全ての数式のイコールを置換している
    ss.createTextFinder(`^=`)
      .useRegularExpression(true)
      .matchFormulaText(true)
      .replaceAllWith(longUniqueText)
    ss.createTextFinder(`^${longUniqueText}`)
      .useRegularExpression(true)
      .matchFormulaText(true)
      .replaceAllWith('=')
  }
}
