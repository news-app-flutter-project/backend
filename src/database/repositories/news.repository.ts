import db from "@/database/db";
import useChatGPT from "@/apis/gpt/keywords.gen";
import { removeBrackets } from "@/utils/removeBrackets";
import { gptToString } from "@/utils/gptToString";

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

  // update gpt_keywords column for a news item
  async updateGptKeywords(newsId: number) {
    try {
      // get the news item to update
      const newsItem = await db.News.findByPk(newsId);
      if (!newsItem) throw new Error("News item not found");

      // split content into chunks based on sentence boundaries
      const desciption = newsItem.dataValues.description;
      const title = newsItem.dataValues.title;

      // remove brackets from the text
      const fixedTitle = removeBrackets(title);
      const fixedDesc = removeBrackets(desciption);

      // use key gen with chatgpt
      const generateKeywords = new useChatGPT(process.env.OPENAI_API_KEY || "");
      const titleKeywords = await generateKeywords.getKeywords({
        title: fixedTitle,
      });
      const descKeywords = await generateKeywords.getKeywords({
        desc: fixedDesc,
      });

      // string to arr
      const [titleArr, descArr] = [
        gptToString(titleKeywords || ""),
        gptToString(descKeywords || ""),
      ];

      // filter out duplicate keywords
      const uniqueKeywords = Array.from(new Set([...titleArr, ...descArr]));

      // update gpt_keywords column with the generated keywords
      await db.News.update(
        { gpt_keywords: uniqueKeywords },
        { where: { id: newsId } }
      );
    } catch (error) {
      console.log("Error updating gpt_keywords column:", error);
    }
  },
};
