import { Setting } from '~/setting'

export function loadSetting(): object {
  const setting = Setting.load()
  const obj = setting.toObject()
  obj['forceOndemandApiEnabled'] = setting.isOndemandApiCallModeForce()
  return obj
}

export function saveSetting(token: string, ondemandApiEnabled: boolean, forceOndemandApiEnabled: boolean): void {
  const setting = Setting.load()
  setting.token = token
  setting.ondemandApiEnabled = ondemandApiEnabled
  setting.ondemandApiCallMode = forceOndemandApiEnabled ? 'force' : 'default'
  setting.save()
}
