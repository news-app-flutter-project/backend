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
    updateComment_validation,
} from './comments.validation';

export function createCommentRoutes(
    path: string,
    writeComment: any,
    likeComment: any,
    dislikeComment: any,
    updateComment: any
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
        dislikeComment: {
            method: 'post',
            path: `${path}/dislike`,
            middleware: [
                bodyValidation(likeComment_validation),
                profileValidation(),
                commentValidation(),
            ],
            handler: dislikeComment,
        },
        updateComment: {
            method: 'put',
            path: `${path}`,
            middleware: [
                bodyValidation(updateComment_validation),
                profileValidation(),
                commentValidation(),
                badWordsValidation(),
            ],
            handler: updateComment,
        },
    };
}
