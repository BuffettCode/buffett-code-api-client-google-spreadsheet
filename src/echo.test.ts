import { echo } from './echo'

test('echo', () => {
  expect(echo('foobar')).toBe('foobar')
})
