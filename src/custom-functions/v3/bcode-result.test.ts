import { BcodeResult } from '~/custom-functions/v3/bcode-result'

test('format (days)', () => {
  expect(new BcodeResult('ccc', 1234.5678, '日').format(false, false)).toBe(1234.6)
  expect(new BcodeResult('ccc', 1234.5678, '日').format(true, false)).toBe(1234.5678)
  expect(new BcodeResult('ccc', 1234.5678, '日').format(false, true)).toBe('1,234.6日')
  expect(new BcodeResult('ccc', 1234.5678, '日').format(true, true)).toBe('1,234.5678日')
})

test('format (yen)', () => {
  expect(new BcodeResult('', 430602000000, '円').format(false, false)).toBe(430602000000)
  expect(new BcodeResult('', 430602000000, '円').format(true, false)).toBe(430602000000)
  expect(new BcodeResult('', 430602000000, '円').format(false, true)).toBe('430,602,000,000円')
  expect(new BcodeResult('', 430602000000, '円').format(true, true)).toBe('430,602,000,000円')
})

test('format (million-yen)', () => {
  // using unit-mapping.json
  expect(new BcodeResult('market_capital', 550294097166, '円').format(false, false)).toBe(550294)
  expect(new BcodeResult('market_capital', 550294097166, '円').format(true, false)).toBe(550294097166)
  expect(new BcodeResult('market_capital', 550294097166, '円').format(false, true)).toBe('550,294百万円')
  expect(new BcodeResult('market_capital', 550294097166, '円').format(true, true)).toBe('550,294,097,166円')
})

test('format (null)', () => {
  expect(new BcodeResult('net_sales', null, '円').format(true, false)).toBe('')
  expect(new BcodeResult('net_sales', null, '円').format(true, true)).toBe('')
})

test('format (object)', () => {
  const segmentMember = {
    segments: [],
    periods: [],
    values: []
  }
  const result = new BcodeResult('segment_member', segmentMember, 'なし')

  expect(result.format(false, false)).toEqual(JSON.stringify(segmentMember))
  expect(result.format(true, false)).toEqual(JSON.stringify(segmentMember))
  expect(result.format(false, true)).toEqual(JSON.stringify(segmentMember) + 'なし')
  expect(result.format(true, true)).toEqual(JSON.stringify(segmentMember) + 'なし')
})
