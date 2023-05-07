import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
} from '@/middlewares/index';
import { find_news_by_category } from './news.validation';

export function createNewsRoutes(
    path: string,
    getTopNewsByCategory: any
): AuthRoutes {
    return {
        getTopNewsByCategory: {
            method: 'get',
            path: `${path}/topNewsByCategory`,
            middleware: [
                tokenValidation(),
                bodyValidation(find_news_by_category),
            ],
            handler: getTopNewsByCategory,
        },
    };
}
