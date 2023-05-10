import { bookmarkRepository } from '@/database/repositories/bookmark.repository';
import { bookmark_folderRepository } from '@/database/repositories/bookmark_folder.repository';
import { bookmarkFolderItemRepository } from '@/database/repositories/bookmark.association.repository';
import { LimitError } from '@/common/exceptions';

export const bookmarkService = {
    repository: bookmarkRepository,
    folder_repository: bookmark_folderRepository,
    bookmark_association_repository: bookmarkFolderItemRepository,

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
        await this.folder_repository.findFolder(profile_id, folder_id);
        await this.bookmark_association_repository.findBookmarkInFolder(
            bookmark_id,
            profile_id,
            folder_id
        );
        await this.bookmark_association_repository.countBookmarksInFolder(
            folder_id
        );
        await this.bookmark_association_repository.allocateBookmarkToFolder(
            bookmark_id,
            profile_id,
            folder_id
        );
    },
};
