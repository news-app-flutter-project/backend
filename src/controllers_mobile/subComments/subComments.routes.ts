import {
    bodyValidation,
    tokenValidationProfile,
    badWordsValidation,
    profileValidation,
    maxSubCommentsValidation,
    commentValidation,
} from '@/middlewares/index';
import { writeSubComment_validation } from './subComments.validation';

export function createSubCommentRoutes(
    path: string,
    writeComment: any
): AuthRoutes {
    return {
        writeSubComment: {
            method: 'post',
            path: `${path}`,
            middleware: [
                bodyValidation(writeSubComment_validation),
                profileValidation(),
                commentValidation(),
                maxSubCommentsValidation(),
                badWordsValidation(),
            ],
            handler: writeComment,
        },
    };
}
