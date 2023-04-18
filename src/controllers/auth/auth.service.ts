import { authRepository } from "@/database/repositories/auth.repository";
import {
  kakaoLogin,
  kakaoId,
  kakaoLogout,
  kakaoRefresh,
} from "@/apis/kakao/index";

import uploadImageCloud from "@/apis/cloudinary/cloudinary";
import { registerParams } from "@/utils/kakaoRegisterParams";
import { toMySQLDate } from "@/utils/index";
import fs from "fs";

declare global {
  interface KakaoRegisterData {
    code: string;
  }
  interface AppRegisterData {
    profile_img: string;
    name: string;
    birthday: string;
    sex: Sex;
    category:
      | [Category]
      | [Category, Category]
      | [Category, Category, Category];
    age: Age;
    auth_id?: number;
  }
}

export const authService = {
  repository: authRepository,

  async registerKakao(userRegisterData: KakaoRegisterData) {
    const { code } = userRegisterData;
    const kakao_login_response = await kakaoLogin(code);
    const kakao_info = await kakaoId(kakao_login_response.access_token);
    // id가 db에 이미 존재하면 분기처리 => 로그인시키기
    const isIdExist = await this.repository.findbyId(kakao_info.id);
    if (isIdExist) {
      const currentDate = new Date();
      const updatedUser = await this.repository.updateAllTokens(
        kakao_info.id,
        kakao_login_response.access_token,
        kakao_login_response.expires_in,
        kakao_login_response.refresh_token,
        kakao_login_response.refresh_token_expires_in,
        currentDate
      );
      return updatedUser;
    } else {
      const kakaoData = registerParams(kakao_info, kakao_login_response);
      const newUser = await this.repository.registerKakao(kakaoData);
      return newUser;
    }
  },

  async test_access_token(access_token: string) {
    // check if access token is still valid
    const { id } = await kakaoId(access_token);
    const user_info = await this.repository.retrive_tokens(id);
    return user_info;
  },

  async refresh_tokens(id: number, refresh_token: string) {
    const {
      access_token,
      expires_in,
      refresh_token: ref_token,
      refresh_token_expires_in,
    } = await kakaoRefresh(refresh_token);
    const currentDate = new Date();
    if (ref_token) {
      await this.repository.updateRefreshToken(
        id,
        ref_token,
        refresh_token_expires_in!,
        currentDate
      );
      await this.repository.updateAccessToken(
        id,
        access_token,
        expires_in!,
        currentDate
      );
      return {
        id,
        access_token,
        access_token_expires_in: expires_in,
        refresh_token: ref_token,
        refresh_token_expires_in,
      };
    } else {
      await this.repository.updateAccessToken(
        id,
        access_token,
        expires_in!,
        currentDate
      );
      return {
        id,
        access_token,
        access_token_expires_in: expires_in,
      };
    }
  },

  async logout(id: number, access_token: string) {
    await kakaoLogout(access_token);
    await this.repository.logout(id);
  },

  async registerApp(req_data: AppRegisterData) {
    const { secure_url } = await uploadImageCloud(req_data.profile_img);
    fs.unlinkSync(req_data.profile_img);
    const date = toMySQLDate(req_data.birthday);
    const newUser = await this.repository.registerApp({
      ...req_data,
      profile_img: secure_url,
      birthday: date,
    });
    // 토큰 발급
    return newUser;
  },
};
