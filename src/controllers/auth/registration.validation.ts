import Joi from "joi";

const create = Joi.object({
  code: Joi.string().required(),
});

export default { create };
