import * as indicatorFixture from '~/__mocks__/fixtures/v2/indicator'
import { getMock, putMock } from '~/services/cache-test-helper'
import { IndicatorCache } from '~/services/indicator-cache'

test('key', () => {
  expect(IndicatorCache.key('6501')).toBe('indicator-6501')
})

const indicator = indicatorFixture['2371'][0]

test('get', () => {
  getMock.mockReturnValueOnce(JSON.stringify(indicator))
  expect(IndicatorCache.get('2371')).toEqual(indicator)
  expect(IndicatorCache.get('9999')).toBeNull()

  expect(getMock).toBeCalledTimes(2)
  expect(getMock).nthCalledWith(1, 'indicator-2371')
  expect(getMock).nthCalledWith(2, 'indicator-9999')
})

test('put', () => {
  IndicatorCache.put('2371', indicator)

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith(
    'indicator-2371',
    JSON.stringify(indicator),
    21600
  )
})
