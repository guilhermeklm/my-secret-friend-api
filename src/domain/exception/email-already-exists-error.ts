import { SpecificationError } from "./specification-error";

export class EmailAlreadyExistsError extends SpecificationError {

  constructor() {
    super("user.business.error.email_already_exists")
  }
}