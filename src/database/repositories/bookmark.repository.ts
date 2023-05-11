import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import {
    dbException,
    notFoundError,
    DuplicateError,
    LimitError,
} from '@/common/exceptions';

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

    async listAllBookMarks(profile_id: number): Promise<Bookmark[]> {
        try {
            const bookmarks = await db.BookMark.findAll({
                where: {
                    profile_id: profile_id,
                },
                include: [
                    {
                        model: db.News,
                        as: 'news',
                    },
                ],
            });
            return bookmarks;
        } catch (err) {
            return dbException(err);
        }
    },

    async findBookMark(bookmark_id: number, profile_id: number) {
        try {
            const bookmark = await db.BookMark.findOne({
                where: {
                    id: bookmark_id,
                    profile_id,
                },
                include: [
                    {
                        model: db.News,
                        as: 'news',
                    },
                ],
            });
            if (!bookmark) {
                return notFoundError('the bookmark does not exist');
            }
            return bookmark;
        } catch (err) {
            return dbException(err);
        }
    },
};
