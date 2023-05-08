import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';

declare global {
    interface SuccessData {
        code: number;
        data?: any;
    }

    interface ErrorData {
        code: number;
        message: string;
        error?: any;
    }
}

export const customResponse = (res: Response) => {
    return {
        success({ code = StatusCodes.OK, data }: SuccessData) {
            return res.status(code).json({ result: true, code, data });
        },
        error({ code, message, error }: ErrorData) {
            return res
                .status(code)
                .json({ result: false, code, message, error });
        },
    };
};
