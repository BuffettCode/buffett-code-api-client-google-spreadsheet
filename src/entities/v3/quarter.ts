export class Quarter {
  constructor(readonly data: object, readonly columnDescription: object) {
    // noop
  }

  static fromResponse(response: object): Quarter {
    return new Quarter(response['data'], response['column_description'])
  }

  static fromBulkResponse(response: object): Quarter[] {
    return Object.keys(response['data']).map(key => {
      return new Quarter(response['data'][key], response['column_description'])
    })
  }
}
