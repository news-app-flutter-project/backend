import {
    bodyValidation,
    tokenValidationProfile,
    badWordsValidation,
    maxCommentsValidation,
    profileValidation,
} from '@/middlewares/index';
import { writeComment_validation } from './comments.validation';

export function createCommentRoutes(
    path: string,
    writeComment: any
): AuthRoutes {
    return {
        writeComment: {
            method: 'post',
            path: `${path}`,
            middleware: [
                bodyValidation(writeComment_validation),
                profileValidation(),
                maxCommentsValidation(),
                badWordsValidation(),
            ],
            handler: writeComment,
        },
    };
}
