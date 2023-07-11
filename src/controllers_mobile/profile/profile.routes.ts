import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    multerErrorHandling,
    kakaoIdAuth,
    profileIdValidation,
    queryValidation,
    formValidation,
} from '@/middlewares/index';
import { create_profile, kakao_id, update_profile } from './profile.validation';

import { upload } from '@/utils/multerSetup';

export function createProfileMobileRoutes(
    path: string,
    createProfileHandler: any,
    getProfileHandler: any,
    updateProfileHandler: any
): AuthRoutes {
    return {
        createProfileTest: {
            method: 'post',
            path: `${path}`,
            middleware: [
                upload.single('file'),
                multerErrorHandling,
                formValidation(create_profile),
                profileIdValidation(),
            ],
            handler: createProfileHandler,
        },

        getProfile: {
            method: 'get',
            path: `${path}`,
            middleware: [queryValidation(kakao_id), kakaoIdAuth()],
            handler: getProfileHandler,
        },

        updateProfile: {
            method: 'put',
            path: `${path}`,
            middleware: [
                upload.single('file'),
                multerErrorHandling,
                formValidation(update_profile),
                kakaoIdAuth(),
            ],
            handler: updateProfileHandler,
        },
    };
}
