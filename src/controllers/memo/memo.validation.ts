import Joi from 'joi';

export const register_memo_validation = Joi.object({
    news_id: Joi.number().required(),
    content: Joi.string().required(),
});

export const update_memo_validation = Joi.object({
    memo_id: Joi.number().required(),
    content: Joi.string().required(),
});

export const createFolder_validation = Joi.object({
    name: Joi.string().required(),
});

export const allocate_validation = Joi.object({
    id: Joi.number().required(),
    folder_id: Joi.number().required(),
});

export const updateFolderName_validation = Joi.object({
    name: Joi.string().required(),
    folder_id: Joi.number().required(),
});

export const listmemosFromFolder_validation = Joi.object({
    folder_id: Joi.number().required(),
});

export const removeMemoFromFolder_validation = Joi.object({
    id: Joi.number().required(),
});

export const deleteMemoFolder_validation = Joi.object({
    folder_id: Joi.number().required(),
});
