import { Op, fn, col, literal, cast } from 'sequelize';
import db from '@/database/db';
import { dbException } from '@/common/exceptions';
import { defaultOptions } from '../options';
import { NewsModel } from '@/database/models/news.models';

export const newsRepository = {
    async findNewsbyId(news_id: number): Promise<NewsModel> {
        try {
            const news = await db.News.findOne({
                ...defaultOptions,
                where: {
                    id: news_id,
                },
            });
            return news!;
        } catch (err) {
            return dbException(err);
        }
    },

    async updateGptKeywords(keywords: string[], news_id: number) {
        try {
            await db.News.update(
                {
                    gpt_keywords: keywords,
                },
                {
                    where: { id: news_id },
                }
            );
            return keywords;
        } catch (err) {
            return dbException(err);
        }
    },

    async updateParagraph(news_id: number, content: string) {
        try {
            await db.News.update(
                {
                    content,
                },
                {
                    where: { id: news_id },
                }
            );
        } catch (err) {
            return dbException(err);
        }
    },

    async mostReadNews(mostReadNewsIds: number[]) {
        try {
            const mostReadNews = await db.News.findAll({
                where: {
                    id: mostReadNewsIds,
                },
            });
            // Sort the mostReadNews array based on the mostReadNewsIds order
            mostReadNews.sort(
                (a, b) =>
                    mostReadNewsIds.indexOf(a.id) -
                    mostReadNewsIds.indexOf(b.id)
            );
            return mostReadNews;
        } catch (err) {
            return dbException(err);
        }
    },

    // If there are fewer than 10 most-read news articles, fill the remaining spots with the most recently created articles
    async remainingNews(
        mostReadNewsIds: number[],
        offset: number,
        limit: number,
        categories?: Category[]
    ) {
        try {
            const where: any = {
                id: {
                    [Op.notIn]: mostReadNewsIds,
                },
            };
            if (categories) where.category = { [Op.in]: categories };

            return await db.News.findAll({
                where: where,
                order: [['pub_date', 'DESC']],
                offset: offset,
                limit: limit,
            });
        } catch (err) {
            return dbException(err);
        }
    },

    // find last news item
    async findLastNewsItem() {
        return await db.News.findOne({
            order: [['createdAt', 'DESC']],
        });
    },

    // find all news items
    async findAllNews() {
        return await db.News.findAll();
    },

    // insert a single news article into news table
    async createSingleNews(newsCreateData: any) {
        try {
            return await db.News.create(newsCreateData);
        } catch (error) {
            console.log('error', error);
        }
    },
};
