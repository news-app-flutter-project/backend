import { Request, Response, NextFunction, RequestHandler } from 'express';
import { badWordsRepository } from '@/database/repositories/badwords.repository';
import { customResponse } from '@/common/response';
import { badWordsException } from '@/common/exceptions';

const badWordsValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const { content } = req.body;
        try {
            const badWords = await badWordsRepository.FindBadWords({
                content,
            });
            if (badWords.length > 0) {
                return badWordsException();
            }
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default badWordsValidation;
