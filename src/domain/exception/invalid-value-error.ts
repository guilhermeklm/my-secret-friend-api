import { BusinessError } from "./business-error"

export class InvalidValueError extends BusinessError {
  key: string

  constructor(
    key: string
  ) {
    super(key)
  }
}