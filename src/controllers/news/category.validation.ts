import Joi from "joi";

const create = Joi.object({
  category: Joi.string().required(),
});

export default { create };
