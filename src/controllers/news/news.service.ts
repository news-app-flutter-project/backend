import { newsRepository } from '@/database/repositories/news.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import { readerRepository } from '@/database/repositories/reader.repository';
import { lifeStyleConvert } from '@/utils/index';

export const newsService = {
    repository: newsRepository,
    profile_repository: profileRepository,
    reads_repository: readerRepository,

    async findByCategory(category: string) {
        const news = await this.repository.findByCategory(category);
        return news;
    },

    async findByUserCategories(auth_id: number) {
        const profile = await this.profile_repository.findProfilebyId(auth_id);
        if (profile) {
            const { category } = profile;
            const convertedCategories = lifeStyleConvert(category);
            const news = await this.repository.findByUserCategories(
                convertedCategories
            );
            return news;
        }
    },
};
