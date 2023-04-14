import { Sequelize } from "sequelize";
import db from "@/database/db";
import { UserAuthCreateInterface } from "@/database/models/auth.model";
import { ProfileCreateInterface } from "@/database/models/profile.models";
import { dbException } from "@/common/exceptions";

export const authRepository = {
  /** find all users */
  async findAllUsers() {
    return await db.Auth.findAll();
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
