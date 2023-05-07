import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
} from '@/middlewares/index';
import {
    find_news_by_category,
    read_news,
    add_keywords,
} from './news.validation';

export function createNewsRoutes(
    path: string,
    findCategoryHandler: any,
    findByUserCategoriesHandler: any,
    readNewsHandler: any,
    addKeywordsHandler: any
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

        readNews: {
            method: 'post',
            path: `${path}/read`,
            middleware: [
                tokenValidation(),
                bodyValidation(read_news),
                newsIdValidation(),
            ],
            handler: readNewsHandler,
        },

        addKeywords: {
            method: 'put',
            path: `${path}/addKeywords`,
            middleware: [
                tokenValidation(),
                bodyValidation(add_keywords),
                newsIdValidation(),
            ],
            handler: addKeywordsHandler,
        },
    };
}
