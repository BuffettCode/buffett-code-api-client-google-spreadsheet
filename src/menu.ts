import { CellRecalculator } from './cell-recalculator'

export function createAddonMenu(): void {
  const menu = SpreadsheetApp.getUi().createAddonMenu()
  menu.addItem('CSV出力', 'showCsvExportDialog_')
  menu.addItem('更新', 'recalculateCustomFunctionCells_')
  menu.addItem('設定', 'showSettingSidebar_')
  menu.addToUi()
}

export function showCsvExportDialog(): void {
  const html = HtmlService.createHtmlOutputFromFile('csv-export-dialog')
  SpreadsheetApp.getUi().showModalDialog(html, 'CSV出力')
}

export function recalculateCustomFunctionCells(): void {
  // TODO: キャッシュの削除も合わせて行いたいが、
  //       削除するためにキー名を保持するかキャッシュの持ち方を変更する必要があるため
  //       一旦見送っている
  CellRecalculator.recalculateCustomFunctions()
}

export function showSettingSidebar(): void {
  const html = HtmlService.createHtmlOutputFromFile('setting-sidebar').setTitle(
    '設定'
  )
  SpreadsheetApp.getUi().showSidebar(html)
}
