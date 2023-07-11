import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    kakaoIdAuth,
    queryValidation,
} from '@/middlewares/index';
import { read_news, add_keywords } from './reader.validation';

export function createReadsRoutes(
    path: string,
    readNewsHandler: any,
    addKeywordsHandler: any
): AuthRoutes {
    return {
        readNews: {
            method: 'get',
            path: `${path}`,
            middleware: [
                queryValidation(read_news),
                kakaoIdAuth(),
                newsIdValidation(),
            ],
            handler: readNewsHandler,
        },

        addKeywords: {
            method: 'put',
            path: `${path}/addKeywords`,
            middleware: [
                bodyValidation(add_keywords),
                kakaoIdAuth(),
                newsIdValidation(),
            ],
            handler: addKeywordsHandler,
        },
    };
}
