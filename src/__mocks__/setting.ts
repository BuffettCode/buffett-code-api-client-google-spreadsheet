export class Setting {
  private constructor() {
    //
  }

  static load(): object {
    return { token: 'foo' }
  }
}
