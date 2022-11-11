import * as response from '~/__mocks__/fixtures/v3/company'
import { Company } from '~/entities/v3/company'

const company = Company.fromResponse(response)

test('propertyName', () => {
  expect(company.propertyNames()).toEqual(Object.keys(response['column_description']))
})

test('labelOf', () => {
  expect(company.labelOf('company_name')).toEqual('会社名')
  expect(company.labelOf('priority_market')).toEqual('優先市場')
})

test('unitOf', () => {
  expect(company.unitOf('company_name')).toEqual('なし')
  expect(company.unitOf('priority_market')).toEqual('なし')
})
