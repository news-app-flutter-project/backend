import { commentLikeRepository } from '@/database/repositories/comment_like.repository';
import { commentRepository } from '@/database/repositories/comment.repository';

export const CommentService = {
    repository: commentRepository,
    commentLike_repository: commentLikeRepository,

    async writeComment(data: CommentCreateInterface) {
        return await this.repository.writeComment(data);
    },

    async handleLike(data: CommentLikeCreateInterface) {
        // check if like exist
        const { profile_id, comment_id } = data;
        const isLike = await this.commentLike_repository.checkLikeExists(
            comment_id,
            profile_id
        );
        // if false =>  LIKE
        if (!isLike) {
            return await this.commentLike_repository.createLike(data);
        } else {
            await isLike.destroy({ force: true });
            return {};
        }
    },
};
