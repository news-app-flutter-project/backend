import { profileRepository } from '@/database/repositories/profile.repository';
import uploadImageCloud from '@/apis/cloudinary/cloudinary';
import { notFoundAccountException } from '@/common/exceptions';
import { toMySQLDate } from '@/utils/index';
import fs from 'fs';

interface ProfileRegisterDataMobile {
    kakao_id: kakao_id;
    profile_img: string | null;
    name: string;
    sex: Sex;
    category:
        | [Category]
        | [Category, Category]
        | [Category, Category, Category];
    age: Age;
    email: string | null;
    nickname: string;
    birthday: string | null;
    auth_id: number;
}

export const profileService = {
    repository: profileRepository,

    async createProfile(profileData: ProfileRegisterDataMobile) {
        const { secure_url } = await uploadImageCloud(profileData.profile_img);
        // fs.unlinkSync(profileData.profile_img);
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

    async updateProfile(auth_id: number, fieldsToUpdate: IProfileUpdate) {
        const updatedFields = { ...fieldsToUpdate };

        if (fieldsToUpdate.profile_img) {
            const { secure_url } = await uploadImageCloud(
                fieldsToUpdate.profile_img
            );
            updatedFields.profile_img = secure_url;
        }

        // fs.unlinkSync(profile_img);

        if (fieldsToUpdate.birthday) {
            const date = toMySQLDate(fieldsToUpdate.birthday);
            updatedFields.birthday = date;
        }

        const data = await this.repository.updateProfile(auth_id, {
            ...updatedFields,
        });
        return data;
    },
};
