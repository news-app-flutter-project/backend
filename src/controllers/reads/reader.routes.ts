import {
  payloadValidation,
  tokenValidation,
  bodyValidation,
  newsIdValidation,
} from "@/middlewares/index";
import { category, category_and_age } from "./reader.validation";

export function createReadsRoutes(
  path: string,
  findMostPopularForCategory: any,
  findMostPopularWithCategoryAndAge: any
): AuthRoutes {
  return {
    findByCategory: {
      method: "get",
      path: `${path}/popular/category`,
      middleware: [tokenValidation(), bodyValidation(category)],
      handler: findMostPopularForCategory,
    },

    findByCategoryAndAge: {
      method: "get",
      path: `${path}/popular/category/age`,
      middleware: [tokenValidation(), bodyValidation(category_and_age)],
      handler: findMostPopularWithCategoryAndAge,
    },
  };
}
