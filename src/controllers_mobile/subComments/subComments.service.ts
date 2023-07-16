import { subCommentRepository } from '@/database/repositories/subComment.repository';

export const SubCommentService = {
    repository: subCommentRepository,

    async writeComment(data: SubCommentCreateInterface) {
        return await this.repository.writeSubComment(data);
    },
};
