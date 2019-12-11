export class Setting {
  static readonly tokenProperty = 'token'

  private constructor(private _token) {}

  public get token(): string {
    return this._token
  }

  public set token(token: string) {
    this._token = token
  }

  public save(): void {
    const props = PropertiesService.getUserProperties()
    props.setProperty(Setting.tokenProperty, this._token)
  }

  public static load(): Setting {
    const props = PropertiesService.getUserProperties()
    const token = props.getProperty(Setting.tokenProperty)
    const setting = new Setting(token)
    return setting
  }
}