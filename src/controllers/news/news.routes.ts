import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
} from '@/middlewares/index';
import { find_news_by_category } from './news.validation';

export function createNewsRoutes(
    path: string,
    findCategoryHandler: any,
    findByUserCategoriesHandler: any
): AuthRoutes {
    return {
        findByCategory: {
            method: 'get',
            path: `${path}/find_by_category`,
            middleware: [
                tokenValidation(),
                bodyValidation(find_news_by_category),
            ],
            handler: findCategoryHandler,
        },

        findByUserCategories: {
            method: 'get',
            path: `${path}/find_by_categories`,
            middleware: [tokenValidation()],
            handler: findByUserCategoriesHandler,
        },
    };
}
