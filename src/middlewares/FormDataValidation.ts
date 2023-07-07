import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import BadRequest from './bad-request';
import { StatusCodes } from 'http-status-codes';

const validationFormData = (schema: Joi.Schema): RequestHandler => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            // Checking if content-type is multipart/form-data
            if (!req.is('multipart/form-data')) {
                const badRequest = new BadRequest(
                    'Must be multipart/form-data format',
                    []
                );
                res.status(badRequest.statusCode).json({
                    result: false,
                    code: StatusCodes.BAD_REQUEST,
                    message: badRequest.message,
                });
                return;
            }

            const req_data: { [key: string]: any } = { ...req.body };

            if (req.file && req.file.path) {
                // If file is present, include it
                req_data.profile_img = req.file.path;
            } else if (req_data.file === '') {
                // If file key exists and it's an empty string, delete it
                delete req_data.file;
            }

            const parsedBody: { [key: string]: any } = {};

            Object.entries(req_data).forEach(([key, value]) => {
                if (typeof value === 'string') {
                    try {
                        parsedBody[key] = JSON.parse(value);
                    } catch {
                        parsedBody[key] = value;
                    }
                } else {
                    parsedBody[key] = value;
                }
            });

            const value = await schema.validateAsync(
                parsedBody,
                validationOptions
            );

            req.body = { ...parsedBody };
            next();
        } catch (e: any) {
            if (e.message === 'Invalid Form Data format') {
                const badRequest = new BadRequest('', [
                    'Invalid Form Data format',
                ]);
                res.status(badRequest.statusCode).json({
                    result: false,
                    message: badRequest.errors,
                });
                return;
            } else {
                const errors: string[] = [];
                e.details.forEach((error: Joi.ValidationErrorItem) => {
                    errors.push(error.message);
                });
                const badRequest = new BadRequest(errors.join(', '), errors);
                res.status(badRequest.statusCode).json({
                    result: false,
                    message: badRequest.errors,
                });
            }
        }
    };
};

export default validationFormData;
