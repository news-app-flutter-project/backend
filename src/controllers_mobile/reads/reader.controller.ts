import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createReadsRoutes } from './reader.routes';
import { readerService } from './reader.service';

class ReaderMobileController implements Controller {
    public path = '/read/mobile';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newsRoutes: AuthRoutes = createReadsRoutes(
            this.path,
            this.readNews,
            this.addKeywords
        );
        createRoutes(newsRoutes, this.router);
    }

    private readNews = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const news = req.news;
        const profile = req.profile;
        try {
            const data = await readerService.readNews(news!, profile!);
            return res.status(StatusCodes.OK).json({ result: true, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private addKeywords = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const news = req.news;
        try {
            const data = await readerService.addKeywords(news!);
            return res.status(StatusCodes.OK).json({ result: true, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default ReaderMobileController;
