export class SpecificationError extends Error {
  keyMessage: string

  constructor(
    keyMessage: string,
  ) {
    super(`Erro na specification: ${keyMessage} `)
    this.keyMessage = keyMessage
  }
}