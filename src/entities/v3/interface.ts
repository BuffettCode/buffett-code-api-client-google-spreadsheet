export interface HasColumnDescription {
  propertyNames(): string[]

  labelOf(propertyName: string): string | null

  unitOf(propertyName: string): string | null
}

export interface HasPeriod<T> {
  period(): T
}
