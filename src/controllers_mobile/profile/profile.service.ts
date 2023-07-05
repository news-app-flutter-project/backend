import { profileRepository } from '@/database/repositories/profile.repository';
import uploadImageCloud from '@/apis/cloudinary/cloudinary';
import { notFoundAccountException } from '@/common/exceptions';
import { toMySQLDate } from '@/utils/index';
import fs from 'fs';

interface ProfileRegisterDataMobile {
    kakao_id: kakao_id;
    profile_img: string;
    name: string;
    sex: Sex;
    category:
        | [Category]
        | [Category, Category]
        | [Category, Category, Category];
    age: Age;
    email: string | null;
    birthday: string;
    auth_id: number;
}

export const profileService = {
    repository: profileRepository,

    async createProfile(profileData: ProfileRegisterDataMobile) {
        const { secure_url } = await uploadImageCloud(profileData.profile_img);
        fs.unlinkSync(profileData.profile_img);
        // const date = toMySQLDate(profileData.birthday);
        const newUser = await this.repository.createProfile({
            ...profileData,
            profile_img: secure_url,
        });
        return newUser;
    },
};
