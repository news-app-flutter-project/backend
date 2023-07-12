import { readerRepository } from '@/database/repositories/reader.repository';
import { newsRepository } from '@/database/repositories/news.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import { commentRepository } from '@/database/repositories/comment.repository';
import { subCommentRepository } from '@/database/repositories/subComment.repository';
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
    comment_repository: commentRepository,
    subComment_repository: subCommentRepository,

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

    async readNews(news: News, profile: Profile) {
        const { id: news_id, category } = news!;

        const { id: profile_id, age, sex } = profile;
        // Record news reading (non-duplicate for a user)
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

        // Fetch comments
        let comments = await this.comment_repository.getCommentsByNewsId(
            news_id
        );

        // Define a new array that is going to hold comments with subcomments
        let commentsWithSubComments = [];

        // Fetch subcomments
        for (let i = 0; i < comments.length; i++) {
            const subComments =
                await this.subComment_repository.getSubCommentsByCommentId(
                    comments[i].id
                );

            // Create a new object that satisfies CommentWithSubComments interface
            let commentWithSubComments = {
                ...comments[i],
                subComments: subComments,
            };

            // Add this new object to the array
            commentsWithSubComments.push(commentWithSubComments);
        }

        const res = { ...news, comments: commentsWithSubComments };

        return res;
    },
};
