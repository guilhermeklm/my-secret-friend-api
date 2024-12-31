import * as jwt from 'jsonwebtoken';
import { UserRepository } from "../../domain/user/repository/user-repository";
import { LoginUserInputDTO } from "../dto/input/login-user-input.dto";
import { LoginUserOutputDTO } from "../dto/output/login-user-output-dto";
import { UseCaseBase } from "../use-case-base";
import { ContextLog, Logger } from "../../domain/log/logger";
import { UserNotFoundError } from "../../domain/exception/user-not-found-error";
import { AuthenticationFailedError } from '../../domain/exception/authentication-failed-error';

export class LoginUser implements UseCaseBase<LoginUserInputDTO, LoginUserOutputDTO> {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute(input: LoginUserInputDTO): Promise<LoginUserOutputDTO> {
    Logger.Info("Iniciado login do usuario")
      .withContext(ContextLog.CREATE_USER)
      .withCorrelationId(input.correlationId)
      .log()

    const user = await this.userRepository.findByEmailAndPassword(input.email, input.password)

    if (!user) {
      throw new AuthenticationFailedError()
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    const jwtSecret = process.env.JWT_SECRET
    const token = jwt.sign(payload, jwtSecret)

    const outputDto: LoginUserOutputDTO = {
      token: token
    }

    Logger.Info("Token do usuário criado")
      .withContext(ContextLog.CREATE_USER)
      .withCorrelationId(input.correlationId)
      .log()

    return Promise.resolve(outputDto)
  }
}