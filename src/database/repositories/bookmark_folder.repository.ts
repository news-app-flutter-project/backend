import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import { dbException, notFoundError, LimitError } from '@/common/exceptions';

export const bookmark_folderRepository = {
    async countFolders(profile_id: number, maxFolders: number = 7) {
        try {
            const folderCount = await db.BookMarkFolder.count({
                where: { profile_id: profile_id },
            });
            if (folderCount >= maxFolders) {
                return LimitError(`max folderNo. exceeded: ${maxFolders}`);
            }
        } catch (err) {
            return dbException(err);
        }
    },

    async findMaxOrder(profile_id: number) {
        const maxOrder = await db.BookMarkFolder.max('order', {
            where: { profile_id: profile_id },
        });
        return (maxOrder as number) || 0;
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

    async doesBookmarkFolderExist(
        bookmarkfolder_id: number,
        profile_id: number
    ) {
        try {
            const bookmarkFolder = await db.BookMarkFolder.findOne({
                where: { id: bookmarkfolder_id, profile_id },
            });

            // If the result is not null, the folder exists.
            return bookmarkFolder !== null;
        } catch (err) {
            return dbException(err);
        }
    },

    async createFolder(profile_id: number, name: string, order: number) {
        try {
            return await db.BookMarkFolder.create({
                profile_id: profile_id,
                name: name,
                order,
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

    async findFolder(profile_id: number, folder_id: number) {
        try {
            const folder = await db.BookMarkFolder.findOne({
                where: {
                    id: folder_id,
                    profile_id: profile_id,
                },
            });
            if (!folder) {
                return notFoundError('folder not found');
            }
            return folder;
        } catch (err) {
            return dbException(err);
        }
    },

    async updateFolderName(
        profile_id: number,
        folder_id: number,
        new_name: string
    ) {
        try {
            const folder = await db.BookMarkFolder.findOne({
                where: { id: folder_id, profile_id },
            });
            if (!folder) {
                return notFoundError('folder not found');
            }
            folder.name = new_name;
            const updatedFolder = await folder.save();
            return updatedFolder;
        } catch (err) {
            return dbException(err);
        }
    },
};
