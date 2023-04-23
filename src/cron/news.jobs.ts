import { newsFinalRepository } from "@/database/repositories/newsFinal.repository";
import { validateNews } from "@/database/validations/news.validation";
import { UniqueConstraintError } from "sequelize";

export class ScheduleNewsUpdate {
  async findLastNewsItem() {
    return await newsFinalRepository.findLastNewsItem();
  }

  async allNewsItems() {
    let newsArr: any = [];
    const allNewsItem = await newsFinalRepository.findAllNews();
    for (const newsItem of allNewsItem) {
      newsArr.push(newsItem.dataValues);
    }
    return newsArr;
  }

  async insertNewsData(newsArr: any) {
    for (const news of newsArr) {
      let keywords = null;
      if (news.kewords) {
        keywords = Array.isArray(news.keywords)
          ? news.keywords
          : [news.keywords];
      }

      const singleNewsData = {
        category: news.category,
        keywords: keywords,
        title: news.title,
        description: news.description,
        content: news.content,
        creator: news.creator,
        pubDate: new Date(news.pubDate),
        image_url: news.image_url,
        link: news.link,
        company: news.source_id,
        language: news.language,
      };

      const validationResult = await validateNews(singleNewsData);
      if (!validationResult.isValid) {
        console.log("validation error", validationResult.errors);
        continue;
      }

      try {
        await newsFinalRepository.createSingleNews(singleNewsData);
      } catch (error) {
        if (error instanceof UniqueConstraintError) {
          console.error(`Error inserting news: ${error.message}`);
        } else {
          console.error("Error inserting news:", error);
        }
        continue;
      }
    }
  }
}
