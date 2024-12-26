import { InvalidValueError } from "../exception/invalid-value-error";

export class User {
  private _name: string;
  private _email: string;
  private _password: string;

  private constructor(
    name: string,
    email: string,
    password: string
  ) {
    this._name = name
    this._email = email
    this._password = password
    this.validate()
  }

  private validate() {
    if (!this.name) {
      throw new InvalidValueError("user.business.error.user_name_is_empty")
    }

    if (!this.email) {
      throw new InvalidValueError("user.business.error.user_email_is_empty")
    }

    if (!this.password) {
      throw new InvalidValueError("user.business.error.user_password_empty")
    }
  }

  public static New(prop: UserProp) {
    return new User(
      prop.name,
      prop.email,
      prop.password
    )
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
  }

  get password() {
    return this._password
  }
}

export interface UserProp {
  name: string;
  email: string;
  password: string;
}