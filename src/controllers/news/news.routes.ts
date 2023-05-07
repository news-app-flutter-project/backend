import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
} from '@/middlewares/index';
import {
    find_news_by_category,
    find_news_by_category_and_age,
    today_top_news,
    today_top_news_age,
} from './news.validation';

export function createNewsRoutes(
    path: string,
    getTopNewsByCategory: any,
    getTopNewsByCategoryAndAge: any,
    getTodayTopNews: any,
    getTodayTopNewsByAge: any
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
        getTopNewsByCategoryAndAge: {
            method: 'get',
            path: `${path}/topNewsByCategoryAndAge`,
            middleware: [
                tokenValidation(),
                bodyValidation(find_news_by_category_and_age),
            ],
            handler: getTopNewsByCategoryAndAge,
        },
        getTodayTopNews: {
            method: 'get',
            path: `${path}/getTodayTopNews`,
            middleware: [tokenValidation(), bodyValidation(today_top_news)],
            handler: getTodayTopNews,
        },
        getTodayTopNewsByAge: {
            method: 'get',
            path: `${path}/getTodayTopNewsByAge`,
            middleware: [tokenValidation(), bodyValidation(today_top_news_age)],
            handler: getTodayTopNewsByAge,
        },
    };
}
