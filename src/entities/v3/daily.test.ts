import * as response from '~/__mocks__/fixtures/v3/daily'
import { Daily } from '~/entities/v3/daily'

const daily = Daily.fromResponse(response)

test('period', () => {
  expect(daily.period()).toEqual(new Date('2020-09-06'))
})

test('propertyNames', () => {
  expect(daily.propertyNames()).toEqual(
    Object.keys(response['column_description'])
  )
})

test('labelOf', () => {
  expect(daily.labelOf('day')).toEqual('日付')
  expect(daily.labelOf('market_capital')).toEqual('時価総額')
})

test('unitOf', () => {
  expect(daily.unitOf('day')).toEqual('単位無し')
  expect(daily.unitOf('market_capital')).toEqual('円')
})
