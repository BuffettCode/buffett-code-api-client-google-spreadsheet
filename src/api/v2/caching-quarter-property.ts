import { QuarterProperty } from '~/api/v2/quarter-property'
import { QuarterPropertyCache } from '~/services/quarter-property-cache'

export class CachingQuarterProperty extends QuarterProperty {
  static fetch(): object {
    const cached = QuarterPropertyCache.get()
    if (cached) {
      return cached
    } else {
      const res = super.fetch()
      QuarterPropertyCache.put(res)
      return res
    }
  }
}
