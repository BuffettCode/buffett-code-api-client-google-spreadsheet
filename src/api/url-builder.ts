export class UrlBuilder {
  constructor(private _endpoint, private _parameters: object) {}

  private buildQueryString(): string {
    return Object.keys(this._parameters)
      .map(key => {
        return key + '=' + encodeURIComponent(this._parameters[key])
      })
      .join('&')
  }

  public toString(): string {
    return `${this._endpoint}?${this.buildQueryString()}`
  }
}
