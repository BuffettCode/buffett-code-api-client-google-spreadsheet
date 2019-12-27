import { IndicatorProperty } from './indicator-property'

test('isIndicatorProperty', () => {
  expect(IndicatorProperty.isIndicatorProperty('company_name')).toBeFalsy()
  expect(IndicatorProperty.isIndicatorProperty('edinet_title')).toBeFalsy()

  expect(IndicatorProperty.isIndicatorProperty('stockprice')).toBeTruthy()
  expect(IndicatorProperty.isIndicatorProperty('accrual')).toBeTruthy()
})

test('unitOf', () => {
  expect(IndicatorProperty.unitOf('company_name')).toBeNull()
  expect(IndicatorProperty.unitOf('edinet_title')).toBeNull()

  expect(IndicatorProperty.unitOf('stockprice')).toBe('円')
  expect(IndicatorProperty.unitOf('accrual')).toBe('百万円')
})

test('labelOf', () => {
  expect(IndicatorProperty.labelOf('company_name')).toBeNull()
  expect(IndicatorProperty.labelOf('edinet_title')).toBeNull()

  expect(IndicatorProperty.labelOf('stockprice')).toBe('株価')
  expect(IndicatorProperty.labelOf('accrual')).toBe('アクルーアル')
})
