import { highlightRepository } from '@/database/repositories/highlight.repository';

interface IHighlight {
    news: News;
    profile: Profile;
    sentence_no: number;
}

export const highlightService = {
    repository: highlightRepository,

    async highlight(highlightData: IHighlight) {
        const { news, profile, sentence_no } = highlightData;

        const news_content_id = await this.repository.getNewsContentId(
            news.id,
            sentence_no
        );

        const isExist = await this.repository.checkIfHighlightExists(
            profile.id,
            news_content_id!
        );

        if (isExist) {
            // delete
            await isExist.destroy({ force: true });
            return {};
        } else {
            // create
            return await this.repository.createHighlight({
                profile_id: profile.id,
                news_content_id: news_content_id!,
                news_id: news.id,
            });
        }
    },
};
