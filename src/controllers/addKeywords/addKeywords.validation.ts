import Joi from "joi";

const create = Joi.object({
  newsId: Joi.number().required(),
});

export default { create };
