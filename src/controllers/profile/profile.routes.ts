import {
    payloadValidation,
    tokenValidation,
    bodyValidation,
    multerErrorHandling,
    validationFormData,
} from '@/middlewares/index';
import { create_profile, screen_mode, text_size } from './profile.validation';

import { upload } from '@/utils/multerSetup';

export function createProfileRoutes(
    path: string,
    createProfileHandler: any,
    getProfileHandler: any,
    updateImageHandler: any,
    updateScreenModeHandler: any,
    updateTextSize: any
): AuthRoutes {
    return {
        createProfileTest: {
            method: 'post',
            path: `${path}/create_profile`,
            middleware: [
                upload.single('file'),
                multerErrorHandling,
                tokenValidation(),
                validationFormData(create_profile),
            ],
            handler: createProfileHandler,
        },

        getProfile: {
            method: 'get',
            path: `${path}/get_profile`,
            middleware: [tokenValidation()],
            handler: getProfileHandler,
        },
        updateImage: {
            method: 'put',
            path: `${path}/update_img`,
            middleware: [tokenValidation()],
            handler: updateImageHandler,
        },
        updateScreen: {
            method: 'put',
            path: `${path}/update_screen`,
            middleware: [tokenValidation(), bodyValidation(screen_mode)],
            handler: updateScreenModeHandler,
        },
        updateTextSize: {
            method: 'put',
            path: `${path}/update_text`,
            middleware: [tokenValidation(), bodyValidation(text_size)],
            handler: updateTextSize,
        },
    };
}
