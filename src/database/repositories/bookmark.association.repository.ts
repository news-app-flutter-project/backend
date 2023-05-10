import { Op, fn, col, literal } from 'sequelize';
import db from '@/database/db';
import {
    dbException,
    notFoundError,
    DuplicateError,
    LimitError,
} from '@/common/exceptions';

export const bookmarkFolderItemRepository = {
    async findBookmarkInFolder(
        bookmark_id: number,
        profile_id: number,
        folder_id: number
    ) {
        try {
            const existingBookmark = await db.BookMarkFolderItem.findOne({
                where: { bookmark_id, folder_id, profile_id },
            });
            if (existingBookmark) {
                return DuplicateError('news article already in the folder');
            }
            return existingBookmark;
        } catch (err) {
            return dbException(err);
        }
    },

    async countBookmarksInFolder(folder_id: number, maxNuber: number = 10) {
        try {
            const bookmarksInFolder = await db.BookMarkFolderItem.count({
                where: {
                    folder_id: folder_id,
                },
            });
            if (bookmarksInFolder >= maxNuber) {
                return LimitError('cannot add more bookmarks');
            }
            return bookmarksInFolder;
        } catch (err) {
            return dbException(err);
        }
    },

    async allocateBookmarkToFolder(
        bookmark_id: number,
        profile_id: number,
        folder_id: number
    ) {
        try {
            const allocatedBookmark = await db.BookMarkFolderItem.create({
                bookmark_id,
                folder_id,
                profile_id,
            });
            return allocatedBookmark;
        } catch (err) {
            return dbException(err);
        }
    },
};
