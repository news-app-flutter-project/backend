import Joi from 'joi';

export const bookmark_validation = Joi.object({
    news_id: Joi.number().required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const createFolder_validation = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
    name: Joi.string().required(),
});

export const listBookmarksFromFolder_validation = Joi.object({
    folder_id: Joi.number().allow(null).required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const listAllFolders_validation = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const allocate_validation = Joi.object({
    folder_id: Joi.number().required(),
    bookmark_id: Joi.number().required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const updateFolderName_validation = Joi.object({
    folder_id: Joi.number().required(),
    name: Joi.string().required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const removeBookmarkFromFolder_validation = Joi.object({
    bookmark_id: Joi.number().required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const deleteBookmark_validation = Joi.object({
    bookmark_id: Joi.number().required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const deleteBookmarkFolder_validation = Joi.object({
    folder_id: Joi.number().required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});
