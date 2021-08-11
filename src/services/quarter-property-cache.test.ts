import { QuarterPropertyCache } from './quarter-property-cache'
import * as quarterProperty from '../__mocks__/fixtures/v2/quarter-property'
import { getMock, putMock } from './cache-test-helper'

test('get', () => {
  getMock.mockReturnValue(JSON.stringify(quarterProperty))
  expect(QuarterPropertyCache.get()).toEqual(quarterProperty)

  expect(getMock).toBeCalledTimes(1)
  expect(getMock).toBeCalledWith('quarter-property')
})

test('put', () => {
  QuarterPropertyCache.put(quarterProperty)

  expect(putMock).toBeCalledTimes(1)
  expect(putMock).toBeCalledWith(
    'quarter-property',
    JSON.stringify(quarterProperty),
    21600
  )
})
