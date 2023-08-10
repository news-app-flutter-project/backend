import { Request, Response, NextFunction, RequestHandler } from 'express';
import BadRequest from './bad-request';
import { kakaoId } from '@/apis/kakao/index';
import { customResponse } from '@/common/response';
import { commentRepository } from '@/database/repositories/comment.repository';
import { subCommentRepository } from '@/database/repositories/subComment.repository';
import { notFoundAccountException, DuplicateError } from '@/common/exceptions';

const subCommentValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        try {
            const { sub_comment_id } = req.body;
            const comment_id_is_exist =
                await subCommentRepository.findSubCommentById(sub_comment_id);
            if (
                comment_id_is_exist === null ||
                comment_id_is_exist === undefined
            ) {
                return notFoundAccountException('comment', sub_comment_id);
            }

            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default subCommentValidation;
