import Joi from 'joi';

export const manage_highlight = Joi.object({
    news_id: Joi.number().required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
    sentence_no: Joi.number().integer().min(0).required(),
});
