import { subCommentRepository } from '@/database/repositories/subComment.repository';
import { subCommentLikeRepository } from '@/database/repositories/subComment_like.repository';

export const SubCommentService = {
    repository: subCommentRepository,
    subCommentLike_Repository: subCommentLikeRepository,

    async writeSubComment(data: SubCommentCreateInterface) {
        return await this.repository.writeSubComment(data);
    },

    async handleLike(data: SubCommentLikeCreateInterface) {
        // check if like exist
        const { profile_id, sub_comment_id } = data;
        const isLike = await this.subCommentLike_Repository.checkLikeExists(
            sub_comment_id,
            profile_id
        );

        // if false => LIKE
        console.log(isLike);
        if (!isLike) {
            return await this.subCommentLike_Repository.createLike(data);
        } else {
            await isLike.destroy({ force: true });
            return {};
        }
    },
};
