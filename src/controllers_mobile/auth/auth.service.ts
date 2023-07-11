import { authRepository } from '@/database/repositories/auth.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import { registerParams } from '@/utils/kakaoRegisterParams';

declare global {
    type kakao_id = number;
}

export const authService = {
    repository: authRepository,
    profile_repository: profileRepository,

    async login(kakao_id: kakao_id) {
        const user = await this.repository.findbyKakaoId(kakao_id);
        const kakaoData = registerParams({
            kakao_id,
        });
        if (user) {
            const profile = await this.profile_repository.findProfilebyId(user);
            if (profile) {
                return profile;
            }
            return {};
        } else {
            return await this.repository.createUser(kakaoData);
        }
    },
};
