import { createAddonMenu, showSettingSidebar } from './menu'
import { Setting } from './setting'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

/* triggers */
global.onOpen = (): void => {
  createAddonMenu()
}
global.onInstall = (): void => {
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
