import { CsvExporter } from '../services/csv-exporter'

export function exportCsv(ticker: string, from: string, to: string): void {
  CsvExporter.exportCsv(ticker, from, to)
}
