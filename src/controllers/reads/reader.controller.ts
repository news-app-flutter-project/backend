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
            this.findMostPopularWithCategory,
            this.findMostPopularWithCategoryAndAge
        );
        createRoutes(newsRoutes, this.router);
    }

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
