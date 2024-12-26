export abstract class BusinessError extends Error {
  key: string

  constructor(key: string) {
    super("")
    this.key = key
  }
}