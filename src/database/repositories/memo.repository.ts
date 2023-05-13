import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import {
    dbException,
    notFoundError,
    DuplicateError,
    LimitError,
} from '@/common/exceptions';

interface dataHandler {
    profile_id: number | undefined;
    news_id: number | undefined;
}

export const memoRepository = {
    async registerMemo(data: MemoCreateInterface): Promise<Memo> {
        try {
            return await db.Memo.create(data);
        } catch (err) {
            return dbException(err);
        }
    },
    async findMemo(data: dataHandler) {
        try {
            const memo = await db.Memo.findOne({
                where: { profile_id: data.profile_id, news_id: data.news_id },
            });
            return memo;
        } catch (err) {
            return dbException(err);
        }
    },
};
