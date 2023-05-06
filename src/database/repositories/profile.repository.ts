import db from '@/database/db';
import { dbException, notFoundAccountException } from '@/common/exceptions';
import { ProfileCreateInterface } from '@/database/models/profile.models';
import { defaultOptions } from '../options';
import { ProfileModel } from '@/database/models/profile.models';

export const profileRepository = {
    async createProfile(profileData: ProfileCreateInterface) {
        try {
            return await db.Profile.create(profileData);
        } catch (err) {
            return dbException(err);
        }
    },

    async findProfilebyId(auth_id: number): Promise<ProfileModel> {
        try {
            const profile = await db.Profile.findOne({
                ...defaultOptions,
                where: { auth_id: auth_id },
            });
            return profile!;
        } catch (err) {
            return notFoundAccountException(auth_id);
        }
    },

    async updateProfileImg(profile_img: string, auth_id: number) {
        try {
            await db.Profile.update(
                { profile_img: profile_img },
                { where: { auth_id: auth_id } }
            );
            return profile_img;
        } catch (err) {
            return dbException(err);
        }
    },

    async updateScreenMode(mode: Screen_Mode, auth_id: number) {
        try {
            await db.Profile.update(
                { screen_mode: mode },
                { where: { auth_id: auth_id } }
            );
            return mode;
        } catch (err) {
            return dbException(err);
        }
    },
};
