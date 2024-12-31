import { InfraestructureError } from "./infraestructure-error";

export class UserNotFoundError extends InfraestructureError {

  constructor() {
    super("user.infraestructure.error.user_not_found", 404)
  }
}