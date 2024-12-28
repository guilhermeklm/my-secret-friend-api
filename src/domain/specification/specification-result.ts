import { SpecificationError } from "../exception/specification-error";

export class SpecificationResult {
  isSatisfied: boolean;
  error: SpecificationError;
  className: string;
  successMessage: string;

  private constructor(
    isSatisfied: boolean,
    error: SpecificationError,
    className: string,
    successMessage: string
  ) {
    this.isSatisfied = isSatisfied;
    this.error = error;
    this.className = className;
    this.successMessage = successMessage;
  }

  static success(className: string): SpecificationResult {
    return new SpecificationResult(
      true,
      null,
      className,
      `Specification ${className} was successfully satisfied.`
    );
  }

  static error(error: SpecificationError, className: string): SpecificationResult {
    return new SpecificationResult(
      false,
      error,
      className,
      null
    );
  }
}
