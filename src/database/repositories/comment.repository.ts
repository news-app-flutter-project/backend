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
}

export const commentRepository = {
    async writeComment(data: CommentCreateInterface): Promise<Comments> {
        try {
            return await db.Comments.create(data);
        } catch (err) {
            return dbException(err);
        }
    },

    async checkMaxCommentsPerNews(data: dataHandler) {
        try {
            const count = await db.Comments.count({
                where: {
                    profile_id: data.profile_id,
                    news_id: data.news_id,
                },
            });
            return count;
        } catch (err) {
            throw dbException(err);
        }
    },
};
