import { Request, Response, NextFunction, RequestHandler } from 'express';
import { subCommentRepository } from '@/database/repositories/subComment.repository';
import { customResponse } from '@/common/response';
import { LimitError } from '@/common/exceptions';

const maxSubCommentsValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const { comment_id } = req.body;
        const { id: profile_id } = req.profile!;
        try {
            const count = await subCommentRepository.checkMaxCommentsPerNews(
                profile_id,
                comment_id
            );
            if (count >= 3) {
                return LimitError(
                    'You have reached the maximum number of comments for this news article.'
                );
            }
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default maxSubCommentsValidation;
