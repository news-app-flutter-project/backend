import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    multerErrorHandling,
    validationFormData,
    kakaoIdAuth,
} from '@/middlewares/index';
import {
    create_profile,
    kakao_id,
    screen_mode,
    text_size,
} from './profile.validation';

import { upload } from '@/utils/multerSetup';

export function createProfileMobileRoutes(
    path: string,
    createProfileHandler: any,
    getProfileHandler: any
): AuthRoutes {
    return {
        createProfileTest: {
            method: 'post',
            path: `${path}/profile`,
            middleware: [
                upload.single('file'),
                multerErrorHandling,
                validationFormData(create_profile),
                kakaoIdAuth(),
            ],
            handler: createProfileHandler,
        },

        getProfile: {
            method: 'get',
            path: `${path}/profile`,
            middleware: [bodyValidation(kakao_id), kakaoIdAuth()],
            handler: getProfileHandler,
        },
    };
}
