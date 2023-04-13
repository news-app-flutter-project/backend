import { Router } from "express";
import { Controller } from "@/controllers/controller.interface";
import { asyncWrapper, validationMiddleware } from "@/middlewares/index";
import { StatusCodes } from "http-status-codes";
import validateRegistration from "./registration.validation";
import kakaoLogin from "@/apis/kakao/kakaoLogin";
import kakaoId from "@/apis/kakao/kakaoId";
import { userAuthRepository } from "@/database/repositories/user.auth.repository";
import { dbException } from "@/common/exceptions";
import { registerParams } from "./registerParams.utils";

class AuthController implements Controller {
  public path = "/kakao";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route(this.path)
      .get(validationMiddleware(validateRegistration.create), this.kakaoLogin);
  }

  private kakaoLogin = asyncWrapper(async (req, res) => {
    const { code } = req.body;
    const kakao_login_response = await kakaoLogin(code);
    if (kakao_login_response.status === 200) {
      const kakao_info = await kakaoId(kakao_login_response.access_token);
      if (kakao_info.status === 200) {
        const kakaoData = registerParams(
          kakao_info.data,
          kakao_login_response.data
        );
        try {
          const newUser = await userAuthRepository.registerUser(kakaoData);
          return res
            .status(StatusCodes.OK)
            .json({ result: true, data: newUser });
        } catch (err: any) {
          dbException(res, err);
        }
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        result: false,
        message: "code already used",
      });
    }
  });
}

export default AuthController;
