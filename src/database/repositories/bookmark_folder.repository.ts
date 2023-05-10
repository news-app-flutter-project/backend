import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import { dbException } from '@/common/exceptions';

export const bookmark_folderRepository = {
    async countFolders(profile_id: number) {
        try {
            return await db.BookMarkFolder.count({
                where: { profile_id: profile_id },
            });
        } catch (err) {
            return dbException(err);
        }
    },

    async checkDuplicate(profile_id: number, name: string) {
        try {
            return await db.BookMarkFolder.findOne({
                where: { profile_id, name },
            });
        } catch (err) {
            return dbException(err);
        }
    },

    async createFolder(profile_id: number, name: string) {
        try {
            return await db.BookMarkFolder.create({
                profile_id: profile_id,
                name: name,
            });
        } catch (err) {
            return dbException(err);
        }
    },

    async listAllFolders(profile_id: number) {
        try {
            const bookmarkFolders = await db.BookMarkFolder.findAll({
                where: {
                    profile_id: profile_id,
                },
            });
            return bookmarkFolders;
        } catch (err) {
            return dbException(err);
        }
    },
};
