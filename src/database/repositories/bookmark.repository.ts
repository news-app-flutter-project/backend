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
                    folder_id: literal('`folder_id` IS NULL'),
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

    async findBookmarkSimple(bookmark_id: number) {
        try {
            const bookmark = await db.BookMark.findOne({
                where: {
                    id: bookmark_id,
                },
            });
            if (!bookmark) {
                return notFoundError('the bookmark does not exist');
            }
            return bookmark;
        } catch (err) {
            return dbException(err);
        }
    },

    async allocateBookmarkToFolder(bookmark_id: number, folder_id: number) {
        try {
            const bookmark = await db.BookMark.update(
                {
                    folder_id: folder_id,
                },
                { where: { id: bookmark_id } }
            );
            return bookmark;
        } catch (err) {
            return dbException(err);
        }
    },

    async allocateDupCheck(profile_id: number, bookmark_id: number) {
        try {
            const bookmark = await db.BookMark.findOne({
                where: { profile_id, id: bookmark_id },
                attributes: ['folder_id'],
            });
            // Check if the folder_id is null or not
            if (bookmark && bookmark.folder_id === null) {
                return null; // This means the bookmark does not have a folder_id allocated
            } else {
                return bookmark?.folder_id; // This will return the folder_id if allocated or undefined if the bookmark doesn't exist
            }
        } catch (err) {
            return dbException(err);
        }
    },
    async bookmarkDupCheck(profile_id: number, bookmark_id: number) {
        try {
            const bookmark = await db.BookMark.findOne({
                where: { profile_id, id: bookmark_id },
                attributes: ['folder_id'],
            });
            return bookmark;
        } catch (err) {
            return dbException(err);
        }
    },

    async listBookmarksFromFolder(folder_id: number) {
        try {
            const bookmarks = await db.BookMark.findAll({
                where: {
                    folder_id: folder_id,
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

    async removeBookmarkFromFolder(bookmark_id: number) {
        try {
            const bookmark = await db.BookMark.findByPk(bookmark_id);

            if (!bookmark) {
                return notFoundError('the bookmark does not exist');
            }

            bookmark.folder_id = null;
            await bookmark.save();
            return bookmark;
        } catch (err) {
            return dbException(err);
        }
    },

    async findAllBookmarksWithFolder(folder_id: number, profile_id: number) {
        try {
            const bookmarks = await db.BookMark.findAll({
                where: {
                    folder_id,
                    profile_id,
                },
            });

            return bookmarks;
        } catch (err) {
            return dbException(err);
        }
    },
};
