import { CellRecalculator } from '~/services/cell-recalculator'
import { version } from '~/version'

export function createAddonMenu(): void {
  const menu = SpreadsheetApp.getUi().createAddonMenu()
  menu.addItem('CSV出力', 'showCsvExportDialog_')
  menu.addItem('更新', 'recalculateCustomFunctionCells_')
  menu.addItem('設定', 'showSettingSidebar_')
  menu.addSeparator()
  menu.addItem('バフェット・コードについて', 'showVersionDialog_')
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
  const html = HtmlService.createHtmlOutputFromFile('setting-sidebar').setTitle('設定')
  SpreadsheetApp.getUi().showSidebar(html)
}

export function showVersionDialog(): void {
  const ui = SpreadsheetApp.getUi()
  const description = `バージョン: https://github.com/BuffettCode/buffett-code-api-client-google-spreadsheet/releases/tag/${version}`
  ui.alert('バフェット・コード', description, ui.ButtonSet.OK)
}
