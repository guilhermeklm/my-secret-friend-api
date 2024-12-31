import { User, UserProp } from "./user";
import { InvalidValueError } from "../exception/invalid-value-error";

describe("User", () => {
  test("should create a new user with valid properties", () => {
    const userProps: UserProp = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123"
    };

    const user = User.New(userProps);

    expect(user.id).toBe(userProps.id);
    expect(user.name).toBe(userProps.name);
    expect(user.email).toBe(userProps.email);
    expect(user.password).toBe(userProps.password);
  });

  test("should throw an error if name is empty", () => {
    const userProps: UserProp = {
      id: "1",
      name: "",
      email: "john.doe@example.com",
      password: "password123"
    };

    expect(() => User.New(userProps)).toThrow(InvalidValueError);
    expect(() => User.New(userProps)).toThrow("user.business.error.user_name_is_empty");
  });

  test("should throw an error if email is empty", () => {
    const userProps: UserProp = {
      id: "1",
      name: "John Doe",
      email: "",
      password: "password123"
    };

    expect(() => User.New(userProps)).toThrow(InvalidValueError);
    expect(() => User.New(userProps)).toThrow("user.business.error.user_email_is_empty");
  });

  test("should throw an error if password is empty", () => {
    const userProps: UserProp = {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      password: ""
    };

    expect(() => User.New(userProps)).toThrow(InvalidValueError);
    expect(() => User.New(userProps)).toThrow("user.business.error.user_password_empty");
  });

  test("should throw an error if email is invalid", () => {
    const userProps: UserProp = {
      id: "1",
      name: "John Doe",
      email: "invalid-email",
      password: "password123"
    };

    expect(() => User.New(userProps)).toThrow(InvalidValueError);
    expect(() => User.New(userProps)).toThrow("user.business.error.user_email_invalid");
  });

  test("should throw an error if email contains spaces", () => {
    const userProps: UserProp = {
      id: "1",
      name: "John Doe",
      email: "john doe@example.com",
      password: "password123"
    };

    expect(() => User.New(userProps)).toThrow(InvalidValueError);
    expect(() => User.New(userProps)).toThrow("user.business.error.user_email_invalid");
  });

  test("should throw an error if email is missing '@' symbol", () => {
    const userProps: UserProp = {
      id: "1",
      name: "John Doe",
      email: "johndoeexample.com",
      password: "password123"
    };

    expect(() => User.New(userProps)).toThrow(InvalidValueError);
    expect(() => User.New(userProps)).toThrow("user.business.error.user_email_invalid");
  });

  test("should throw an error if email is missing domain", () => {
    const userProps: UserProp = {
      id: "1",
      name: "John Doe",
      email: "john.doe@",
      password: "password123"
    };

    expect(() => User.New(userProps)).toThrow(InvalidValueError);
    expect(() => User.New(userProps)).toThrow("user.business.error.user_email_invalid");
  });
});