import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import { dbException } from '@/common/exceptions';

export const searchRepository = {
    async searchKeyword(profile_id: number, keyword: string): Promise<Search> {
        try {
            return await db.Search.create({ profile_id, keyword });
        } catch (err) {
            return dbException(err);
        }
    },

    async recentSearches(profile_id: number, limit: number = 10) {
        try {
            const recentSearches = await db.Search.findAll({
                where: { profile_id },
                attributes: ['keyword'],
                order: [['createdAt', 'DESC']],
                limit: limit,
            });
            return recentSearches.map((search) => search.keyword);
        } catch (err) {
            return dbException(err);
        }
    },

    async getTopKeywords(limit: number = 10) {
        try {
            const topKeywords = await db.Search.findAll({
                attributes: [
                    [fn('COUNT', col('keyword')), 'keyword_count'],
                    'keyword',
                ],
                group: ['keyword'],
                order: [[literal('keyword_count'), 'DESC']],
                limit: limit,
            });
            return topKeywords.map((record) => ({
                keyword: record.keyword,
                count: record.get('keyword_count'),
            }));
        } catch (err) {
            return dbException(err);
        }
    },
};
