import db from "@/database/db";
import { dbException, notFoundAccountException } from "@/common/exceptions";
import { ProfileCreateInterface } from "@/database/models/profile.models";
import { defaultOptions } from "../options";

export const profileRepository = {
  async createProfile(profileData: ProfileCreateInterface) {
    try {
      return await db.Profile.create(profileData);
    } catch (err) {
      dbException(err);
    }
  },

  async findProfilebyId(auth_id: number) {
    try {
      const profile = await db.Profile.findOne({
        ...defaultOptions,
        where: { auth_id: auth_id },
      });
      return profile;
    } catch (err) {
      return dbException(err);
    }
  },
};
