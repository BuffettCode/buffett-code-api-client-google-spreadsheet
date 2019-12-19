import { QuarterCache } from './quarter-cache'
import { YearQuarter } from './year-quarter'

test('key', () => {
  expect(QuarterCache.key('6501', new YearQuarter(2019, 4))).toBe(
    'quarter-6501-2019Q4'
  )
})

// TODO
