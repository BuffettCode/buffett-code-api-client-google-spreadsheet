import { bcode } from '~/custom-functions/bcode'
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
  setting.setDefaultOndemandApiCallMode()
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
 * @param {"2017Q4"} intent 会計期間または識別子 (例: 四半期 '2017Q4', 日付 '2020-09-06', 年月 '2022-05', 企業情報 'COMPANY')
 * @param {"net_sales"} propertyName 項目名
 * @param {TRUE} isRawValue (オプション) 数値をRAWデータで表示するかどうか (デフォルト値: FALSE)
 * @param {TRUE} isWithUnits (オプション) 単位を末尾に付加するかどうか (デフォルト値: FALSE)
 * @param {TRUE} param5 (オプション) 廃止予定のオプション
 * @return 指定した銘柄の財務数字または指標
 * @customfunction
 */
global.BCODE = (ticker, intent, propertyName, isRawValue = false, isWithUnits = false): number | string => {
  return bcode(ticker, intent, propertyName, isRawValue, isWithUnits)
}
