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

export const updateFolderName_validation = Joi.object({
    folder_id: Joi.number().required(),
    new_name: Joi.string().required(),
});

export const removeBookmarkFromFolder_validation = Joi.object({
    folder_id: Joi.number().required(),
    bookmark_id: Joi.number().required(),
});

export const deleteAllBookmarksfromFolders_validation = Joi.object({
    bookmark_id: Joi.number().required(),
});

export const deleteBookmarkFolder_validation = Joi.object({
    folder_id: Joi.number().required(),
});
