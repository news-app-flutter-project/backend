import { Router } from 'express';
import { asyncWrapper } from '@/middlewares/index';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/response';
import { createRoutes } from '@/common/createRouter';
import { createCommentRoutes } from './comment.routes';
import { CommentService } from './comment.service';

class CommentController implements Controller {
    public path = '/comment';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const newRoutes: AuthRoutes = createCommentRoutes(
            this.path,
            this.writeComment
        );
        createRoutes(newRoutes, this.router);
    }

    private writeComment = asyncWrapper(async (req: CustomRequest, res) => {
        const response = customResponse(res);
        const profile_id = req.profile_id!;
        const { news_id, content } = req.body;
        try {
            const data = await CommentService.writeComment({
                profile_id,
                news_id,
                content,
            });
            response.success({ code: StatusCodes.CREATED, data });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default CommentController;
