import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { bookmark_folderRepository } from '@/database/repositories/bookmark_folder.repository';
import { DuplicateError } from '@/common/exceptions';

const bookmarkFolderExistValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const profile_id = req.profile?.id;
        const { folder_id } = req.body;
        try {
            const isFolderNameExist =
                await bookmark_folderRepository.doesBookmarkFolderExist(
                    folder_id,
                    profile_id!
                );

            if (!isFolderNameExist) {
                return DuplicateError('folder does not exist');
            }
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default bookmarkFolderExistValidation;
