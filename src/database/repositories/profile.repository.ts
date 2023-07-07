import db from '@/database/db';
import { dbException, notFoundAccountException } from '@/common/exceptions';
import { ProfileCreateInterface } from '@/database/models/profile.models';
import { defaultOptions } from '../options';
import { ProfileModel } from '@/database/models/profile.models';

declare global {
    interface IProfileUpdate {
        profile_img?: string | null;
        name?: string;
        sex?: Sex;
        category?:
            | [Category]
            | [Category, Category]
            | [Category, Category, Category];
        age?: Age;
        email?: string | null;
        birthday?: string | null;
        screen_mode?: Screen_Mode;
        text_size?: Text_Size;
    }
}

export const profileRepository = {
    async createProfile(profileData: ProfileCreateInterface) {
        try {
            return await db.Profile.create(profileData);
        } catch (err) {
            return dbException(err);
        }
    },

    async findProfilebyId(auth_id: number): Promise<ProfileModel | null> {
        try {
            const profile = await db.Profile.findOne({
                ...defaultOptions,
                where: { auth_id: auth_id },
            });
            return profile;
        } catch (err) {
            return notFoundAccountException(auth_id);
        }
    },

    async updateProfile(auth_id: number, fieldsToUpdate: IProfileUpdate) {
        try {
            await db.Profile.update(fieldsToUpdate, {
                where: { auth_id: auth_id },
            });
            return fieldsToUpdate;
        } catch (err) {
            return dbException(err);
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

    async updateTextSize(text_size: Text_Size, auth_id: number) {
        try {
            await db.Profile.update(
                { text_size },
                { where: { auth_id: auth_id } }
            );
            return text_size;
        } catch (err) {
            return dbException(err);
        }
    },
};
