import { Router } from "express";
import { asyncWrapper } from "@/middlewares/index";
import { StatusCodes } from "http-status-codes";
import { createAuthRoutes } from "./auth.routes";
import { customResponse } from "@/common/response";
import { authServiceFinal } from "./auth.service";
import { createRoutes } from "@/common/createRouter";

class AuthControllerFinal implements Controller {
  public path = "/authFinal";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const authRoutes: AuthRoutes = createAuthRoutes(
      this.path,
      this.login,
      this.logout,
      this.token_login,
      this.refresh_tokens
    );

    createRoutes(authRoutes, this.router);
  }

  private login = asyncWrapper(async (req, res) => {
    const response = customResponse(res);
    const { code } = req.body;
    try {
      const res = await authServiceFinal.login(code);
      response.success({ code: StatusCodes.CREATED, data: res });
    } catch (err) {
      response.error(err as ErrorData);
    }
  });

  private logout = asyncWrapper(async (req: CustomRequest, res) => {
    const response = customResponse(res);
    const { id } = req.body;
    const access_token = req.token;
    try {
      await authServiceFinal.logout(id, access_token!);
      response.success({ code: StatusCodes.CREATED });
    } catch (err) {
      response.error(err as ErrorData);
    }
  });

  private token_login = asyncWrapper(async (req: CustomRequest, res) => {
    const response = customResponse(res);
    const access_token = req.token;

    try {
      const res = await authServiceFinal.token_login(access_token!);
      response.success({ code: StatusCodes.CREATED, data: res });
    } catch (err) {
      response.error(err as ErrorData);
    }
  });

  private refresh_tokens = asyncWrapper(async (req: CustomRequest, res) => {
    const response = customResponse(res);
    const refresh_token = req.token;

    try {
      const res = await authServiceFinal.refresh_tokens(refresh_token!);
      response.success({ code: StatusCodes.CREATED, data: res });
    } catch (err) {
      response.error(err as ErrorData);
    }
  });
}

export default AuthControllerFinal;
