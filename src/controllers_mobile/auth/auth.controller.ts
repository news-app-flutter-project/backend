import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createAuthRoutes } from './auth.routes';
import { authService } from './auth.service';
import { createRoutes } from '@/common/createRouter';

class AuthMobileController implements Controller {
    public path = '/auth/mobile';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const authRoutes: AuthRoutes = createAuthRoutes(this.path, this.login);

        createRoutes(authRoutes, this.router);
    }

    private login = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const { kakao_id } = req.body;
        try {
            const res = await authService.login(kakao_id);
            if (res.hasOwnProperty('profile')) {
                response.success({ code: StatusCodes.OK, data: res });
            }
            response.success({ code: StatusCodes.CREATED, data: res });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default AuthMobileController;
