import { UserRepository } from "../../domain/user/repository/user-repository";
import { User } from "../../domain/user/user";
import { UserModel } from "../mongodb/user-schema";

export class UserRepositoryImpl implements UserRepository {

  async create(user: User): Promise<string> {
    const newUser = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password
    })

    return newUser._id.toString();
  }
}