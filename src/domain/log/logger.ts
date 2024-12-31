import * as ptMessages from '../../../messages/pt.json';
import { BusinessError } from "../exception/business-error";
import { version } from '../../../package.json';
import { SpecificationError } from '../exception/specification-error';

export class Logger {
  ts: Date;
  correlationId: string;
  message: string;
  version: string;
  userId?: string;
  context?: ContextLog;
  method?: string;
  statusCode?: number;
  durationMs?: number;
  stackTrace?: string;
  payload?: string;
  level?: LevelLog;
  responseData?: string;
  errorMessage?: string;
  classError?: string

  static builder(): LoggerBuilder {
    return new LoggerBuilder();
  }

  static Info(
    keyMessage: string
  ): LoggerBuilder {
    return new LoggerBuilder()
      .withLevel(LevelLog.INFO)
      .withMessage(keyMessage)
  }

  static Error(error: Error): LoggerBuilder {
    return new LoggerBuilder()
      .withLevel(LevelLog.ERROR)
      .withError(error);
  }

  static FatalError(error: Error): LoggerBuilder {
    return new LoggerBuilder()
      .withLevel(LevelLog.FATAL_ERROR)
      .withError(error);
  }

  static SpecificationError(keyMessages: string[]): LoggerBuilder {
    return new LoggerBuilder()
      .withErrorMessages(keyMessages)
      .withLevel(LevelLog.ERROR)
  }
}

export enum LevelLog {
  INFO = "INFO",
  WARM = "WARM",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
  FATAL_ERROR = "FATAL_ERROR"
}

export enum ContextLog {
  CREATE_USER = "CREATE_USER",
  LOGIN_USER = "LOGIN_USER"
}

class LoggerBuilder {
  private logger: Logger

  constructor() {
    this.logger = new Logger()
    this.logger.ts = new Date()
    this.logger.version = version
  }

  withCorrelationId(correlationId: string): this {
    this.logger.correlationId = correlationId;
    return this;
  }

  withUserId(userId: string): this {
    this.logger.userId = userId;
    return this;
  }

  withMessage(message: string): this {
    this.logger.message = ptMessages[message] || message;
    return this;
  }

  withContext(context: ContextLog): this {
    this.logger.context = context;
    return this;
  }

  withMethod(method: string): this {
    this.logger.method = method;
    return this;
  }

  withStatusCode(statusCode: number): this {
    this.logger.statusCode = statusCode;
    return this;
  }

  withDurationMs(durationMs: number): this {
    this.logger.durationMs = durationMs;
    return this;
  }

  withPayload(payload: any): this {
    this.logger.payload = payload;
    return this;
  }

  withLevel(level: LevelLog): this {
    this.logger.level = level;
    return this;
  }

  withResponseData(responseData: any): this {
    this.logger.responseData = JSON.stringify(responseData)
    return this
  }

  withErrorMessages(errorKeys: string[]): this {
    let message = ""
    for (const key of errorKeys) {
      const translatedMessage = ptMessages[key] || key;
      message += `${translatedMessage} - `
    }

    this.logger.errorMessage = message;
    return this
  }

  withError(error: Error): this {
    if (error instanceof BusinessError || error instanceof SpecificationError) {
      const translatedMessage = ptMessages[error.keyMessage] || error.message;
      this.logger.errorMessage = translatedMessage;
    } else {
      this.logger.errorMessage = error.message
    }

    this.logger.stackTrace = error.stack

    return this
  }

  withClassError(classError: string): this {
    this.logger.classError = classError;
    return this
  }

  log(): void {
    console.log(JSON.stringify(this.logger))
  }
}
