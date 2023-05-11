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
                return DuplicateError('bookmark already in the folder');
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

    async deleteBookmarkFromFolder(
        profile_id: number,
        bookmark_id: number,
        folder_id: number
    ) {
        try {
            const bookmarkFolderItem = await db.BookMarkFolderItem.findOne({
                where: { folder_id, bookmark_id, profile_id },
            });

            if (!bookmarkFolderItem) {
                return notFoundError('the bookmark is not found in the folder');
            }
            await bookmarkFolderItem.destroy({ force: true });
        } catch (err) {
            return dbException(err);
        }
    },

    async deleteAllBookmarksfromFolders(
        profile_id: number,
        bookmark_id: number
    ) {
        try {
            await db.BookMarkFolderItem.destroy({
                where: { bookmark_id, profile_id },
                force: true,
            });
        } catch (err) {
            return dbException(err);
        }
    },

    async deleteBookmarkFolder(profile_id: number, folder_id: number) {
        try {
            await db.BookMarkFolderItem.destroy({
                where: { folder_id, profile_id },
            });
        } catch (err) {
            return dbException(err);
        }
    },
};
