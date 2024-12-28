import { SpecificationResult } from "./specification-result";

export interface ISpecification<T> {
  isSatisfiedBy(entity: T): Promise<SpecificationResult>
}