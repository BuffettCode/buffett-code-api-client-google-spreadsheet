export interface HasData {
  propertyNames(): string[]

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueOf(propertyName: string): any
}

export interface HasColumnDescription {
  propertyNames(): string[]

  labelOf(propertyName: string): string | null

  unitOf(propertyName: string): string | null
}

export interface HasPeriod<T> {
  period(): T
}
