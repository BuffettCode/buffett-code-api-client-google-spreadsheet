import { Setting } from './setting'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

test('load', () => {
  const mockGetProperty = jest.fn()
  mockGetProperty.mockReturnValue('foo')

  global.PropertiesService = {
    getUserProperties: (): object => {
      return {
        getProperty: mockGetProperty
      }
    }
  }

  const setting = Setting.load()
  expect(mockGetProperty.mock.calls.length).toBe(1)
  expect(setting.token).toBe('foo')
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
  setting.save()

  expect(mockSetProperty.mock.calls.length).toBe(1)
  expect(mockSetProperty.mock.calls[0]).toEqual([Setting.tokenProperty, 'bar'])
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
