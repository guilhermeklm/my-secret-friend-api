export class InfraestructureError extends Error {
  keyMessage: string
  statusCode: number

  constructor(keyMessage: string, statusCode: number = 500) {
    super(`Erro de infra: ${keyMessage} `)
    this.keyMessage = keyMessage
    this.statusCode = statusCode
  }
}