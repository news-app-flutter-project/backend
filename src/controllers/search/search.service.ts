import { searchRepository } from '@/database/repositories/search.repository';

export const searchService = {
    repository: searchRepository,

    async searchKeyword(profile_id: number, keyword: string) {
        const res = await this.repository.searchKeyword(profile_id, keyword);
        return res;
    },
};
