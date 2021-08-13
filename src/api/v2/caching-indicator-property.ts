import { IndicatorProperty } from './indicator-property'
import { IndicatorPropertyCache } from '../../services/indicator-property-cache'

export class CachingIndicatorProperty extends IndicatorProperty {
  static fetch(): object {
    const cached = IndicatorPropertyCache.get()
    if (cached) {
      return cached
    } else {
      const res = super.fetch()
      IndicatorPropertyCache.put(res)
      return res
    }
  }
}
