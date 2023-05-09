import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    tokenValidationProfile,
    bookmarkValidation,
} from '@/middlewares/index';
import { bookmark_validation } from './bookmark.validation';

export function createSearchRoutes(path: string, bookmark: any): AuthRoutes {
    return {
        bookmark: {
            method: 'post',
            path: `${path}/bookmark`,
            middleware: [
                bodyValidation(bookmark_validation),
                tokenValidationProfile(),
                newsIdValidation(),
                bookmarkValidation(),
            ],
            handler: bookmark,
        },
    };
}
