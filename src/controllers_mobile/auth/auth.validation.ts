import Joi from 'joi';

export const login = Joi.object({
    kakao_id: Joi.number().integer().min(1000000000).max(9999999999).required(),
});
