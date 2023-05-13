import { memoRepository } from '@/database/repositories/memo.repository';

export const memoService = {
    repository: memoRepository,

    async registerMemo(data: MemoCreateInterface) {
        return await this.repository.registerMemo(data);
    },
};
