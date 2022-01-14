import { Setting } from '~/setting'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

test('load', () => {
  const mockGetProperty = jest.fn()
  mockGetProperty
    .mockReturnValueOnce('foo')
    .mockReturnValueOnce('true')
    .mockReturnValueOnce('force')

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
  expect(setting.ondemandApiCallMode).toBe('force')
})

test('load (ondemandApiEnabled casting)', () => {
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

test('load (ondemandApiCallMode fallback)', () => {
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
  expect(setting.ondemandApiCallMode).toBe(Setting.defaultOndemandApiCallMode)
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
  setting.ondemandApiCallMode = 'force'
  expect(setting.isValid()).toBeTruthy()
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
  setting.ondemandApiCallMode = 'foo' as 'default' | 'force'
  expect(setting.isValid()).toBeFalsy()
})

test('isValid (ondemandApiEnabled is false but ondemandApiCallMode is changed)', () => {
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
  setting.ondemandApiCallMode = 'force'
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
  setting.ondemandApiCallMode = 'default'
  setting.save()

  expect(mockSetProperty.mock.calls.length).toBe(3)
  expect(mockSetProperty.mock.calls[0]).toEqual([Setting.tokenProperty, 'bar'])
  expect(mockSetProperty.mock.calls[1]).toEqual([Setting.ondemandApiEnabledProperty, 'true'])
  expect(mockSetProperty.mock.calls[2]).toEqual([Setting.ondemandApiCallModeProperty, 'default'])
})

test('save (ondemandApiEnabled is false but ondemandApiCallMode is changed)', () => {
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
  setting.ondemandApiCallMode = 'force'
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

test('setDefaultOndemandApiEnabled', () => {
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
  expect(setting.ondemandApiEnabled).toBeFalsy()

  setting.setDefaultToken()
  expect(setting.ondemandApiEnabled).toBe(Setting.defaultOndemandApiEnabled)
})

test('setDefaultOndemandApiCallMode', () => {
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
  expect(setting.ondemandApiCallMode).toBe(Setting.defaultOndemandApiCallMode)

  setting.setDefaultToken()
  expect(setting.ondemandApiCallMode).toBe(Setting.defaultOndemandApiCallMode)
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
  setting.setDefaultOndemandApiCallMode()

  expect(setting.toObject()).toStrictEqual({
    token: Setting.defaultToken,
    ondemandApiEnabled: Setting.defaultOndemandApiEnabled,
    ondemandApiCallMode: Setting.defaultOndemandApiCallMode
  })
})

test('Setting.validOndemanApiCallModes', () => {
  expect(Setting.validOndemanApiCallModes()).toEqual(['default', 'force'])
})

test('Setting.castOndemandApiCallModeString', () => {
  expect(Setting.castOndemandApiCallModeString('default')).toEqual('default')
  expect(Setting.castOndemandApiCallModeString('force')).toEqual('force')
  expect(() => Setting.castOndemandApiCallModeString('FORCE')).toThrow(TypeError)
  expect(() => Setting.castOndemandApiCallModeString('foo')).toThrow(TypeError)
})
