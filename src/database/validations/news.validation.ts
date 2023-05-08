import Joi from 'joi';
import { NewsCreateInterface } from '@/database/models/news.models';

export const validateNews = async (news: NewsCreateInterface) => {
    const validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    const schema = Joi.object({
        category: Joi.string(),

        keywords: Joi.alternatives().try(
            Joi.array().items(Joi.string().max(20)),
            Joi.allow(null)
        ),

        title: Joi.string().required(),

        description: Joi.string().required(),

        content: Joi.string().required(),

        creator: Joi.alternatives().try(
            Joi.string(),
            Joi.array().items(Joi.string().max(20)),
            Joi.allow(null)
        ),

        pub_date: Joi.date().required(),

        image_url: Joi.string().allow(null),

        link: Joi.string().allow(null),

        company: Joi.string().allow(null),

        language: Joi.string().allow(null),

        gpt_keywords: Joi.array().items(Joi.string()),
    });

    try {
        const value = await schema.validateAsync(news, validationOptions);
        return { isValid: true, data: value };
    } catch (err: any) {
        const errors: string[] = [];
        err.details.forEach((error: Joi.ValidationErrorItem) => {
            errors.push(error.message);
        });
        return { isValid: false, errors: errors };
    }
};
