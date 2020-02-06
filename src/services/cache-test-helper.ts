// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any

export const getMock = jest.fn()
export const putMock = jest.fn()

global.CacheService = {
  getUserCache: jest.fn().mockImplementation(() => ({
    get: getMock,
    put: putMock
  }))
}
