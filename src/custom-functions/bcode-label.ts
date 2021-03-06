import { CachingIndicatorProperty } from '../api/caching-indicator-property'
import { CachingQuarterProperty } from '../api/caching-quarter-property'

export function bcodeLabel(propertyName: string): string {
  if (!propertyName) {
    throw new Error('<<propertyNameが有効ではありません>>')
  }

  const isQuarterProperty = CachingQuarterProperty.isQuarterProperty(
    propertyName
  )
  const isIndicatorProperty = CachingIndicatorProperty.isIndicatorProperty(
    propertyName
  )

  if (!isQuarterProperty && !isIndicatorProperty) {
    throw new Error(`<<指定された項目が見つかりません: ${propertyName}>>`)
  }

  // NOTE: プロパティがquarterとindicatornの両方に存在する可能性もあるが、
  //       どちらを見ても同じはずなので決め打ちでquarterを優先に見ている
  if (isQuarterProperty) {
    return CachingQuarterProperty.labelOf(propertyName)
  } else {
    return CachingIndicatorProperty.labelOf(propertyName)
  }
}
