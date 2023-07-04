import Joi from 'joi';

export const kakao_id = Joi.number()
    .integer()
    .min(1000000000)
    .max(9999999999)
    .required();

export const email = Joi.string().email().required();
export const name = Joi.string().required();

export const sex = Joi.string().valid('male', 'female', 'undefined').required();

export const category = Joi.array()
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
    .required();

export const age = Joi.string()
    .valid('10', '20', '30', '40', '50', '60')
    .required();

export const create_profile = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
    email: Joi.string().email().required(),
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
    age: Joi.string().valid('10', '20', '30', '40', '50', '60').required(),
});

export const screen_mode = Joi.object({
    mode: Joi.string().valid('light', 'dark').required(),
});

export const text_size = Joi.object({
    text_size: Joi.string().valid('small', 'large').required(),
});
