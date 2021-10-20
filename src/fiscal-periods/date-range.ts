export class DateRange {
  constructor(readonly from: Date, readonly to: Date) {
    //
  }

  diff(): number {
    return Math.round(
      (this.to.getTime() - this.from.getTime()) / (1000 * 60 * 60 * 24)
    )
  }
}
