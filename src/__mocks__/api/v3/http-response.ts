// GoogleAppsScript.URL_Fetch.HTTPResponseと同じI/F
export class HTTPResnpose {
  getResponseCode(): number {
    return 404
  }

  getContent(): number[] {
    const text = this.getContentText()
    const content = []

    for (let i = 0; i < text.length; i++) {
      content.push(text.charCodeAt(i))
    }

    return content
  }

  getContentText(): string {
    return 'NOT FOUND'
  }

  getAllHeaders(): object {
    return {}
  }

  getHeaders(): object {
    return {}
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAs(contentType: string): GoogleAppsScript.Base.Blob {
    return null
  }

  getBlob(): GoogleAppsScript.Base.Blob {
    return null
  }
}
