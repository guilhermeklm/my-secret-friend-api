import { EmailAlreadyExistsError } from "../../exception/email-already-exists-error";
import { ISpecification } from "../../specification/specification";
import { SpecificationResult } from "../../specification/specification-result";
import { UserRepository } from "../repository/user-repository";
import { User } from "../user";

export class EmailAlreadyExistsSpecification implements ISpecification<User> {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async isSatisfiedBy(user: User): Promise<SpecificationResult> {
    const existsEmail = await this.userRepository.existsByEmail(user.email);

    if (existsEmail) {
      return SpecificationResult.error(
        new EmailAlreadyExistsError(),
        EmailAlreadyExistsSpecification.name
      );
    }

    return SpecificationResult.success(EmailAlreadyExistsSpecification.name);
  }
}
