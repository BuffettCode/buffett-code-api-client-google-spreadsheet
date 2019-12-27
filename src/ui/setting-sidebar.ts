import { Setting } from '../setting'

export function loadSetting(): Setting {
  return Setting.load()
}

export function saveSetting(token: string): void {
  const setting = Setting.load()
  setting.token = token
  setting.save()
}
