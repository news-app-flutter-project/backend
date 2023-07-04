import { profileRepository } from '@/database/repositories/profile.repository';
import uploadImageCloud from '@/apis/cloudinary/cloudinary';
import { notFoundAccountException } from '@/common/exceptions';
import { toMySQLDate } from '@/utils/index';
import fs from 'fs';

export const profileService = {
    repository: profileRepository,

    async createProfile(profileData: ProfileRegisterData) {
        const { secure_url } = await uploadImageCloud(profileData.profile_img);
        fs.unlinkSync(profileData.profile_img);

        const newUser = await this.repository.createProfile({
            ...profileData,
            profile_img: secure_url,
        });
        return newUser;
    },
};
