import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createReadsRoutes } from './reader.routes';
import { readerService } from './reader.service';

class ReaderController implements Controller {
    public path = '/read';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newsRoutes: AuthRoutes = createReadsRoutes(
            this.path,
            this.readNews,
            this.addKeywords,
            this.findMostPopularWithCategory,
            this.findMostPopularWithCategoryAndAge
        );
        createRoutes(newsRoutes, this.router);
    }

    private readNews = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const auth_id = req.auth_id;
        console.log('hehe');
        const news = req.news;
        try {
            await readerService.readNews(auth_id!, news!);
            return res.status(StatusCodes.OK).json({ result: true, news });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private addKeywords = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const news = req.news;
        console.log('hi');
        try {
            const data = await readerService.addKeywords(news!);
            return res.status(StatusCodes.OK).json({ result: true, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private findMostPopularWithCategory = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const { category } = req.body;
        try {
            const data = await readerService.findMostPopularForCategory(
                category
            );
            return res.status(StatusCodes.OK).json({ result: true, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private findMostPopularWithCategoryAndAge = asyncWrapper(
        async (req, res) => {
            const response = customResponse(res);
            const { category, age } = req.body;
            console.log(category, age);
            try {
                const data =
                    await readerService.findMostPopularForCategoryAndAge(
                        category,
                        age
                    );
                return res.status(StatusCodes.OK).json({ result: true, data });
            } catch (err) {
                response.error(err as ErrorData);
            }
        }
    );
}

export default ReaderController;
