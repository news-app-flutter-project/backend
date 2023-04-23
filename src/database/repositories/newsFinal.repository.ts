import { Sequelize } from "sequelize";
import db from "@/database/db";
import { dbException } from "@/common/exceptions";
import { defaultOptions } from "../options";
import { NewsModel } from "@/database/models/news.models";

export const newsFinalRepository = {
  async findByCategory(category: string) {
    try {
      return await db.News.findAll({
        where: Sequelize.literal(`JSON_CONTAINS(category, '["${category}"]')`),
        order: [["pub_date", "DESC"]],
      });
    } catch (err) {
      dbException(err);
    }
  },

  async findByUserCategories(categories: ConvertedCategory[]) {
    try {
      const categoryConditions = categories
        .map((category) => `category LIKE '%"${category}"%'`)
        .join(" OR ");
      return await db.News.findAll({
        where: Sequelize.literal(categoryConditions),
        order: [["pub_date", "DESC"]],
      });
    } catch (err) {
      dbException(err);
    }
  },

  async findNewsbyId(news_id: number): Promise<NewsModel> {
    try {
      const news = await db.News.findOne({
        where: {
          id: news_id,
        },
      });
      return news!;
    } catch (err) {
      return dbException(err);
    }
  },
};
