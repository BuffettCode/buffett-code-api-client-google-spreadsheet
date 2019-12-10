import { UrlBuilder } from './url-builder'

test('toString', () => {
  const endpoint = 'https://example.com'
  const params = {
    foo: 'foo bar',
    bar: 'baz?'
  }
  const builder = new UrlBuilder(endpoint, params)
  expect(builder.toString()).toBe(
    'https://example.com?foo=foo%20bar&bar=baz%3F'
  )
})
