import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { bookmarkRepository } from '@/database/repositories/bookmark.repository';
import { notFoundError } from '@/common/exceptions';

const bookmarkExistValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const profile_id = req.profile?.id;
        const { bookmark_id } = req.body;
        try {
            const isAlreadyAllocated =
                await bookmarkRepository.bookmarkDupCheck(
                    profile_id!,
                    bookmark_id
                );

            if (!isAlreadyAllocated) {
                return notFoundError('bookmark does not exist');
            }
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default bookmarkExistValidation;
