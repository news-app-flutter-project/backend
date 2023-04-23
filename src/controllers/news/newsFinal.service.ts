import { newsFinalRepository } from "@/database/repositories/newsFinal.repository";
import { profileRepository } from "@/database/repositories/profile.repository";
import { readsRepository } from "@/database/repositories/reads.repository";
import { lifeStyleConvert } from "@/utils/index";

export const newsFinalService = {
  repository: newsFinalRepository,
  profile_repository: profileRepository,
  reads_repository: readsRepository,

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
