import { CsvExporter } from '../services/csv-exporter'

export function exportCsv(ticker: string, from: string, to: string): void {
  try {
    CsvExporter.exportCsv(ticker, from, to)
  } catch (e) {
    Logger.log(e.message)
    const ui = SpreadsheetApp.getUi()
    ui.alert('エラーが発生しました', e.message, ui.ButtonSet.OK)
  }
}
