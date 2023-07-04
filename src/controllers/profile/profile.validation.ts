import Joi from 'joi';

export const create_profile = Joi.object({
    name: Joi.string().required(),
    birthday: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required(),
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
