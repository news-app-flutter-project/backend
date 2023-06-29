import { commentRepository } from '@/database/repositories/comment.repository';

interface dataHandler {
    profile_id?: number | undefined;
    news_id?: number | undefined;
    content?: string | undefined;
    id?: number | undefined;
}

export const CommentService = {
    repository: commentRepository,

    async writeComment(data: CommentCreateInterface) {
        return await this.repository.writeComment(data);
    },
};
