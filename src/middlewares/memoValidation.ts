import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { memoRepository } from '@/database/repositories/memo.repository';
import { DuplicateError } from '@/common/exceptions';

const memoValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        const news = req.news!;
        try {
            const memo = await memoRepository.findMemo({
                profile_id,
                news_id: news.id!,
            });
            if (memo) {
                return DuplicateError('news already has a memo by the user');
            }
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default memoValidation;
