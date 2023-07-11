import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { createNewsRoutes } from './news.routes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { newsService } from './news.service';

class NewsController implements Controller {
    public path = '/news/mobile';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newsRoutes: AuthRoutes = createNewsRoutes(
            this.path,
            this.getMyNews,
            this.getTopNewsByCategory,
            this.getTopNewsByCategoryAndAge,
            this.getTodayTopNews,
            this.getTodayTopNewsByAge
        );
        createRoutes(newsRoutes, this.router);
    }

    private getMyNews = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { category, age } = req;
        const { page } = req.body;
        try {
            const news = await newsService.getTopNews(page, category, age);
            return res
                .status(StatusCodes.OK)
                .json({ result: true, data: news });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private getTodayTopNews = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const { page } = req.body;
        try {
            const news = await newsService.getTopNews(page);
            return res
                .status(StatusCodes.OK)
                .json({ result: true, data: news });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private getTodayTopNewsByAge = asyncWrapper(
        async (req: CustomRequest, res) => {
            const response = customResponse(res);
            const { page, age } = req.body;
            try {
                const news = await newsService.getTopNews(page, undefined, age);
                return res
                    .status(StatusCodes.OK)
                    .json({ result: true, data: news });
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    );

    private getTopNewsByCategory = asyncWrapper(
        async (req: CustomRequest, res) => {
            const response = customResponse(res);
            const { category, page } = req.body;

            try {
                const news = await newsService.getTopNews(page, [category]);
                return res
                    .status(StatusCodes.OK)
                    .json({ result: true, data: news });
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    );

    private getTopNewsByCategoryAndAge = asyncWrapper(
        async (req: CustomRequest, res) => {
            const response = customResponse(res);
            const { category, age, page } = req.body;
            try {
                const news = await newsService.getTopNews(
                    page,
                    [category],
                    age
                );
                return res
                    .status(StatusCodes.OK)
                    .json({ result: true, data: news });
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    );
}

export default NewsController;
