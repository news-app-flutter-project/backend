import {
    tokenValidation,
    bodyValidation,
    newsIdValidation,
    tokenValidationProfile,
    memoValidation,
} from '@/middlewares/index';

import { register_memo_validation } from './memo.validation';

export function createMemoRoutes(path: string, registerMemo: any): AuthRoutes {
    return {
        registerMemo: {
            method: 'post',
            path: `${path}/registerMemo`,
            middleware: [
                bodyValidation(register_memo_validation),
                tokenValidationProfile(),
                newsIdValidation(),
                memoValidation(),
            ],
            handler: registerMemo,
        },
    };
}
