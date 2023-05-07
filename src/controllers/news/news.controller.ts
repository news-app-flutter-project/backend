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
            this.getTopNewsByCategory
        );
        createRoutes(newsRoutes, this.router);
    }

    private getTopNewsByCategory = asyncWrapper(
        async (req: CustomRequest, res) => {
            const response = customResponse(res);
            const { category, page } = req.body;

            try {
                const news = await newsService.getTopNewsByCategory(
                    category,
                    page
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
