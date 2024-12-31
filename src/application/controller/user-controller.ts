import { Request, Response } from "express";
import { CreateUser } from "../../usecase/user/create-user";
import { ContextLog, Logger } from "../../domain/log/logger";
import { UseCaseFactory } from "../../usecase/use-case-factory";
import { ApiResponseError } from "../dto/api-response-error";
import { ApiResponseSuccess } from "../dto/api-response-success";
import { LoginUserInputDTO } from "../../usecase/dto/input/login-user-input.dto";
import { CreateUserInputDTO } from "../../usecase/dto/input/create-user-input-dto";
import { LoginUser } from "../../usecase/user/login-user";

export class UserController {

  private createUser: CreateUser
  private loginUser: LoginUser

  constructor() {
    this.createUser = UseCaseFactory.createUserInstance()
    this.loginUser = UseCaseFactory.loginUserInstance()
  }

  public async create(req: Request, res: Response) {
    const startTime = Date.now();
    const correlationId = req.get("X-CORRELATION-ID");

    try {
      Logger.Info("Processo de criação de usuário iniciado")
        .withContext(ContextLog.CREATE_USER)
        .withMethod(req.method)
        .withCorrelationId(correlationId)
        .log();

      const body = req.body;
      const dto: CreateUserInputDTO = {
        name: body.name,
        email: body.email,
        password: body.password,
        correlationId: correlationId,
      };

      const response = await this.createUser.execute(dto);

      const durationMs = Date.now() - startTime;

      Logger.Info("Usuário criado com sucesso")
        .withContext(ContextLog.CREATE_USER)
        .withMethod(req.method)
        .withCorrelationId(correlationId)
        .withResponseData(response)
        .withDurationMs(durationMs)
        .withStatusCode(201)
        .log();

      const apiResponseSuccess = new ApiResponseSuccess(
        201,
        "user.application.success.user_created",
        response
      )

      res.status(201).json(apiResponseSuccess);
    } catch (error) {
      const durationMs = Date.now() - startTime;

      const apiResponseError = new ApiResponseError(error)

      Logger.Error(error)
        .withContext(ContextLog.CREATE_USER)
        .withMethod(req.method)
        .withCorrelationId(correlationId)
        .withDurationMs(durationMs)
        .log();

      res.status(apiResponseError.statusCode).json(apiResponseError);
    }
  }

  public async login(req: Request, res: Response) {
    const startTime = Date.now();
    const correlationId = req.get("X-CORRELATION-ID");

    try {
      Logger.Info("Processo de login do usuario iniciado")
        .withContext(ContextLog.CREATE_USER)
        .withMethod(req.method)
        .withCorrelationId(correlationId)
        .log();

      const body = req.body;

      const dto: LoginUserInputDTO = {
        email: body.email,
        password: body.password,
        correlationId: correlationId,
      };

      const outputDto = await this.loginUser.execute(dto);

      const apiResponseSuccess = new ApiResponseSuccess(
        200,
        "user.application.success.login_sucessed",
        outputDto
      )

      res.status(200).json(apiResponseSuccess);
    } catch (error) {
      const durationMs = Date.now() - startTime;

      const apiResponseError = new ApiResponseError(error)

      Logger.Error(error)
        .withContext(ContextLog.CREATE_USER)
        .withMethod(req.method)
        .withCorrelationId(correlationId)
        .withDurationMs(durationMs)
        .log();

      res.status(apiResponseError.statusCode).json(apiResponseError);
    }
  }

}