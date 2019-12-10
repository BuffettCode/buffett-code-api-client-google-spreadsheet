import { BuffettCodeApiClientV2 } from './client'

test('isQuarterProperty', () => {
  expect(BuffettCodeApiClientV2.isQuarterProperty('company_name')).toBeTruthy()
  expect(BuffettCodeApiClientV2.isQuarterProperty('edinet_title')).toBeTruthy()

  expect(BuffettCodeApiClientV2.isQuarterProperty('stockprice')).toBeFalsy()
  expect(BuffettCodeApiClientV2.isQuarterProperty('accrual')).toBeFalsy()
})

test('isIndicatorProperty', () => {
  expect(BuffettCodeApiClientV2.isIndicatorProperty('company_name')).toBeFalsy()
  expect(BuffettCodeApiClientV2.isIndicatorProperty('edinet_title')).toBeFalsy()

  expect(BuffettCodeApiClientV2.isIndicatorProperty('stockprice')).toBeTruthy()
  expect(BuffettCodeApiClientV2.isIndicatorProperty('accrual')).toBeTruthy()
})
