import { Router } from "express";
import { Controller } from "@/controllers/controller.interface";
import { asyncWrapper, validationMiddleware } from "@/middlewares/index";
import { StatusCodes } from "http-status-codes";
import validateKakaoLogin from "./kakao.login.validation";
import kakaoLogin, { IKakaoRegisterRes } from "@/apis/kakao/kakaoLogin";
import kakaoId, { IKakaoIdRes } from "@/apis/kakao/kakaoId";
import { userAuthRepository } from "@/database/repositories/user.auth.repository";
import { dbException } from "@/common/exceptions";

class UserAuthController implements Controller {
  public path = "/kakao";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router
      .route(this.path)
      .get(validationMiddleware(validateKakaoLogin.create), this.kakaoLogin);
  }

  private kakaoLogin = asyncWrapper(async (req, res) => {
    const { code } = req.body;
    const kakao_login_response = await kakaoLogin(code);
    if (kakao_login_response.status === 200) {
      const tokenInfo: IKakaoRegisterRes = kakao_login_response.data;
      const kakao_info = await kakaoId(tokenInfo.access_token);
      if (kakao_info.status === 200) {
        const kakao_info_data: IKakaoIdRes = kakao_info.data;
        const {
          access_token,
          refresh_token,
          expires_in,
          refresh_token_expires_in,
        } = tokenInfo;
        const { id } = kakao_info_data;
        const currentDate = new Date();
        const kakaoData = {
          kakao_id: id,
          kakao_access_token: access_token,
          kakao_access_token_expires_in: expires_in,
          kakao_access_token_date: currentDate,
          kakao_refresh_token: refresh_token,
          kakao_refresh_token_expires_in: refresh_token_expires_in,
          kakao_refresh_token_date: currentDate,
        };
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

export default UserAuthController;
