import db from '@/database/db';
import { dbException } from '@/common/exceptions';

export const searchRepository = {
    async searchKeyword(profile_id: number, keyword: string): Promise<Search> {
        try {
            return await db.Search.create({ profile_id, keyword });
        } catch (err) {
            return dbException(err);
        }
    },
};
