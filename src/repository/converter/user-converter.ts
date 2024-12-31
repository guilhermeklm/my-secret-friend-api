import { User } from "../../domain/user/user";

export class UserConverter {

  static docToUser(doc: any): User {
    if (!doc) {
      return null;
    }

    return User.New({
      name: doc.name,
      email: doc.email,
      password: doc.password
    });
  }
}