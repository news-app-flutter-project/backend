import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    createProfileValidation,
} from '@/middlewares/index';

import { create_profile } from './profile.validation';

import { single } from '@/middlewares/multipart-parser';

export function createProfileMobileRoutes(
    path: string,
    createProfileHandler: any
): AuthRoutes {
    return {
        createProfile: {
            method: 'post',
            path: `${path}/create_profile`,
            middleware: [
                single({ field: 'image', fileSize: 500 * 1024 }),
                createProfileValidation(),
                // payloadValidation(create_profile),
            ],
            handler: createProfileHandler,
        },
    };
}
