import { subCommentRepository } from '@/database/repositories/subComment.repository';
import { subCommentLikeRepository } from '@/database/repositories/subComment_like.repository';
import { subCommentDislikeRepository } from '@/database/repositories/subComment_dislike.repository';

export const SubCommentService = {
    repository: subCommentRepository,
    subCommentLike_Repository: subCommentLikeRepository,
    subCommentDislike_Repository: subCommentDislikeRepository,

    async writeSubComment(data: SubCommentCreateInterface) {
        return await this.repository.writeSubComment(data);
    },

    async editSubComment(data: SubCommentUpdateInterface) {
        console.log(data);
        return await this.repository.updateSubComment(data);
    },

    async handleLike(data: SubCommentLikeCreateInterface) {
        const { profile_id, sub_comment_id } = data;

        // Check if like exists for the sub-comment by the user
        const isLike = await this.subCommentLike_Repository.checkLikeExists(
            sub_comment_id,
            profile_id
        );
        if (isLike) {
            // If like exists, destroy it
            await isLike.destroy({ force: true });
            return {};
        } else {
            // Check if a dislike exists for the sub-comment by the user
            const isDislike =
                await this.subCommentDislike_Repository.checkDislikeExists(
                    sub_comment_id,
                    profile_id
                );
            if (isDislike) {
                // If dislike exists, destroy it
                await isDislike.destroy({ force: true });
            }

            // Create a new like entry
            return await this.subCommentLike_Repository.createLike(data);
        }
    },

    async handleDislike(data: SubCommentLikeCreateInterface) {
        const { profile_id, sub_comment_id } = data;

        // Check if dislike exists for the sub-comment by the user
        const isDislike =
            await this.subCommentDislike_Repository.checkDislikeExists(
                sub_comment_id,
                profile_id
            );
        if (isDislike) {
            // If dislike exists, destroy it
            await isDislike.destroy({ force: true });
            return {};
        } else {
            // Check if a like exists for the sub-comment by the user
            const isLike = await this.subCommentLike_Repository.checkLikeExists(
                sub_comment_id,
                profile_id
            );
            if (isLike) {
                // If like exists, destroy it
                await isLike.destroy({ force: true });
            }

            // Create a new dislike entry
            return await this.subCommentDislike_Repository.createDislike(data);
        }
    },
};
