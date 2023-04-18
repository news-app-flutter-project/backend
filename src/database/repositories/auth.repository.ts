import { Sequelize } from "sequelize";
import db from "@/database/db";
import { UserAuthCreateInterface } from "@/database/models/auth.model";
import { ProfileCreateInterface } from "@/database/models/profile.models";
import { dbException } from "@/common/exceptions";

export const authRepository = {
  /** find by kakao_id */
  async findbyId(kakao_id: number): Promise<boolean> {
    const auth = await db.Auth.findOne({ where: { kakao_id: kakao_id } });
    return auth?.dataValues.id ? true : false;
  },

  /** update both access and refresh tokens*/
  async updateAllTokens(
    kakao_id: number,
    access_token: string,
    expires_in: number,
    refresh_token: string,
    refresh_token_expires_in: number,
    date: Date
  ) {
    console.log(kakao_id);
    await db.Auth.update(
      {
        kakao_access_token: access_token,
        kakao_access_token_expires_in: expires_in,
        kakao_access_token_date: date,
        kakao_refresh_token: refresh_token,
        kakao_refresh_token_expires_in: refresh_token_expires_in,
        kakao_refresh_token_date: date,
      },
      {
        where: {
          kakao_id: kakao_id,
        },
      }
    );

    const updaterdUser = await db.Auth.findOne({
      where: { kakao_id: kakao_id },
    });

    return updaterdUser;
  },

  /** retrive refresh token for a given user */
  async retrive_tokens(id: number) {
    const token_info = await db.Auth.findOne({
      attributes: [
        "id",
        "kakao_access_token",
        "kakao_access_token_expires_in",
        "kakao_access_token_date",
        "kakao_refresh_token",
        "kakao_refresh_token_expires_in",
        "kakao_refresh_token_date",
      ],
      where: {
        id: id,
      },
    });
    return token_info;
  },

  /** logout */
  async logout(id: number) {
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
  },

  // updateRefreshToken
  async updateRefreshToken(
    id: number,
    refreshToken: string,
    expiresIn: number,
    date: Date
  ) {
    const [rowsAffected] = await db.Auth.update(
      {
        kakao_refresh_token: refreshToken,
        kakao_refresh_token_expires_in: expiresIn,
        kakao_refresh_token_date: date,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return rowsAffected;
  },

  async updateAccessToken(
    id: number,
    accessToken: string,
    expiresIn: number,
    date: Date
  ) {
    const [rowsAffected] = await db.Auth.update(
      {
        kakao_refresh_token: accessToken,
        kakao_refresh_token_expires_in: expiresIn,
        kakao_refresh_token_date: date,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return rowsAffected;
  },

  /** Kakao - first register from kakao (id, accessToken, refreshToken) */
  async registerKakao(kakaoData: UserAuthCreateInterface) {
    try {
      return await db.Auth.create(kakaoData);
    } catch (err) {
      dbException(err);
    }
  },

  /** Profile - first register on the app */
  async registerApp(profileData: ProfileCreateInterface) {
    try {
      return await db.Profile.create(profileData);
    } catch (err) {
      dbException(err);
    }
  },
};
