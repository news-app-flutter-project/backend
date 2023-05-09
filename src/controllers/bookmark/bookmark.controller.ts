import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createSearchRoutes } from './bookmark.routes';
import { bookmarkService } from './bookmark.service';

class BookmarkController implements Controller {
    public path = '/bookmark';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newsRoutes: AuthRoutes = createSearchRoutes(
            this.path,
            this.bookmark
        );
        createRoutes(newsRoutes, this.router);
    }

    private bookmark = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        const { id: news_id } = req.news!;
        try {
            const data = await bookmarkService.bookmarkNews(
                profile_id!,
                news_id!
            );
            response.success({ code: StatusCodes.CREATED });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default BookmarkController;
