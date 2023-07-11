import { profileRepository } from '@/database/repositories/profile.repository';
import uploadImageCloud from '@/apis/cloudinary/cloudinary';
import { notFoundAccountException } from '@/common/exceptions';
import { toMySQLDate } from '@/utils/index';
import fs from 'fs';

declare global {
    interface ProfileRegisterData {
        profile_img: string;
        name: string;
        sex: Sex;
        category:
            | [Category]
            | [Category, Category]
            | [Category, Category, Category];
        age: Age;
        auth_id: number;
        email: string | null;
        nickname: string;
        birthday: string | null;
    }
}

export const profileService = {
    repository: profileRepository,

    async createProfile(profileData: ProfileRegisterData) {
        const { secure_url } = await uploadImageCloud(profileData.profile_img);
        fs.unlinkSync(profileData.profile_img);
        const date = toMySQLDate(profileData.birthday!);
        const newUser = await this.repository.createProfile({
            ...profileData,
            profile_img: secure_url,
            birthday: date,
        });
        return newUser;
    },

    async getProfile(auth_id: number) {
        const profile = await this.repository.findProfilebyId(auth_id);
        if (!profile) {
            return notFoundAccountException(auth_id);
        } else {
            return profile;
        }
    },

    // async updateProfileImg(profile_img: string, auth_id: number) {
    //     const { secure_url } = await uploadImageCloud(profile_img);
    //     fs.unlinkSync(profile_img);
    //     const data = await this.repository.updateProfileImg(
    //         secure_url,
    //         auth_id
    //     );
    //     return data;
    // },

    async updateScreenMode(mode: Screen_Mode, auth_id: number) {
        const data = await this.repository.updateScreenMode(mode, auth_id);
        return { screen_mode: data };
    },

    async updateTextSize(text_size: Text_Size, auth_id: number) {
        const data = await this.repository.updateTextSize(text_size, auth_id);
        return data;
    },
};
