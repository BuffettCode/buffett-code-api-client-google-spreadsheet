import { IndicatorProperty } from '../api/indicator-property'
import { QuarterProperty } from '../api/quarter-property'

export function bcodeLabel(propertyName: string): string {
  if (!propertyName) {
    throw new Error('<<propertyNameが有効ではありません>>')
  }

  const isQuarterProperty = QuarterProperty.isQuarterProperty(propertyName)
  const isIndicatorProperty = IndicatorProperty.isIndicatorProperty(
    propertyName
  )

  if (!isQuarterProperty && !isIndicatorProperty) {
    throw new Error(`<<指定された項目が見つかりません: ${propertyName}>>`)
  }

  if (isQuarterProperty) {
    return QuarterProperty.labelOf(propertyName)
  } else {
    return IndicatorProperty.labelOf(propertyName)
  }
}
