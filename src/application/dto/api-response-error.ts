import { BusinessError } from "../../domain/exception/business-error";
import * as ptMessages from '../../../messages/pt.json';
import { SpecificationError } from "../../domain/exception/specification-error";
import { InfraestructureError } from "../../domain/exception/infraestructure-error";

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
      return error.statusCode;
    } else if (Array.isArray(error) && error.every(e => e instanceof SpecificationError)) {
      return 400
    } else if (error instanceof InfraestructureError) {
      return error.statusCode
    } else {
      return 500
    }
  }

  private buildMessage(error: Error): string[] {
    if (error instanceof BusinessError || error instanceof InfraestructureError) {
      const translatedMessage = ptMessages[error.keyMessage] || error.message;
      return [translatedMessage];
    } else if (Array.isArray(error) && error.every(e => e instanceof SpecificationError)) {
      return error.map(e => ptMessages[e.keyMessage] || e.keyMessage);
    } else {
      return [error.message];
    }
  }
}