import { BusinessError } from "./business-error";

export class AuthenticationFailedError extends BusinessError {
  constructor() {
    super("user.business.error.authentication_failed", 401);
  }
}