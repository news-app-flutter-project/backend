import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { createNewsRoutes } from './news.routes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { newsService } from './news.service';

class NewsController implements Controller {
    public path = '/news';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newsRoutes: AuthRoutes = createNewsRoutes(
            this.path,
            this.findByCategory,
            this.findByUserCategories,
            this.readNews,
            this.addKeywords
        );
        createRoutes(newsRoutes, this.router);
    }

    private findByCategory = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const { category } = req.body;
        try {
            const data = await newsService.findByCategory(category);
            return res.status(StatusCodes.OK).json({ result: true, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private findByUserCategories = asyncWrapper(
        async (req: CustomRequest, res) => {
            const response = customResponse(res);
            const auth_id = req.auth_id;
            try {
                const data = await newsService.findByUserCategories(auth_id!);
                return res.status(StatusCodes.OK).json({ result: true, data });
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    );

    private readNews = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const auth_id = req.auth_id;
        const news = req.news;
        const { id: news_id } = news!;

        try {
            await newsService.readNews(auth_id!, news_id);
            return res.status(StatusCodes.OK).json({ result: true, news });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private addKeywords = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const news = req.news;
        try {
            const data = await newsService.addKeywords(news!);
            return res.status(StatusCodes.OK).json({ result: true, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default NewsController;
