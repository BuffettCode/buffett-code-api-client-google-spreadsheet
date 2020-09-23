export class Setting {
  static readonly tokenProperty = 'token'
  static readonly ondemandApiEnabledProperty = 'ondemand-api-enabled'
  static readonly defaultToken = 'sAJGq9JH193KiwnF947v74KnDYkO7z634LWQQfPY'
  static readonly defaultOndemandApiEnabled = false

  private constructor(private _token, private _ondemandApiEnabled) {}

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

  public setDefaultToken(): void {
    this._token = Setting.defaultToken
  }

  public setDefaultOndemandApiEnabled(): void {
    this._ondemandApiEnabled = Setting.defaultOndemandApiEnabled
  }

  public toObject(): object {
    return {
      token: this.token,
      ondemandApiEnabled: this.ondemandApiEnabled
    }
  }

  public save(): void {
    const props = PropertiesService.getUserProperties()
    props.setProperty(Setting.tokenProperty, this._token)
    props.setProperty(
      Setting.ondemandApiEnabledProperty,
      this._ondemandApiEnabled
    )
  }

  public static load(): Setting {
    const props = PropertiesService.getUserProperties()
    const token = props.getProperty(this.tokenProperty)
    const ondemandApiEnabled =
      props.getProperty(this.ondemandApiEnabledProperty) == 'true'
    const setting = new Setting(token, ondemandApiEnabled)
    return setting
  }
}
