import * as ptMessages from '../../../messages/pt.json';
import { BusinessError } from "../exception/business-error";

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

  static builder(): LoggerBuilder {
    return new LoggerBuilder();
  }
}

export enum LevelLog {
  INFO = "INFO",
  WARM = "WARM",
  ERROR = "ERROR",
  DEBUG = "DEBUG"
}

export enum ContextLog {
  CREATE_USER = "CREATE_USER"
}

export class LoggerBuilder {
  private logger: Logger

  constructor() {
    this.logger = new Logger()
    this.logger.ts = new Date()
    this.logger.version = process.env.VERSION as string
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
    this.logger.message = message;
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

  withError(error: Error): this {
    if(error instanceof BusinessError) {
      const translatedMessage = ptMessages[error.key] || error.message;
      this.logger.errorMessage = translatedMessage;
    } else {
      this.logger.errorMessage = error.message
    }

    this.logger.stackTrace = error.stack

    return this
  }

  log(): void {
    if (!this.logger.correlationId) {
      throw new Error("correlationId is required");
    }

    if (!this.logger.message) {
      throw new Error("message is required");
    }

    if (!this.logger.level) {
      throw new Error("level is required");
    }

    console.log(JSON.stringify(this.logger))
  }
}
