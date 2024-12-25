import { CreateUserInputDTO } from "../../application/dto/input/create-user-input-dto";
import { CreateUserOuputDTO } from "../../application/dto/output/create-user-ouput-dto";
import { UseCaseBase } from "../use-case-base";

export class CreateUser implements UseCaseBase<CreateUserInputDTO, CreateUserOuputDTO> {
  
  execute(input: CreateUserInputDTO): Promise<CreateUserOuputDTO> {
    throw new Error("Method not implemented.");
  }
}