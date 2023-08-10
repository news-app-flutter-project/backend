import db from '@/database/db';
import { dbException } from '@/common/exceptions';
import { defaultOptions } from '../options';

export const subCommentDislikeRepository = {
    async checkDislikeExists(sub_comment_id: number, profile_id: number) {
        try {
            const dislikeExists = await db.SubCommentDislike.findOne({
                where: {
                    sub_comment_id,
                    profile_id,
                },
            });
            return dislikeExists;
        } catch (err) {
            throw dbException(err);
        }
    },

    async createDislike(data: SubCommentDislikeCreateInterface) {
        try {
            return await db.SubCommentDislike.create(data);
        } catch (err) {
            throw dbException(err);
        }
    },

    async removeDislike(sub_comment_id: number, profile_id: number) {
        try {
            return await db.SubCommentDislike.destroy({
                where: {
                    sub_comment_id,
                    profile_id,
                },
            });
        } catch (err) {
            throw dbException(err);
        }
    },

    async countDislikesForSubComment(sub_comment_id: number) {
        try {
            const dislikeCount = await db.SubCommentDislike.count({
                where: {
                    sub_comment_id: sub_comment_id,
                },
            });
            return dislikeCount;
        } catch (err) {
            throw dbException(err);
        }
    },
};
