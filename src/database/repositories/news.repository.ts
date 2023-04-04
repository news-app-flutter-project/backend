import db from "@/database/db";

export const newsRepository = {
  // find last news item
  async findLastNewsItem() {
    return await db.News.findOne({
      order: [["createdAt", "DESC"]],
    });
  },

  // find all news items
  async findAllNews() {
    return await db.News.findAll();
  },

  // insert news article into news table
  async createNews(newsCreateData: any[]) {
    console.log(newsCreateData);
    try {
      return await db.News.bulkCreate(newsCreateData);
    } catch (error) {
      console.log(error);
    }
  },

  // insert a single news article into news table
  async createSingleNews(newsCreateData: any) {
    try {
      return await db.News.create(newsCreateData);
    } catch (error) {
      console.log("error", error);
    }
  },
};
