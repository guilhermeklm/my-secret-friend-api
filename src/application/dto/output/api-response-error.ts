import { BusinessError } from "../../../domain/exception/business-error";
import * as ptMessages from '../../../../messages/pt.json';
import { SpecificationError } from "../../../domain/exception/specification-error";

export class ApiResponseError {
  ts: Date;
  statusCode: number
  messages: string[]

  constructor(
    error: Error
  ) {
    this.ts = new Date()
    this.statusCode = this.buildStatusCode(error)
    this.messages = this.buildMessage(error)
  }

  private buildStatusCode(error: Error): number {
    if (error instanceof BusinessError) {
      return 400;
    } else if (Array.isArray(error) && error.every(e => e instanceof SpecificationError)) {
      return 400
    } else {
      return 500
    }
  }

  private buildMessage(error: Error): string[] {
    if (error instanceof BusinessError) {
      const translatedMessage = ptMessages[error.keyMessage] || error.message;
      return [translatedMessage];
    } else if (Array.isArray(error) && error.every(e => e instanceof SpecificationError)) {
      return error.map(e => ptMessages[e.keyMessage] || e.keyMessage);
    } else {
      return [error.message];
    }
  }
}