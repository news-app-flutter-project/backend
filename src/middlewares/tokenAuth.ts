import { Request, Response, NextFunction, RequestHandler } from "express";
import BadRequest from "./bad-request";
import { kakaoId } from "@/apis/kakao/index";
import { customResponse } from "@/common/response";

const tokenValidation = (): RequestHandler => {
  return async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const badRequest = new BadRequest("", [
        "Authorization header is missing or invalid.",
      ]);
      res.status(badRequest.statusCode).json({
        result: false,
        message: badRequest.errors,
      });
    }
    const access_token = authHeader?.split(" ")[1];
    if (!access_token) {
      const badRequest = new BadRequest("", ["Invalid bearer access_token."]);
      res.status(badRequest.statusCode).json({
        result: false,
        message: badRequest.message,
      });
    } else {
      const response = customResponse(res);
      try {
        await kakaoId(access_token);
        req.token = access_token;
        next();
      } catch (err) {
        response.error(err as ErrorData);
      }
    }
  };
};

export default tokenValidation;
