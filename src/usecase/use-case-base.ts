export interface UseCaseBase<Input, Output> {
  execute(input: Input): Promise<Output>
}