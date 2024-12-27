import { Request, Response } from "express";
import { CreateUserInputDTO } from "../dto/input/create-user-input-dto";
import { CreateUser } from "../usecase/user/create-user";
import { ContextLog, LevelLog, Logger } from "../../domain/log/logger";
import { ApiResponseError } from "../dto/output/api-response-error";
import { ApiResponseSuccess } from "../dto/output/api-response-success";
import { UseCaseFactory } from "../usecase/use-case-factory";

export class UserController {

  private createUser: CreateUser

  constructor() {
    this.createUser = UseCaseFactory.createUserInstance()
  }

  public async create(req: Request, res: Response) {
    const startTime = Date.now();
    const correlationId = req.get("X-CORRELATION-ID");

    try {
      Logger.builder()
        .withMessage("Processo de criação de usuário iniciado")
        .withContext(ContextLog.CREATE_USER)
        .withLevel(LevelLog.INFO)
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

      Logger.builder()
        .withMessage("Usuário criado com sucesso")
        .withContext(ContextLog.CREATE_USER)
        .withLevel(LevelLog.INFO)
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

      Logger.builder()
        .withMessage("user.application.error.user_creation_failed")
        .withError(error)
        .withContext(ContextLog.CREATE_USER)
        .withLevel(LevelLog.ERROR)
        .withMethod(req.method)
        .withCorrelationId(correlationId)
        .withDurationMs(durationMs)
        .log();

      res.status(apiResponseError.statusCode).json(apiResponseError);
    }
  }

}