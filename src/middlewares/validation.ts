import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";
import BadRequest from "./bad-request";

export const validationMiddleware = (schema: Joi.Schema): RequestHandler => {
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
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (e: any) {
      // check e.name (joi library => validationError, validationErrorItem => can see more details on error ex) path, message, type
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });
      const badRequest = new BadRequest(errors.join(", "), errors);
      res.status(badRequest.statusCode).send({
        message: badRequest.errors,
      });
    }
  };
};

export const validationPayload = (schema: Joi.Schema): RequestHandler => {
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
      const value = await schema.validateAsync(
        JSON.parse(req.body.payload),
        validationOptions
      );
      req.body = { ...req.body, value };
      next();
    } catch (e: any) {
      // check e.name (joi library => validationError, validationErrorItem => can see more details on error ex) path, message, type
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });
      const badRequest = new BadRequest(errors.join(", "), errors);
      res.status(badRequest.statusCode).send({
        message: badRequest.errors,
      });
    }
  };
};
declare global {
  interface CustomRequest extends Request {
    token?: string;
  }
}

export const checkAuthHeaders = (): RequestHandler => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const badRequest = new BadRequest(
        "Authorization header is missing or invalid.",
        []
      );
      res.status(badRequest.statusCode).send({
        message: badRequest.message,
      });
    }
    const token = authHeader?.split(" ")[1];
    if (!token) {
      const badRequest = new BadRequest("Invalid bearer token.", []);
      res.status(badRequest.statusCode).send({
        message: badRequest.message,
      });
    }
    // If everything is valid, we can store the token in the request object
    req.token = token;
    next();
  };
};
