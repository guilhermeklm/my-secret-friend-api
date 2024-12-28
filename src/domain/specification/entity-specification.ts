import { SpecificationError } from "../exception/specification-error";
import { ContextLog, LevelLog, Logger } from "../log/logger";
import { ISpecification } from "./specification";
import { SpecificationResult } from "./specification-result";

export class EntitySpecifications<T> {
  private specifications: ISpecification<T>[];

  constructor(...specifications: ISpecification<T>[]) {
    this.specifications = specifications;
  }

  async isSatisfiedBy(entity: T, correlationId: string): Promise<void> {
    const errors: SpecificationError[] = [];

    for (const spec of this.specifications) {
      const result = await spec.isSatisfiedBy(entity);

      if (!result.isSatisfied) {
        errors.push(result.error);
        Logger.Error(result.error)
          .withCorrelationId(correlationId)
          .withClassError(result.className)
          .log()
        continue
      }

      Logger.Info(result.successMessage)
        .withCorrelationId(correlationId)
        .log()
    }

    if (errors.length > 0) {
      throw errors
    }
  }
}
