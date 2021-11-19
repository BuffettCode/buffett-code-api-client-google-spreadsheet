import { bcode } from '~/custom-functions/bcode'
import { bcodeLabel } from '~/custom-functions/bcode-label'
import { bcodeUnit } from '~/custom-functions/bcode-unit'
import { Setting } from '~/setting'
import { exportCsv } from '~/ui/csv-export-dialog'
import * as menu from '~/ui/menu'
import { loadSetting, saveSetting } from '~/ui/setting-sidebar'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

/* triggers */
global.onOpen = (): void => {
  menu.createAddonMenu()
}
global.onInstall = (): void => {
  const setting = Setting.load()
  setting.setDefaultToken()
  setting.setDefaultOndemandApiEnabled()
  setting.save()

  global.onOpen()
}

/* gui */
global.showCsvExportDialog_ = menu.showCsvExportDialog
global.recalculateCustomFunctionCells_ = menu.recalculateCustomFunctionCells
global.showSettingSidebar_ = menu.showSettingSidebar
global.showVersionDialog_ = menu.showVersionDialog

/* gui functions */
global.loadSetting = loadSetting
global.saveSetting = saveSetting
global.exportCsv = exportCsv

/* custom functions */
/**
 * 指定した銘柄の財務数字や指標を取得します。
 *
 * @param {"6501"} ticker 銘柄コード
 * @param {"2017Q4"} period 会計期間 (例: 四半期 '2017Q4', 日付 '2020-09-06')
 * @param {"net_sales"} propertyName 項目名
 * @param {TRUE} isRawValue (オプション) 数値をRAWデータで表示するかどうか (デフォルト値: FALSE)
 * @param {TRUE} isWithUnits (オプション) 単位を末尾に付加するかどうか (デフォルト値: FALSE)
 * @param {TRUE} param5 (オプション) 廃止予定のオプション
 * @return 指定した銘柄の財務数字または指標
 * @customfunction
 */
global.BCODE = (
  ticker,
  period,
  propertyName,
  isRawValue = false,
  isWithUnits = false,
  param5 = false
): number | string => {
  return bcode(ticker, period, propertyName, isRawValue, isWithUnits, param5)
}

/**
 * 近日廃止予定です。
 *
 * 指定した項目の名称を日本語で取得します。
 *
 * @deprecated 近日廃止予定です
 * @param {"net_sales"} propertyName 項目名
 * @return 指定した項目の名称
 * @customfunction
 */
global.BCODE_LABEL = (propertyName: string): string => {
  return bcodeLabel(propertyName)
}

/**
 * 近日廃止予定です。
 *
 * 指定した項目の単位を取得します。
 *
 * @deprecated 近日廃止予定です
 * @param {"net_sales"} propertyName 項目名
 * @return 指定した項目の単位
 * @customfunction
 */
global.BCODE_UNIT = (propertyName: string): string => {
  return bcodeUnit(propertyName)
}
