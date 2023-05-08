import {
    bodyValidation,
    headersValidation,
    tokenValidation,
} from '@/middlewares/index';
import { login } from './auth.validation';

declare global {
    type AuthRoutes = {
        [key: string]: IRouteOptions;
    };
}

export function createAuthRoutes(
    path: string,
    loginHandler: any,
    logoutHandler: any,
    tokenLoginHandler: any,
    refreshTokensHandler: any
): AuthRoutes {
    return {
        login: {
            method: 'post',
            path: `${path}/login`,
            middleware: [bodyValidation(login)],
            handler: loginHandler,
        },
        logout: {
            method: 'post',
            path: `${path}/logout`,
            middleware: [tokenValidation()],
            handler: logoutHandler,
        },
        token_login: {
            method: 'post',
            path: `${path}/token_login`,
            middleware: [tokenValidation()],
            handler: tokenLoginHandler,
        },
        refresh_tokens: {
            method: 'post',
            path: `${path}/refresh_tokens`,
            middleware: [headersValidation()],
            handler: refreshTokensHandler,
        },
    };
}
