import { profileRepository } from '@/database/repositories/profile.repository';
import uploadImageCloud from '@/apis/cloudinary/cloudinary';
import { notFoundAccountException } from '@/common/exceptions';
import { toMySQLDate } from '@/utils/index';
import fs from 'fs';

interface ProfileRegisterDataMobile {
    file: string;
    name: string;
    sex: Sex;
    category:
        | [Category]
        | [Category, Category]
        | [Category, Category, Category];
    age: Age;
    auth_id: number;
    email: string | null;
    birthday: string;
}

export const profileService = {
    repository: profileRepository,

    async createProfile(profileData: ProfileRegisterDataMobile) {
        const { secure_url } = await uploadImageCloud(profileData.file);
        fs.unlinkSync(profileData.file);

        const newUser = await this.repository.createProfile({
            ...profileData,
            profile_img: secure_url,
        });
        return newUser;
    },
};
