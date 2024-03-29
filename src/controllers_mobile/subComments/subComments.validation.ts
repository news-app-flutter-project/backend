import Joi from 'joi';

export const writeSubComment_validation = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
    comment_id: Joi.number().required(),
    content: Joi.string().max(300).required(),
});

export const likeSubComment_validation = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
    sub_comment_id: Joi.number().required(),
});

export const updateSubComment_validation = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
    sub_comment_id: Joi.number().required(),
    content: Joi.string().max(300).required(),
});
