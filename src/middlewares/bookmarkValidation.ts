import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { bookmarkRepository } from '@/database/repositories/bookmark.repository';
import { DuplicateError } from '@/common/exceptions';

const bookmarkValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const profile_id = req.profile?.id;
        const news = req.news!;
        try {
            const bookmarkedNews =
                await bookmarkRepository.check_duplicateBookmark(
                    profile_id!,
                    news.id!
                );
            if (bookmarkedNews) {
                return DuplicateError('already bookmarked by the user');
            }
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default bookmarkValidation;
