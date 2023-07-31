import { Request, Response, NextFunction, RequestHandler } from 'express';
import BadRequest from './bad-request';
import { newsContentRepository } from '@/database/repositories/news_content.repository';
import { customResponse } from '@/common/response';
import { notFoundSentence } from '@/common/exceptions';

const newsSentenceNoValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const { news_id, sentence_no } = req.body;
        try {
            const newsContent = await newsContentRepository.getNewsContent(
                news_id,
                sentence_no
            );
            if (!newsContent) {
                return notFoundSentence(sentence_no);
            }
            req.sentence_no = sentence_no;
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default newsSentenceNoValidation;
