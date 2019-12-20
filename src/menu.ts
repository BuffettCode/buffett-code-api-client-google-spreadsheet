export function createAddonMenu(): void {
  const menu = SpreadsheetApp.getUi().createAddonMenu()
  menu.addItem('CSV出力', 'showCsvExportDialog_')
  menu.addItem('設定', 'showSettingSidebar_')
  menu.addToUi()
}

export function showCsvExportDialog(): void {
  const html = HtmlService.createHtmlOutputFromFile('csv-export-dialog')
  SpreadsheetApp.getUi().showModalDialog(html, 'CSV出力')
}

export function showSettingSidebar(): void {
  const html = HtmlService.createHtmlOutputFromFile('setting-sidebar').setTitle(
    '設定'
  )
  SpreadsheetApp.getUi().showSidebar(html)
}
