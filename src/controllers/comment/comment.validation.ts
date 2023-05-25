import Joi from 'joi';

export const writeComment_validation = Joi.object({
    news_id: Joi.number().required(),
    content: Joi.string().required(),
});
