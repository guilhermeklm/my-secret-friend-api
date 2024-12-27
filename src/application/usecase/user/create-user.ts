import { UserRepository } from "../../../domain/user/repository/user-repository";
import { User } from "../../../domain/user/user";
import { CreateUserInputDTO } from "../../dto/input/create-user-input-dto";
import { CreateUserOuputDTO } from "../../dto/output/create-user-ouput-dto";
import { UseCaseBase } from "../use-case-base";
import jwt from "jsonwebtoken";
import { ContextLog, LevelLog, Logger } from "../../../domain/log/logger";

export class CreateUser implements UseCaseBase<CreateUserInputDTO, CreateUserOuputDTO> {

  private userRepository: UserRepository

  constructor(
    userRepository: UserRepository
  ) {
    this.userRepository = userRepository
  }

  async execute(input: CreateUserInputDTO): Promise<CreateUserOuputDTO> {
    Logger.builder()
      .withMessage("Iniciado criação do usuario")
      .withContext(ContextLog.CREATE_USER)
      .withCorrelationId(input.correlationId)
      .withLevel(LevelLog.INFO)
      .log()

    const user = User.New({
      name: input.name,
      email: input.email,
      password: input.password
    })

    const userId = await this.userRepository.create(user)

    const payload = {
      id: userId,
      name: user.name,
      email: user.email
    }

    const jwtSecret = process.env.JWT_SECRET
    const token = jwt.sign(payload, jwtSecret)

    const outputDto: CreateUserOuputDTO = {
      token: token
    }

    Logger.builder()
      .withMessage("Usuario criado e token definida")
      .withContext(ContextLog.CREATE_USER)
      .withCorrelationId(input.correlationId)
      .withLevel(LevelLog.INFO)
      .log()

    return Promise.resolve(outputDto)
  }
}