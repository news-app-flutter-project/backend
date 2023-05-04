import { newsRepository } from "@/database/repositories/news.repository";
import { profileRepository } from "@/database/repositories/profile.repository";
import { readerRepository } from "@/database/repositories/reader.repository";
import { lifeStyleConvert } from "@/utils/index";
import useChatGPT from "@/apis/gpt/keywords.generator";
import { removeBrackets } from "@/utils/removeBrackets";
import { gptToString } from "@/utils/gptToString";

export const newsService = {
  repository: newsRepository,
  profile_repository: profileRepository,
  reads_repository: readerRepository,

  async findByCategory(category: string) {
    const news = await this.repository.findByCategory(category);
    return news;
  },

  async findByUserCategories(auth_id: number) {
    const { category } = await this.profile_repository.findProfilebyId(auth_id);
    const convertedCategories = lifeStyleConvert(category);
    const news = await this.repository.findByUserCategories(
      convertedCategories
    );
    return news;
  },

  async addKeywords(news: News) {
    const { id: news_id, gpt_keywords, description, title } = news;
    if (!gpt_keywords) {
      return gpt_keywords;
    }
    const fixedTitle = removeBrackets(title);
    const fixedDesc = removeBrackets(description);

    const generateKeywords = new useChatGPT();
    const titleKeywords = await generateKeywords.getKeywords({
      title: fixedTitle,
    });
    const descKeywords = await generateKeywords.getKeywords({
      desc: fixedDesc,
    });

    const [titleArr, descArr] = [
      gptToString(titleKeywords || ""),
      gptToString(descKeywords || ""),
    ];
    const uniqueKeywords = Array.from(new Set([...titleArr, ...descArr]));
    await this.repository.updateGptKeywords(uniqueKeywords, news_id);
    return uniqueKeywords;
  },

  async readNews(auth_id: number, news_id: number) {
    const {
      id: profile_id,
      age,
      sex,
    } = await this.profile_repository.findProfilebyId(auth_id);
    const isExist = await this.reads_repository.checkDuplicateReads(
      profile_id,
      news_id
    );
    if (!isExist) {
      await this.reads_repository.readNews({
        age,
        news_id,
        profile_id,
        sex,
      });
      return;
    } else {
      return;
    }
  },
};
