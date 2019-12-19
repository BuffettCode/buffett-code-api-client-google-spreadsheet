import { IndicatorCache } from './indicator-cache'

test('key', () => {
  expect(IndicatorCache.key('6501')).toBe('indicator-6501')
})

// TODO
