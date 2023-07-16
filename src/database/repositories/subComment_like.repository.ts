import db from '@/database/db';
import { dbException } from '@/common/exceptions';
import { defaultOptions } from '../options';

export const subCommentLikeRepository = {
    async checkLikeExists(sub_comment_id: number, profile_id: number) {
        try {
            const likeExists = await db.SubCommentLike.findOne({
                where: {
                    sub_comment_id,
                    profile_id,
                },
            });
            return likeExists;
        } catch (err) {
            throw dbException(err);
        }
    },

    async createLike(data: SubCommentLikeCreateInterface) {
        try {
            return await db.SubCommentLike.create(data);
        } catch (err) {
            throw dbException(err);
        }
    },

    async removeLike(sub_comment_id: number) {
        try {
            return await db.SubCommentLike.destroy({
                where: { sub_comment_id },
            });
        } catch (err) {
            throw dbException(err);
        }
    },

    async countLikesForSubComment(sub_comment_id: number) {
        try {
            const likeCount = await db.SubCommentLike.count({
                where: {
                    sub_comment_id: sub_comment_id,
                },
            });
            return likeCount;
        } catch (err) {
            throw dbException(err);
        }
    },
};
