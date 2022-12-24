import { KeyNotFoundError } from '~/services/error'
import { isObject } from '~/services/type-helper'

export class PropertyPathResolver {
  private constructor() {
    //
  }

  private static joinPath(...components: string[]): string {
    return components.join('.')
  }

  private static splitPath(path: string): string[] {
    return path.split('.')
  }

  static listPathsOf(data: object, prefix: string | null = null): string[] {
    const paths = Object.keys(data).map(key => {
      const value = data[key]
      const path = prefix === null ? key : PropertyPathResolver.joinPath(prefix, key)

      if (Array.isArray(value)) {
        // NOTE: nested array property is currently not supported
        return []
      } else if (isObject(value)) {
        return PropertyPathResolver.listPathsOf(value, path)
      } else {
        return path
      }
    })

    return [].concat(...paths)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getPropertyOf(data: object, path: string): any {
    const [key, ...components] = PropertyPathResolver.splitPath(path)

    if (!(key in data)) {
      throw new KeyNotFoundError(`${key} does not exist in data`)
    }

    const value = data[key]
    if (components.length === 0) {
      return value
    }

    if (Array.isArray(value)) {
      throw new TypeError(`An array property is currently not supported`)
    } else if (isObject(value)) {
      return PropertyPathResolver.getPropertyOf(value, PropertyPathResolver.joinPath(...components))
    } else {
      throw new TypeError(`Can't access to a non-object property`)
    }
  }
}
