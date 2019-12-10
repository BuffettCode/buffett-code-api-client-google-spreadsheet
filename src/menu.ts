export function createAddonMenu(): void {
  const menu = SpreadsheetApp.getUi().createAddonMenu()
  menu.addItem('設定', 'showSettingSidebar_')
  menu.addToUi()
}

export function showSettingSidebar(): void {
  const html = HtmlService.createHtmlOutputFromFile('setting-sidebar').setTitle(
    '設定'
  )
  SpreadsheetApp.getUi().showSidebar(html)
}
