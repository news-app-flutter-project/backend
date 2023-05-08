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
    searchKeyword: any
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
    };
}
