import Joi from 'joi';

export const register_memo_validation = Joi.object({
    news_id: Joi.number().required(),
    content: Joi.string().required(),
});
