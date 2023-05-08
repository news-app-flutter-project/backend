import { Request, Response, NextFunction, RequestHandler } from 'express';
import BadRequest from './bad-request';
import { kakaoId } from '@/apis/kakao/index';
import { customResponse } from '@/common/response';
import { authRepository } from '@/database/repositories/auth.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import { notFoundAccountException } from '@/common/exceptions';

const tokenValidationProfile = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const badRequest = new BadRequest('', [
                'Authorization header is missing or invalid.',
            ]);
            res.status(badRequest.statusCode).json({
                result: false,
                message: badRequest.errors,
            });
            return;
        }
        const access_token = authHeader?.split(' ')[1];
        if (!access_token) {
            const badRequest = new BadRequest('', [
                'Invalid bearer access_token.',
            ]);
            res.status(badRequest.statusCode).json({
                result: false,
                message: badRequest.message,
            });
            return;
        } else {
            const response = customResponse(res);
            try {
                const { id } = await kakaoId(access_token);
                const auth_id = await authRepository.findbyKakaoId(id);
                if (!auth_id) {
                    return notFoundAccountException();
                }
                const profile_id = await profileRepository.findProfilebyId(
                    auth_id
                );
                console.log(profile_id);
                if (!profile_id) {
                    return notFoundAccountException();
                }
                req.auth_id = auth_id;
                req.profile_id = profile_id.id;
                req.token = access_token;
                next();
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    };
};

export default tokenValidationProfile;
