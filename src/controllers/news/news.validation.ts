import Joi from "joi";

export const find_news_by_category = Joi.object({
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

export const add_keywords = Joi.object({
  news_id: Joi.number().required(),
});

export const read_news = Joi.object({
  news_id: Joi.number().required(),
});
