import { Setting } from '~/setting'

export function loadSetting(): object {
  return Setting.load().toObject()
}

export function saveSetting(token: string, ondemandApiEnabled: boolean, forceOndemandApiEnabled: boolean): void {
  const setting = Setting.load()
  setting.token = token
  setting.ondemandApiEnabled = ondemandApiEnabled
  setting.forceOndemandApiEnabled = forceOndemandApiEnabled
  setting.save()
}
