import { BusinessError } from "../../../domain/exception/business-error";
import * as ptMessages from '../../../../messages/pt.json';

export class ApiResponseError {
  ts: Date;
  statusCode: number
  message: string

  constructor(
    error: Error
  ) {
    this.ts = new Date()
    this.statusCode = this.buildStatusCode(error)
    this.message = this.buildMessage(error)
  }

  private buildStatusCode(error: Error): number {
    if (error instanceof BusinessError) {
      return 400;
    } else {
      return 500
    }
  }

  private buildMessage(error: Error): string {
    if (error instanceof BusinessError) {
      const translatedMessage = ptMessages[error.key] || error.message;
      return translatedMessage;
    } else {
      return error.message
    }
  }
}