import { authRepository } from "@/database/repositories/auth.repository";
import kakaoLogin from "@/apis/kakao/kakaoLogin";
import kakaoId from "@/apis/kakao/kakaoId";
import { registerParams } from "@/utils/kakaoRegisterParams";

declare global {
  interface UserRegisterData {
    code: string;
  }
}

export const authService = {
  repository: authRepository,

  async registerUser(userRegisterData: UserRegisterData) {
    const { code } = userRegisterData;
    const kakao_login_response = await kakaoLogin(code);
    const kakao_info = await kakaoId(kakao_login_response.access_token);
    const kakaoData = registerParams(kakao_info, kakao_login_response);
    const newUser = await this.repository.registerUser(kakaoData);
    return newUser;
  },
};
