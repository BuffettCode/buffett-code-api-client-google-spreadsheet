import { Setting } from '~/setting'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

test('load', () => {
  const mockGetProperty = jest.fn()
  mockGetProperty
    .mockReturnValueOnce('foo')
    .mockReturnValueOnce('true')
    .mockReturnValueOnce('true')

  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        getProperty: mockGetProperty
      }
    }
  }

  const setting = Setting.load()
  expect(mockGetProperty.mock.calls.length).toBe(3)
  expect(setting.token).toBe('foo')
  expect(setting.ondemandApiEnabled).toBe(true)
  expect(setting.forceOndemandApiEnabled).toBe(true)
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

test('isValid (true)', () => {
  const mockGetProperty = jest.fn()

  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        getProperty: mockGetProperty
      }
    }
  }

  const setting = Setting.load()
  setting.token = 'bar'
  setting.ondemandApiEnabled = true
  setting.forceOndemandApiEnabled = false
  expect(setting.isValid()).toBeTruthy()
})

test('isValid (false)', () => {
  const mockGetProperty = jest.fn()

  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        getProperty: mockGetProperty
      }
    }
  }

  const setting = Setting.load()
  setting.token = 'bar'
  setting.ondemandApiEnabled = false
  setting.forceOndemandApiEnabled = true
  expect(setting.isValid()).toBeFalsy()
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
  setting.forceOndemandApiEnabled = true
  setting.save()

  expect(mockSetProperty.mock.calls.length).toBe(3)
  expect(mockSetProperty.mock.calls[0]).toEqual([Setting.tokenProperty, 'bar'])
  expect(mockSetProperty.mock.calls[1]).toEqual([Setting.ondemandApiEnabledProperty, true])
  expect(mockSetProperty.mock.calls[2]).toEqual([Setting.forceOndemandApiEnabledProperty, true])
})

test('save (ondemandApiEnabled is false but forceOndemandApiEnabled is true)', () => {
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
  setting.ondemandApiEnabled = false
  setting.forceOndemandApiEnabled = true
  expect(() => setting.save()).toThrow(Error)
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
  setting.setDefaultForceOndemandApiEnabled()

  expect(setting.toObject()).toStrictEqual({
    token: Setting.defaultToken,
    ondemandApiEnabled: Setting.defaultOndemandApiEnabled,
    forceOndemandApiEnabled: Setting.defaultForceOndemandApiEnabled
  })
})
