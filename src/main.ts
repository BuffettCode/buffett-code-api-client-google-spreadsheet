import { createAddonMenu, showSettingSidebar } from './menu'
import { Setting } from './setting'
import { bCode } from './custom-function'

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
  return bCode(
    ticker,
    fiscalYear,
    fiscalQuarter,
    propertyName,
    isRawValue,
    isWithUnits
  )
}
