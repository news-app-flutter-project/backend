import { Sequelize, Op } from 'sequelize';
import db from '@/database/db';
import { dbException } from '@/common/exceptions';
import {
    ReaderCreateInterface,
    ReaderModel,
} from '@/database/models/reader.model';

export const readerRepository = {
    async readNews(reads_data: ReaderCreateInterface) {
        try {
            return await db.Reader.create(reads_data);
        } catch (err) {
            dbException(err);
        }
    },

    async checkDuplicateReads(profile_id: number, news_id: number) {
        try {
            const existingRead = await db.Reader.findOne({
                where: {
                    profile_id,
                    news_id,
                },
            });
            return !!existingRead; // Returns true if the read already exists, false otherwise
        } catch (err) {
            dbException(err);
        }
    },

    async mostPopularForCategory(category: Category) {
        const readers = await db.Reader.findAll({
            where: {},
            include: [
                {
                    model: db.News,
                    where: { category },
                    attributes: [],
                },
            ],
            group: ['news_id'],
            order: [[Sequelize.fn('COUNT', Sequelize.col('news.id')), 'DESC']],
            limit: 10,
        });
        return readers;
    },

    async mostPopularForCategoryAndAge(category: Category, age: Age) {
        // Find all news articles in the specified category created today
        const newsArticles = await db.News.findAll({
            where: {
                category: category,
                createdAt: {
                    [Op.gte]: new Date(new Date().setUTCHours(0, 0, 0, 0)), // Today's start time in UTC
                    [Op.lte]: new Date(new Date().setUTCHours(23, 59, 59, 999)), // Today's end time in UTC
                },
            },
        });

        // Count the number of times each news article has been read by readers of the specified age
        const newsArticleCounts = new Map<number, number>();
        const readers = await db.Reader.findAll({
            where: {
                news_id: newsArticles.map((news) => news.id),
                age: age,
            },
        });

        readers.forEach((reader) => {
            const newsId = reader.news_id;

            const count = newsArticleCounts.get(newsId) ?? 0;
            newsArticleCounts.set(newsId, count + 1);
        });

        // Sort the news articles by popularity (descending order)
        const sortedNewsIds = [...newsArticleCounts.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([newsId]) => newsId);

        // Fetch the news articles in the order of popularity
        const sortedNewsArticles = sortedNewsIds.map(
            (newsId) => newsArticles.find((news) => news.id === newsId)!
        );

        return sortedNewsArticles;
    },
};
