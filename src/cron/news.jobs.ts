import cron from "node-cron";
import useNewsApi from "@/apis/news_api";
import paramsArr from "@/apis/news_api_params";
import { newsRepository } from "@/database/repositories/news.repository";
import { validateNews } from "@/database/validations/news.validation";
import { UniqueConstraintError } from "sequelize";

export const scheduleNewsUpdate = async () => {
  const lastNewsItem = await newsRepository.findLastNewsItem();
  const allNewsItem = await newsRepository.findAllNews();
  // for (const newsItem of allNewsItem) {
  //   console.log(newsItem.dataValues);
  // }

  // console.log(lastNewsItem?.dataValues);
  const { results: newsArr } = await useNewsApi(paramsArr[0]);
  console.log(newsArr);

  // console.log(newsArr);

  for (const news of newsArr) {
    let keywords = null;
    if (news.kewords) {
      keywords = Array.isArray(news.keywords) ? news.keywords : [news.keywords];
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
      await newsRepository.createSingleNews(singleNewsData);
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        console.error(`Error inserting news: ${error.message}`);
      } else {
        console.error("Error inserting news:", error);
      }
      continue;
    }
  }
};
