import { Sequelize } from "sequelize";
import db from "@/database/db";
import { UserAuthCreateInterface } from "@/database/models/user.auth.model";

export const userAuthRepository = {
  // find all users
  async findAllUsers() {
    return await db.UserAuth.findAll();
  },

  // Kakao - first register from kakao (id, accessToken, refreshToken)
  async registerUser(kakaoData: UserAuthCreateInterface) {
    return await db.UserAuth.create(kakaoData);
  },
  // Kakao - update accessToken using refreshToken
  // Server - init access + refreshToken
  // Server - update access using refreshToken
};
