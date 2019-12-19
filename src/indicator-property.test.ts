import { IndicatorProperty } from './indicator-property'

test('isIndicatorProperty', () => {
  expect(IndicatorProperty.isIndicatorProperty('company_name')).toBeFalsy()
  expect(IndicatorProperty.isIndicatorProperty('edinet_title')).toBeFalsy()

  expect(IndicatorProperty.isIndicatorProperty('stockprice')).toBeTruthy()
  expect(IndicatorProperty.isIndicatorProperty('accrual')).toBeTruthy()
})
