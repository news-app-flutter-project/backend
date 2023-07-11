import db from '@/database/db';
import { dbException, notFoundAccountException } from '@/common/exceptions';
import { defaultOptions } from '../options';

export const authRepository = {
    async findbyKakaoId(kakao_id: kakao_id) {
        try {
            const user = await db.Auth.findOne({
                ...defaultOptions,
                where: { kakao_id: kakao_id },
            });
            return user?.id;
        } catch (err) {
            return dbException(err);
        }
    },

    async findByUserId(id: number) {
        try {
            const user = await db.Auth.findOne({
                ...defaultOptions,
                where: { id: id },
            });
            if (!user) {
                return notFoundAccountException(id);
            }
            return user?.id;
        } catch (err) {
            return dbException(err);
        }
    },

    async findKakaoIdByRefreshToken(refresh_token: string) {
        try {
            const user = await db.Auth.findOne({
                ...defaultOptions,
                where: { kakao_refresh_token: refresh_token },
            });
            if (!user) {
                return notFoundAccountException();
            }
            return user?.kakao_id;
        } catch (err) {
            return dbException(err);
        }
    },

    async createUser(kakaoData: UserAuthCreateInterface) {
        try {
            await db.Auth.create(kakaoData);
            return {};
        } catch (err) {
            return dbException(err);
        }
    },

    /** update all tokens => fresh login + refresh */
    async updateAllTokens(newTokens: IUpdateParams) {
        const { kakao_id, ...otherInfo } = newTokens;
        try {
            await db.Auth.update(
                {
                    ...otherInfo,
                },
                {
                    where: {
                        kakao_id,
                    },
                }
            );
            return newTokens;
        } catch (err) {
            return dbException(err);
        }
    },

    async refreshTokens(kakao_id: number, newTokens: IKakaoRefreshRes) {
        try {
            await db.Auth.update(
                {
                    ...newTokens,
                },
                {
                    where: {
                        kakao_id,
                    },
                }
            );
            return newTokens;
        } catch (err) {
            return dbException(err);
        }
    },

    async logout(id: number) {
        try {
            await db.Auth.update(
                {
                    kakao_access_token: null,
                    kakao_access_token_expires_in: null,
                    kakao_access_token_date: null,
                    kakao_refresh_token: null,
                    kakao_refresh_token_expires_in: null,
                    kakao_refresh_token_date: null,
                },
                {
                    where: {
                        id,
                    },
                }
            );
        } catch (err) {
            return dbException(err);
        }
    },
};
