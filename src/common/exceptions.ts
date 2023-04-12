import { StatusCodes } from "http-status-codes";
import { Response } from "express";

export const dbException = (res: Response, err: any) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    result: false,
    message: "something wrong with the server",
    err: err.errors.map(({ message }: { message: string }) => message),
  });
};
