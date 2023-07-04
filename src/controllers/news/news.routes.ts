import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    tokenValidationProfile,
} from '@/middlewares/index';
import {
    find_my_news,
    find_news_by_category,
    find_news_by_category_and_age,
    today_top_news,
    today_top_news_age,
} from './news.validation';

export function createNewsRoutes(
    path: string,
    getMyNews: any,
    getTopNewsByCategory: any,
    getTopNewsByCategoryAndAge: any,
    getTodayTopNews: any,
    getTodayTopNewsByAge: any
): AuthRoutes {
    return {
        getMyNews: {
            method: 'post',
            path: `${path}/myNews`,
            middleware: [
                tokenValidationProfile(),
                bodyValidation(find_my_news),
            ],
            handler: getMyNews,
        },

        getTopNewsByCategory: {
            method: 'post',
            path: `${path}/topNewsByCategory`,
            middleware: [
                tokenValidation(),
                bodyValidation(find_news_by_category),
            ],
            handler: getTopNewsByCategory,
        },
        getTopNewsByCategoryAndAge: {
            method: 'post',
            path: `${path}/topNewsByCategoryAndAge`,
            middleware: [
                tokenValidation(),
                bodyValidation(find_news_by_category_and_age),
            ],
            handler: getTopNewsByCategoryAndAge,
        },
        getTodayTopNews: {
            method: 'post',
            path: `${path}/getTodayTopNews`,
            middleware: [tokenValidation(), bodyValidation(today_top_news)],
            handler: getTodayTopNews,
        },
        getTodayTopNewsByAge: {
            method: 'post',
            path: `${path}/getTodayTopNewsByAge`,
            middleware: [tokenValidation(), bodyValidation(today_top_news_age)],
            handler: getTodayTopNewsByAge,
        },
    };
}
