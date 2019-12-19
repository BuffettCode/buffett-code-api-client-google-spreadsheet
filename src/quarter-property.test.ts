import { QuarterProperty } from './quarter-property'

test('isQuarterProperty', () => {
  expect(QuarterProperty.isQuarterProperty('company_name')).toBeTruthy()
  expect(QuarterProperty.isQuarterProperty('edinet_title')).toBeTruthy()

  expect(QuarterProperty.isQuarterProperty('stockprice')).toBeFalsy()
  expect(QuarterProperty.isQuarterProperty('accrual')).toBeFalsy()
})
