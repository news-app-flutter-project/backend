import { StatusCodes } from "http-status-codes";
import { Response } from "express";
import { error } from "console";

/********************* DB related exceptions **********************/
export const dbException = (error: any) => {
  throw {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "something wrong with the server",
    error: error.errors.map(({ message }: { message: string }) => message),
  };
};

/***************** external api related exceptions **********************/
export const kakaoRegisterException = (error: any) => {
  throw {
    code: StatusCodes.BAD_REQUEST,
    message: "something wrong with kakao api",
    error: error.response.data.error_description,
  };
};

export const kakaoIdException = (error: any) => {
  throw {
    code: StatusCodes.UNAUTHORIZED,
    message: "something wrong with kakao api",
    error: "invalid accessToken",
  };
};
