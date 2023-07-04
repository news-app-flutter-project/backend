import { Request, Response, NextFunction, RequestHandler } from 'express';
import BadRequest from './bad-request';
import { kakaoId } from '@/apis/kakao/index';
import { customResponse } from '@/common/response';
import { authRepository } from '@/database/repositories/auth.repository';
import { notFoundAccountException } from '@/common/exceptions';

const kakaoIdValidation = (): RequestHandler => {
    return async (
        req: CustomRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const files: any = req.files;
        const req_data = {
            profile_img: files.image.tempFilePath,
            ...JSON.parse(req.body.payload),
        };

        // kakao_id 확인
        const { kakao_id } = req_data;
        const auth_id = await authRepository.findbyKakaoId(kakao_id);

        const profile_create_data = {
            profile_img: files.image.tempFilePath,
            ...JSON.parse(req.body.payload),
            auth_id,
        };

        req.auth_id = auth_id;
        req.profile_create_data = profile_create_data;
        next();
    };
};

export default kakaoIdValidation;
