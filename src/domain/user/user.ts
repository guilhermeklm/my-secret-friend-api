import { InvalidValueError } from "../exception/invalid-value-error";

export class User {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;

  private constructor(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    this._id = id
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new InvalidValueError("user.business.error.user_email_invalid");
    }

    if (!this.password) {
      throw new InvalidValueError("user.business.error.user_password_empty")
    }
  }

  public static New(prop: UserProp) {
    return new User(
      prop.id,
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

  get id() {
    return this._id
  }
}

export interface UserProp {
  id?: string;
  name: string;
  email: string;
  password: string;
}