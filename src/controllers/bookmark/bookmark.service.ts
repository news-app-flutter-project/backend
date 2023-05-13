import { bookmarkRepository } from '@/database/repositories/bookmark.repository';
import { bookmark_folderRepository } from '@/database/repositories/bookmark_folder.repository';
import { LimitError } from '@/common/exceptions';

export const bookmarkService = {
    repository: bookmarkRepository,
    folder_repository: bookmark_folderRepository,

    async bookmarkNews(profile_id: number, news_id: number) {
        const res = await this.repository.bookmarkNews(profile_id, news_id);
        return res;
    },

    async listAllBookmarks(profile_id: number) {
        const res = await this.repository.listAllBookMarks(profile_id);
        return res;
    },

    async createFolder(profile_id: number, name: string) {
        await this.folder_repository.countFolders(profile_id);
        const folder = await this.folder_repository.createFolder(
            profile_id,
            name
        );
        return folder;
    },

    async listAllFolders(profile_id: number) {
        return await this.folder_repository.listAllFolders(profile_id);
    },

    async allocate(profile_id: number, folder_id: number, bookmark_id: number) {
        await this.repository.findBookMark(bookmark_id, profile_id);
        await this.folder_repository.findFolder(profile_id, folder_id);
        await this.repository.allocateBookmarkToFolder(bookmark_id, folder_id);
    },

    async updateFolderName(
        profile_id: number,
        folder_id: number,
        new_name: string
    ) {
        return await this.folder_repository.updateFolderName(
            profile_id,
            folder_id,
            new_name
        );
    },

    async listBookmarksFromFolder(folder_id: number, profile_id: number) {
        console.log('hi');
        await this.folder_repository.findFolder(profile_id, folder_id);
        return await this.repository.listBookmarksFromFolder(folder_id);
    },

    async removeBookmarkFromFolder(
        profile_id: number,
        bookmark_id: number,
        folder_id: number
    ) {},

    async deleteAllBookmarksfromFolders(
        profile_id: number,
        bookmark_id: number
    ) {
        const bookmark = await this.repository.findBookMark(
            bookmark_id,
            profile_id
        );
        console.log(bookmark);

        await bookmark.destroy({ force: true });
    },

    async deleteBookmarkFolder(profile_id: number, folder_id: number) {
        const folder = await this.folder_repository.findFolder(
            profile_id,
            folder_id
        );

        await folder.destroy({ force: true });
    },
};
