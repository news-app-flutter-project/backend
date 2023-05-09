import { bookmarkRepository } from '@/database/repositories/bookmark.repository';
import { bookmark_folderRepository } from '@/database/repositories/bookmark_folder.repository';

export const bookmarkService = {
    repository: bookmarkRepository,
    folder_repository: bookmark_folderRepository,

    async bookmarkNews(profile_id: number, news_id: number) {
        const res = await this.repository.bookmarkNews(profile_id, news_id);
        return res;
    },
};
