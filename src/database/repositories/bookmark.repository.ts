import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import { dbException } from '@/common/exceptions';

export const bookmarkRepository = {
    async bookmarkNews(profile_id: number, news_id: number) {
        try {
            return await db.BookMark.create({ profile_id, news_id });
        } catch (err) {
            return dbException(err);
        }
    },

    async check_duplicateBookmark(profile_id: number, news_id: number) {
        try {
            return await db.BookMark.findOne({
                where: {
                    news_id: news_id,
                    profile_id: profile_id,
                },
            });
        } catch (err) {
            return dbException(err);
        }
    },
};
