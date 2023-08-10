import { commentLikeRepository } from '@/database/repositories/comment_like.repository';
import { commentRepository } from '@/database/repositories/comment.repository';
import { commentDislikeRepository } from '@/database/repositories/comment_dislike.repository';

export const CommentService = {
    repository: commentRepository,
    commentLike_repository: commentLikeRepository,
    commentDislike_repository: commentDislikeRepository,

    async writeComment(data: CommentCreateInterface) {
        return await this.repository.writeComment(data);
    },

    async handleLike(data: CommentLikeCreateInterface) {
        const { profile_id, comment_id } = data;

        // Check if like exists for the comment by the user
        const isLike = await this.commentLike_repository.checkLikeExists(
            comment_id,
            profile_id
        );
        if (isLike) {
            // If like exists, destroy it
            await isLike.destroy({ force: true });
            return {};
        } else {
            // Check if a dislike exists for the comment by the user
            const isDislike =
                await this.commentDislike_repository.checkDislikeExists(
                    comment_id,
                    profile_id
                );
            if (isDislike) {
                // If dislike exists, destroy it
                await isDislike.destroy({ force: true });
            }

            // Create a new like entry
            return await this.commentLike_repository.createLike(data);
        }
    },

    async handleDislike(data: CommentLikeCreateInterface) {
        const { profile_id, comment_id } = data;

        // Check if dislike exists for the comment by the user
        const isDislike =
            await this.commentDislike_repository.checkDislikeExists(
                comment_id,
                profile_id
            );
        if (isDislike) {
            // If dislike exists, destroy it
            await isDislike.destroy({ force: true });
            return {};
        } else {
            // Check if a like exists for the comment by the user
            const isLike = await this.commentLike_repository.checkLikeExists(
                comment_id,
                profile_id
            );
            if (isLike) {
                // If like exists, destroy it
                await isLike.destroy({ force: true });
            }

            // Create a new dislike entry
            return await this.commentDislike_repository.createDislike(data);
        }
    },
};
