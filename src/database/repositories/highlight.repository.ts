import db from '@/database/db';
import { HighlightCreateInterface } from '@/database/models/highlight.model';
import { dbException } from '@/common/exceptions';
import { defaultOptions } from '../options';

export const highlightRepository = {
    async createHighlight(data: HighlightCreateInterface) {
        try {
            return await db.Highlight.create(data);
        } catch (err) {
            throw dbException(err);
        }
    },

    async getNewsContentId(news_id: number, sentence_no: number) {
        try {
            const newsContent = await db.NewsContent.findOne({
                ...defaultOptions,
                where: {
                    news_id,
                    sentence_no,
                },
                attributes: ['id'], // Only retrieve 'id'
            });
            return newsContent ? newsContent.id : null;
        } catch (err) {
            throw dbException(err);
        }
    },

    async getHighlightsForProfileAndNews(profile_id: number, news_id: number) {
        try {
            return await db.Highlight.findAll({
                ...defaultOptions,
                where: {
                    profile_id,
                    news_id,
                },
                raw: true,
            });
        } catch (err) {
            throw dbException(err);
        }
    },

    async checkIfHighlightExists(profile_id: number, news_content_id: number) {
        try {
            const highlightExist = await db.Highlight.findOne({
                where: {
                    profile_id,
                    news_content_id,
                },
            });
            return highlightExist;
        } catch (err) {
            throw dbException(err);
        }
    },

    async deleteHighlight(profile_id: number, news_content_id: number) {
        try {
            return await db.Highlight.destroy({
                where: {
                    profile_id,
                    news_content_id,
                },
            });
        } catch (err) {
            throw dbException(err);
        }
    },
};
