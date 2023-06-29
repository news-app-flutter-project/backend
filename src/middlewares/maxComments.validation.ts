import { Request, Response, NextFunction, RequestHandler } from 'express';
import { commentRepository } from '@/database/repositories/comment.repository';
import { customResponse } from '@/common/response';
import { LimitError } from '@/common/exceptions';

const maxCommentsValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const { news_id } = req.body;
        const profile_id = req.profile_id!;
        try {
            const count = await commentRepository.checkMaxCommentsPerNews({
                profile_id,
                news_id,
            });
            console.log(count);
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

export default maxCommentsValidation;
