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

    async createFolder(
        profile_id: number,
        name: string,
        maxFolders: number = 7
    ) {
        const folderCount = await this.folder_repository.countFolders(
            profile_id
        );
        if (folderCount >= maxFolders) {
            return LimitError(`max folderNo. exceeded: ${maxFolders}`);
        }
        const folder = await this.folder_repository.createFolder(
            profile_id,
            name
        );
        return folder;
    },

    async listAllFolders(profile_id: number) {
        return await this.folder_repository.listAllFolders(profile_id);
    },
};
