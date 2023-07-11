import { Request, Response, NextFunction, RequestHandler } from 'express';
import BadRequest from './bad-request';
import { kakaoId } from '@/apis/kakao/index';
import { customResponse } from '@/common/response';
import { authRepository } from '@/database/repositories/auth.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import { notFoundAccountException, DuplicateError } from '@/common/exceptions';

const profileIdValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const response = customResponse(res);
        try {
            const { kakao_id } = req.body;
            const auth_id = await authRepository.findbyKakaoId(kakao_id);
            if (auth_id === null || auth_id === undefined) {
                return notFoundAccountException(kakao_id);
            }
            const profile = await profileRepository.findProfilebyId(auth_id);

            if (profile) {
                return DuplicateError('profile already exist');
            }
            req.auth_id = auth_id;
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default profileIdValidation;
