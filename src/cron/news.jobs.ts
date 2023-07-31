import { newsRepository } from '@/database/repositories/news.repository';
import { newsContentRepository } from '@/database/repositories/news_content.repository';
import { validateNews } from '@/database/validations/news.validation';
import { UniqueConstraintError } from 'sequelize';
import { removeApostrophe } from '@/utils/index';

export class ScheduleNewsUpdate {
    async findLastNewsItem() {
        return await newsRepository.findLastNewsItem();
    }

    async allNewsItems() {
        let newsArr: any = [];
        const allNewsItem = await newsRepository.findAllNews();
        for (const newsItem of allNewsItem) {
            newsArr.push(newsItem.dataValues);
        }
        return newsArr;
    }

    async insertNewsData(newsArr: any) {
        for (const news of newsArr) {
            let keywords = null;
            if (news.keywords) {
                keywords = Array.isArray(news.keywords)
                    ? news.keywords
                    : [news.keywords];
            }

            const singleNewsData = {
                category: removeApostrophe(news.category[0]),
                keywords: keywords,
                title: news.title,
                description: news.description,
                content: news.content,
                creator: news.creator,
                pub_date: new Date(news.pubDate),
                image_url: news.image_url,
                link: news.link,
                company: news.source_id,
                language: news.language,
            };

            const validationResult = await validateNews(singleNewsData);
            if (!validationResult.isValid) {
                console.log('validation error', validationResult.errors);
                continue;
            }

            try {
                // Store the news item and get the result to obtain its id
                const createdNews = await newsRepository.createSingleNews(
                    singleNewsData
                );

                // Check if news was successfully created
                if (createdNews) {
                    // Split the news content into sentences
                    const sentences = news.content.split('.');

                    // Store each sentence in the NewsContent table
                    for (let i = 0; i < sentences.length; i++) {
                        const newsContentData = {
                            news_id: createdNews.id,
                            sentence_no: i,
                            content: sentences[i],
                        };

                        await newsContentRepository.createNewsContent(
                            newsContentData
                        );
                    }
                } else {
                    console.error(
                        'Error: Failed to create news, skipping content creation'
                    );
                }
            } catch (error) {
                if (error instanceof UniqueConstraintError) {
                    console.error(`Error inserting news: ${error.message}`);
                } else {
                    console.error('Error inserting news:', error);
                }
                continue;
            }
        }
    }
}
