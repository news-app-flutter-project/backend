import db from '@/database/db';
import { dbException } from '@/common/exceptions';
import { defaultOptions } from '../options';

export const commentDislikeRepository = {
    async checkDislikeExists(comment_id: number, profile_id: number) {
        try {
            const dislikeExists = await db.CommentDislike.findOne({
                where: {
                    comment_id,
                    profile_id,
                },
            });
            return dislikeExists;
        } catch (err) {
            throw dbException(err);
        }
    },

    async createDislike(data: CommentDislikeCreateInterface) {
        try {
            return await db.CommentDislike.create(data);
        } catch (err) {
            throw dbException(err);
        }
    },

    async removeDislike(comment_id: number, profile_id: number) {
        try {
            return await db.CommentDislike.destroy({
                where: {
                    comment_id,
                    profile_id,
                },
            });
        } catch (err) {
            throw dbException(err);
        }
    },

    async getDislikeByCommentIdAndProfileId(
        comment_id: number,
        profile_id: number
    ) {
        try {
            return await db.CommentDislike.findOne({
                ...defaultOptions,
                where: {
                    comment_id,
                    profile_id,
                },
                raw: true,
            });
        } catch (err) {
            throw dbException(err);
        }
    },

    async countDislikesForComment(comment_id: number) {
        try {
            const dislikeCount = await db.CommentDislike.count({
                where: {
                    comment_id: comment_id,
                },
            });
            return dislikeCount;
        } catch (err) {
            throw dbException(err);
        }
    },
};
