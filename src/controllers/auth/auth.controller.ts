import { Router } from "express";
import { Controller } from "@/controllers/controller.interface";
import {
  asyncWrapper,
  validationMiddleware,
  validationPayload,
  checkAuthHeaders,
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
    this.router.route(`${this.path}/auto_login`).post(this.test_access_token);
    this.router
      .route(`${this.path}/register_profile_img`)
      .post(validationPayload(app_registration), this.app_register);
    this.router
      .route(`${this.path}/logout`)
      .post(checkAuthHeaders(), this.logout);
    this.router
      .route(`${this.path}/refresh_tokens`)
      .post(checkAuthHeaders(), this.refresh_tokens);
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

  /** 앱에 토큰 정보가 저장되어 있을경우 1) access token 검사 + 로그인 처리 */
  private test_access_token = asyncWrapper(async (req, res) => {
    const response = customResponse(res);
    const authHeader = req.headers.authorization;
    const access_token = authHeader && authHeader.split(" ")[1];
    // handle auth checker middleware
    console.log(access_token);
    try {
      const user_info = await authService.test_access_token(access_token!);
      response.success({
        code: StatusCodes.CREATED,
        data: user_info,
      });
    } catch (err) {
      response.error(err as ErrorData);
    }
  });

  /** accessToken 만료시 */
  private refresh_tokens = asyncWrapper(async (req: CustomRequest, res) => {
    const response = customResponse(res);
    const { id } = req.body;
    console.log(id);
    const refresh_token = req.token;
    console.log(refresh_token);
    try {
      const res = await authService.refresh_tokens(id, refresh_token!);
      response.success({
        code: StatusCodes.CREATED,
        data: res,
      });
    } catch (err) {
      response.error(err as ErrorData);
    }
  });

  /** logout */
  private logout = asyncWrapper(async (req: CustomRequest, res) => {
    const response = customResponse(res);
    const { id } = req.body;
    const access_token = req.token;
    try {
      await authService.logout(id, access_token!);
      response.success({
        code: StatusCodes.CREATED,
        data: `user ${id} logged out`,
      });
    } catch (err) {
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
