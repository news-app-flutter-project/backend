import Joi from 'joi';

export const create_profile = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
    name: Joi.string().required(),
    nickname: Joi.string().required(),
    sex: Joi.string().valid('male', 'female', 'undefined').required(),
    category: Joi.array()
        .items(
            Joi.string().valid(
                'business',
                'entertainment',
                'politics',
                'science',
                'sports',
                'technology',
                'world',
                'lifestyle'
            )
        )
        .min(1)
        .max(3)
        .required(),
    birthday: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .allow(null)
        .required(),
    age: Joi.number().valid(10, 20, 30, 40, 50, 60).required(),
    email: Joi.string().email().required(),
}).unknown(false);

export const update_profile = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
    name: Joi.string(),
    nickname: Joi.string(),
    sex: Joi.string().valid('male', 'female', 'undefined'),
    category: Joi.array()
        .items(
            Joi.string().valid(
                'business',
                'entertainment',
                'politics',
                'science',
                'sports',
                'technology',
                'world',
                'lifestyle'
            )
        )
        .min(1)
        .max(3),
    birthday: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .allow(null),
    age: Joi.number().valid(10, 20, 30, 40, 50, 60),
    email: Joi.string().allow(null).email(),
    screen_mode: Joi.string().valid('light', 'dark'),
    text_size: Joi.string().valid('small', 'large'),
}).unknown(false);

export const kakao_id = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});
