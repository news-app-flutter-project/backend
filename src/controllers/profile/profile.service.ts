import { profileRepository } from "@/database/repositories/profile.repository";
import uploadImageCloud from "@/apis/cloudinary/cloudinary";
import { toMySQLDate } from "@/utils/index";
import fs from "fs";

interface AppRegisterData {
  profile_img: string;
  name: string;
  birthday: string;
  sex: Sex;
  category: [Category] | [Category, Category] | [Category, Category, Category];
  age: Age;
  auth_id: number;
}

export const profileService = {
  repository: profileRepository,

  async createProfile(profileData: AppRegisterData) {
    const { secure_url } = await uploadImageCloud(profileData.profile_img);
    fs.unlinkSync(profileData.profile_img);
    const date = toMySQLDate(profileData.birthday);
    const newUser = await this.repository.createProfile({
      ...profileData,
      profile_img: secure_url,
      birthday: date,
    });
    // 토큰 발급
    return newUser;
  },

  async getProfile(auth_id: number) {
    await this.repository.findProfilebyId(auth_id);
  },
};