import { authRepository } from "@/database/repositories/auth.repository";
import kakaoLogin from "@/apis/kakao/kakaoLogin";
import kakaoId from "@/apis/kakao/kakaoId";
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
    const kakaoData = registerParams(kakao_info, kakao_login_response);
    const newUser = await this.repository.registerKakao(kakaoData);
    return newUser;
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
    return newUser;
  },
};
