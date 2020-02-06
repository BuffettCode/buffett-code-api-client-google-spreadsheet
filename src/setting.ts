export class Setting {
  static readonly tokenProperty = 'token'
  static readonly defaultToken = 'sAJGq9JH193KiwnF947v74KnDYkO7z634LWQQfPY'

  private constructor(private _token) {}

  public get token(): string {
    return this._token
  }

  public set token(token: string) {
    this._token = token
  }

  public setDefaultToken(): void {
    this._token = Setting.defaultToken
  }

  public save(): void {
    const props = PropertiesService.getUserProperties()
    props.setProperty(Setting.tokenProperty, this._token)
  }

  public static load(): Setting {
    const props = PropertiesService.getUserProperties()
    const token = props.getProperty(this.tokenProperty)
    const setting = new Setting(token)
    return setting
  }
}
