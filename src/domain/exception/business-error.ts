export class BusinessError extends Error {
  keyMessage: string
  statusCode: number

  constructor(keyMessage: string, statusCode: number = 400) {
    super(`Erro de negocio: ${keyMessage} `)
    this.keyMessage = keyMessage
    this.statusCode = statusCode
  }
}