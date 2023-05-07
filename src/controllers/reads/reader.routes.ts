import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
} from '@/middlewares/index';
import {
    category,
    category_and_age,
    read_news,
    add_keywords,
} from './reader.validation';

export function createReadsRoutes(
    path: string,
    readNewsHandler: any,
    addKeywordsHandler: any,
    findMostPopularForCategory: any,
    findMostPopularWithCategoryAndAge: any
): AuthRoutes {
    return {
        readNews: {
            method: 'post',
            path: `${path}`,
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

        findByCategory: {
            method: 'get',
            path: `${path}/popular/category`,
            middleware: [tokenValidation(), bodyValidation(category)],
            handler: findMostPopularForCategory,
        },

        findByCategoryAndAge: {
            method: 'get',
            path: `${path}/popular/category/age`,
            middleware: [tokenValidation(), bodyValidation(category_and_age)],
            handler: findMostPopularWithCategoryAndAge,
        },
    };
}
