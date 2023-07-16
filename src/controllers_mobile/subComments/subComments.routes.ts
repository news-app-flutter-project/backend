import {
    bodyValidation,
    tokenValidationProfile,
    badWordsValidation,
    profileValidation,
    maxSubCommentsValidation,
    commentValidation,
    subCommentValidation,
} from '@/middlewares/index';
import {
    writeSubComment_validation,
    likeSubComment_validation,
} from './subComments.validation';

export function createSubCommentRoutes(
    path: string,
    writeSubComment: any,
    likeSubComment: any
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
            handler: writeSubComment,
        },
        likeSubComment: {
            method: 'post',
            path: `${path}/like`,
            middleware: [
                bodyValidation(likeSubComment_validation),
                profileValidation(),
                subCommentValidation(),
            ],
            handler: likeSubComment,
        },
    };
}
