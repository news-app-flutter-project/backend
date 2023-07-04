import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { createAuthRoutes } from './auth.routes';
import { customResponse } from '@/common/response';
import { authService } from './auth.service';
import { createRoutes } from '@/common/createRouter';

class AuthController implements Controller {
    public path = '/auth';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const authRoutes: AuthRoutes = createAuthRoutes(
            this.path,
            this.login,
            this.logout,
            this.token_login,
            this.refresh_tokens
        );

        createRoutes(authRoutes, this.router);
    }

    private login = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const { code } = req.body;
        try {
            const res = await authService.login(code);
            if (res.hasOwnProperty('profile')) {
                response.success({ code: StatusCodes.OK, data: res });
            }
            response.success({ code: StatusCodes.CREATED, data: res });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private logout = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const auth_id = req.auth_id;
        const access_token = req.token;
        try {
            await authService.logout(auth_id!, access_token!);
            response.success({ code: StatusCodes.CREATED });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private token_login = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const auth_id = req.auth_id;
        try {
            const res = await authService.token_login(auth_id!);
            response.success({ code: StatusCodes.CREATED, data: res });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private refresh_tokens = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const refresh_token = req.token;

        try {
            const res = await authService.refresh_tokens(refresh_token!);
            response.success({ code: StatusCodes.CREATED, data: res });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default AuthController;
