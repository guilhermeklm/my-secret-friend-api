import { UserNotFoundError } from "../../exception/user-not-found-error";
import { ISpecification } from "../../specification/specification";
import { SpecificationResult } from "../../specification/specification-result";
import { UserRepository } from "../repository/user-repository";
import { User } from "../user";

export class UserNotFoundSpecification implements ISpecification<User> {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async isSatisfiedBy(user: User): Promise<SpecificationResult> {
    const existsUser = await this.userRepository.existsUserByEmailAndPassword(user.email, user.password);

    if (!existsUser) {
      return SpecificationResult.error(
        new UserNotFoundError(),
        UserNotFoundSpecification.name
      );
    }

    return SpecificationResult.success(UserNotFoundSpecification.name);
  }
}
