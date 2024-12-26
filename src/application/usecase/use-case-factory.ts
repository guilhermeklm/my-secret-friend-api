import { UserRepository } from "../../domain/user/repository/user-repository";
import { UserRepositoryImpl } from "../../repository/user/user-repository-impl";
import { CreateUser } from "./user/create-user";

export class UseCaseFactory {

  static createUserInstance(): CreateUser {
    const userRepository: UserRepository = new UserRepositoryImpl()
    return new CreateUser(userRepository)
  }
}