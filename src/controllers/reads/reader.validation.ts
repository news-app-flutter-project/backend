import Joi from "joi";

export const category = Joi.object({
  category: Joi.string()
    .valid(
      "business",
      "entertainment",
      "politics",
      "science",
      "sports",
      "technology",
      "world",
      "lifestyle"
    )
    .required(),
});

export const category_and_age = Joi.object({
  category: Joi.string()
    .valid(
      "business",
      "entertainment",
      "politics",
      "science",
      "sports",
      "technology",
      "world",
      "lifestyle"
    )
    .required(),
  age: Joi.string().valid("10", "20", "30", "40", "50", "60", "70").required(),
});
