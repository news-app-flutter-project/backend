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
    news_id?: number | undefined;
    content?: string | undefined;
    id?: number | undefined;
    folder_id?: number | undefined;
}

export const memoRepository = {
    async registerMemo(data: MemoCreateInterface): Promise<Memo> {
        try {
            return await db.Memo.create(data);
        } catch (err) {
            return dbException(err);
        }
    },
    async checkDup(data: dataHandler) {
        try {
            const memo = await db.Memo.findOne({
                where: { profile_id: data.profile_id, news_id: data.news_id },
            });
            return memo;
        } catch (err) {
            return dbException(err);
        }
    },

    async findMemoById(data: dataHandler) {
        try {
            const memo = await db.Memo.findByPk(data.id!);
            if (!memo) {
                return notFoundError('memo is not found');
            }
            return memo;
        } catch (err) {
            return dbException(err);
        }
    },

    async listMemo(data: dataHandler) {
        try {
            const memo = await db.Memo.findAll({
                where: {
                    profile_id: data.profile_id,
                    memo_folder_id: literal('`memo_folder_id` IS NULL'),
                },
            });
            return memo;
        } catch (err) {
            return dbException(err);
        }
    },

    async allocate(data: dataHandler) {
        try {
            return await db.Memo.update(
                {
                    memo_folder_id: data.folder_id,
                },
                { where: { id: data.id } }
            );
        } catch (err) {
            return dbException(err);
        }
    },

    async allocateDupCheck(data: dataHandler) {
        try {
            const bookmark = await db.Memo.findOne({
                where: {
                    profile_id: data.profile_id,
                    memo_folder_id: data.folder_id,
                },
            });
            return bookmark;
        } catch (err) {
            return dbException(err);
        }
    },
};
