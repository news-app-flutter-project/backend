import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    tokenValidationProfile,
    kakaoIdAuth,
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
        // 전체 메인
        getMyNews: {
            method: 'post',
            path: `${path}/myNews`,
            middleware: [bodyValidation(find_my_news), kakaoIdAuth()],
            handler: getMyNews,
        },

        getTodayTopNews: {
            method: 'post',
            path: `${path}/getTodayTopNews`,
            middleware: [bodyValidation(today_top_news), kakaoIdAuth()],
            handler: getTodayTopNews,
        },
        getTodayTopNewsByAge: {
            method: 'post',
            path: `${path}/getTodayTopNewsByAge`,
            middleware: [bodyValidation(today_top_news_age), kakaoIdAuth()],
            handler: getTodayTopNewsByAge,
        },

        // 카테고리별
        getTopNewsByCategory: {
            method: 'post',
            path: `${path}/topNewsByCategory`,
            middleware: [bodyValidation(find_news_by_category), kakaoIdAuth()],
            handler: getTopNewsByCategory,
        },
        getTopNewsByCategoryAndAge: {
            method: 'post',
            path: `${path}/topNewsByCategoryAndAge`,
            middleware: [
                bodyValidation(find_news_by_category_and_age),
                kakaoIdAuth(),
            ],
            handler: getTopNewsByCategoryAndAge,
        },
    };
}
