import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createMemoRoutes } from './memo.routes';
import { memoService } from './memo.service';

class MemoController implements Controller {
    public path = '/memo';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newRoutes: AuthRoutes = createMemoRoutes(
            this.path,
            this.registerMemo
        );
        createRoutes(newRoutes, this.router);
    }

    private registerMemo = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id!;
        const { news_id, content } = req.body;
        try {
            const data = await memoService.registerMemo({
                news_id,
                content,
                profile_id,
            });
            await response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default MemoController;
