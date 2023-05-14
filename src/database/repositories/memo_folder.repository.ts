import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import {
    dbException,
    notFoundError,
    DuplicateError,
    LimitError,
} from '@/common/exceptions';

interface dataHandler {
    profile_id?: number | undefined;
    name?: string | undefined;
    id?: number | undefined;
}

export const memoFolderRepository = {
    async createFolder(data: MemoFolderCreateInterface): Promise<MemoFolder> {
        try {
            return await db.MemoFolder.create(data);
        } catch (err) {
            return dbException(err);
        }
    },

    async checkDup(data: dataHandler) {
        try {
            return await db.MemoFolder.findOne({
                where: { profile_id: data.profile_id, name: data.name },
            });
        } catch (err) {
            return dbException(err);
        }
    },

    async listFolders(data: dataHandler) {
        try {
            return await db.MemoFolder.findAll({
                where: {
                    profile_id: data.profile_id,
                },
            });
        } catch (err) {
            return dbException(err);
        }
    },

    async updateFolderName() {},
};
