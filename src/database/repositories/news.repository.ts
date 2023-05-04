import { Sequelize } from 'sequelize';
import db from '@/database/db';
import { dbException } from '@/common/exceptions';
import { defaultOptions } from '../options';
import { NewsModel } from '@/database/models/news.models';

export const newsRepository = {
    async findByCategory(category: string) {
        try {
            return await db.News.findAll({
                where: Sequelize.literal(
                    `JSON_CONTAINS(category, '["${category}"]')`
                ),
                order: [['pub_date', 'DESC']],
            });
        } catch (err) {
            dbException(err);
        }
    },

    async findByUserCategories(categories: ConvertedCategory[]) {
        try {
            const categoryConditions = categories
                .map((category) => `category LIKE '%"${category}"%'`)
                .join(' OR ');
            return await db.News.findAll({
                where: Sequelize.literal(categoryConditions),
                order: [['pub_date', 'DESC']],
            });
        } catch (err) {
            dbException(err);
        }
    },

    async findNewsbyId(news_id: number): Promise<NewsModel> {
        try {
            const news = await db.News.findOne({
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
            console.log('error', error);
        }
    },
};
