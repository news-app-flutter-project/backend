import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    kakaoIdValidation,
} from '@/middlewares/index';

export function createProfileMobileRoutes(
    path: string,
    createProfileHandler: any
): AuthRoutes {
    return {
        createProfile: {
            method: 'post',
            path: `${path}/create_profile`,
            middleware: [kakaoIdValidation()],
            handler: createProfileHandler,
        },
    };
}
