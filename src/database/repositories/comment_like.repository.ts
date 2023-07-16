import db from '@/database/db';
import { dbException } from '@/common/exceptions';
import { defaultOptions } from '../options';

export const commentLikeRepository = {
    async checkLikeExists(comment_id: number, profile_id: number) {
        try {
            const likeExists = await db.CommentsLike.findOne({
                where: {
                    comment_id,
                    profile_id,
                },
            });
            return likeExists;
        } catch (err) {
            throw dbException(err);
        }
    },

    async createLike(data: CommentLikeCreateInterface) {
        try {
            return await db.CommentsLike.create(data);
        } catch (err) {
            throw dbException(err);
        }
    },

    async removeLike(comment_id: number) {
        try {
            return await db.CommentsLike.destroy({
                where: { comment_id },
            });
        } catch (err) {
            throw dbException(err);
        }
    },

    async getLikeByCommentIdAndProfileId(
        comment_id: number,
        profile_id: number
    ) {
        try {
            return await db.CommentsLike.findOne({
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

    async countLikesForComment(comment_id: number) {
        try {
            const likeCount = await db.CommentsLike.count({
                where: {
                    comment_id: comment_id,
                },
            });
            return likeCount;
        } catch (err) {
            throw dbException(err);
        }
    },
};
