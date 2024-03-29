import { Request, Response, NextFunction, RequestHandler } from 'express';
import BadRequest from './bad-request';

declare global {
    interface CustomRequest extends Request {
        token?: string;
        auth_id?: number;
        profile_id?: number;
        news?: News;
        category?: Category[];
        age?: Age;
        profile_create_data?: ProfileRegisterData;
        profile?: Profile;
        sentence_no?: number;
    }
}

const checkAuthHeaders = (): RequestHandler => {
    return (req: CustomRequest, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            const badRequest = new BadRequest('', [
                'Authorization header is missing or invalid.',
            ]);
            res.status(badRequest.statusCode).json({
                result: false,
                message: badRequest.errors,
            });
        }
        const token = authHeader?.split(' ')[1];
        if (!token) {
            const badRequest = new BadRequest('', ['Invalid bearer token.']);
            res.status(badRequest.statusCode).json({
                result: false,
                message: badRequest.message,
            });
        }
        req.token = token;
        next();
    };
};

export default checkAuthHeaders;
