import Joi from 'joi';

export const search_keyword = Joi.object({
    keyword: Joi.string().required(),
});
