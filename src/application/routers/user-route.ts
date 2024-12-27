import express, { Request, Response } from "express";
import { UserController } from "../controller/user-controller";

const userRoute = express.Router();
const userController = new UserController();

userRoute.post("/v1/auth/register", (req: Request, res: Response) =>
  /* 
    #swagger.tags = ['Autenticação']
    #swagger.description = 'Endpoint para criar um novo usuário no sistema.'

    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Dados necessários para criar um usuário.',
      required: true,
      schema: {
          $name: 'João Silva',
          $email: 'joao.silva@example.com',
          $password: 'senha123'
        }
      }
    }

    #swagger.responses[201] = {
      description: 'Usuário criado com sucesso.',
      schema: {
        statusCode: 201,
        message: '"Usuário criado com sucesso!',
        data: {
          token: 'token_jwt'
        }
      }
    }

    #swagger.responses[400] = {
      description: 'Requisição inválida. Erro nos parâmetros enviados.',
      schema: {
        ts: "Data-hora-atual",
        statusCode: 400,
        message: 'Erro',
      }
    }

    #swagger.responses[500] = {
      description: 'Erro interno no servidor.',
      schema: {
        ts: "Data-hora-atual",
        statusCode: 500,
        message: 'Erro',
      }
    }
  */
  userController.create(req, res)
);

export { userRoute };
