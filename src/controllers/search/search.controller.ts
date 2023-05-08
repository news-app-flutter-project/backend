import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createSearchRoutes } from './search.routes';
import { searchService } from './search.service';

class SearchController implements Controller {
    public path = '/search';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newsRoutes: AuthRoutes = createSearchRoutes(
            this.path,
            this.searchKeyword
        );
        createRoutes(newsRoutes, this.router);
    }

    private searchKeyword = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id;
        const { keyword } = req.body;
        try {
            const data = await searchService.searchKeyword(
                profile_id!,
                keyword
            );
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default SearchController;
