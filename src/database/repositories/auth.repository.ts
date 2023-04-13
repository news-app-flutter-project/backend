import { Sequelize } from "sequelize";
import db from "@/database/db";
import { UserAuthCreateInterface } from "@/database/models/auth.model";
import { dbException } from "@/common/exceptions";

export const authRepository = {
  // find all users
  async findAllUsers() {
    return await db.UserAuth.findAll();
  },

  // Kakao - first register from kakao (id, accessToken, refreshToken)
  async registerUser(kakaoData: UserAuthCreateInterface) {
    try {
      console.log("db test");
      return await db.UserAuth.create(kakaoData);
    } catch (err) {
      dbException(err);
    }
  },
  // Kakao - update accessToken using refreshToken
  // Server - init access + refreshToken
  // Server - update access using refreshToken
};
