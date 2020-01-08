import { QuarterProperty } from './quarter-property'
import { useMockFetchApp } from './test-helper'

import { default as quarter } from '../__mocks__/fixtures/quarter-property'

test('isQuarterProperty', () => {
  useMockFetchApp(200, JSON.stringify(quarter))

  expect(QuarterProperty.isQuarterProperty('company_name')).toBeTruthy()
  expect(QuarterProperty.isQuarterProperty('edinet_title')).toBeTruthy()

  expect(QuarterProperty.isQuarterProperty('stockprice')).toBeFalsy()
  expect(QuarterProperty.isQuarterProperty('day')).toBeFalsy()
})

test('unitOf', () => {
  useMockFetchApp(200, JSON.stringify(quarter))

  expect(QuarterProperty.unitOf('company_name')).toBe('なし')
  expect(QuarterProperty.unitOf('edinet_title')).toBe('なし')

  expect(QuarterProperty.unitOf('stockprice')).toBeNull()
  expect(QuarterProperty.unitOf('day')).toBeNull()
})

test('labelOf', () => {
  useMockFetchApp(200, JSON.stringify(quarter))

  expect(QuarterProperty.labelOf('company_name')).toBe('社名')
  expect(QuarterProperty.labelOf('edinet_title')).toBe('edinet開示資料名')

  expect(QuarterProperty.labelOf('stockprice')).toBeNull()
  expect(QuarterProperty.labelOf('day')).toBeNull()
})
