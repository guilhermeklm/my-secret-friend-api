import { UserRepository } from "../../domain/user/repository/user-repository";
import { User } from "../../domain/user/user";
import { UserConverter } from "../converter/user-converter";
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

  async existsByEmail(email: string): Promise<boolean> {
    const user = await UserModel.findOne(
      {
        email: email
      }
    );

    if (user) {
      return true
    }

    return false
  }

  async existsUserByEmailAndPassword(email: string, password: string): Promise<boolean> {
    const user = await UserModel.findOne(
      {
        email: email,
        password: password
      }
    );

    if (user) {
      return true
    }

    return false
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User> {
    const user = await UserModel.findOne(
      {
        email: email,
        password: password
      }
    );

    return Promise.resolve(UserConverter.docToUser(user));
  }
}