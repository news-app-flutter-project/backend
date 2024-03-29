import { Request, Response, NextFunction, RequestHandler } from 'express';
import BadRequest from './bad-request';
import { newsRepository } from '@/database/repositories/news.repository';
import { customResponse } from '@/common/response';
import { notFoundNews } from '@/common/exceptions';

const newsIdValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        const { news_id } = req.body;
        try {
            const news = await newsRepository.findNewsbyId(news_id);
            if (!news) {
                return notFoundNews(news_id);
            }
            req.news = news;
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default newsIdValidation;
