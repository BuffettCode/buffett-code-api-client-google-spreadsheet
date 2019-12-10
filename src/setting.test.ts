import { Setting } from './setting'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

test('load', () => {
  // TODO: Use jest mock
  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getProperty: (): any => 'fuga'
      }
    }
  }

  const setting = Setting.load()
  expect(setting.token).toBe('fuga')
})
