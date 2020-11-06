import { Setting } from './setting'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

test('load', () => {
  const mockGetProperty = jest.fn()
  mockGetProperty.mockReturnValueOnce('foo').mockReturnValueOnce('true')

  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        getProperty: mockGetProperty
      }
    }
  }

  const setting = Setting.load()
  expect(mockGetProperty.mock.calls.length).toBe(2)
  expect(setting.token).toBe('foo')
  expect(setting.ondemandApiEnabled).toBe(true)
})

test('load__ondemandApiEnabledCasting', () => {
  const mockGetProperty = jest.fn()
  mockGetProperty.mockReturnValue(undefined)

  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        getProperty: mockGetProperty
      }
    }
  }

  const setting = Setting.load()
  expect(setting.ondemandApiEnabled).toBe(false)
})

test('save', () => {
  const mockGetProperty = jest.fn()
  const mockSetProperty = jest.fn()

  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        getProperty: mockGetProperty,
        setProperty: mockSetProperty
      }
    }
  }

  const setting = Setting.load()
  setting.token = 'bar'
  setting.ondemandApiEnabled = true
  setting.save()

  expect(mockSetProperty.mock.calls.length).toBe(2)
  expect(mockSetProperty.mock.calls[0]).toEqual([Setting.tokenProperty, 'bar'])
  expect(mockSetProperty.mock.calls[1]).toEqual([
    Setting.ondemandApiEnabledProperty,
    true
  ])
})

test('setDefaultToken', () => {
  const mockGetProperty = jest.fn()
  mockGetProperty.mockReturnValue(undefined)

  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        getProperty: mockGetProperty
      }
    }
  }

  const setting = Setting.load()
  expect(setting.token).toBeUndefined()

  setting.setDefaultToken()
  expect(setting.token).toBe(Setting.defaultToken)
})

test('toObject', () => {
  const mockGetProperty = jest.fn()
  mockGetProperty.mockReturnValue(undefined)

  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        getProperty: mockGetProperty
      }
    }
  }

  const setting = Setting.load()
  setting.setDefaultToken()
  setting.setDefaultOndemandApiEnabled()

  expect(setting.toObject()).toStrictEqual({
    token: Setting.defaultToken,
    ondemandApiEnabled: Setting.defaultOndemandApiEnabled
  })
})
