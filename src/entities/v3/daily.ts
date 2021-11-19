export class Daily {
  constructor(readonly data: object, readonly columnDescription: object) {
    // noop
  }

  static fromResponse(response: object): Daily {
    return new Daily(response['data'], response['column_description'])
  }

  static fromBulkResponse(response: object): Daily[] {
    return Object.keys(response['data']).map(key => {
      return new Daily(response['data'][key], response['column_description'])
    })
  }
}
