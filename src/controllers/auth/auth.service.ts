import { authRepository } from '@/database/repositories/auth.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import {
    kakaoLogin,
    kakaoId,
    kakaoLogout,
    kakaoRefresh,
} from '@/apis/kakao/index';
import { registerParams } from '@/utils/kakaoRegisterParams';
import { notFoundAccountException } from '@/common/exceptions';

export const authService = {
    repository: authRepository,
    profile_repository: profileRepository,

    async login(code: string) {
        const tokenInfo = await kakaoLogin(code);
        const kakao_info_data = await kakaoId(tokenInfo.access_token);
        const user = await this.repository.findbyKakaoId(kakao_info_data.id);
        const kakaoData = registerParams({
            kakao_info_data,
            tokenInfo,
        });

        if (user) {
            const updatedTokens = await this.repository.updateAllTokens(
                kakaoData
            );
            const profile = await this.profile_repository.findProfilebyId(user);
            console.log(profile);
            if (profile) {
                return {
                    profile,
                    ...updatedTokens,
                };
            }
            return { ...updatedTokens };
        } else {
            return await this.repository.createUser(kakaoData);
        }
    },

    async logout(id: number, access_token: string) {
        await this.repository.findByUserId(id);
        await kakaoLogout(access_token);
        await this.repository.logout(id);
    },

    async token_login(id: number) {
        const user = await this.repository.findByUserId(id);
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
