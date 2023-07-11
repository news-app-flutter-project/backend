import { readerRepository } from '@/database/repositories/reader.repository';
import { newsRepository } from '@/database/repositories/news.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import { lifeStyleConvert } from '@/utils/index';
import useChatGPT from '@/apis/gpt/keywords.generator';
import { removeBrackets } from '@/utils/removeBrackets';
import { gptToString } from '@/utils/gptToString';
import { notFoundAccountException } from '@/common/exceptions';

export const readerService = {
    repository: readerRepository,
    reads_repository: readerRepository,
    profile_repository: profileRepository,
    news_repository: newsRepository,

    async addKeywords(news: News) {
        const { id: news_id, gpt_keywords, description, title } = news;

        const fixedTitle = removeBrackets(title);
        const fixedDesc = removeBrackets(description);

        const generateKeywords = new useChatGPT();
        const titleKeywords = await generateKeywords.getKeywords({
            title: fixedTitle,
            desc: fixedDesc,
        });

        const [titleArr] = [gptToString(titleKeywords || '')];
        const uniqueKeywords = Array.from(new Set([...titleArr]));
        await this.news_repository.updateGptKeywords(uniqueKeywords, news_id);
        return uniqueKeywords;
    },

    async readNews(auth_id: number, news: News) {
        const { id: news_id, category } = news!;
        const profile = await this.profile_repository.findProfilebyId(auth_id);
        if (profile !== null) {
            const { id: profile_id, age, sex } = profile;
            console.log(age);
            const isExist = await this.reads_repository.checkDuplicateReads(
                profile_id,
                news_id
            );
            if (!isExist) {
                await this.reads_repository.readNews({
                    age,
                    news_id,
                    profile_id,
                    sex,
                    category: category,
                });
            }
            return news;
        } else {
            return notFoundAccountException(auth_id);
        }
    },
};
