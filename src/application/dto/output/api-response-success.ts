import * as ptMessages from '../../../../messages/pt.json';

export class ApiResponseSuccess {
  ts: Date;
  statusCode: number;
  message?: string;
  data?: any;

  constructor(
    statusCode: number,
    keyMessage: string,
    data: any
  ) {
    this.ts = new Date()
    this.statusCode = statusCode
    this.message = ptMessages[keyMessage]
    this.data = data
  }
}
