export class InvalidValueError extends Error {
  key: string

  constructor(
    key: string
  ) {
    super(key)
  }
}