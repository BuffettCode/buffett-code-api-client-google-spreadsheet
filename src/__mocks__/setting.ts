export class Setting {
  private constructor() {
    //
  }

  static load(): object {
    return {
      token: 'foo',
      ondemandApiEnabled: false,
      ondemandApiCallMode: 'default',
      isOndemandApiCallModeDefault: (): boolean => true,
      isOndemandApiCallModeForce: (): boolean => false
    }
  }
}
