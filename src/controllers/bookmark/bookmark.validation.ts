import Joi from 'joi';

export const bookmark_validation = Joi.object({
    news_id: Joi.number().required(),
});

export const createFolder_validation = Joi.object({
    name: Joi.string().required(),
});

export const allocate_validation = Joi.object({
    folder_id: Joi.number().required(),
    bookmark_id: Joi.number().required(),
});
