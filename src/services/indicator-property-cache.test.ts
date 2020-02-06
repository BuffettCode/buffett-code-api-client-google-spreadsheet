import { IndicatorPropertyCache } from './indicator-property-cache'
import * as indicatorProperty from '../__mocks__/fixtures/indicator-property'
import { getMock, putMock } from './cache-test-helper'

test('get', () => {
  getMock.mockReturnValue(JSON.stringify(indicatorProperty))
  expect(IndicatorPropertyCache.get()).toEqual(indicatorProperty)

  expect(getMock).toBeCalledTimes(1)
  expect(getMock).toBeCalledWith('indicator-property')
})

test('put', () => {
  IndicatorPropertyCache.put(indicatorProperty)

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith(
    'indicator-property',
    JSON.stringify(indicatorProperty),
    21600
  )
})
