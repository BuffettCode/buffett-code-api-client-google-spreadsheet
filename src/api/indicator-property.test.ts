import { IndicatorProperty } from './indicator-property'
import { useMockedUrlFetchApp } from './test-helper'

import { default as indicator } from '../__mocks__/fixtures/indicator-property'

test('isIndicatorProperty', () => {
  useMockedUrlFetchApp(200, JSON.stringify(indicator))

  expect(IndicatorProperty.isIndicatorProperty('company_name')).toBeFalsy()
  expect(IndicatorProperty.isIndicatorProperty('edinet_title')).toBeFalsy()

  expect(IndicatorProperty.isIndicatorProperty('stockprice')).toBeTruthy()
  expect(IndicatorProperty.isIndicatorProperty('day')).toBeTruthy()
})

test('unitOf', () => {
  useMockedUrlFetchApp(200, JSON.stringify(indicator))

  expect(IndicatorProperty.unitOf('company_name')).toBeNull()
  expect(IndicatorProperty.unitOf('edinet_title')).toBeNull()

  expect(IndicatorProperty.unitOf('stockprice')).toBe('円')
  expect(IndicatorProperty.unitOf('day')).toBe('なし')
})

test('labelOf', () => {
  useMockedUrlFetchApp(200, JSON.stringify(indicator))

  expect(IndicatorProperty.labelOf('company_name')).toBeNull()
  expect(IndicatorProperty.labelOf('edinet_title')).toBeNull()

  expect(IndicatorProperty.labelOf('stockprice')).toBe('株価')
  expect(IndicatorProperty.labelOf('day')).toBe('日時')
})
