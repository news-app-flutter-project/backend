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
};
