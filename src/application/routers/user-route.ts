import express, { Request, Response } from "express";
import { UserController } from "../controller/user-controller";

const userRoute = express.Router();
const userController = new UserController()

userRoute.post("/api/v1/auth/register", (req: Request, res: Response) =>
  userController.create(req, res)
);

export { userRoute };