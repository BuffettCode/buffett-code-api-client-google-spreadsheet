import { bcode } from '~/custom-functions/bcode'
import { bcodeLabel } from '~/custom-functions/bcode-label'
import { bcodeUnit } from '~/custom-functions/bcode-unit'
import * as menu from '~/ui/menu'
import { exportCsv } from '~/ui/csv-export-dialog'
import { loadSetting, saveSetting } from '~/ui/setting-sidebar'
import { Setting } from '~/setting'

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
 * @param {"2017"} fiscalYear 会計年度 (または"LY")
 * @param {"4"} fiscalQuarter 四半期 (1～4の数字または"LQ")
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
