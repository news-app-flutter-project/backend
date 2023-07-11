import Joi from 'joi';

export const add_keywords = Joi.object({
    news_id: Joi.number().required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const read_news = Joi.object({
    news_id: Joi.number().required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});
