import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    tokenValidationProfile,
} from '@/middlewares/index';
import { search_keyword } from './search.validation';

export function createSearchRoutes(
    path: string,
    searchKeyword: any,
    recentSearches: any,
    getTopKeywords: any
): AuthRoutes {
    return {
        searchKeyword: {
            method: 'post',
            path: `${path}/searchKeyword`,
            middleware: [
                tokenValidationProfile(),
                bodyValidation(search_keyword),
            ],
            handler: searchKeyword,
        },
        recentSearches: {
            method: 'get',
            path: `${path}/recentSearches`,
            middleware: [tokenValidationProfile()],
            handler: recentSearches,
        },
        getTopKeywords: {
            method: 'get',
            path: `${path}/getTopKeywords`,
            middleware: [tokenValidation()],
            handler: getTopKeywords,
        },
    };
}
