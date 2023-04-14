import { authRepository } from "@/database/repositories/auth.repository";
import kakaoLogin from "@/apis/kakao/kakaoLogin";
import kakaoId from "@/apis/kakao/kakaoId";
import uploadImageCloud from "@/apis/cloudinary/cloudinary";
import { registerParams } from "@/utils/kakaoRegisterParams";

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

  async registerApp(data: AppRegisterData) {
    console.log(await uploadImageCloud("asdf"));
  },
};
