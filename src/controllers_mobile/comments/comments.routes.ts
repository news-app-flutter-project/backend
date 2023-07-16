import {
    bodyValidation,
    tokenValidationProfile,
    badWordsValidation,
    maxCommentsValidation,
    profileValidation,
    commentValidation,
} from '@/middlewares/index';
import {
    writeComment_validation,
    likeComment_validation,
} from './comments.validation';

export function createCommentRoutes(
    path: string,
    writeComment: any,
    likeComment: any
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
        likeComment: {
            method: 'post',
            path: `${path}/like`,
            middleware: [
                bodyValidation(likeComment_validation),
                profileValidation(),
                commentValidation(),
            ],
            handler: likeComment,
        },
    };
}
