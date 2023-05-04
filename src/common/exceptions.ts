import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import { error } from 'console';

/********************* DB related exceptions **********************/
export const dbException = (error: any) => {
    throw {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'something wrong with the server',
        error,
    };
};

export const notFoundAccountException = (id?: number) => {
    throw {
        code: 404,
        message: `user does not exist with id ${id}`,
    };
};

export const notFoundNews = (news_id?: number) => {
    throw {
        code: 404,
        message: `news does not exist with id ${news_id}`,
    };
};

/***************** external api related exceptions **********************/
export const kakaoRegisterException = (error: any) => {
    throw {
        code: StatusCodes.BAD_REQUEST,
        message: 'something wrong with kakao api',
        error: error.response.data.error_description,
    };
};

export const kakaoIdException = (error: any) => {
    throw {
        code: StatusCodes.UNAUTHORIZED,
        message: 'something wrong with kakao api',
        error: 'invalid token',
    };
};

export const cloudinaryException = (error: any) => {
    throw {
        code: StatusCodes.BAD_REQUEST,
        message: 'something wrong with cloudinary',
        error: 'invalid file',
    };
};

export const chatGptException = (error: any) => {
    throw {
        code: StatusCodes.BAD_REQUEST,
        message: 'something wrong with gpt',
        error: error,
    };
};
