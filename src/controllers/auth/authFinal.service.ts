import { authRepositoryFinal } from "@/database/repositories/authFinal.repository";
import {
  kakaoLogin,
  kakaoId,
  kakaoLogout,
  kakaoRefresh,
} from "@/apis/kakao/index";
import { registerParams } from "@/utils/kakaoRegisterParams";
import { notFoundAccountException } from "@/common/exceptions";

export const authServiceFinal = {
  repository: authRepositoryFinal,

  async login(code: string) {
    const kakao_login_response = await kakaoLogin(code);
    const kakao_info = await kakaoId(kakao_login_response.access_token);
    const user = await this.repository.findbyKakaoId(kakao_info.id);
    const kakaoData = registerParams(kakao_info, kakao_login_response);

    if (user) {
      const updatedTokens = await this.repository.updateAllTokens(kakaoData);
      return { id: user, ...updatedTokens };
    } else {
      return await this.repository.createUser(kakaoData);
    }
  },

  async logout(id: number, access_token: string) {
    await this.repository.findByUserId(id);
    await kakaoLogout(access_token);
    await this.repository.logout(id);
  },

  async token_login(access_token: string) {
    const { id } = await kakaoId(access_token);
    const user = await this.repository.findbyKakaoId(id);
    if (!user) {
      return notFoundAccountException();
    }
    return { id: user };
  },

  async refresh_tokens(refresh_token: string) {
    const kakao_id = await this.repository.findKakaoIdByRefreshToken(
      refresh_token
    );
    const updatedTokens = await kakaoRefresh(refresh_token);
    if (updatedTokens.kakao_refresh_token) {
      await this.repository.refreshTokens(kakao_id, updatedTokens);
    } else {
      await this.repository.refreshTokens(kakao_id, updatedTokens);
    }
    return { updatedTokens };
  },
};