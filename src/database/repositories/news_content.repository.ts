import db from '@/database/db';
import { NewsContentCreateInterface } from '@/database/models/news_content.model';
import { dbException } from '@/common/exceptions';
import { defaultOptions } from '../options';

export const newsContentRepository = {
    async createNewsContent(data: NewsContentCreateInterface) {
        try {
            return await db.NewsContent.create(data);
        } catch (err) {
            throw dbException(err);
        }
    },

    async getAllNewsContentForNews(news_id: number) {
        try {
            return await db.NewsContent.findAll({
                ...defaultOptions,
                where: {
                    news_id,
                },
                raw: true,
            });
        } catch (err) {
            throw dbException(err);
        }
    },

    async getNewsContent(news_id: number, sentence_no: number) {
        try {
            const newsContent = await db.NewsContent.findOne({
                ...defaultOptions,
                where: {
                    news_id,
                    sentence_no,
                },
            });
            return newsContent;
        } catch (err) {
            throw dbException(err);
        }
    },
};
