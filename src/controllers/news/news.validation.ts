import Joi from 'joi';

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
    page: Joi.number().required(),
});
