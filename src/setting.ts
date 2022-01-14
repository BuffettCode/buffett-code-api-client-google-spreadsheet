export class Setting {
  static readonly tokenProperty = 'token'
  static readonly ondemandApiEnabledProperty = 'ondemand-api-enabled'
  static readonly forceOndemandApiEnabledProperty = 'force-ondemand-api-enabled'
  static readonly defaultToken = 'sAJGq9JH193KiwnF947v74KnDYkO7z634LWQQfPY'
  static readonly defaultOndemandApiEnabled = false
  static readonly defaultForceOndemandApiEnabled = false

  private constructor(private _token, private _ondemandApiEnabled, private _forceOndemandApiEnabled) {}

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

  public get forceOndemandApiEnabled(): boolean {
    return this._forceOndemandApiEnabled
  }

  public set forceOndemandApiEnabled(forceOndemandApiEnabled: boolean) {
    this._forceOndemandApiEnabled = forceOndemandApiEnabled
  }

  public setDefaultToken(): void {
    this._token = Setting.defaultToken
  }

  public setDefaultOndemandApiEnabled(): void {
    this._ondemandApiEnabled = Setting.defaultOndemandApiEnabled
  }

  public setDefaultForceOndemandApiEnabled(): void {
    this._forceOndemandApiEnabled = Setting.defaultForceOndemandApiEnabled
  }

  public toObject(): object {
    return {
      token: this.token,
      ondemandApiEnabled: this.ondemandApiEnabled,
      forceOndemandApiEnabled: this.forceOndemandApiEnabled
    }
  }

  public isValid(): boolean {
    if (!this._ondemandApiEnabled && this._forceOndemandApiEnabled) {
      return false
    }

    return true
  }

  public save(): void {
    if (!this.isValid()) {
      throw new Error('Setting is invalid state')
    }

    const props = PropertiesService.getUserProperties()
    props.setProperty(Setting.tokenProperty, this._token)
    props.setProperty(Setting.ondemandApiEnabledProperty, this._ondemandApiEnabled)
    props.setProperty(Setting.forceOndemandApiEnabledProperty, this._forceOndemandApiEnabled)
  }

  public static load(): Setting {
    const props = PropertiesService.getUserProperties()
    const token = props.getProperty(this.tokenProperty)
    const ondemandApiEnabled = props.getProperty(this.ondemandApiEnabledProperty) == 'true'
    const forceOndemandApiEnabled = props.getProperty(this.forceOndemandApiEnabledProperty) == 'true'
    const setting = new Setting(token, ondemandApiEnabled, forceOndemandApiEnabled)
    return setting
  }
}
