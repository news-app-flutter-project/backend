import { Request, Response, NextFunction, RequestHandler } from 'express';
import BadRequest from './bad-request';
import { kakaoId } from '@/apis/kakao/index';
import { customResponse } from '@/common/response';
import { commentRepository } from '@/database/repositories/comment.repository';
import { notFoundAccountException, DuplicateError } from '@/common/exceptions';

const commentValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        try {
            const { comment_id } = req.body;
            const comment_id_is_exist = await commentRepository.findCommentById(
                comment_id
            );
            if (
                comment_id_is_exist === null ||
                comment_id_is_exist === undefined
            ) {
                return notFoundAccountException('comment', comment_id);
            }

            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default commentValidation;
