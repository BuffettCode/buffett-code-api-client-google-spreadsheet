import { CsvExporter } from './csv-exporter'
import { bcode } from './custom-functions/bcode'
import { bcodeLabel } from './custom-functions/bcode-label'
import { bcodeUnit } from './custom-functions/bcode-unit'
import {
  createAddonMenu,
  recalculateCustomFunctionCells,
  showCsvExportDialog,
  showSettingSidebar
} from './menu'
import { Setting } from './setting'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

/* triggers */
global.onOpen = (): void => {
  createAddonMenu()
}
global.onInstall = (): void => {
  const setting = Setting.load()
  setting.setDefaultToken()
  setting.save()

  global.onOpen()
}

/* gui */
global.showCsvExportDialog_ = showCsvExportDialog
global.reloadCustomFunctionCells_ = recalculateCustomFunctionCells
global.showSettingSidebar_ = showSettingSidebar

/* gui functions */
global.loadSetting = (): Setting => {
  return Setting.load()
}
global.saveSetting = (token: string): void => {
  const setting = Setting.load()
  setting.token = token
  setting.save()
}
global.exportCsv = (ticker: string, from: string, to: string): void => {
  try {
    CsvExporter.exportCsv(ticker, from, to)
  } catch (e) {
    Logger.log(e.message)
    const ui = SpreadsheetApp.getUi()
    ui.alert('エラーが発生しました', e.message, ui.ButtonSet.OK)
  }
}

/* custom functions */
/**
 * 指定した銘柄の財務数字や指標を取得します。
 *
 * @param {"6501"} ticker 銘柄コード
 * @param {"2017"} fiscalYear 会計年度
 * @param {"4"} fiscalQuarter 四半期 (1～4の数字)
 * @param {"net_sales"} propertyName 項目名
 * @param {TRUE} isRawValue (オプション) 数値をRAWデータで表示するかどうか (デフォルト値: FALSE)
 * @param {TRUE} isWithUnits (オプション) 単位を末尾に付加するかどうか (デフォルト値: FALSE)
 * @return 指定した銘柄の財務数字または指標
 * @customfunction
 */
global.BCODE = (
  ticker,
  fiscalYear,
  fiscalQuarter,
  propertyName,
  isRawValue = false,
  isWithUnits = false
): number | string => {
  return bcode(
    ticker,
    fiscalYear,
    fiscalQuarter,
    propertyName,
    isRawValue,
    isWithUnits
  )
}

/**
 * 指定した項目の名称を日本語で取得します。
 *
 * @param {"net_sales"} propertyName 項目名
 * @return 指定した項目の名称
 * @customfunction
 */
global.BCODE_LABEL = (propertyName: string): string => {
  return bcodeLabel(propertyName)
}

/**
 * 指定した項目の単位を取得します。
 *
 * @param {"net_sales"} propertyName 項目名
 * @return 指定した項目の単位
 * @customfunction
 */
global.BCODE_UNIT = (propertyName: string): string => {
  return bcodeUnit(propertyName)
}
