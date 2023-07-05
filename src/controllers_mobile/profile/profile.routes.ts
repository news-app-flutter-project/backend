import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
} from '@/middlewares/index';

import { create_profile } from './profile.validation';

export function createProfileMobileRoutes(
    path: string,
    createProfileHandler: any
): AuthRoutes {
    return {
        createProfile: {
            method: 'post',
            path: `${path}/create_profile`,
            middleware: [],
            handler: createProfileHandler,
        },
    };
}
