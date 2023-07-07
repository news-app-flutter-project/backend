import Joi from 'joi';

export const create_profile = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
    name: Joi.string().required(),
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
});

export const screen_mode = Joi.object({
    mode: Joi.string().valid('light', 'dark').required(),
});

export const text_size = Joi.object({
    text_size: Joi.string().valid('small', 'large').required(),
});

export const kakao_id = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});
