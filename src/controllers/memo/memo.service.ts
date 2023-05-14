import { memoRepository } from '@/database/repositories/memo.repository';
import { memoFolderRepository } from '@/database/repositories/memo_folder.repository';
import { dbException } from '@/common/exceptions';

interface dataHandler {
    profile_id?: number | undefined;
    news_id?: number | undefined;
    content?: string | undefined;
    id?: number | undefined;
    name?: string | undefined;
    folder_id?: number | undefined;
}

export const memoService = {
    repository: memoRepository,
    folder_repository: memoFolderRepository,

    async registerMemo(data: MemoCreateInterface) {
        return await this.repository.registerMemo(data);
    },

    async updateMemo(data: dataHandler) {
        const memo = await this.repository.findMemoById(data);
        memo.content = data.content!;
        try {
            return await memo.save();
        } catch (err) {
            return dbException(err);
        }
    },

    async listMemo(data: dataHandler) {
        return await this.repository.listMemo(data);
    },

    async createFolder(data: MemoFolderCreateInterface) {
        return await this.folder_repository.createFolder(data);
    },

    async listFolders(data: dataHandler) {
        return await this.folder_repository.listFolders(data);
    },

    async allocate(data: dataHandler) {
        await this.repository.findMemoById(data);
        await this.folder_repository.findFolderById(data);
        return await this.repository.allocate(data);
    },
};
