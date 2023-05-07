import { newsRepository } from '@/database/repositories/news.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import { readerRepository } from '@/database/repositories/reader.repository';
import { lifeStyleConvert } from '@/utils/index';

export const newsService = {
    repository: newsRepository,
    profile_repository: profileRepository,
    reads_repository: readerRepository,

    async getTopNews(page: number = 1, category?: Category, age?: Age) {
        const limit = 10;
        const mostReadOffset = (page - 1) * limit;
        const remainingOffset = (page - 1) * limit;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const mostReadNewsIds = await this.reads_repository.mostReadNews(
            mostReadOffset,
            limit,
            category,
            age,
            today
        );
        const mostReadNews = await this.repository.mostReadNews(
            mostReadNewsIds
        );
        if (mostReadNewsIds.length < 10) {
            const remainingNews = await this.repository.remainingNews(
                mostReadNewsIds,
                remainingOffset,
                limit - mostReadNews.length,
                category
            );

            return mostReadNews.concat(remainingNews!);
        } else {
            return mostReadNews;
        }
    },
};
