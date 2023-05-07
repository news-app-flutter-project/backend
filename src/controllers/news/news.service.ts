import { newsRepository } from '@/database/repositories/news.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import { readerRepository } from '@/database/repositories/reader.repository';
import { lifeStyleConvert } from '@/utils/index';

export const newsService = {
    repository: newsRepository,
    profile_repository: profileRepository,
    reads_repository: readerRepository,

    async getTopNewsByCategory(category: Category, page: number = 1) {
        const limit = 10;
        const mostReadOffset = (page - 1) * limit;
        const remainingOffset = (page - 1) * limit;

        const mostReadNewsIds = await this.reads_repository.mostReadNews(
            category,
            mostReadOffset,
            limit
        );
        const mostReadNews = await this.repository.mostReadNews(
            mostReadNewsIds
        );
        if (mostReadNewsIds.length < 10) {
            const remainingNews = await this.repository.remainingNews(
                category,
                mostReadNewsIds,
                remainingOffset,
                limit - mostReadNews.length
            );

            return mostReadNews.concat(remainingNews!);
        } else {
            return mostReadNews;
        }
    },
};
