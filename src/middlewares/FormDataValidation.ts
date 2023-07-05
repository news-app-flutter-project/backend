import { Request, Response, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';
import BadRequest from './bad-request';
import { parse } from 'path';

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
            const file: Express.Multer.File = req.file!;
            console.log(file);
            const req_data = {
                profile_img: file.path, // Access the uploaded file via req.file
                ...req.body,
            };

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
    };
};

export default validationFormData;
