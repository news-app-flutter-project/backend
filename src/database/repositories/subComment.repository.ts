import db from '@/database/db';

import {
    dbException,
    notFoundError,
    DuplicateError,
    LimitError,
} from '@/common/exceptions';
import { defaultOptions } from '../options';

export const subCommentRepository = {
    async getSubCommentsByCommentId(comment_id: number): Promise<SubComment[]> {
        try {
            return await db.SubComment.findAll({
                ...defaultOptions,
                where: {
                    comment_id: comment_id,
                },
                raw: true,
            });
        } catch (err) {
            throw dbException(err);
        }
    },

    async writeSubComment(
        data: SubCommentCreateInterface
    ): Promise<SubComment> {
        try {
            return await db.SubComment.create(data);
        } catch (err) {
            return dbException(err);
        }
    },

    async checkMaxCommentsPerNews(profile_id: number, comment_id: number) {
        try {
            const count = await db.SubComment.count({
                where: {
                    profile_id: profile_id,
                    comment_id: comment_id,
                },
            });
            return count;
        } catch (err) {
            throw dbException(err);
        }
    },
};
