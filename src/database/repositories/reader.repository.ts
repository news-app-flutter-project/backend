import { Op, fn, col, literal } from 'sequelize';
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

    // Find the total number of news articles read in the given category
    async countNewsForCategory(category: Category) {
        try {
            return await db.Reader.count({ where: { category } });
        } catch (err) {
            dbException(err);
        }
    },

    // Get news_ids for the most-read news articles in the given category
    async mostReadNews(
        offset: number,
        limit: number,
        categories?: Category[],
        age?: Age,
        date?: Date
    ) {
        try {
            const where: any = {};
            if (categories) where.category = { [Op.in]: categories };
            if (age) where.age = age;
            if (date) where.createdAt = { [Op.gte]: date };

            const mostReadNewsIds = (
                await db.Reader.findAll({
                    attributes: [
                        [fn('COUNT', col('news_id')), 'read_count'],
                        'news_id',
                    ],
                    where: where,
                    group: ['news_id'],
                    order: [[literal('read_count'), 'DESC']],
                    offset: offset,
                    limit: limit,
                })
            ).map((record) => record.news_id);
            return mostReadNewsIds;
        } catch (err) {
            return dbException(err);
        }
    },
};
