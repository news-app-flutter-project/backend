import Joi from "joi";

export const kakao_registration = Joi.object({
  code: Joi.string().required(),
});

export const app_registration = Joi.object({
  profile_img: Joi.string().required(),
  name: Joi.string().required(),
  birthday: Joi.string().required(),
  sex: Joi.string().valid("male", "female").required(),
  category: Joi.array()
    .items(
      Joi.string().valid(
        "business",
        "entertainment",
        "politics",
        "science",
        "sports",
        "technology",
        "world",
        "lifestyle"
      )
    )
    .length(3)
    .required(),
  age: Joi.string().valid("10", "20", "30", "40", "50", "60", "70").required(),
  auth_id: Joi.number().required(),
});
