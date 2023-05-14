import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { memoRepository } from '@/database/repositories/memo.repository';
import { DuplicateError } from '@/common/exceptions';

const memoAllocationValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        const { folder_id } = req.body;
        try {
            const isAlreadyAllocated = await memoRepository.allocateDupCheck({
                profile_id,
                folder_id,
            });
            if (isAlreadyAllocated) {
                return DuplicateError('memo is already allocated');
            }
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default memoAllocationValidation;
