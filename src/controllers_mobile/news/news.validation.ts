import Joi from 'joi';

export const find_my_news = Joi.object({
    page: Joi.number().required().min(1),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const today_top_news = Joi.object({
    page: Joi.number().required().min(1),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const today_top_news_age = Joi.object({
    page: Joi.number().required().min(1),
    age: Joi.string()
        .valid('10', '20', '30', '40', '50', '60', '70')
        .required(),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const find_news_by_category = Joi.object({
    category: Joi.string()
        .valid(
            'business',
            'entertainment',
            'politics',
            'science',
            'sports',
            'technology',
            'world',
            'lifestyle'
        )
        .required(),
    page: Joi.number().required().min(1),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});

export const find_news_by_category_and_age = Joi.object({
    category: Joi.string()
        .valid(
            'business',
            'entertainment',
            'politics',
            'science',
            'sports',
            'technology',
            'world',
            'lifestyle'
        )
        .required(),
    age: Joi.string()
        .valid('10', '20', '30', '40', '50', '60', '70')
        .required(),
    page: Joi.number().required().min(1),
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});
