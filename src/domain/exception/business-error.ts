export class BusinessError extends Error {
  keyMessage: string

  constructor(keyMessage: string) {
    super(`Erro de dominio: ${keyMessage} `)
    this.keyMessage = keyMessage
  }
}