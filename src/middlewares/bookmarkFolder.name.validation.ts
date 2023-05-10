import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { bookmark_folderRepository } from '@/database/repositories/bookmark_folder.repository';
import { DuplicateError } from '@/common/exceptions';

const bookmarkFolderNameValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        const { name } = req.body;
        try {
            const isFolderNameExist =
                await bookmark_folderRepository.checkDuplicate(
                    profile_id!,
                    name
                );
            if (isFolderNameExist) {
                return DuplicateError('folder name already in use');
            }
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default bookmarkFolderNameValidation;
