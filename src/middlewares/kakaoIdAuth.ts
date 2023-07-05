import { Request, Response, NextFunction, RequestHandler } from 'express';
import { authRepository } from '@/database/repositories/auth.repository';
import { notFoundAccountException } from '@/common/exceptions';
import { customResponse } from '@/common/response';

const kakaoIdAuth = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        try {
            const { kakao_id } = req.body;

            const auth_id = await authRepository.findbyKakaoId(kakao_id);
            if (!auth_id) {
                return notFoundAccountException();
            }
            req.auth_id = auth_id;
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default kakaoIdAuth;
