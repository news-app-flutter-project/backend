import { bodyValidation, tokenValidationProfile } from '@/middlewares/index';
import { writeComment_validation } from './comment.validation';

export function createCommentRoutes(
    path: string,
    writeComment: any
): AuthRoutes {
    return {
        writeComment: {
            method: 'post',
            path: `${path}/writeComment`,
            middleware: [
                bodyValidation(writeComment_validation),
                tokenValidationProfile(),
            ],
            handler: writeComment,
        },
    };
}
