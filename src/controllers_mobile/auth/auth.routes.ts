import {
    bodyValidation,
    headersValidation,
    tokenValidation,
} from '@/middlewares/index';
import { login } from './auth.validation';

export function createAuthRoutes(path: string, loginHandler: any): AuthRoutes {
    return {
        login: {
            method: 'post',
            path: `${path}/login`,
            middleware: [bodyValidation(login)],
            handler: loginHandler,
        },
    };
}
