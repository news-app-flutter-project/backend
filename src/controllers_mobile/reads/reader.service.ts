import { readerRepository } from '@/database/repositories/reader.repository';
import { newsRepository } from '@/database/repositories/news.repository';
import { profileRepository } from '@/database/repositories/profile.repository';
import { commentRepository } from '@/database/repositories/comment.repository';
import { subCommentRepository } from '@/database/repositories/subComment.repository';
import { commentLikeRepository } from '@/database/repositories/comment_like.repository';
import { subCommentLikeRepository } from '@/database/repositories/subComment_like.repository';
import { newsContentRepository } from '@/database/repositories/news_content.repository';
import { highlightRepository } from '@/database/repositories/highlight.repository';
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
    commentLike_repository: commentLikeRepository,
    subCommentLike_repository: subCommentLikeRepository,
    newsContentRepository: newsContentRepository,
    highlightRepository: highlightRepository,

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

        // Fetch the news content sentences for the given news article
        const newsContentSentences =
            await this.newsContentRepository.getAllNewsContentForNews(news_id);

        // Fetch highlights
        const highlights =
            await highlightRepository.getHighlightsForProfileAndNews(
                profile_id,
                news_id
            );

        // Fetch comments
        let comments = await this.comment_repository.getCommentsByNewsId(
            news_id
        );

        // Define a new array that is going to hold comments with subcomments
        let commentsWithSubComments = [];

        // Fetch subcomments
        for (let i = 0; i < comments.length; i++) {
            const comment_id = comments[i].id;

            // Fetch subcomments for this comment
            const subComments =
                await this.subComment_repository.getSubCommentsByCommentId(
                    comment_id
                );

            let subCommentsWithLikeData = [];
            for (let subComment of subComments) {
                const subComment_id = subComment.id;
                // Check if the profile has liked this subComment
                const isSubCommentLiked =
                    (await this.subCommentLike_repository.checkLikeExists(
                        subComment_id,
                        profile_id
                    )) != null;

                // Count the likes for this subComment
                const subCommentLikeCount =
                    await this.subCommentLike_repository.countLikesForSubComment(
                        subComment_id
                    );

                // Add isLike and likeCount to this subComment
                subComment.isLike = isSubCommentLiked;
                subComment.likeCount = subCommentLikeCount;

                subCommentsWithLikeData.push(subComment);
            }

            // Check if the profile has liked this comment
            const isCommentLiked =
                (await this.commentLike_repository.checkLikeExists(
                    comment_id,
                    profile_id
                )) != null;

            // Count the likes for this comment
            const commentLikeCount =
                await this.commentLike_repository.countLikesForComment(
                    comment_id
                );

            // Create a new object that satisfies CommentWithSubComments interface
            let commentWithSubComments = {
                ...comments[i],
                isLike: isCommentLiked,
                likeCount: commentLikeCount,
                subComments: subCommentsWithLikeData,
            };

            // Add this new object to the array
            commentsWithSubComments.push(commentWithSubComments);
        }

        // Map through the news content sentences
        const content = newsContentSentences.map((sentence, index) => {
            // Check if this sentence has been highlighted
            const isHighlighted = highlights.some(
                (highlight) => highlight.news_content_id === sentence.id
            );

            return {
                sentence_no: index + 1,
                sentence: sentence.content,
                highlighted: isHighlighted,
            };
        });

        const res = {
            ...news,
            content,
            comments: commentsWithSubComments,
        };

        return res;
    },
};
