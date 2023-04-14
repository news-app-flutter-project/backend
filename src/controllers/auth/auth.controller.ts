import { Router } from "express";
import { Controller } from "@/controllers/controller.interface";
import {
  asyncWrapper,
  validationMiddleware,
  validationPayload,
} from "@/middlewares/index";
import { StatusCodes } from "http-status-codes";
import { kakao_registration, app_registration } from "./auth.validation";
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
      .post(validationMiddleware(kakao_registration), this.kakao_register);
    this.router
      .route(`${this.path}/register_profile_img`)
      .post(validationPayload(app_registration), this.app_register);
  }
  /** 처음 카카오로 회원가입 (미완료 상태) */
  private kakao_register = asyncWrapper(async (req, res) => {
    const response = customResponse(res);
    try {
      const newUser = await authService.registerKakao(req.body);
      response.success({ code: StatusCodes.CREATED, data: newUser });
    } catch (err: any) {
      response.error(err as ErrorData);
    }
  });
  /** 뉴스앱 회원가입 완료 */
  private app_register = asyncWrapper(async (req, res) => {
    const response = customResponse(res);
    const files: any = req.files;
    const req_data = {
      profile_img: files.image.tempFilePath,
      ...JSON.parse(req.body.payload),
    };
    try {
      const data = await authService.registerApp(req_data);
      return res.status(StatusCodes.OK).json({ result: true, data });
    } catch (err: any) {
      response.error(err as ErrorData);
    }
  });
}

export default AuthController;
