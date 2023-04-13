import { Router } from "express";
import { Controller } from "@/controllers/controller.interface";
import { asyncWrapper, validationMiddleware } from "@/middlewares/index";
import { StatusCodes } from "http-status-codes";
import validateRegistration from "./registration.validation";
import { customResponse } from "@/common/response";
import { authService } from "./auth.service";

class AuthController implements Controller {
  public path = "/auth";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route(`${this.path}/register`)
      .get(validationMiddleware(validateRegistration.create), this.kakaoLogin);
  }

  private kakaoLogin = asyncWrapper(async (req, res) => {
    const response = customResponse(res);
    try {
      const newUser = await authService.registerUser(req.body);
      response.success({ code: StatusCodes.CREATED, data: newUser });
    } catch (err: any) {
      response.error(err as ErrorData);
    }
  });
}

export default AuthController;
