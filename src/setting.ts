export class Setting {
  static readonly ondemandApiCallModes = {
    DEFAULT: 'default',
    FORCE: 'force'
  } as const

  static readonly tokenProperty = 'token'
  static readonly ondemandApiEnabledProperty = 'ondemand-api-enabled'
  static readonly ondemandApiCallModeProperty = 'ondemand-api-call-mode'

  static readonly defaultToken = 'sAJGq9JH193KiwnF947v74KnDYkO7z634LWQQfPY'
  static readonly defaultOndemandApiEnabled = false
  static readonly defaultOndemandApiCallMode = Setting.ondemandApiCallModes.DEFAULT

  private constructor(
    private _token: string,
    private _ondemandApiEnabled: boolean,
    private _ondemandApiCallMode: 'default' | 'force'
  ) {}

  public get token(): string {
    return this._token
  }

  public set token(token: string) {
    this._token = token
  }

  public get ondemandApiEnabled(): boolean {
    return this._ondemandApiEnabled
  }

  public set ondemandApiEnabled(ondemandApiEnabled: boolean) {
    this._ondemandApiEnabled = ondemandApiEnabled
  }

  public get ondemandApiCallMode(): 'default' | 'force' {
    return this._ondemandApiCallMode
  }

  public set ondemandApiCallMode(ondemandApiCallMode: 'default' | 'force') {
    this._ondemandApiCallMode = ondemandApiCallMode
  }

  public setDefaultToken(): void {
    this._token = Setting.defaultToken
  }

  public setDefaultOndemandApiEnabled(): void {
    this.ondemandApiEnabled = Setting.defaultOndemandApiEnabled
  }

  public setDefaultOndemandApiCallMode(): void {
    this.ondemandApiCallMode = Setting.defaultOndemandApiCallMode
  }

  public toObject(): object {
    return {
      token: this.token,
      ondemandApiEnabled: this.ondemandApiEnabled,
      ondemandApiCallMode: this.ondemandApiCallMode
    }
  }

  public isOndemandApiCallModeDefault(): boolean {
    return this.ondemandApiCallMode === Setting.ondemandApiCallModes.DEFAULT
  }

  public isOndemandApiCallModeForce(): boolean {
    return this.ondemandApiCallMode === Setting.ondemandApiCallModes.FORCE
  }

  public isValid(): boolean {
    if (!Setting.validOndemanApiCallModes().includes(this.ondemandApiCallMode)) {
      return false
    }

    if (!this.ondemandApiEnabled && this.ondemandApiCallMode !== Setting.defaultOndemandApiCallMode) {
      return false
    }

    return true
  }

  public save(): void {
    if (!this.isValid()) {
      throw new Error('Setting is invalid state')
    }

    const props = PropertiesService.getUserProperties()
    props.setProperty(Setting.tokenProperty, this.token)
    props.setProperty(Setting.ondemandApiEnabledProperty, this.ondemandApiEnabled.toString())
    props.setProperty(Setting.ondemandApiCallModeProperty, this.ondemandApiCallMode)
  }

  public static castOndemandApiCallModeString(ondemandApiCallModeString: string): 'default' | 'force' {
    if (ondemandApiCallModeString === 'default' || ondemandApiCallModeString === 'force') {
      return ondemandApiCallModeString
    } else {
      return 'default'
    }
  }

  public static validOndemanApiCallModes(): string[] {
    return Object.values(Setting.ondemandApiCallModes)
  }

  public static load(): Setting {
    const props = PropertiesService.getUserProperties()
    const token = props.getProperty(this.tokenProperty)
    const ondemandApiEnabled = props.getProperty(this.ondemandApiEnabledProperty) == 'true'
    const ondemandApiCallMode = Setting.castOndemandApiCallModeString(
      props.getProperty(this.ondemandApiCallModeProperty)
    )

    const setting = new Setting(token, ondemandApiEnabled, ondemandApiCallMode)
    return setting
  }
}
